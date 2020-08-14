
const { Client, MessageEmbed, Collection, User } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: 'info',
description: 'Informations',
	async execute(message, args, client) {


   //console.log(message.guild.me.voice.channel.members.size);
   //console.log(client.guilds.cache.get("700100928212041829").me.voice.channel.members.size);
 

    let total = 0 ;
   const webListeners =  await fetch("https://www.radioking.com/widgets/api/v1/radio/330331/listener/count")
   .then(response => response.json())
   .then(json =>{
       
    let count= json.listener_count;
      return count;
       
       }).catch(error => {console.log("[Promise of Listener count failed]");});

       
  

  

   const info = new   MessageEmbed()
   .setColor(message.guild.me.displayColor)
   .setDescription(`Nous sommes présents sur **${client.guilds.cache.size}** serveurs`)
   .setAuthor('sunsetradio.me', 'https://i.imgur.com/DwtzhmQ.png', 'https://www.sunsetradio.me/')
   .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Circle-icons-radio.svg/1024px-Circle-icons-radio.svg.png");
   
 
   // Step 1 : Creating a new map

   let map = new Map();

    // Step 2 : Filling the new map with filtered data  

   map = client.guilds.cache.filter((g1)=>{
    return g1.me.voice.channel;
   });

// Step 3 : Sorting the map

   map.sort((g1,g2)=>{
return g2.me.voice.channel.members.size - g1.me.voice.channel.members.size;
   });
















  map.forEach( (guild,id) => {
	   
	try{
		const name = guild.name;
	const count = client.guilds.cache.get(id).me.voice.channel.members.size - 1;

	total += count;
	if(count > 1){
		info.addField("🟢 "+name,count + " auditeurs")
	}else{
        if(count === 1){
            info.addField("🟢 "+name,count  + " auditeur")
        }else{
            info.addField("🔴 "+name,"Aucun auditeur")
        }
		
	}
		
		
	}
		
		catch{}
	

   });


   
   //make sure if it's plural we add an "s" that's why it's called sCase
   const sCase = (webListeners)=>{
if(webListeners > 1){
return `${webListeners} auditeurs`;
} else {
  return `${webListeners} auditeur`;
}
   }
   if(total===0){
    info.setTitle(`Aucun auditeur sur Discord en ce moment 😭`);
   }else if(total===1){
    info.setTitle(`🎧 ${total} auditeur sur Discord\n\n🖥️ ${sCase(webListeners)} sur le site`);
   }else{
    info.setTitle(`🎧 ${total} auditeurs sur Discord\n\n🖥️ ${sCase(webListeners)} sur le site`);
   }
   console.log(`[INFO] Par ${message.author.username} dans [${message.guild.name}]`);
   return message.channel.send(info);








	
		
		
		
	},
};