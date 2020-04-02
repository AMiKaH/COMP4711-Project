let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');

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

// parse application/json
app.use(bodyParser.json()) // middleware

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req,res) {
  //res.render('completeRegistration', { pageTitle: 'KB Login/Signup', heading: 'Welcome to People App', finishSigning: true});
  //res.render('home', { pageTitle: 'KB Login/Signup', heading: 'Welcome to People App'});
  res.render('homePage', { pageTitle: 'Homepage', signedIn:true, 
    profile: {
      'firstName' : 'Random',
      'lastName' : 'User',
      'about' : 'A lot of random experience with stuff',
      'imgUrl' : 'https://randomuser.me/api/portraits/lego/6.jpg',
      'postCount' : 5,
      'messageCount' : 10,
      'likesCount' : 20
    }, postList : [{
      'postTitle' : 'Random title',
      'postTopic' : 'php',
      'postDetails': 'some random stuff',
      'date' : '25 oct 2019',
      'repliesCount' : 25,
      'imgUrl' : 'https://randomuser.me/api/portraits/lego/6.jpg'
    },
    {
      'postTitle' : 'Random title2',
      'postTopic' : 'php',
      'postDetails': 'some random stuff some random stuff  some random stuff some random stuff some random stuff some random stuff some random stuff some random stuff  some random stuff some random stuff some random stuff some random stuff  some random stuff some random stuff some random stuff some random stuff some random stuff some random stuff some random stuff some random stuff',
      'date' : '25 oct 2019',
      'repliesCount' : 25,
      'imgUrl' : 'https://randomuser.me/api/portraits/lego/6.jpg'
    },
  ]
  })
});


app.listen(process.env.PORT || 3000, () => console.log('Server ready @ port 3000'))



