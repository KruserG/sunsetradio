
const { Client, MessageEmbed, Collection, User } = require("discord.js");

module.exports = {
  name: 'info',
description: 'Informations',
	execute(message, args, client) {


   //console.log(message.guild.me.voice.channel.members.size);
   //console.log(client.guilds.cache.get("700100928212041829").me.voice.channel.members.size);
 

   const guilds = client.guilds.cache ;
    let total = 0 ;
   
  

  

   const info = new   MessageEmbed()
   .setColor(message.guild.me.displayColor)
   .setAuthor('sunsetradio.me', 'https://i.imgur.com/DwtzhmQ.png', 'https://www.sunsetradio.me/')
   .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Circle-icons-radio.svg/1024px-Circle-icons-radio.svg.png")
   
 


   guilds.forEach( (key,value) => {
	   
	try{
		const name = key.name;
	const count = client.guilds.cache.get(value).me.voice.channel.members.size - 1;

	total += count;
	if(count > 1){
		info.addField("🟢 "+name,count + " auditeurs")
	}else{
        if(count === 1){
            info.addField("🟢 "+name,count  + " auditeur")
        }else{
            info.addField("🔴 "+name,"Aucun auditeur 😭")
        }
		
	}
		
		
	}
		
		catch{}
	

   });
   if(total===0){
    info.setTitle(`Aucun auditeur sur Discord en ce moment 😭`);
   }else if(total===1){
    info.setTitle(`🎧 ${total} auditeur sur Discord en ce moment`);
   }else{
    info.setTitle(`🎧 ${total} auditeurs sur Discord en ce moment`);
   }
   console.log(`[INFO] Par ${message.author.username} dans [${message.guild.name}]`);
   return message.channel.send(info);








	
		
		
		
	},
};