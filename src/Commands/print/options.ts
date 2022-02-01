import { ApplicationCommandData } from 'discord.js'

export const options: ApplicationCommandData = {
    "name": "print",
    "description": "Test subCommand",
    "options": [
        {
            "type": 1,
            "name": "tchat",
            "description": "Print in tchat",
            "options": [
                { "type": 3, "name": "content", "description": "Content to print", "required": true }
            ]
        },
        {
            "type": 1,
            "name": "console",
            "description": "Print in console",
            "options": [
                { "type": 3, "name": "content", "description": "Content to print", "required": true }
            ]
        }
    ]
}