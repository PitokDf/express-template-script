import { Command } from 'commander';
import chalk from 'chalk';
import { makeController } from './commands/makeController.js';
import { createProject } from './commands/create.js';

const program = new Command();

program
    .command("create <project-name>")
    .description('CLI untuk membuat proyek Express dan komponennya')
    .version('1.0.0')
    .action((name) => {
        createProject(name);
    });;

program
    .command('make:controller <name>')
    .description('Membuat controller baru')
    .action((name) => {
        makeController(name);
    });

program.parse(process.argv);