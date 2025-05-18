import degit from 'degit';
import ora from 'ora';
import chalk from 'chalk';
import boxen from 'boxen';
import { execa } from 'execa';
export async function createProject(name) {
    console.log(chalk.cyan.bold('\n🚀 Pitok Express CLI\n'));
    // Spinner clone
    const spinClone = ora('Cloning template...').start();
    const emitter = degit('PitokDf/express-template', { force: true });
    try {
        await emitter.clone(name);
        spinClone.succeed(' Scaffold selesai!');
    }
    catch (e) {
        spinClone.fail(' Clone gagal');
        process.exit(1);
    }
    // Spinner install
    const spinInstall = ora('Installing packages...').start();
    try {
        await execa('npm', ['install'], { cwd: name, stdio: 'inherit' });
        spinInstall.succeed(' Dependencies ter-install');
    }
    catch {
        spinInstall.fail(' Install gagal');
        process.exit(1);
    }
    // Boxen finish
    console.log(boxen(chalk.green(`\nProject ${name} siap digunakan!`) +
        '\n' +
        chalk.yellow(`cd ${name}\n`) +
        chalk.blue(`npm run dev`), { padding: 1, borderColor: 'green', borderStyle: 'round' }));
}
