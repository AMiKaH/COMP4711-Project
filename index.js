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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware


app.use(cookieParser());

// parse application/json
app.use(bodyParser.json()) // middleware

let routes = require('./routes/routes');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req,res) {
  res.render('home', { pageTitle: 'KB Login/Signup', heading: 'Welcome to People App'});
});

app.use(routes)

app.listen(process.env.PORT || 3000, () => console.log('Server ready @ port 3000'))



