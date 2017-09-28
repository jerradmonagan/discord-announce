// started by using Adam Gaskins tutorial @ https://www.youtube.com/watch?v=9CDPw1lCkJ8&t=23s
//   const commando = require('discord.js-commando'); from part 2 of video
//   const bot = new commando.Client(); from part 2 of video
//   const bot = new commando.Client(); from part 2 of video
//   bot.registry.registerGroup('random', 'Random');
//   bot.registry.registerDefaults(); //list of help commands
//   bot.registry.registerCommandsIn(__dirname +"/commands");

const Discord= require('discord.js');  // from part 1 of video
const bot = new Discord.Client(); //from part1 of video
const settings = require('./settings.json');
var prefix ="~";

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  // User Joins a voice channel
  if(oldUserChannel === undefined && newUserChannel !== undefined) {
    var d = new Date();
    console.log("User "+ newMember.displayName +" has joined the channel "+newMember.voiceChannel.name+" @" + d);
  }//end if
// User leaves a voice channel
  else if(newUserChannel === undefined)
  {
    var d = new Date();
    console.log("User "+ newMember.displayName +" has left the channel "+oldMember.voiceChannel.name+ " @" + d);
  }//end else
})

bot.on('message', (message)=>{
if (message.content === prefix+'ping') {
  //message.reply('pong');
  message.channel.sendMessage('pong');}
});

//replace with your token after creating a bot
bot.login(settings.token);
