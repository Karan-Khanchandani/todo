const express = require('express'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
    res.send(
      [{
        title: "Hello World!",
        description: "Hi there! How are you?"
      }]
    )
  })

app.listen(process.env.PORT || 8081);