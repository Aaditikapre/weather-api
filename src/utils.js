const request= require('request')
const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=e302b2274fafba76284cbad602085d96'

const geocode= (address, callback)=>{
    const gurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWFkaXRpLWthcHJlIiwiYSI6ImNrcm95dzVuYzFicWYycm52MzdsOGdjd3QifQ.cCWI9_l1UeX0qfKbfJJjuQ'
      request({url:gurl,json:true},(error,response)=>{
        if(error){
               callback('network error',undefined)
            }else if(response.body.features.length==0){
                   callback('coordinates invalid',undefined)
               }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1] , 
              longitude: response.body.features[0].center[0] ,
              location: response.body.features[0].place_name })
            }})}

module.exports=geocode
const forecast =(latitude, longitude, callback)=>{
    const geourl= 'https://api.openweathermap.org/data/2.5/weather?lat='+ encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid=e302b2274fafba76284cbad602085d96'
    request({url:geourl, json:true},(error,response)=>{
        if(error){
            callback('no network',undefined)
        }else if (response.body.error) {
            callback('error in coordinates',undefined)
            } else{
                callback(undefined,{ id: responseBody.id,
                    })
            }
    })
}
module.exports = forecast