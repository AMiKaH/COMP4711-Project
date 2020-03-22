let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');


app.listen(process.env.PORT || 3000, () => console.log('Server ready @ port 3000'))



