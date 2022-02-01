import { ApplicationCommandData } from 'discord.js'

export const options: ApplicationCommandData = {
    "name": "say",
    "description": "Lets bot talk",
    "options": [
        {
            "type": 3,
            "name": "content",
            "description": "Content of the message",
            "required": true
        },
        {
            "type": 7,
            "name": "channel",
            "description": "Channel to send the message",
            "required": false
        }
    ]
}