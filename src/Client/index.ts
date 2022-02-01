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
    public commands: Collection<string, Command> = new Collection();
    public subCommands: Collection<string, Command> = new Collection();
    public commandsArray = [];

    public config: Config = ConfigJson;
    public Rest = new REST({ version: '9' }).setToken(this.config.token);
    public prompt = Prompt;

    public async init() {
        this.prompt.print.info('Initializing...');

        this.registerEvents();

        await this.login(this.config.token);

        this.registerCommands();
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
        const commandPath = path.join(__dirname, '../Commands');
        const commandsFolder = readdirSync(commandPath);

        for (const cFolder of commandsFolder) {
            const { options } = require(`${commandPath}/${cFolder}/options`) as { options: ApplicationCommandOption };

            this.commandsArray.push(options);
            this.prompt.print.info(`Load command: ${this.prompt.Colors.Cyan}${options.name}`);

            const subCommands = readdirSync(`${commandPath}/${cFolder}`);
            for (const subCommand of subCommands) {
                if (subCommand === 'index.ts' || subCommand === 'options.ts') continue;
                const { command } = require(`${commandPath}/${cFolder}/${subCommand}`);
                this.subCommands.set(`${options.name}-${subCommand.split('.')[0]}`, command);
            }

            if (readdirSync(`${commandPath}/${cFolder}`).includes('index.ts')) {
                const { command } = require(`${commandPath}/${cFolder}`);
                this.commands.set(options.name, command);
            } else this.commands.set(options.name, null);
        };

        await this.Rest.put(
            Routes.applicationCommands(this.user.id),
            { body: this.commandsArray },
        ).then(() => {
            this.prompt.print.info(`Successfully registered commands`);
        }).catch((e) => {
            this.prompt.print.error(`Failed to register commands: ${e}`);
        });
    }
}

export default ExtendedClient;