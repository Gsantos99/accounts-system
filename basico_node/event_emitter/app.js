import EventEmitter from "events";

const eventEmitter = new EventEmitter()

eventEmitter.on('Start', () => {
  console.log('O evento foi ativado!')
})

console.log('Antes')

eventEmitter.emit('Start')

console.log('Depois')
