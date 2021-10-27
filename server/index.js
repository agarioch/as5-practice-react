'use strict';
const Express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/router');

require('dotenv').config();

const app = Express();

app.use(cors({origin: 'http://localhost'}));
app.use(morgan('short'));
app.use('/', router);
async function bootstrap () {
  app.listen(process.env.SERVER_PORT, () => console.log(`🏁 server running on http://localhost:${process.env.SERVER_PORT}`));
}

bootstrap();