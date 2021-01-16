// index.js

const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
// FS => Enregistrer la bdd
const fs = require(`fs`)
//Bdd => Stocker des données
 
client.login(config.token)
client.db = require('./db.json')
client.commands = new Discord.Collection()
 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
});
// new function 
function userInfo(user, message) {
  //code here

let args = message.content.substring(prefix.length).split(" ")
const commandName = args.shift().toLowerCase()
if (!commandName.startsWith(config.prefix)) return
const command = client.commands.get(commandName.slice(config.prefix.length))
if (!command) return
if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
command.run(message, args, client)

client.on('guildMemberAdd', member => {
  member.guild.channels.cache.get(config.greeting.channel).send(`${member}`, new Discord.MessageEmbed()
      .setDescription(`${member} a rejoint le serveur ! Nous sommes désormais ${member.guild.memberCount} ! 🎉`)
      .setColor('RED')
      .addField(`Veuillez l\'accuillir comme il se doit, grâce a lui nous sommes maintenant ${member.guild.memberCount} 💜`))
})

client.on('guildMemberRemove', member => {
  member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
      .setDescription(`${member.user.tag} à quitté le serveur !`)
      .addField(`J\'espère qu\'il revindras au plus vite car nous ne sommes plus que ${member.guild.memberCount}`)
      .setColor('RED'))
})
}


client.on('ready', () => {

  client.on("message", async message => {
  
    const prefix = config.prefix
    const ms = require('ms')
    let args = message.content.substring(prefix.length).split(" ")
  
    if (message.content.startsWith(`${prefix}giveaway`)) {
      if(message.member.hasPermission("MANAGE_MESSAGES")) {
      let time = args[1]
      if (!time) return message.channel.send('Vous devez spécifier un temps !')
  
      if (
          !args[1].endsWith("j") &&
          !args[1].endsWith("h") &&
          !args[1].endsWith("m") &&
          !args[1].endsWith("s") 
      )
          return message.channel.send("Vous devez utiliser `j` pour **jour**, `h` pour **heures**, `m` pour **minutes et `s` pour **secondes**.")
  
          let gchannel = message.mentions.channels.first();
          if (!gchannel) return message.channel.send("Je ne trouve pas ce salon dans ce serveur, vérifiez que vous l'avez bien ajouter !")
  
          let prize = args.slice(3).join(" ")
          if (!prize) return message.channel.send("Reformulez la commande avec un prix !")
  
          message.delete()
          gchannel.send("**NOUVEAU GIVEAWAY**")
          let gembed = new Discord.MessageEmbed()
              .setTitle(' Nouveau Giveaway')
              .setColor("#070000")
              .setThumbnail(message.guild.iconURL())
              .setDescription(`Réagissez avec "🍓" pour entrer dans le giveaway!\nLancer par **${message.author}**\nPrix : **${prize}**\nTemps : **${time}**\n`)
              .setTimestamp(Date.now + ms(args[1]))
              .setFooter('Imkin - Giveaway', message.guild.iconURL())
              .setAuthor(message.guild.name, message.guild.iconURL())
              let m = await gchannel.send(gembed)
              m.react("🍓")
              setTimeout(() => {
                  if (m.reactions.cache.get("🍓").count <= 1) {
                    return gchannel.send("Personne n'a réagis a temps au giveaway donc je n'ai pas put déterminer de gagnant !")
  
                  }
  
                  let winner = m.reactions.cache.get("🍓").users.cache.filter((u) => !u.bot).random();
                  gchannel.send(`Bravo a ${winner} qui remporte **${prize}** !`
                  );
              }, ms(args[1]));
          }
      }
   })
  })
 
client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(message, args, client)
})
client.on('ready', () => {

  client.on("message", async message => {
  
    const prefix = config.prefix
    const ms = require('ms')
    let args = message.content.substring(prefix.length).split(" ")
  
    if (message.content.startsWith(`${prefix}helpqsd`)) {
      if(message.member.hasPermission("MANAGE_MESSAGES")) {
        let hchannel = message.mentions.channels.first();
        if (!hchannel) return message.channel.send("Je ne trouve pas ce salon dans ce serveur, vérifiez que vous l'avez bien ajouter !")
          
  
          message.delete()
          hchannel.send("L'embed est en cours de chargement")
          const embed = new Discord.MessageEmbed()
          .setTitle("L'aide...")
          .setDescription('__Administration__')
          .setColor('#FF0000')
          .addField('`prefix + ban @mention +raison`\n**Cette commande sert à bannir un utilisateur du serveur discord (irréversible sauf en faisant +unban ou aller dans les paramètres du serveur et aller dans banissement**','First Command')
          .addField('`prefix + kick @mention +raison`\n**Cette commande sert à expulser un utilisateur du serveur mais il pourra toujours rejoindre le serveur avec un lien d\'invitation','Second Command')
          .addField('`prefix + tempban @mention +raison`\n**Cette commande sert à bannir quelqu\'un temporairement du serveur (à la fin du temps définis, l\'utilisateur sera automatiquement débanni par le bot','Third Command')
          .setFooter('TriceBots');
      }
    }
  })
})

client.on('message', msg => {
    if (msg.content === 'yo') {
      msg.reply('Yo bg !');
    }
  });

  client.on('message', msg => {
    if (msg.content === 'wsh') {
      msg.reply('Wsh bg !');
    }
  });

  client.on('message', msg => {
    if (msg.content === 'slt') {
      msg.reply('Salut bg !');
    }
  });
  client.on('message', msg => {
    if (msg.content === 'botinvite') {
      msg.reply('https://discord.com/api/oauth2/authorize?client_id=800012686485618708&permissions=8&scope=bot');
    }
  });
  client.on('ready', () => {
    const statuses = [
        () => `${client.guilds.cache.size} serveurs `,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: 'PLAYING'})
        i = ++i % statuses.length
    }, 1e4)
})



console.log(`Le bot est en marche, toutes les commandes sont prêtes, connecté en tant que Fleak's bot`)
