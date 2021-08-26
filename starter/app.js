'use strict';
// sudo lsof -i :3000

const express = require('express');
const morgan = require('morgan');
const { response } = require('express');

/* -------------------------------------------------------------------------- */
//*                              Imported routes                              */
/* -------------------------------------------------------------------------- */
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//

/* -------------------------------------------------------------------------- */
//*                             Create the server                             */
/* -------------------------------------------------------------------------- */
const app = express();

//

/* -------------------------------------------------------------------------- */
//*                            Creating middleware                            */
/* -------------------------------------------------------------------------- */
app.use(morgan('dev'));
app.use(express.json());

//

/* -------------------------------------------------------------------------- */
//*                                 Mounting                                  */
/* -------------------------------------------------------------------------- */
//  Note that .use() method acept as parameter were the middleware is suposed
// to manage the response and request.
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

//
