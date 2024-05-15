var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose =  require('mongoose')
var cors = require("cors")
var helmet = require('helmet');
var morgan = require('morgan');
var fs = require('fs');


require('./controller/users/UserModel')
require('./controller/products/ProductModel')
require('./controller/categories/CategryModel')
require('./controller/orders/OrderHistoryModel')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter =  require('./routes/products');
var categoriesRouter = require('./routes/categories');
var ordersRouter =  require('./routes/orders');
var compression = require('compression');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const accessLogStream = fs.createReadStream(path.join(__dirname, 'access.log') , { flags :  'a' })


app.use(morgan("combined", { stream: accessLogStream}))
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.yvx6v8f.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=> {console.log('connected to mongodb')})
.catch((err)=> {console.log('connect err... ', err.message)})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter)

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
