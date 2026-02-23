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
        .setThumbnail('https://cdn.discordapp.com/attachments/1368012469473247315/1475505745528361031/4e15a5bc-2305-4707-8be2-320188ad58d7-removebg-preview.png')
        .setImage('https://cdn.discordapp.com/attachments/1342063491695251478/1475480941710540800/7109f59f-3088-45bd-a7c7-538c86d7c946.jpg')
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