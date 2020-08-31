const { Client, MessageEmbed, Collection } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: 'musique',
	description: 'Musiques',
	
	cooldown: 60,
	async execute(message, args, client) {


		if(!args.join(" ")) {message.react("❌"); return message.reply("n'oubliez pas de **coller** le lien YouTube de votre musique.\n💡 Voici un exemple : `!musique https://www.youtube.com/watch?v=uqsGUAM9WDk`");}
		

		let title, thumbnail_url;

		await fetch("https://www.youtube.com/oembed?format=json&url="+args[0])
        .then(response => response.json())
        .then(async json =>{
            
			title= json.title;
            thumbnail_url = json.thumbnail_url;
			
			const embed = new MessageEmbed()
    
		.setColor(message.guild.me.displayColor)
		.setThumbnail(thumbnail_url)
		.setAuthor(message.guild.name, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
		  .setTitle(`${message.author.username} vient de suggérer\n\n🎵 ${title}`)
		  
		  
		  
		  .setFooter(message.author.username, message.author.displayAvatarURL({format:"jpg"}));

		  await message.react("🎵");

		  message.channel.send(`Merci ${message.author} de nous avoir suggéré **${title}** 🎵 !\n\nTa musique a été envoyé avec **succès** aux animateurs de Sunset Radio ! 🌇\n\n*Note que tu dois attendre \`60 secondes\` pour envoyer une nouvelle suggestion de musique*`);
		  

return client.guilds.cache.get('707209368197791854').channels.cache.get('743795729918591007').send(embed).then(m=> {m.react("🟢"); m.react("🔴");} );
			

            }).catch(error => {
				return message.reply("n'oubliez pas de **coller** le lien YouTube de votre musique.\n💡 Voici un exemple : `!musique https://www.youtube.com/watch?v=uqsGUAM9WDk`");
				
            //    console.log(error);
            
            });


		





	
		
		
		
	},
};