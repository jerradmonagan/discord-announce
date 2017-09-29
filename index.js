

const Discord= require('discord.js');  // from part 1 of video
const bot = new Discord.Client(); //from part1 of video
const settings = require('./settings.json');
var fs = require('fs');
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
    var dateOut= (getClockTime() +" "+d.getDate()+ " "+CurrentMonthName() +" "+d.getFullYear());
    console.log("User "+ newMember.displayName +" has joined the channel "+newMember.voiceChannel.name+" on "+newMember.guild+" at " + dateOut.toString());
    var join = ("User "+ newMember.displayName +" has joined the channel ");
    bot.channels.get('363082234565099522').send(join);
    var joinLog = ("User "+ newMember.displayName +" has joined the channel "+newMember.voiceChannel.name+" on "+newMember.guild+" at " + dateOut.toString());
    fs.appendFile("./logs.txt", joinLog+"\r\n", function(err) {
    if(err) {
        return console.log(err);
    }
});
  }//end if
// User leaves a voice channel
  else if(newUserChannel === undefined)
  {
    var d = new Date();
    var dateOut= (getClockTime() +" "+d.getDate()+ " "+CurrentMonthName() +" "+d.getFullYear());
    console.log("User "+ newMember.displayName +" has left the channel "+oldMember.voiceChannel.name+ " on "+oldMember.guild+" at " + dateOut.toString());
    var leave = ("User "+ newMember.displayName +" has left the channel ");
    bot.channels.get('363082234565099522').send(leave);
    var leaveLog = ("User "+ oldMember.displayName +" has left the channel "+oldMember.voiceChannel.name+" on "+oldMember.guild+" at " + dateOut.toString());
    fs.appendFile("./logs.txt", leaveLog+"\r\n", function(err) {
    if(err) {
        return console.log(err);
    }
});
  }//end else
})

bot.on('message', (message)=>{
if (message.content === prefix+'ping') {
  //message.reply('pong');
  message.channel.send('pong');}
});
// bot.on('guildMemberSpeaking', (member, speaking) => {
//
//   let guild = member.guild;
//
//   if (member.speaking) {
//
//     //guild.defaultchannel.send("is speaking!");
//     console.log("heya");
//
//   }
//
// });


bot.on('message', message => {

  let args = message.content.split(' ').slice(1);

  var result = args.join(' ');



  if (!message.content.startsWith(prefix)) return;

  if (message.author.bot) return;



  if (message.content.startsWith(prefix + 'join')) {

		let voiceChan = message.member.voiceChannel;

		if (!voiceChan || voiceChan.type !== 'voice') {

			message.channel.send('No').catch(error => message.channel.send(error));

		} else if (message.guild.voiceConnection) {

			message.channel.send('I\'m already in a voice channel');

		} else {

			message.channel.send('Joining...').then(() => {

				voiceChan.join().then(() => {

					message.channel.send('Joined successfully.').catch(error => message.channel.send(error));

				}).catch(error => message.channel.send(error));

			}).catch(error => message.channel.send(error));

		}

	} else



	if (message.content.startsWith(prefix + 'leave')) {

		let voiceChan = message.member.voiceChannel;

		if (!voiceChan) {

			message.channel.send('I am not in a voice channel');

		} else {

			message.channel.send('Leaving...').then(() => {

				voiceChan.leave();

			}).catch(error => message.channel.send(error));

		}

	}
});
//replace with your token after creating a bot

function getClockTime(){
   var now    = new Date();
   var hour   = now.getHours();
   var minute = now.getMinutes();
   var second = now.getSeconds();
   var ap = "AM";
   if (hour   > 11) { ap = "PM";             }
   if (hour   > 12) { hour = hour - 12;      }
   if (hour   == 0) { hour = 12;             }
   if (hour   < 10) { hour   = "0" + hour;   }
   if (minute < 10) { minute = "0" + minute; }
   if (second < 10) { second = "0" + second; }
   var timeString = hour + ':' + minute + ':' + second + " " + ap;
   return timeString;
}

function CurrentMonthName ()
{
var dateObj = new Date();
// create an array
var monthsArr = new Array();
// get current month
var currMonth = dateObj.getMonth();
// store month names into our array
monthsArr[0] = "January";
monthsArr[1] = "February";
monthsArr[2] = "March";
monthsArr[3] = "April";
monthsArr[4] = "May";
monthsArr[5] = "June";
monthsArr[6] = "July";
monthsArr[7] = "August";
monthsArr[8] = "September";
monthsArr[9] = "October";
monthsArr[10] = "November";
monthsArr[11] = "December";
return monthsArr[currMonth];
}

bot.login(settings.token);
