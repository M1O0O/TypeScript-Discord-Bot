import Client from '../Client';
import { Message, PermissionResolvable } from 'discord.js';

type argsType = 'longstring' | 'string' | 'number' | 'boolean' | 'user' | 'member' | 'role' | 'channel';

export interface Command {
    name: string;
    description?: string;
    aliases?: string[];
    client_permission?: PermissionResolvable[];
    user_permission?: PermissionResolvable[];
    argMin: Number;
    usage?: string;
    argsType?: argsType[];
    run: {
        (client: Client, message: Message, args: string[]);
    };
}