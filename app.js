const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const HttpError = require('./models/http-error');
const washPlanRoutes = require('./routes/washplan');

const app = express();
const port = 3005;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/washplan', washPlanRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
