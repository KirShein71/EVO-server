import express from 'express'
import sequelize from './sequelize.js'
import * as mapping from './models/mapping.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import router from './routes/index.js'
import bodyParser from 'body-parser'
import errorMiddleware from './middleware/ErrorHandler.js'

const PORT = process.env.PORT || 5000

const app = express()
// Cross-Origin Resource Sharing
app.use(cors({origin: [ 'http://localhost:3000', 'https://www.savaks.ru', 'https://savaks.ru', 'http://www.savaks.ru', 'http://savaks.ru'], credentials: true}))
// middleware для работы с json
app.use(express.json())
// middleware для статики (img, css)
app.use(express.static('static'))
// middleware для загрузки файлов
app.use(fileUpload())
// middleware для работы с cookie
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY))
// все маршруты приложения
app.use('/api', router)
// обработка ошибок
app.use(errorMiddleware)

const allowedOrigins = [
    'http://localhost:3000',
    'https://www.savaks.ru',
    'https://savaks.ru',
    'http://www.savaks.ru',
    'http://savaks.ru'
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

  

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Сервер запущен на порту', PORT))
    } catch(e) {
        console.log(e)
    }
}

start()