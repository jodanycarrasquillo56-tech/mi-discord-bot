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
        .setThumbnail('https://media.discordapp.net/attachments/1368012469473247315/1496109756132364399/c8c0abdb-d86a-4ce6-b9da-97fc34eda269.png?ex=69e8b04a&is=69e75eca&hm=0b50a4e7b27a8cd1adeb2fcb8bd646dd2094e6f06f77ff21467abb0f5fc7e733&=&format=webp&quality=lossless&width=1376&height=917')
        .setImage('https://media.discordapp.net/attachments/1368012469473247315/1496109756132364399/c8c0abdb-d86a-4ce6-b9da-97fc34eda269.png?ex=69e8b04a&is=69e75eca&hm=0b50a4e7b27a8cd1adeb2fcb8bd646dd2094e6f06f77ff21467abb0f5fc7e733&=&format=webp&quality=lossless&width=1376&height=917')
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
