//started by using Adam Gaskins tutorial @ https://www.youtube.com/watch?v=9CDPw1lCkJ8&t=23s

const Discord= require('discord.js');  // from part 1 of video
  //const commando = require('discord.js-commando'); from part 2 of video
const bot = new Discord.Client(); //from part1 of video
  //const bot = new commando.Client(); from part 2 of video

// bot.registry.registerGroup('random', 'Random');
// bot.registry.registerDefaults(); //list of help commands
// bot.registry.registerCommandsIn(__dirname +"/commands");

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if(oldUserChannel === undefined && newUserChannel !== undefined) {
    var d = new Date();
    console.log("User "+ newMember.displayName +" has joined the channel "+newMember.voiceChannel.name+" @" + d);
    console.log(newMember.displayName);
    //message.channel.sendMessage(newMember.displayName);

     // User Joins a voice channel

  } else if(newUserChannel === undefined){
    var d = new Date();
    console.log("User "+ newMember.displayName +" has left the channel "+oldMember.voiceChannel.name+ " @" + d);
    var usersName=newMember.displayName;
    //message.channel.sendMessage("heya");
    // User leaves a voice channel

  }
})

bot.on('message', (message)=>{
if (message.content == 'ping') {
  //message.reply('pong');
  message.channel.sendMessage('pong');
}
});
//replace with your token after creating a bot
bot.login('put you're code here');
