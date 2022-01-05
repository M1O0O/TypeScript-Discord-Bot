import { Event } from "../Interfaces";

export const event: Event = {
    name: "ready",
    run: (client) => {
        client.user.setPresence({
            activities: [{
                name: "check errors",
                type: 'STREAMING',
                url: 'https://www.twitch.tv/m10o0'
            }]
        });
    }
}