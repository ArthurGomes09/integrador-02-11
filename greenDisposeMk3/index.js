const express = require('express')
const exphbs = require('express-handlebars')
const PORT = 3333

const conn = require('./db/conn')
const Greendispose = require('./models/Greendispose')

//Importar as rotas
// const GreendisposeRoutes = require('./routes/GreendisposeRoutes')

const app = express()

//Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

//ROTAS
//    app.use('/Greendispose', GreendisposeRoutes)
app.get('/',(request , response)=>{
    return response.render('home')
})

app.get('/login',(request , response)=>{
    return response.render('login')
})

conn
    .sync()
    .then(()=>{
        app.listen(PORT)
        console.log(`Servidor ON na porta: ${PORT}`)
    })
    .catch((err) => console.log(err))