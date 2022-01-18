## 🔥 Setup :

```bash
npm i
```
**Note: Change the name of Config file in `src/config.template.conf` to `src/config.json`**

---

## 🛺 New Command *(exemple: print)* : 
```ts
import { Command } from "../Interfaces";

export const command: Command = {
    name: 'print',
    aliases: [],
    client_permission: ["SEND_MESSAGES"],
    user_permission: [],
    argMin: 1,
    usage: '<text>',
    argsType: ["longstring"],
    run: async (client, message, args) => {        
        message.channel.send(`${member}: ${text}`);
    }
};
```
- ArgsType : `Array['longstring' | 'string' | 'number' | 'boolean' | 'user' | 'member' | 'role' | 'channel']`

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