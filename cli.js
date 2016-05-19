#! /usr/bin/env node
var cli = require('cli');
var fs = require('fs-extra');
var inquirer = require('inquirer');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var mobletsPath = __dirname + '/moblets-source';
var currentPath = process.cwd();

/**
 * Moblets CLI
 */
cli.parse({
  name: ['n', 'the new moblet name', 'string', 'my-moblet']
},
  ['create']
);

cli.main(function(args, options) {
  if (cli.command === "create") {
    console.log(cli.command);
    console.log(options.name);
    var prompt = 'What moblet base to you wanto to use to create your moblet?\n' +
      '   -----------------\n' +
      '   (1) Empty moblet\n' +
      '   (2) Fidelity card\n' +
      '   -----------------\n' +
      '   (x) Exit\n' +
      '> ';

    rl.setPrompt(prompt);
    rl.prompt();

    rl.on('line', (line) => {
      switch (line.trim()) {
        case '1':
          console.log('Creating ' + options.name + ' moblet');
          console.log(__dirname);
          console.log(currentPath);
          copyMoblet('m-moblet-base', options.name);
          // fs.copy('/tmp/mydir', '/tmp/mynewdir', function(err) {
          //   if (err) {
          //     console.error(err);
          //   } else {
          //     console.log("success!");
          //   }
          // });
          console.log(options.name + ' moblet created :)');
          process.exit(0);
          break;
        case '2':
          console.log('Creating ' + options.name + ' based on fidelity card moblet');
          console.log(options.name + ' moblet created :)');
          process.exit(0);
          break;
        case 'x':
          console.log('bye :)');
          process.exit(0);
          break;
        default:
          console.log('bye :)');
          process.exit(0);
          break;
      }
      rl.prompt();
    }).on('close', () => {
      process.exit(0);
    });
  }
});
function copyMoblet(sourceName, newName) {
  console.log('sourceName', sourceName);
  console.log('newName', newName);
  var files = [
    "readme.md",
    "package.json",
    ".gitignore"
  ];
  var folders = [
    "moblet",
    "server",
    "spec"
  ];

  for (var i = 0; i < files.length; i++) {
    var origin = mobletsPath + '/' + sourceName + '/' + files[i];
    var destiny = currentPath + '/' + files[i];
    console.log(origin, destiny);

    fs.copySync(origin, destiny);
    console.log('passei');
  }
}
function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", done);

  var wr = fs.createWriteStream(target);
  wr.on("error", done);
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

cli.enable('help');
