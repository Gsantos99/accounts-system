// externo -> pego função de lib instalada 
import minimist from 'minimist'
// interno -> pego função de um arquivo que está no meu projeto
import soma from '../introducao_node/tarefa_01/programa.mjs'

/* Aqui uso o minimist para capturar os argumentos passados pelo terminal, os argumentos são em formato de obj, por isso a notação 
de pontos.  
*/

// Passando argumentos pelo terminal -> node arquivo.js --a=5 --b=10
// Use o --nomeVar para passar


const args = minimist(process.argv.slice(2))

const a = parseInt(args['a'])
const b = parseInt(args['b'])
const resultado = soma(a,b)

// console.log(process.argv)






