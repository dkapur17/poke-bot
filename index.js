const Discord = require('discord.js')
const axios = require('axios');
require('dotenv').config()

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`PokeBot active as ${client.user.tag}`);
});

client.on('message', msg => {
    tokens = msg.content.split(' ');
    if (tokens[0] === 'pb') {
        for (let i = 1; i < tokens.length; i++) {
            pokemon = tokens[i].toLowerCase();
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                .then(res => {
                    image = res.data.sprites.other['official-artwork'].front_default;
                    msg.react('👌');
                    msg.channel.send(image);
                })
                .catch(err => {
                    msg.react('🖕');
                    msg.reply("Can't you spell the pokemon's name you dumbass?")
                })
        }
    }
});

client.login(process.env.TOKEN);