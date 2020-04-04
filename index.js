let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./db/db');
var cookieParser = require('cookie-parser');
const expressHbs = require('express-handlebars');

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

var hbs = expressHbs.create({});

// register new function to compare numbers
hbs.handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 == v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.handlebars.registerHelper('ifCond2', function(v1, v2, options) {
  if(v1 != v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware


app.use(cookieParser());

// parse application/json
app.use(bodyParser.json()) // middleware

let routes = require('./routes/routes');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req,res) {

  if(req.cookies.signedIn === "true" && req.cookies.userid !== undefined){
    res.redirect(301,'/homepage')
  } else {
    res.render('home', { pageTitle: 'KB Login/Signup', heading: 'Welcome to People App'});
  }
});

app.use(routes)

app.listen(process.env.PORT || 3000, () => console.log('Server ready @ port 3000'))



