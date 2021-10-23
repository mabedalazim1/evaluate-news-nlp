var path = require('path')
const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const bodyParser = require('body-parser')
const mockAPIResponse = require('./mockAPI.js')

const app = express()
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


app.use(express.static('dist'))

console.log(__dirname)

app.get('/',  (req, res)=> {
     res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test',  (req, res)=> {
    res.send(mockAPIResponse)
})

// Const Api Vars
const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
let inputData = ['']

//Post Api
app.post('/api', async (req, res) => {
    inputData = req.body.url
    const nlpApiURL = `${baseUrl}key=${apiKey}&url=${inputData}&lang=auto`
    const response = await fetch(nlpApiURL)
    try {
        const data = await response.json()
            res.send(data)
            console.log(data)
    }
    catch (err){
        console.log("Error", err);
    }
})

// designates what port the app will listen to for incoming requests
app.listen(8081,  () => {
    console.log('Example app listening on port 8081!')
})