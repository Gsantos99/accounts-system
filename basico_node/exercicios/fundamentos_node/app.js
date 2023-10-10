import inquirer from "inquirer";
import chalk from "chalk";


inquirer
  .prompt([
    {name: 'nome_user',
     message: 'Qual é seu nome?'
  },
  {name: 'idade_user',
     message: 'Qual é sua idade?'
  }
  ])
  .then((answers) => {
    console.log(`Olá ${chalk.black.bgYellow(answers.nome_user)}, você tem ${chalk.black.bgYellow(answers.idade_user)}`)
  })
  .catch((error) => {
    if (error) {
      console.log(error)
    } else {
      console.log(error)
    }
  });

