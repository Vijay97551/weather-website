const path = require('path')
const express  = require('express');
const app = express();
const hbs = require('hbs')
const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');
// Define paths for expess config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views') 
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location for provinding dynamic content
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        titles:"Weather",
        name:"vijay sethiya"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        titles:'About Me',
        name:"vijay sethiya"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:"I will be there for your help",
        titles:'help',
        name:"vijay sethiya"
    })
})
app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!req.query.address)
    {
        return res.send({
            error:"you must provide a search term"
        })
    }
    geocode(address,(error,{latitude,longitude,location}={}) =>{
        if(error)
        {
          return res.send({error:"Unable to find location data please provide correct address"})
        }
        forecast(latitude, longitude, (error, forecastData) => {
        if(error)
        {
          return res.send("unable")
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address

        })
        })
    })
})

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:"you must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

//app.com
//app.com/help
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        message:'Help article not found',
        titles:'404',
        name:"vijay sethiya"
    })
})
app.get('*',(req,res)=>{
    res.render('404page',{
        message:'page not found',
        titles:'404',
        name:"vijay sethiya"
    })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})
