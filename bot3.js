const { Client, Intents, MessageEmbed, MessageAttachment } = require('discord.js');

const fetch = require('node-fetch');

const token = require("../token.json");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

// 시간을 불러오는 함수
function addZero(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}
// 시간을 불러오는 함수
function getCurrentTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = addZero(date.getMonth() + 1);
    var day = addZero(date.getDate());
    var hour = addZero(date.getHours());
    var minute = addZero(date.getMinutes());
    var second = addZero(date.getSeconds());

    var currentTime = year + "년 " + month + "월 " + day + "일 " + hour + "시 " + minute + "분 " + second +"초";
    return currentTime;
}


client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag} || `+new Date());
    
    client.user.setActivity('- help', { type: 'PLAYING' });
    
});

client.on('messageCreate', msg => {

    if (msg.author.bot) return;


    if (msg.content == "- help") {

        const embed = new MessageEmbed()
        .setTitle("ㅡㅡㅡㅡ help list ㅡㅡㅡㅡ")
        .setColor('#FFBF00')
        .setDescription("help list")
        .addField("1. - ranking", " 현재 랭킹 정보를 보여줍니다.")
        .addField("2. - time", " 현재 시간 정보를 보여줍니다.");

        msg.channel.send({ embeds: [embed] });
        /*
        reply = 답신
        msg.reply("- ranking");
        channel.send = 해당 체널에 메시지
        msg.channel.send("- ranking");
        */
    }

    if (msg.content == "- time") {

        const embed = new MessageEmbed()
        .setTitle("현재 시간")
        .setColor('#FFBF00')
        .setDescription(getCurrentTime());

        msg.channel.send({ embeds: [embed] });
    }
    /*
    const file = msg.attachments.first()?.url;
    if (!file) return console.log('No attached file found');
    try {
        msg.channel.send('Reading the file! Fetching data...');

        // fetch the file from the external URL
        const response = await fetch(file);

        // if there was an error send a message with the status
        if (!response.ok)
        return msg.channel.send(
            'There was an error with fetching the file:',
            response.statusText,
        );

        // take the response stream and read it to completion
        const text = await response.text();

        if (text) {
            msg.channel.send(`\`\`\`${text}\`\`\``);
        }
    } catch (error) {
        console.log(error);
    }
    */
    /*
    if (msg.content == "- rank") {
        const file = msg.attachments.first()?.url;
        if (!file) return console.log('No attached file found');

        try {
            msg.channel.send('Reading the file! Fetching data...');

            // fetch the file from the external URL
            const response = await fetch(file);

            // if there was an error send a message with the status
            if (!response.ok)
            return msg.channel.send(
                'There was an error with fetching the file:',
                response.statusText,
            );

            // take the response stream and read it to completion
            const text = await response.text();

            if (text) {
                msg.channel.send(`\`\`\`${text}\`\`\``);
            }
        } catch (error) {
            console.log(error);
        }
    }
    */
});

client.login(token.token);