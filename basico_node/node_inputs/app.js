import { read } from 'node:fs';
import * as readline from 'node:readline';



readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('Código rodando ...')

readline.question('Pergunto algo ao usuário!', (user_response) => {
 console.log(`Uso a informação do user: ${user_response}`)
 readline.close()
})

