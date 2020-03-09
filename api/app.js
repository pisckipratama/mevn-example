const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT =  process.env.PORT || 4000;
const app = express();
const mongoose = require('mongoose');
const config = require('./DB');

const indexRoute = require('./post.route')

mongoose.Promise = global.Promise
mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected')
}).catch(err => {
  console.error(err)
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/posts', indexRoute);

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`)
})