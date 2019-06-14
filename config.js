const os = require("os");
const winston = require("winston");
const path = require("path");
const appName = "goeasy-tracker";

module.exports = {
    port: 4242,
    appname: appName,

    // Express Session Config
    session: {
        resave: true,
        saveUninitialized: true,
        secret: "oajfeiaoeifjaeifoo0",
        cookie: {path: "/", httpOnly: true, secure: false, sameSite: "lax"}
    },

    // Configure request logging
    reqLogging: {
        file: {
            filename: path.join(__dirname, "/logs/access.log")
        }
    },

    // Configure app logging
    logging: {
        file: {
            format: winston.format.json(), // This format shouldn't cause CRLF issues
            level: "info",
            handleExceptions: true,
            json: true,
            colorize: false,
            maxsize: 5242880, // 5MB
            maxFiles: 2,
            filename: path.join(__dirname, "/logs/app.log")
        },
        console: {
            format: winston.format.simple(),
            level: "debug",
            handleExceptions: true,
            json: false,
            colorize: true
        }
    }
};
