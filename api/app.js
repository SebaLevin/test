const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', require('./routes/user'));
app.use('/dashboard', require('./routes/dashboard'));

const erroHandlers = require('./handlers/errorHandlers');
app.use(erroHandlers.notFound);
app.use(erroHandlers.mongoseErrors);
if(process.env.ENV === 'DEVELOPMENT') {
    app.use(erroHandlers.developmentErrors)
}else {
    app.use(erroHandlers.productionErrors)
}

module.exports = app;