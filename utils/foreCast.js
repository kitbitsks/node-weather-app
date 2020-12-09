const request = require('request')

const forecast = (latitude,longitude,callBack) =>{
    const endpointForecast = 'http://api.weatherstack.com/current?access_key=fa7de635c8bc5e386f961acf63120ace&query='+latitude+','+longitude+'&units=f'
    request({url : endpointForecast, json : true}, (error,{body}={})=>{
        // console.log(response.body)
        if(error){
            console.log("Unable to connect to weather service !",undefined)
        }
        else if(body.error){
            callBack("unable to trace location !",undefined)
        }
        else{
                const currentWeather = body.current
                callBack(undefined,currentWeather.weather_descriptions[0]+", Temperature is "+ currentWeather.temperature+" degree Celcius. \nIt feels like "+currentWeather.feelslike+" degree Celcius")
            }
    })
}

module.exports = forecast