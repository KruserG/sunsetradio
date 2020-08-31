const { Client, MessageEmbed, Collection } = require("discord.js");

module.exports = {
  name: 'dedi',
	description: 'Dédicaces',
	
	cooldown: 60,
	async execute(message, args, client) {


		if(!args.join(" ")) {return message.reply("votre dédicace semble être vide ! :eyes:");}
		
		const embed = new MessageEmbed()
    
		.setColor(message.guild.me.displayColor)
		.setThumbnail("https://i.imgur.com/DwtzhmQ.png")
		.setAuthor(message.guild.name, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
		  .setTitle(`Nouvelle dédicace de ${message.author.username} !`)
		  
		  .setDescription(args.join(" "))
		  .setFooter(message.author.username, message.author.displayAvatarURL({format:"jpg"}));

		  await message.react("📢");

		  message.channel.send(`Merci ${message.author} ❤️ !\n\nTa dédicace a été envoyé avec succès aux animateurs de Sunset Radio ! 🌇\n\n*Note que tu dois attendre \`60 secondes\` pour envoyer une nouvelle dédicace*`);
		  

return client.guilds.cache.get('707209368197791854').channels.cache.get('715157077680586834').send(embed);





	
		
		
		
	},
};