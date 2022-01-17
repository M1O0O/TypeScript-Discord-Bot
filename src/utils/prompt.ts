const Colors = {
    'Black': '\x1b[30m',
    'Red': '\x1b[31m',
    'Green': '\x1b[32m',
    'Yellow': '\x1b[33m',
    'Blue': '\x1b[34m',
    'Magenta': '\x1b[35m',
    'Cyan': '\x1b[36m',
    'White': '\x1b[37m',
    'Reset': '\x1b[0m',
};

const Property = {
    'Bright': '\x1b[1m',
    'Dim': '\x1b[2m',
    'Underscore': '\x1b[4m',
    'Blink': '\x1b[5m',
    'Reverse': '\x1b[7m',
    'Hidden': '\x1b[8m'
}

const print = {
    debug(string: string) {
        console.log(`${Colors.Reset}[${Property.Bright}${Colors.Blue}DEBUG${Colors.Reset}] ${string}`);
    },
    error(string: string) {
        console.error(`${Colors.Reset}[${Property.Bright}${Colors.Red}ERROR${Colors.Reset}] ${string}`);
    },
    warn(string: string) {
        console.log(`${Colors.Reset}[${Property.Bright}${Colors.Yellow}WARN${Colors.Reset}] ${string}`);
    },
    info(string: string) {
        console.log(`${Colors.Reset}[${Property.Bright}${Colors.Cyan}INFO${Colors.Reset}] ${string}`);
    },
    log(string: string) {
        console.log(`${Colors.Reset}[${Property.Bright}${Colors.White}LOG${Colors.Reset}] ${string}`);
    },
    success(string: string) {
        console.log(`${Colors.Reset}[${Property.Bright}${Colors.Green}SUCCESS${Colors.Reset}] ${string}`);
    }
}

export {
    print,
    Colors,
    Property
}