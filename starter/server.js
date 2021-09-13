'use strict';
/* -------------------------------------------------------------------------- */
/*                              Importing section                             */
/* -------------------------------------------------------------------------- */

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app.js');

/* -------------------------------------------------------------------------- */
//*                                 MONGO DB                                  */
/* -------------------------------------------------------------------------- */

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log('MongoDB connection succesful');
    });

//

/* -------------------------------------------------------------------------- */
//*               Start a server listening to an specific port                */
/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('App running on port: ' + PORT);
});
