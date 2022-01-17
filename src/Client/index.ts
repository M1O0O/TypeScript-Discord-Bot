import { Client, Collection } from 'discord.js';
import path from 'path';
import { readdirSync } from 'fs';
import { Command, Event, Config } from '../Interfaces';
import ConfigJson from '../config.json';
import * as Prompt from '../utils/prompt';

class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public config: Config = ConfigJson;
    public prompt = Prompt;

    public async init() {
        this.prompt.print.info('Initializing...');
        
        /* Commands */
        const commandPath = path.join(__dirname, '../Commands');
        const commands = readdirSync(commandPath).filter(file => file.endsWith('.ts'));

        for (const file of commands) {
            const { command } = require(`${commandPath}/${file}`);
            if (this.commands.has(command.name)) return console.log(`Command ${this.prompt.Colors.Cyan}${command.name}${this.prompt.Colors.Reset} already exists`);
            this.commands.set(command.name, command);
            this.prompt.print.info(`Loaded command: ${this.prompt.Colors.Cyan}${command.name}`);

            if (command.aliases && command.aliases.length !== 0)
                command.aliases.forEach(alias => this.aliases.set(alias, command));
        };
        
        /* Events */
        const eventPath = path.join(__dirname, '../Events');
        readdirSync(eventPath).forEach(file => {
            const events = require(`${eventPath}/${file}`);

            for (var i = 0; i < Object.keys(events).length; i++) {
                const event = events[Object.keys(events)[i]];

                this.events.set(event.name, event);
                this.prompt.print.info(`Loaded event: ${this.prompt.Colors.Blue}${event.name}${this.prompt.Colors.White} on file ${this.prompt.Colors.Blue}${file}`);
                this.on(event.name, event.run.bind(null, this));
            }
        });

        this.login(this.config.token);

        this.login(this.config.token);
    }
}

export default ExtendedClient;
