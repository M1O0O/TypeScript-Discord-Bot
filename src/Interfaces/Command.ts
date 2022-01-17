import Client from '../Client';
import { Message, PermissionResolvable } from 'discord.js';

export interface Command {
    name: string;
    description?: string;
    aliases?: string[];
    client_permission?: PermissionResolvable[];
    user_permission?: PermissionResolvable[];
    argMin: Number;
    argMax: Number;
    usage?: string;
    run: {
        (client: Client, message: Message, args: string[]);
    };
}