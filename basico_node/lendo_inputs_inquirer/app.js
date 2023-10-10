import inquirer from "inquirer";

inquirer.prompt([{
  name: 'pergunta1',
  message:'Qual sua primeira nota??'
}, {
  name: 'pergunta2',
  message:'Qual sua segunda nota??'
}]).then(
  (respostas) => console.log(`Sua média é:  ${media(respostas)}`)
).catch(error => console.log(error))

function media(respostas) {
  const mediaNota = parseInt(respostas.pergunta1) + parseInt(respostas.pergunta2) / 2
  return mediaNota
}