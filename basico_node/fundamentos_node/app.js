import chalk from 'chalk'
const { red } = chalk
import soma from './modulo_interno/meu_modulo.js'
import path from 'path'

console.log(red('Hello World!'))
console.log(soma(20, 40))

const extensionFile = path.extname('arquivo.txt')
console.log(extensionFile)