const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require("http")

const indexRouter = require('./routes/index');
const auth = require('./middlewares/auth');

const app = express();
const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: [ "GET", "POST" ]
    }
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth)



// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', indexRouter);
app.use('/api/dialogflow', require('./routes/dialogflow'));
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './files'
});

app.post('/uploads', multipartMiddleware, (req, res) => {
    res.json({
        'message': 'File uploaded succesfully.',
        'name': req.files.uploads[0].path.split("\\")[1]
    });
});

app.use('/files', express.static('files'));
app.get('/files/:name', async (req, res, next) => {
    const fileName = req.params.name;
    await res.sendFile(fileName,
        {root : __dirname},
        (error)=> console.log(error));

});

io.on("connection", (socket) => {
    socket.emit("me", socket.id)

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })
})


mongoose.connect(
        //'mongodb+srv://haystack:haystack@cluster0.bwzed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        'mongodb+srv://haystack:haystack@haystack.0ialh.mongodb.net/haystack?retryWrites=true&w=majority',
        {useUnifiedTopology: true ,  useNewUrlParser: true }
    )
    .then(result => {
        app.listen(8080);
        console.log("Running on 8080 !")
    })
    .catch(err => console.log(err));
