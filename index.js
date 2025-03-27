#!/usr/bin/env node

import { Command } from 'commander';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const program = new Command();
program
	.name('discord-setup-cli') // Set the CLI name
	.version('1.0.0') // Set the version
	.description('A command-line tool for setting up a Discord.js bot project'); // Description of your CLI

program
	.command('setup')
	.description('Setup discord.js') // Short description of the setup command
	.action(() => {
		try {
			const currentWorkingDir = process.cwd();
			const sourcePath = join(__dirname, 'bin/struct/src');

			if (!fs.existsSync(sourcePath)) {
				console.error('Error: Source directory does not exist.');
				process.exit(1);
			}

			fs.cpSync(sourcePath, currentWorkingDir, { recursive: true });
			console.log('Setup completed successfully.');
		} catch (error) {
			console.error('Error during setup:', error.message);
			process.exit(1);
		}
	});

program.parse();
