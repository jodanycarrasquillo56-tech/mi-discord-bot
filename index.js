require('dotenv').config(); // Cargar variables del .env

const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder 
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`✅ Bot listo como ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {

    if (member.user.bot) return;

    const canal = member.guild.channels.cache.get('1475497510163316916');
    if (!canal) {
        console.log("❌ Canal no encontrado");
        return;
    }

    const embed = new EmbedBuilder()
        .setColor('#8B0000')
        .setTitle('🇵🇷 ¡Bienvenido a Puerto Rico Roleplay!')
        .setDescription(`
🔴 **${member.guild.name}**

👤 ${member}

📜 **OBLIGATORIO LEER LAS REGLAS:**  
➡️ <#1302713461217951774>

✅ **Luego verifícate aquí:**  
➡️ <#1292508086698774564>

🔥 Después de verificarte tendrás acceso completo al servidor.
`)
        .setThumbnail('https://media.discordapp.net/attachments/1368012469473247315/1480058487194259619/content.png?ex=69ae4b61&is=69acf9e1&hm=8d2e10fe828a85d200f945998cb8a96810164b383ca5aec948671b3f1e0ab198&=&format=webp&quality=lossless&width=960&height=960')
        .setImage('https://media.discordapp.net/attachments/1368012469473247315/1494311515119947847/giphy_9.gif?ex=69e41fcc&is=69e2ce4c&hm=9284d946a8eda55315a6ece6fce4ffa1e45770f2d4369c82620e17f467c0010e&=')
        .setFooter({ 
            text: `Managed by ${member.guild.name}`,
            iconURL: member.guild.iconURL()
        })
        .setTimestamp();

    try {
        await canal.send({ embeds: [embed] });
    } catch (err) {
        console.error('Error enviando el embed:', err);
    }
});

// 🔐 Verificación del token
if (!process.env.TOKEN) {
    console.log("❌ No se encontró TOKEN en el archivo .env");
    process.exit(1);
}

client.login(process.env.TOKEN);
