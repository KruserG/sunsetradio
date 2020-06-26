const { Client, MessageEmbed, Collection, User } = require("discord.js");

module.exports = {


	name: 'help',
  description: 'Help',
  cooldown: 30,
	async execute(message, args, client) {
    
    const user = client.users.cache.get(message.member.id);

      let roleColour = message.guild.me.displayColor;

      const embed = new MessageEmbed()
  
      .setColor(roleColour)
        
      .setAuthor('Sunset Radio - Guide', 'https://i.imgur.com/DwtzhmQ.png', 'https://www.sunsetradio.me/')
      .setThumbnail("https://i.imgur.com/DwtzhmQ.png")

        .setTitle("Liste de liens utiles :")
        
        .addFields( { name: '🎵 Site Web Officiel', value: 'https://sunsetradio.me' })
        .addFields( { name: '⚙️ Liste des commandes du bot', value:'https://sunsetradio.me/bot' })
        .addFields( { name: '🆕 Communauté Discord', value: 'https://sunsetradio.me/discord' })
        
        
        .setFooter("La Sunset Team", 'https://ukhnk407acv3nrmyc15obad1-wpengine.netdna-ssl.com/wp-content/uploads/2015/06/Facebook-checkmark-300x300.png');
     
        message.reply("un message vous a été envoyé en privé afin de vous aider ! 🔍 ")
      // Send the embed to the same channel as the message

      
      

      try{
        user.send(embed);
        console.log(`${message.author} dans ${message.guild.name} : !help`)
       }catch(e){
         console.log(`${message.author} n'accepte pas les messages privés.`);
       }
             
              
            
     
      }}