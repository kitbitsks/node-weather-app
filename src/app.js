const path = require('path')
const express = require('express')
var hbs = require('hbs')
const geoLocation = require('../utils/geoCode')
const foreCast = require('../utils/foreCast')
const { brotliDecompressSync } = require('zlib')

const app = express()

// path definition
const pathForViews = path.join(__dirname,'../templates/views')
const publicFolderPath = path.join(__dirname,'../public')
const pathForPartials = path.join(__dirname,'../templates/partials')
hbs.registerPartials(pathForPartials)

app.use(express.static(publicFolderPath))

// setting view engine and views
app.set('view engine', 'hbs');
app.set('views', pathForViews)


app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Sourav Kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : "About Us",
        name : 'Sourav Kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        name : 'Sourav Kumar'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error : 'Address is missing !'
        })
    }
// call geoCode, foreCastCode to get longitudes and latitudes and foreCast data
    geoLocation(req.query.address,(error,{Latitude,Longitude,Location} = {}) =>{
        if (error){
            return res.send({error})
        }

        foreCast(Longitude,Latitude,(error,foreCastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                'forecast' : foreCastData,
                'location': Location,
                'address': req.query.address
            })
        })
    })
})

app.get('/products', (req,res) =>{

    console.log(req.query)
    res.send({
        products : []
    })
})
app.get('/help/*', (req,res)=>{
    res.render('error',{
        error_code : 404,
        error_message: 'Help Article not found !'
    })
})

app.get('*', (req,res)=>{
    res.render('error',{
        error_code : 404,
        error_message : "Page NOT Found"
    })
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000.")
})
