#!/bin/js

const fs = require('fs');
const ncp = require('ncp').ncp;
const rimraf = require('rimraf');

const buildDir = __dirname + "/build";
const pluginDir = __dirname + "/wordpress/wp-content/plugins/CandidateGallery";

const build = async () => {

    console.log("Building plugin");

    try {
        fs.exists(buildDir, async (e) => {
            console.log(e);
            if(e) {
                console.log("removing previous build");
                await rimraf(buildDir, {}, async () => {});
                await fs.mkdir(buildDir, () => {});
            }

            ncp(pluginDir, buildDir, async (err) => {
                if(err) { return console.error(err); }
                console.log("copied files");
                console.log("finished");
            });
        });

    } catch(err) {
        console.log("Error:", err);
    }

}

build();