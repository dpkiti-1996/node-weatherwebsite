
const request = require('request')
const forecast = (longitude, latitude, callback) => {
    console.log('longitude: '+longitude+' latitude: '+latitude)
    const url = 'http://api.weatherstack.com/current?access_key=2df04bac85ef7e147db7e8e4592cd564&query='+longitude+','+latitude
    request({url,  json:true},(error,{body}) => {
       if(error) {
          callback('unable to connect to location forecast', undefined)
       } else if(body.current.length === 0) {
          callback('Unable to find forecast. try another search.', undefined)
       }
       else {
          callback(undefined, {
            temperature: body.current.temperature,
            weather_descriptions: body.current.weather_descriptions[0],
            location:body.location.name
          })
       }
    })
 }
 

 
 module.exports = forecast