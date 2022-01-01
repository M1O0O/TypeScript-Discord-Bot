import { Event } from "../Interfaces";

export const event: Event = {
    name: "ready",
    run: (client) => {
        console.log(`Logged in as ${client.user.tag}!`);
    }
}