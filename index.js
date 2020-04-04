let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./db/db');

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


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let routes = require('./routes/routes');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req,res) {
  //res.render('completeRegistration', { pageTitle: 'KB Login/Signup', heading: 'Welcome to People App', finishSigning: true});
  //res.render('home', { pageTitle: 'KB Login/Signup', heading: 'Welcome to People App'});
  //res.render('editProfile', { pageTitle: 'Edit Profile', heading: 'Welcome to People App' , signedIn:true});
  //res.render('visitProfile', { pageTitle: 'Viewing Profile', heading: 'Welcome to People App' , signedIn:true});
  //res.render('messageUser', { pageTitle: 'Viewing Profile', heading: 'Welcome to People App' , signedIn:true});
  //res.render('homePage', { pageTitle: 'Viewing Profile', heading: 'Welcome to People App' , signedIn:true});

});

app.use(routes)

app.listen(process.env.PORT || 3000, () => console.log('Server ready @ port 3000'))



