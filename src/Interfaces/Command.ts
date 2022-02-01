import Client from '../Client';
import { CommandInteraction, PermissionResolvable } from 'discord.js';

export interface Command {
    client_permission?: PermissionResolvable[];
    user_permission?: PermissionResolvable[];
    run: {
        (client: Client, message: CommandInteraction, args: CommandInteraction['options']);
    };
}