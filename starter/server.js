const app = require('./app.js');

// - - - - - - - - - - - - - - - - - - -
// Start a server listening to an specific port
const PORT = 3000;
app.listen(PORT, () => {
    console.log('App running on port: ' + PORT);
});
