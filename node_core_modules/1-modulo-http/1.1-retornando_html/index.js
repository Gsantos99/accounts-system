const http = require('http')


const port = 4200

const server = http.createServer((req,res)=>{
  res.statusCode = 200 
  res.setHeader('Contenty-Type', 'text/html')
  res.end('<h1> Olá, esse é meu primeiro server com html </h1> <p> Testando o código! </p>')
})

server.listen(port, ()=>{
  console.log('Server on 🚀')
}) 

