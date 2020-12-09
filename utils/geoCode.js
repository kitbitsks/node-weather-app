const request = require('request')

const geoLocation = (address,callback) =>{
    const geoLocationUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic291cmF2MjcwNiIsImEiOiJja2kyczRsZG0wODExMnRxczFzZjlkZXBsIn0.HQfNm8seC6JWHXpKCdMkWg&country=US&limit=1'
    // console.log(geoLocationUrl)
    request({url : geoLocationUrl, json: true},(error,{body}={})=>{
        // console.log(body)
        if(error){
            callback("Unable to connect to Location !",undefined)
            }
            else if(body.features.length === 0){
                callback("Not able to find Location ! Try again !", undefined)
            }
            else{
                // console.log(response.body.features[0].center[0])
                const dataJSON = {
                    Latitude : body.features[0].center[0],
                    Longitude : body.features[0].center[1],
                    Location : body.features[0].place_name
                }
                // console.log(dataJSON)
                callback(undefined,dataJSON)
        }
    })
}

module.exports = geoLocation