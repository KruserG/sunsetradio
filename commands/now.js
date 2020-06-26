const fetch = require("node-fetch");
const { Client, MessageEmbed, Collection } = require("discord.js");

module.exports = {
  name: 'now',
  aliases: ['np'],
  cooldown: 30,
	description: 'Now playing song on the radio',
	execute(message, args) {

		fetch("https://api.radioking.io/widget/radio/sunset-radio-1/track/current")
  .then(response => response.json())
  .then(json => {

    if(!json.artist||!json.title){
        
        const nowPlaying = new   MessageEmbed()
        .setColor("#ff4545")
        .setAuthor('wwww.sunsetradio.me', 'https://i.imgur.com/uhfAN6p.png', 'https://www.sunsetradio.me/')
        .setTitle(`⛔ Oh non ! Une maintenance est en cours 🔨`)
        .setDescription(`Nous sommes entrain d'améliorer votre radio, suivez l'avancement de la maintenance sur notre compte **Instagram** !`)
        .setFooter("sunsetradiofr", 'https://demo.wpzoom.com/instagram-widget/files/2016/08/icon-256x256.png')
        .setThumbnail("https://i.imgur.com/uhfAN6p.png");

        return message.channel.send(`${message.author}, **Sunset Radio** est en maintenance pour le moment.`,nowPlaying);
        
    } else{

        
    const nowPlaying = new   MessageEmbed()
    .setColor("#66CD00")
    .setAuthor('❤️ ou 💔 ce morceau en vous rendant sur sunsetradio.me', 'https://i.imgur.com/DwtzhmQ.png', 'https://www.sunsetradio.me/')
    .setTitle(`EN DIRECT sur Sunset Radio 📡`)
    .setDescription(`\n\n 🎵 **Titre :** ${json.title} \n\n 🎤 **Artiste :** ${json.artist}`)
    .setThumbnail(json.cover)
    
    console.log(`[NOW] Par ${message.author.username} dans [${message.guild.name}]`);
    return message.channel.send(`${message.author}, voici le nom de la chanson actuelle ! 🎵`,nowPlaying);

    }
    


  } );
  
   








	
		
		
		
	},
};