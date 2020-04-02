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
  //res.render('editProfile', { pageTitle: 'Edit Profile', heading: 'Welcome to People App' , signedIn:true});
  //res.render('visitProfile', { pageTitle: 'Viewing Profile', heading: 'Welcome to People App' , signedIn:true});


  res.render('visitProfile', { pageTitle: 'Viewing Profile', signedIn:true, 
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
      'repliesCount' : 15,
      'imgUrl' : 'https://randomuser.me/api/portraits/lego/7.jpg',
      'replies' : [
        {
          'imgUrl' : 'https://randomuser.me/api/portraits/lego/1.jpg',
          'replyText' : 'Here\'s a reply'
        },
        {
          'imgUrl' : 'https://randomuser.me/api/portraits/lego/3.jpg',
          'replyText' : 'Here\'s MORE!!'
        }
      ]
    },
    {
      'postTitle' : 'Random title2',
      'postTopic' : 'php',
      'postDetails': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pellentesque vel quam a pretium. Suspendisse aliquet nisi sed fringilla ornare. Proin sed augue mi. Integer vel arcu diam. Nulla blandit gravida elit, vel pretium sem euismod sed. Curabitur iaculis massa augue, non maximus risus maximus eget. Nulla porta magna auctor, venenatis ante id, rhoncus ante. Vestibulum in leo eu ligula semper varius. Phasellus neque neque, auctor non tincidunt ac, fringilla molestie augue. Suspendisse ac libero gravida, cursus neque eu, mollis purus. Suspendisse non purus tortor. Pellentesque nibh massa, sollicitudin id finibus ut, faucibus a neque. Nam vitae mollis risus. Fusce.',
      'date' : '25 oct 2019',
      'repliesCount' : 25,
      'imgUrl' : 'https://randomuser.me/api/portraits/lego/5.jpg',
      'replies' : [
        {
          'imgUrl' : 'https://randomuser.me/api/portraits/lego/2.jpg',
          'replyText' : 'Here\'s a reply'
        },
        {
          'imgUrl' : 'https://randomuser.me/api/portraits/lego/4.jpg',
          'replyText' : 'Here\'s MORE!!'
        }
      ]
    },
  ]
  })

});


app.listen(process.env.PORT || 3000, () => console.log('Server ready @ port 3000'))



