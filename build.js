#!/bin/js

const fs = require('fs');
const ncp = require('ncp').ncp;
const rimraf = require('rimraf');
const { zip } = require('zip-a-folder');

const buildDir = __dirname + "/build/CandidateGallery";
const pluginDir = __dirname + "/wordpress/wp-content/plugins/CandidateGallery";
const zipFile = __dirname + "/build/CandidateGallery.zip";

const build = async () => {

    console.log("Building plugin");

    try {
        fs.exists(buildDir, async (e) => {
            console.log(e);
            if(e) {
                console.log("removing previous build");
                await rimraf(buildDir, {}, async () => {});
            }

            ncp(pluginDir, buildDir, async (err) => {
                if(err) { return console.error(err); }
                console.log("copied files");
                await zip(buildDir, zipFile);
                console.log("Zipped folder to: " + zipFile);
                console.log("finished");
            });
        });

    } catch(err) {
        console.log("Error:", err);
    }

}

build();