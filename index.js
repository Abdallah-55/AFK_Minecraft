const mineflayer = require('mineflayer')
const readline = require('readline')

// Create bot
const bot = mineflayer.createBot({
  host: 'T2eelYaBoody.aternos.me',
  port: 28685,
  username: 'bot02'
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
      host: 'T2eelYaBoody.aternos.me',
      port: 28685,
      username: 'bot02'
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

