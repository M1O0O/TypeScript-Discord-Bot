import { ApplicationCommandOption, Client, Collection } from 'discord.js';
import path from 'path';
import { readdirSync } from 'fs';
import { Command, Event, Config } from '../Interfaces';
import ConfigJson from '../config.json';
import * as Prompt from '../utils/prompt';

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

class ExtendedClient extends Client {
    public events: Collection<string, Event> = new Collection();
    public commandPath: string = path.join(__dirname, '../Commands');
    public commandDir = readdirSync(this.commandPath);
    public commands: Collection<string, Command> = new Collection();
    public subCommands: Collection<string, Command> = new Collection();
    public subCommandsGroup: Collection<string, Command> = new Collection();
    public commandsOptions = [];

    public config: Config = ConfigJson;
    public Rest = new REST({ version: '9' }).setToken(this.config.token);
    public prompt = Prompt;

    public async init() {
        this.prompt.print.info('Initializing...');

        this.registerEvents();
        await this.registerCommands();
        await this.registerSubCommands();
        await this.registerSubCommandsGroup();

        await this.login(this.config.token);

        this.pushCommand();
    }

    private registerEvents() {
        /* Events */
        const eventPath = path.join(__dirname, '../Events');
        readdirSync(eventPath).forEach(file => {
            const events = require(`${eventPath}/${file}`);

            for (var i = 0; i < Object.keys(events).length; i++) {
                const event = events[Object.keys(events)[i]];

                this.events.set(event.name, event);
                this.prompt.print.info(`Loaded event: ${this.prompt.Colors.Cyan}${event.name}${this.prompt.Colors.White} on file ${this.prompt.Colors.Cyan}${file}`);
                this.on(event.name, event.run.bind(null, this));
            }
        });
    }

    private async registerCommands() {
        for (const cmdName of this.commandDir) {
            const { options } = require(`${this.commandPath}/${cmdName}/options`) as { options: ApplicationCommandOption };
            this.commandsOptions.push(options);

            if (readdirSync(`${this.commandPath}/${cmdName}`).includes('index.ts')) {
                const { command } = require(`${this.commandPath}/${cmdName}`);
                this.commands.set(options.name, command);
            } else this.commands.set(options.name, null);

            this.prompt.print.info(`Load command: ${this.prompt.Colors.Cyan}${options.name}`);
        }
    }

    private async registerSubCommands() {
        for (const cmdName of this.commandDir) {
            const cmdFiles = readdirSync(`${this.commandPath}/${cmdName}`);

            for (const File of cmdFiles) {
                if (File === 'index.ts' || File === 'options.ts' || !File.includes('.ts')) continue;
                const { command } = require(`${this.commandPath}/${cmdName}/${File}`);
                this.subCommands.set(`${cmdName}-${File.split('.')[0]}`, command);

                this.prompt.print.info(`Load subCommand: ${this.prompt.Colors.Cyan}${cmdName}/${File.split('.')[0]}`);
            }
        }
    }

    private async registerSubCommandsGroup() {
        for (const cmdName of this.commandDir) {
            const cmdFiles = readdirSync(`${this.commandPath}/${cmdName}`);

            for (const Folder of cmdFiles) {
                if (Folder.includes('.ts')) continue;
                for (const subCommand of readdirSync(`${this.commandPath}/${cmdName}/${Folder}`)) {
                    if (!subCommand.includes('.ts')) continue;
                    const { command } = require(`${this.commandPath}/${cmdName}/${Folder}/${subCommand}`);
                    this.subCommandsGroup.set(`${cmdName}-${Folder}-${subCommand.split('.')[0]}`, command);

                    this.prompt.print.info(`Load subCommandGroup: ${this.prompt.Colors.Cyan}${cmdName}/${Folder.split('.')[0]}/${subCommand.split('.')[0]}`);
                }
            }
        }
    }

    private async pushCommand() {
        await this.Rest.put(
            Routes.applicationCommands(this.user.id),
            { body: this.commandsOptions },
        ).then(() => {
            this.prompt.print.info(`Successfully registered commands`);
        }).catch((e) => {
            this.prompt.print.error(`Failed to register commands: ${e}`);
        });
    }
}

export default ExtendedClient;