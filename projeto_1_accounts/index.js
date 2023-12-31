import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'

console.log(chalk.bgGreen.black('Seja bem-vindo ao Accounts'))

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que deseja fazer?',
        choices: [
          'Criar conta',
          'Depositar',
          'Consultar saldo',
          'Sacar',
          'Sair'
        ]
      }
    ])
    .then(answer => {
      const action = answer['action']
      if (action === 'Criar conta') {
        welcomeMsg()
        buildAccount()
      } else if (action === 'Depositar') {
        deposit()
      } else if (action === 'Consultar saldo') {
        get_account_balance()
      } else if (action === 'Sacar') {
        get_withdraw()
      } else if (action === 'Sair') {
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'))
        process.exit()
      }
    })
    .catch(e => {
      console.log(e)
    })
}

operation()

function welcomeMsg() {
  console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
  console.log(chalk.green('Defina as opções da sua conta a seguir'))
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: 'account_name',
        message: 'Digite um nome para a sua conta:'
      }
    ])
    .then(answer => {
      const accountName = answer.account_name
      console.log(accountName)

      // Se n existir nenhuma pasta accounts ela será criada
      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts')
      }
      // Verifica se a
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black('Está conta já existe, escolha outro nome!')
        )
        buildAccount()
        return
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance":0}',
        function (error) {
          console.log(error)
        }
      )

      console.log(chalk.green('Parabéns sua conta foi criada com sucesso!'))
      operation()
    })
}

function deposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
      }
    ])
    .then(answer => {
      const account_name = answer.accountName
      // Verifico se a conta existe!
      if (!check_account(account_name)) {
        return deposit()
      }

      inquirer
        .prompt([
          {
            name: 'amout',
            message: 'Quanto você quer depositar?'
          }
        ])
        .then(answer => {
          const amout = answer.amout
          //add amout
          add_amount(account_name, amout)
          operation()
        })
        .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
}

function check_account(account_name) {
  // Checa se a conta existe
  if (!fs.existsSync(`accounts/${account_name}.json`)) {
    console.log(chalk.bgRed.black('Está conta não existe! Escolha outro nome!'))
    return false
  }
  return true
}

function add_amount(account_name, amout) {
  const accountData = get_account(account_name)

  if (!amout) {
    console.log('Ocorreu um erro tente novamente mais tarde!')
    return deposit()
  }

  const new_balance = {
    balance: parseFloat(amout) + parseFloat(accountData.balance)
  }

  fs.writeFileSync(
    `accounts/${account_name}.json`,
    JSON.stringify(new_balance),
    e => {
      console.log(e)
    }
  )

  console.log(chalk.green(`Foi depositado o valor de R$${amout} na sua conta`))
}

function get_account(account_name) {
  // Pego a conta (json) na pasta, simulando um banco de dados
  const accountJson = fs.readFileSync(`accounts/${account_name}.json`, {
    encoding: 'utf-8',
    flag: 'r'
  })

  // Retorno a conta em formato de json
  return JSON.parse(accountJson)
}

function get_account_balance(account_name) {
  inquirer
    .prompt([
      {
        name: 'account_name',
        message: 'QUal o nome da sua conta?'
      }
    ])
    .then(answer => {
      const account_name = answer.account_name

      if (!account_name) {
        return get_account_balance()
      }

      const account = get_account(account_name)
      console.log(
        chalk.bgBlue.black(`O saldo da sua conta é R$${account.balance}`)
      )
      operation()
    })
    .catch(e => console.log(e))
}

function get_withdraw() {
  inquirer
    .prompt([
      {
        name: 'account_name',
        message: 'Qual o nome da sua conta?'
      }
    ])
    .then(answer => {
      const account_name = answer.account_name
      if (!check_account(account_name)) {
        return get_withdraw()
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja sacar?'
          }
        ])
        .then(answer => {
          const amount = answer.amount
          remove_amount(account_name, amount)
        })
        .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
}

function remove_amount(account_name, amount) {
  const account_data = get_account(account_name)

  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
    )
    return get_withdraw()
  }

  if (amount > account_data.balance) {
    console.log(chalk.bgRed.black('Valor indisponível!'))
    return get_withdraw()
  }

  account_data.balance = parseFloat(account_data.balance - amount)
  fs.writeFileSync(
    `accounts/${account_name}.json`,
    JSON.stringify(account_data),
    e => console.log(e)
  )
  console.log(chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`))
  operation()
}

