const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode') 
const forecast = require('./utils/forecast') 



console.log(__dirname)


console.log(path.join(__dirname,'../public'))
const app = express()

//define paths for express config
//rendering the html page to the root url
const publicDir = path.join(__dirname,'../public')

//setup handlebars engine andviews location tonew directory
const viewspath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views', viewspath)
//using hbs(handlebars) setup
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//setup statis directory to serve
app.use(express.static(publicDir))

//base url request
app.get('', (req, res) => {
    //to  send
    //res.send('hello express')

    //to render handlebars
    //render(hbs file, rendering values)
    res.render('index',{
        title:'weather app',
        name: 'Deepak Yadav'
    })
})

app.get('/help', (req, res) => {
    //will automatically parse
    // res.send({
    //     name: 'deepak',
    //     age: 25
    // })
    res.render('help', {
        helpText: 'this is some helpful text.',
        title:'Help',
        name:'Deepak Yadav'
    })
})

app.get('/about', (req, res) => {
    //res.send('<h1>about express</h1?')
    res.render('about',{
        title:'About',
        name:'Deepak Yadav',
        helpText: 'this is some about text.',
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error:'Plz provide location'
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData.weather_descriptions,
                temperature:forecastData.temperature,
                location:forecastData.location,
                address: req.query.address
            })
        })
    })
    
})


app.get('/help/*', (req,res) => {
    res.render('error',{
        title:'Help Article not Found',
        name:'Deepak Yadav',
    })
})

//if the url is not defined, always defined in the last
app.get('*', (req,res) => {
    res.render('error',{
        title:'Page not Found',
        name:'Deepak Yadav',
    })
})


//running or starting the server up,  one time job
app.listen(3000, () => {
    //runs when the server is up
    console.log('Server is up on port 3000')

})