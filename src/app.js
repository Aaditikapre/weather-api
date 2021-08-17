const path = require('path')
const request= require('request')
const express= require('express')
const app = express()
const port = process.env.PORT || 3000

console.log(__filename)
console.log(path.join(__dirname,'../public'))
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req, res)=>{
 res.send('hello')
})
app.get('/signup',(req,res)=>{
    res.send('signup')
})
app.get('/about',(req,res)=>{
    res.send('about')
})

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

const forecast =(latitude, longitude, callback)=>{
    const geourl= 'https://api.openweathermap.org/data/2.5/weather?lat='+ encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid=e302b2274fafba76284cbad602085d96'
    request({url:geourl, json:true},(error,response)=>{
        if(error){
            callback('no network',undefined)
        }else if (response.body.error) {
            callback('error in coordinates',undefined)
            } else{
                callback(undefined,{ weather:response.body.weather[0].description,
                    temperature:response.body.main.temp,
                    coordinates: response.body.coord ,
                  Location:response.body.name
                    })
            }
    })
}
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({error:'error, provide an address'})
    }const place = req.query.address
    geocode(place,(error,{latitude,longitude,location})=>{
        forecast(latitude,longitude,(error,{weather,temperature,coordinates,Location})=>{
               if(error) {
                   return res.send('error')
               }
               res.send({
                   FORECAST:'weather is  '+ weather+ '  with temperature  ' +  temperature,
                   LOCATION: coordinates ,
                   AREA: location
                   
                   
               }) 
        })
 })
  

    
       
})

app.listen(port, ()=> {
    console.log('server is up on port 3000')
})