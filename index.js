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
        .setThumbnail('https://media.discordapp.net/attachments/1368012469473247315/1494824673429684304/1E26E9B5-5613-4CAA-933B-AA3EAA075BD2-removebg-preview.png?ex=69e4ac36&is=69e35ab6&hm=3335350e6fbc5481d18a55aed369e1097e01aa3c0fd56bf281d1a4b3b7e1becb&=&format=webp&quality=lossless')
        .setImage('https://media.discordapp.net/attachments/1368012469473247315/1494824673429684304/1E26E9B5-5613-4CAA-933B-AA3EAA075BD2-removebg-preview.png?ex=69e4ac36&is=69e35ab6&hm=3335350e6fbc5481d18a55aed369e1097e01aa3c0fd56bf281d1a4b3b7e1becb&=&format=webp&quality=lossless')
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
