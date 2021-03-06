#!/bin/js

const fs = require('fs');

const createContext = (name) => {

    let data = "import React, {Component} from \"react\";\r\n\r\n";
    data += `interface ${name}Props {\r\n\r\n}\r\n\r\n`;
    data += `export default class ${name} extends Component<${name}Props>\r\n{\r\n\r\n`;
    data += `\tconstructor(props: ${name}Props)\r\n\t{\r\n\t\tsuper(props);\r\n\t}\r\n\r\n`;
    data += "\trender()\r\n\t{\r\n\t\treturn (\r\n\t\t\t<div>\r\n\t\t\t\t\r\n\t\t\t</div>\r\n";
    data += "\t\t);\r\n\t}\r\n\r\n}";

    return data;

}

const build = (path, data) => {
    fs.writeFile(path, data, {flag: 'wx'}, (err) => {
        if(err) throw err;
        console.log(`File created at ${path}`);
    });
}

const  exec = () => {
    const args = process.argv.slice(2);

    if(args.length > 0) {
        let path = args[0];
        path = `./src/js/${path}`;
        let arr = path.split("/");
        let name = arr[arr.length-1].split(".")[0];
        build(path + ".tsx", createContext(name));
    } else {
        console.log("Invalid arguments");
    }
}

exec();