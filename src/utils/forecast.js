const request = require('request');
const forecast = (latitude,longitude,callback)=>{
const url ='http://api.weatherstack.com/current?access_key=8dbcc7c8820c0e1c4d5c82e337876193&query='+latitude+','+longitude +'&units=f';
request({url,json:true},(error,{body})=>{
    if(error){
        callback('unable to connect to the location services',undefined);
    }else if(body.error){
        callback('unable to find location. Try another search.',undefined)
    }
    else{
       callback(undefined,body.current.weather_descriptions[0]) 
    } 
})
}

module.exports = forecast;