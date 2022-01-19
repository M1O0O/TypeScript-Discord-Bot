## 🔥 Setup :

```bash
npm i
```
**Note: Change the name of Config file in `src/config.template.conf` to `src/config.json`**

---

## 🛺 New Command *(exemple: say)* : 
```ts
import { Command } from "../Interfaces";

export const command: Command = {
    name: 'say',
    aliases: [],
    client_permission: ["SEND_MESSAGES"],
    user_permission: [],
    argMin: 2,
    args: {
        member: {
            type: 'member',
            description: 'The member to say something to.'
        },
        text: {
            type: 'longstring',
            description: 'The text to say.'
        }
    },
    run: async (client, message, args) => {
        const member: GuildMember = args[0] as unknown as GuildMember;
        const text: string = args[1] as unknown as string;

        message.channel.send(`${member}: ${text}`);
    }
};
```

---

## 🛺 New Event *(exemple: ready)* :
```ts
import { Event } from "../Interfaces";

export const event: Event = {
    name: "ready",
    run: (client) => {
        client.prompt.print.success(`Logged in as ${client.prompt.Colors.Black}${client.user.tag}!`);
    }
}
```
- name : `Discord.clientEvents`

---

## 🛺 Use utils *(exemple: prompt)* :

```ts
const red = client.prompt.Colors.Red;
const Underscore = client.prompt.Property.Underscore;

client.prompt.print.error(`${red}${Underscore} This is an error`);
```

- client.prompt.Colors = `Black, Red, Green, Yellow, Blue, Magenta, Cyan, White, Reset`
    - Return `<String>`
- client.prompt.Property = `Bright, Dim, Underscore, Blink, Reverse, Hidden`
    - Return `<String>`
- client.prompt.print = `debug, error, warn, info, log, success`
    - `<Method>(<String>)`

---

## 🧨 Run :
```bash
npm run start
```