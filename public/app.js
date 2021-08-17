console.log('client side javascript')
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('testing!')
    const location = search.value

    message1.textContent = 'Loading....'
    message2.textContent =''
    message3.textContent =''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           message1.textContent = data.error
        }else{
          message1.textContent= data.FORECAST
          message2.textContent =data.AREA
          message3.textContent =JSON.stringify(data.LOCATION)

                                   
        }
    })
})

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
            }
        })
         
    }
const forecast =(latitude, longitude, callback)=>{
 const geourl= 'https://api.openweathermap.org/data/2.5/weather?lat='+ encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid=e302b2274fafba76284cbad602085d96'
     request({url:geourl, json:true},(error,response)=>{
            
        if(error){
            callback('no network',undefined)
        }else if (response.body.error) {
                callback('error in coordinates',undefined)
                } else{
                    callback(undefined,{weather:response.body.weather[0].description,
                                          temperature:response.body.main.temp,
                                          lat: response.body.coord[1] ,
                                          lon: response.body.coord[0],
                                        Location:response.body.name})
                    }})}

fetch('http://localhost:3000/weather?address=boston').then((response)=>{
    response.json().then((data)=>{
         if(data.error){

         }else{
             console.log
         }
    })
})
  



