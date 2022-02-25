var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var inicioRouter = require('./routes/inicio');
var loginRouter = require('./routes/loginRouter');
var logoutRouter = require('./routes/logoutRouter');
var cadastrarPropostaRouter = require('./routes/cadastrarPropostaRouter');
var cadastrarServicoRouter = require('./routes/cadastrarServicoRouter');
var cadastrarUsuarioRouter = require('./routes/cadastrarUsuarioRouter')
var faleconoscoRouter      = require('./routes/faleconoscoRouter');
var auth = require('./middlewares/auth')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'fullstack_freelancer_ja',
  /*resave: true,*/
  saveUninitialized: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/cadastro', cadastrarUsuarioRouter)
app.use('/faleconosco', faleconoscoRouter)
app.use(auth);
app.use('/sair', logoutRouter);
app.use('/inicio', inicioRouter);
app.use('/proposta', cadastrarPropostaRouter);
app.use('/servico', cadastrarServicoRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: 'Página não encontrada!', loginCadastroUsuario: '', linkLogin: ''});
});

module.exports = app;