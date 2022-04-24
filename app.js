var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');

var inicioRouter = require('./routes/inicioRouter');
var loginRouter = require('./routes/loginRouter');
var logoutRouter = require('./routes/logoutRouter');
var propostaRouter = require('./routes/propostaRouter');
var cadastrarServicoRouter = require('./routes/cadastrarServicoRouter');
var cadastrarUsuarioRouter = require('./routes/cadastrarUsuarioRouter')
var faleconoscoRouter = require('./routes/faleconoscoRouter');
var adminRouter = require('./routes/adminRouter');

var errorRouter = require('./routes/erroRouter')

var auth = require('./middlewares/auth')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'fullstack_freelancer_ja',
  resave: true,
  saveUninitialized: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', loginRouter);
app.use('/admin', adminRouter);
app.use('/cadastro', cadastrarUsuarioRouter)
app.use('/faleconosco', faleconoscoRouter)
app.use(auth);
app.use('/sair', logoutRouter);
app.use('/inicio', inicioRouter);
app.use('/proposta', propostaRouter);
app.use('/servico', cadastrarServicoRouter);


app.use('/', errorRouter)

module.exports = app;