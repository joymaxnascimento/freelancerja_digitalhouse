var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');

var           inicioRouter  = require('./routes/inicio');
var         raizRouter      = require('./routes/raiz')
var        freelancerRouter = require('./routes/freelancer');
var           clienteRouter = require('./routes/cliente');
var             loginRouter = require('./routes/login');
var   cadastrarPessoaRouter = require('./routes/cadastrarPessoaRouter');
var cadastrarPropostaRouter = require('./routes/cadastrarPropostaRouter');
var      propParaVoceRouter = require('./routes/propParaVoce');
var      propostaaceitaRouter = require('./routes/propostaaceita');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));   

app.use(                '/',              raizRouter);  /* meramente temporária */
//app.use(    '/propParaVoce',      propParaVoceRouter);
app.use(          '/inicio',            inicioRouter);
app.use(      '/freelancer',        freelancerRouter);
app.use(         '/cliente',           clienteRouter);
app.use(           '/login',             loginRouter);
app.use( '/cadastrarPessoa',   cadastrarPessoaRouter);
app.use(        '/proposta', cadastrarPropostaRouter);
//app.use(        '/propostaaceita', propostaaceitaRouter);


app.get( '/propostaaceita', (req,res)=>res.render('propostaaceita',{title: "Proposta Aceita!"}));
app.get( '/pagamento', (req,res)=>res.render('pagamento',{title: "pagamento"}));
app.get(    '/propParaVoce', (req,res)=>res.render('propParaVoce',{title: "Proposta Para Voce"}));
app.get(    '/propostarecusada', (req,res)=>res.render('propostarecusada',{title: "propostarecusada"}));
app.get(    '/servicocriado', (req,res)=>res.render('servicocriado',{title: "servicocriado"}));
app.get(    '/cadastrocriado', (req,res)=>res.render('cadastrocriado',{title: "Cadastro criado com sucesso"}));
app.get(    '/propostacriada', (req,res)=>res.render('propostacriada',{title: "propostacriada"}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
