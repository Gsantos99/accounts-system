import minimist from 'minimist'
// https://www.npmjs.com/package/minimist

// Pega os argumentos mandandos na linha de comando
const args = minimist(process.argv.slice(2))

const nome = args['nome']
const profissao = args['profissao']

console.log(nome, profissao)