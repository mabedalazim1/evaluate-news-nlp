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

// Const Api var
const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
console.log(apiKey)
let inputData = ['https://github.com/mabedalazim1/evaluate-news-nlp']

app.get('/',  (req, res)=> {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test',  (req, res)=> {
    res.send(mockAPIResponse)
})

//Post Api
app.post('/api', async (res, req) => {
    //inputData = req.body.url
    console.log(`You entered: ${inputData}`)
    const nlpApiURL = `${baseUrl}key=${apiKey}&url=${inputData}&lang=en`
    const response = await fetch(nlpApiURL)
    const data = await response.json()
    console.log(data)
    res.send(data)
})

// designates what port the app will listen to for incoming requests
app.listen(8082,  () => {
    console.log('Example app listening on port 8082!')
})