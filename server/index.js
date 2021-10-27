'use strict';
const Express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./routes/router');
const db = require('./models/db');

require('dotenv').config();

const app = Express();

app.use(cors({origin: 'http://localhost:3001'}));
app.use(Express.json());
app.use(morgan('short'));
app.use('/', router);
async function bootstrap () {
  app.listen(process.env.SERVER_PORT, () => console.log(`🏁 server running on http://localhost:${process.env.SERVER_PORT}`));
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log('🚀 connected to database');
  } catch (error) {
    console.log('Error, database server failed to authenticate');
    console.error(error);
  }
}

bootstrap();