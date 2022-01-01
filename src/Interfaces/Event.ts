import Client from "../Client";
import { ClientEvents } from "discord.js";

export interface Event {
    name: keyof ClientEvents;
    run: {
        (client: Client, ...args: any[]);
    };
}