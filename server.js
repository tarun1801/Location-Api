
const express = require('express');
const app = express();
const axios = require('axios')
let ar = [];
let result = {};

app.get('/location',(req,res)=>{
    
  
    const lat1 = req.query.lat1;
    const long1 = req.query.long1 ;
    const lat2 = req.query.lat2;
    const long2 = req.query.long2 ;
    
    axios({
        method : "GET",
        url:`https://api.mapbox.com/directions/v5/mapbox/driving/${long1},${lat1};${long2},${lat2}?steps=true&voice_instructions=true&banner_instructions=true&voice_units=imperial&waypoint_names=Home;Work&access_token=pk.eyJ1IjoidGFydW4tMTgwMSIsImEiOiJja3FpdzZzdXcwMWNuMnFwaGZucHZqMmxwIn0.YSYoTUJkW6ppiRO16-RxIA`,
       
    }).then(response  => {

        setOrigin(lat1,long1);
        setDestination(lat2,long2);
        setDuration(response);
        setDistance(response);
        setDirections(response);
        setGoogleMap(lat1,long1,lat2,long2);
        res.json(result)
     console.log(response.data)
    }).catch(e =>{
        console.log("Error",e)
           
    })
})


function setOrigin(lat1,long1){
    return result.from = {latitude :lat1 ,longitude : long1};

}
function setDestination(lat2,long2)
{
    result.to = {latitude :lat2 ,longitude : long2};
}
function setDuration(response)
{
    let s = parseInt(response.data.routes[0].duration);
    let min = Math.floor(s/60);
    let hrs =Math.floor(min/60);
     
    result.duration = hrs + " H "+ min+ " min "
}
function setDistance(response){
    result.distance = parseInt(response.data.routes[0].distance)/1000+" km"
}
function setDirections(response){
    
    let directions =  response.data.routes[0].legs[0].steps
 

    for(var i = 0 ; i < directions.length ; i++)
    {
        ar.push(directions[i].voiceInstructions)
    }
  
   
    result.directions = ar;

}
function setGoogleMap(lat1,long1,lat2,long2)
{
    result.gDirections = `https://www.google.com/maps/dir/${lat1},${long1}/${lat2},${long2}/`
}
function fetchData(lat1,long1,lat1,long2)
{
    
}




app.listen(3000,()=>{
    console.log("Server is set to listen at the port 3000");
})