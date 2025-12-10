const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "admin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Naeem",
    description: "Display Owner Information",
    commandCategory: "info",
    usages: "admin",
    cooldowns: 1
};

module.exports.run = async function({ api, event }) {
    const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");
    const ownerImageUrl = "https://i.imgur.com/idyXtoO.jpeg";
    const localImagePath = __dirname + "/cache/owner.jpg";

    // Callback function to send message
    const sendOwnerInfo = () => {
        api.sendMessage({
            body: `
Owner Information:
Name       : Naeem
Gender     : Male
Status     : Single
Age        : ??
Religion   : Islam
Education  : ??
Subject    : Science
Address    : Bangladesh

Contact:
Github   : ??
Facebook   : ??

Updated Time: ${time}
            `,
            attachment: fs.createReadStream(localImagePath)
        }, event.threadID, () => fs.unlinkSync(localImagePath));
    };

    // Download owner image and send message
    request(ownerImageUrl)
        .pipe(fs.createWriteStream(localImagePath))
        .on('close', sendOwnerInfo);
};
