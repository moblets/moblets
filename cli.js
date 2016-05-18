#! /usr/bin/env node
var cli = require('cli');
var fs = require('fs');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

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
    // console.log(__dirname);
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

function createEmptyMoblet(callback) {

}

cli.enable('help');
