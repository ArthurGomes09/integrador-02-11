const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')//criar as sessões dos usuários
const Filestore = require('session-file-store')(session)
const flash = require('express-flash')
const PORT = 3333

const conn = require('./db/conn')

const app = express()

//Models
const User = require('./models/User')

//IMPORTAR CONTROLLERS
const AuthController = require('./controllers/AuthController')
const HomeController = require('./controllers/HomeController')

//Importar as Rotas
const authRouters = require('./routes/authRoutes')
const homeRoute = require('./routes/homeRoute')

//Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//IMPORTAR AS ENGINES
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')



//IMPORTAR MIDDLEWARE PARA CONTROLE DE SESSÕES
app.use(session({
    name:"session",
    secret:"nosso_segredo",
    resave: false,
    saveUninitialized: false,
    store: new Filestore({
      logFn: function() {},
      path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie:{
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true
    }
  }))

app.use(flash()) //IMPORTAR AS FLASHS MSGS
app.use(express.static('public'))//IMPORT DE ARQUIVOS ESTÁTICOS

//MIDDLEWARES PARA ARMAZENAR SESSÕES NA RESPOSTA
app.use((request, response, next)=>{
    if(request.session.userId){
      response.locals.session = request.session
    }
    next()
  })

//USAR AS ROTAS
app.use('/', homeRoute)
app.get('/login', AuthController.login)
app.post('/login', AuthController.loginPost)
app.get('/register', AuthController.register)
app.post('/register', AuthController.registerPost)
app.get('/logout', AuthController.logout)
app.get('/home', HomeController.showHome)
conn
    .sync()
    .then(()=>{
        app.listen(PORT)
        console.log(`Servidor ON na porta: ${PORT}`)
    })
    .catch((err) => console.log(err))