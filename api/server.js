require('dotenv').config();
const seedUsers = require('./seeds/users-seeder');
const mongoose = require('mongoose');
const jwt = require('jwt-then');
const User = mongoose.model('User');

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    
});

mongoose.connection.on('error', (err) => {
    console.log("Mongoose Connection ERROR: " + err.message)
});


mongoose.connection.once('open', () => {
    User.remove(() => {
        console.log("Users removed!!");
    })
    console.log("MongoDB Connected!")
    seedUsers();
});

require('./models/User')

const app = require("./app");

const server = app.listen(8000, () => {
    console.log("Server listening on port 8000");
});

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id;
        next();
    } catch (err) {}
});

io.on('connection', (socket) => {
    console.log('Connected: ' + socket.userId);
    
    socket.on('disconnect', () => {
        console.log('Disconnected: ' + socket.userId);
    })
})