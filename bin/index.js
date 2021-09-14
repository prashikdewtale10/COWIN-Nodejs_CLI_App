#! /usr/bin/env node
const states = require('../util/states');
const district = require('../util/district');
const slots = require('../util/slots');
const program = require('commander');
const chalk = require('chalk');

console.log(chalk.blue.bgWhite.bold('Welcome to COWIN CLI App'));
// console.log(chalk.blue.bgWhite.bold(`District Name:${districtname}`))


program
   .command('states')
   .description('List of all the states')
   .action(states)


   program
   .command('district <stateid>')
   .description('List of all the district using state id')
   .action(district)

   program
   .command('slots <districtid>')
   .description('List all the slots for district id')
   .action(slots)

   program.parse();