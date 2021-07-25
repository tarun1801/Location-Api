
const express = require('express');
const app = express();
const axios = require('axios')
let ar = [];


app.get('/location',(req,res)=>{
    
  
    const lat1 = req.query.lat1;
    const long1 = req.query.long1 ;
    const lat2 = req.query.lat2;
    const long2 = req.query.long2 ;
    let result = {};
    // result.lat1 = lat1;
    // result.long1 = long1 ;
    // result.lat2 = lat2 ;
    // result.long2 = long2 ; 
    console.log(lat1,long1 ,lat2 , long2)
    axios({
        method : "GET",
        url:`https://api.mapbox.com/directions/v5/mapbox/driving/${long1},${lat1};${long2},${lat2}?steps=true&voice_instructions=true&banner_instructions=true&voice_units=imperial&waypoint_names=Home;Work&access_token=pk.eyJ1IjoidGFydW4tMTgwMSIsImEiOiJja3FpdzZzdXcwMWNuMnFwaGZucHZqMmxwIn0.YSYoTUJkW6ppiRO16-RxIA`,
       
    }).then(response  => {

        result.from = {latitude :lat1 ,longitude : long1};
        result.to = {latitude :lat2 ,longitude : long2};
        result.duration = response.data.routes[0].duration+" s"
        result.distance = response.data.routes[0].distance+" m"

        let directions =  response.data.routes[0].legs[0].steps
        //console.log("Directions from response",directions)

        for(var i = 0 ; i < directions.length ; i++)
        {
            ar.push(directions[i].voiceInstructions)
        }
        //console.log("Direction array",ar)
        result.directions = ar;
        res.json(result)
     console.log(response.data)
    }).catch(e =>{
        console.log("Error",e)
           
    })

   
     
  

})






app.listen(3000,()=>{
    console.log("Server is set to listen at the port 3000");
})