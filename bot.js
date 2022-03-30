const { Client, Intents, MessageEmbed } = require('discord.js');

const token = require("./token.json");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

let request = require(`request`);
let fs = require(`fs`);
function download(url){
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream('save.SC2Bank'));
}

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

    if (msg.content == "- rank"){
        if(msg.attachments.first()){//checks if an attachment is sent (첨부파일이 있는지 확인)
            if(msg.attachments.first().name == "save.SC2Bank"){// attachment file's name = save.SC2Bank (파일 이름이 save.SC2Bank일 때) 
                download(msg.attachments.first().url);//download attachment file (첨부파일 다운로드)
                msg.reply("```cs\n ! 정상적으로 다운로드 되었습니다. ```");
            }
            else{
                msg.reply("```cs\n# error : save.SC2Bank 파일이 아닙니다.\nsave.SC2Bank 파일을 첨부하시면서 댓글달기에 - rank 를 같이 적어 주세요.```");
            }
        }
        else{
            msg.reply("```cs\n# error : - rank 를 댓글달기로 같이 입력하지 않았습니다.\nsave.SC2Bank 파일을 첨부하시면서 댓글달기에 - rank 를 같이 적어 주세요.```");
        }
    }
});

client.login(token.token);