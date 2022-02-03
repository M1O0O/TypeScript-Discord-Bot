import { ApplicationCommandData } from 'discord.js'

export const options: ApplicationCommandData = {
    "name": "members",
    "description": "Member manager",
    "options": [
        {
            "type": 2,
            "name": "role",
            "description": "Role manager for all members",
            "options": [
                {
                    "type": 1,
                    "name": "add",
                    "description": "Permit to add to all members a role",
                    "options": [
                        { "type": 8, "name": "role", "description": "Role to add", "required": true }
                    ]
                },
                {
                    "type": 1,
                    "name": "remove",
                    "description": "Permit to remove to all members a role",
                    "options": [
                        { "type": 8, "name": "role", "description": "Role to remove", "required": true }
                    ]
                }
            ]
        }
    ]
}