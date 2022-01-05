import { Event } from "../Interfaces";

export const event: Event = {
    name: "ready",
    run: (client) => {
        client.prompt.print.success(`Logged in as ${client.prompt.Colors.Black}${client.user.tag}!`);
    }
}