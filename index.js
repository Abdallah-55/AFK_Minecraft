const mineflayer = require('mineflayer')
const readline = require('readline')
const port = process.env.PORT || 4000;
const keep_alive = require('./keep_alive') 

// Create bot
const bot = mineflayer.createBot({
  host: 'donutsmp.net',
  port: 19132,
  username: 'yossefman123@gmail.com',
  auth: 'microsoft',
  password:'P@nzer1234'
})



// Handle anti-AFK measures
function antiAFK() {
  bot.setControlState('jump', true)
  setTimeout(() => bot.setControlState('jump', false), 200)
  bot.look(Math.random() * 2 * Math.PI, Math.random() * Math.PI / 2 - Math.PI / 4, true)
}

// Handle chat messages
bot.on('chat', (username, message) => {
  if (username === bot.username) return
  console.log(`${username}: ${message}`)
})

// Reconnect on disconnect
bot.on('end', () => {
  console.log('Bot has been disconnected. Reconnecting in 30 seconds...')
  setTimeout(() => {
    bot = mineflayer.createBot({
    host: 'donutsmp.net',
    port: 19132,
    username: 'yossefman123@gmail.com',
    auth: 'microsoft',
    password:'P@nzer1234'
    })
  }, 30000)
})

// Input for sending messages
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (input) => {
  bot.chat(input)
})


// Bot events

setInterval(antiAFK, 60000)  // Jump and look around every minute

