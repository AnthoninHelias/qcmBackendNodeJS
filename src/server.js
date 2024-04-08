const router = require('express').Router();
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./middleware/swagger-output.json')
const express = require('express')
const cors = require('cors');
const app = express()
const dotenv = require('dotenv'); 
const client = require('../src/db/db-connection.js')
const questionRoute = require('../src/routes/questions.route.js')
const responseRoute = require('../src/routes/reponses.route.js')

dotenv.config();

app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.json()); //format json
app.set('json spaces', 2);


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/questions', questionRoute)
app.use('/reponse', responseRoute)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port http://localhost:8000/doc')
})
module.exports = app;