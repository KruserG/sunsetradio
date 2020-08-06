const { Client, MessageEmbed, Collection } = require("discord.js");
const Discord = require("discord.js");
const { config } = require("dotenv");
const fs = require('fs');
const fetch = require("node-fetch");





config({ path: __dirname + "/.env" });


const client = new Client();
const prefix = "!";


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

// Quand le bot est prêt à être en ligne
client.on("ready", ()=> {

    

let title;
let artist;

try{
    setInterval( async () => {

       await fetch("https://api.radioking.io/widget/radio/sunset-radio-1/track/current")
        .then(response => response.json())
        .then(json =>{
            
            title= json.title;
             artist= json.artist;
            
            }).catch(error => {
                console.log("[Promise failed]");
                console.log(error);
            
            });

            if(!artist||!title){client.user.setActivity(`radio en maintenance`, { type: 'LISTENING' });}
            else{
                client.user.setActivity(`${artist} - ${title}`, { type: 'LISTENING' });
            }
        
        

    }, 2000);
} catch(e){
    console.log(e);
    console.log("Fetch error !");
}

    
    console.log(`${client.user.username} is online !`);
});


// when user command send message
client.on("message", async message => {

    if (message.author.bot) return; //L'utilisateur n'est pas un bot
    if (!message.guild) return; // user is in a server (guild)
    if (!message.content.startsWith(prefix)) return; // message start with !
  
   const args = message.content.slice(prefix.length).trim().split(/ +/g);
   const commandName = args.shift().toLowerCase();

// If command is not working
const command = client.commands.get(commandName)|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
if (!command) return;

if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;

if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`vous devez attendre ${timeLeft.toFixed(1)} secondes pour réutiliser la commande \`${command.name}\`.`);
	}
}

timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

   try {
       command.execute(message, args, client);
   } catch (error) {
       console.error(error);
       message.reply('cette commande n\'est pas disponible pour le moment.');
   }

});

//creating an unique broadcast

const broadcast = client.voice.createBroadcast();

client.on('message', async message => {

    
    if(message.content === "!radio"){

        if (message.author.bot) return; //L'utilisateur n'est pas un bot
        if (!message.guild) return; // user is in a server (guild)
        if(message.guild.me.voice.channel){
            message.react("❌")
            return message.reply("la radio est déjà démarrée dans un salon vocal ! ⚠️");
        }

        
        
            if (message.member.voice.channel) {

           //     const broadcast = client.voice.createBroadcast();
             const connection = await message.member.voice.channel.join();
             const dispatcher = broadcast.play('https://listen.radioking.com/radio/330331/stream/378616');
               
              await connection.play(broadcast);



dispatcher.on('start', () => {
    console.log(`[RADIO] Par ${message.author.username} dans [${message.guild.name}]`);
    console.log(`[LIVE] SUNSET is LIVE in ${message.guild.name} !`);
    
});

dispatcher.on('finish', () => {
    console.log(`[STOP] SUNSET is now OFF in ${message.guild.name}`);
    broadcast.end();
   return  message.member.voice.channel.leave();
   
    
});

// Error handling
dispatcher.on('error', (e)=>{
    console.log(`[ERROR] SOMETHING HAPPENED.. REBOOTING THE STREAM ON ${message.guild.name}`);
    broadcast.end();
    return message.member.voice.channel.leave();
    
});

message.react("✅");
message.channel.send(`Merci d'avoir choisi **Sunset Radio** ! :heart:\nEntrez la commande \`!help\` pour afficher le guide 🌇`);

            }else{
                message.react("❌");
           return message.reply("vous devez être **présent** dans un salon vocal pour inviter **Sunset Radio**. :eyes:")
            }


   
              
              
          
        


}

if(message.content === "!stopradio"){
    
    if (message.author.bot) return; //L'utilisateur n'est pas un bot
    if (!message.guild) return; // user is in a server (guild)
    
if(message.member.voice.channel.id === message.guild.me.voice.channel.id){
    message.react("👋");
    
    await message.channel.send(`Merci de nous avoir écouté ${message.author}, à la prochaine ! 💫`);
    console.log(`[STOPRADIO] Par ${message.author.username} dans [${message.guild.name}]`)
    console.log(`[STOP] SUNSET is now OFF in ${message.guild.name}`);
   return  message.member.voice.channel.leave();
    
    
}else{
    message.react("❌");
    return message.reply("vous devez être **présent** dans le salon vocal de la radio. :eyes:")
}

}





  
  
  
    }

   );


client.login(process.env.TOKEN); 