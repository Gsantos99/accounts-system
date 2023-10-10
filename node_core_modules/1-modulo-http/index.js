const http = require('http')


const port = 4200

const server = http.createServer((req,res)=>{
res.write('Http module')
res.end()
})

server.listen(port, ()=>{
  console.log('Server on 🚀')
}) 

