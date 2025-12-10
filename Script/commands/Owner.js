const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "owner",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "Naeem",
  description: "Show Owner Info with random photo",
  commandCategory: "Information",
  usages: "owner",
  cooldowns: 1
};

module.exports.run = async function ({ api, event }) {
  const info = `
OWNER INFORMATION
-----------------
Name       : Naeem
Age        : 18+
Profession : Student / Developer
Education  : HSC
Address    : Bangladesh

Fun Fact: Coding is my superpower!
`;

  // Random images
  const images = [
    "https://i.imgur.com/8WBso8x.png",
    "https://i.imgur.com/0VZu5eY.png",
    "https://i.imgur.com/bkixgPK.jpeg",
    "https://i.imgur.com/z6G6L4c.jpeg"
  ];

  const randomImg = images[Math.floor(Math.random() * images.length)];

  const callback = () => api.sendMessage(
    {
      body: info,
      attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
    },
    event.threadID,
    () => fs.unlinkSync(__dirname + "/cache/owner.jpg")
  );

  return request(encodeURI(randomImg))
    .pipe(fs.createWriteStream(__dirname + "/cache/owner.jpg"))
    .on("close", () => callback());
};
