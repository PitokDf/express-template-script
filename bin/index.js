#!/usr/bin/env node
import { Command } from 'commander';
import degit from 'degit';
import chalk from 'chalk';
import { execa } from 'execa';
import path from 'path';

const program = new Command();
program
    .name('pitok-create-express')
    .argument('<project-name>')
    .action(async (name) => {
        console.log(chalk.green(`\n📦 Membuat project ${name}...`));

        // 1. Clone template
        const emitter = degit('PitokDf/express-template/express', {
            force: true,
            cache: false,
            verbose: true,
        });
        try {
            await emitter.clone(name);
            console.log(chalk.blue(`\n✅ Scaffold selesai!`));
        } catch (err) {
            console.error(chalk.red('Clone gagal:'), err);
            process.exit(1);
        }

        // 2. Install dependencies
        console.log(chalk.yellow(`\n🔧 Installing packages...`));
        try {
            await execa('npm', ['install'], {
                cwd: path.resolve(process.cwd(), name),
                stdio: 'inherit',
            });
            console.log(chalk.green(`\n✅ Packages ter-install!`));
        } catch (err) {
            console.error(chalk.red('Install gagal:'), err);
            process.exit(1);
        }

        // 3. Selesai
        console.log(chalk.blue(`\n🚀 Project ${name} siap digunakan! Run:`));
        console.log(`   cd ${name}`);
        console.log(`   npm run dev\n`);
    });

program.parse();
