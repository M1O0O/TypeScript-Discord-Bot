import Client from "./Client";

new Client({ intents: ['GUILDS', "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_PRESENCES"] }).init();