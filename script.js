// Write your JavaScript code here!

window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {

      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      
      let letters = /^[A-Za-z\s]+$/;
         
      if (pilotName.value === "" || copilotName.value === ""||fuelLevel.value===""||cargoMass.value==="") {
         alert("All fields are required!");
         // stop the form submission
         event.preventDefault();
      }else if(!pilotName.value.match(letters)  || !copilotName.value.match(letters) ||isNaN(fuelLevel.value)||
         isNaN(cargoMass.value))  { 
         
         alert("Make sure to enter valid information for each field");
         event.preventDefault();
      } else{
         if(fuelLevel.value < 10000){
            faultyItems(pilotName.value,copilotName.value);
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
         } else if(cargoMass.value > 10000){
            faultyItems(pilotName.value,copilotName.value);
            document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch"
         }else{
            document.getElementById("launchStatus").innerHTML = "Shuttle ready for launch";
            document.getElementById("launchStatus").style.color = "green";
         }
      }
   });

   let json = [];
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
       response.json().then(function(json) {
          console.log(json);
          let missionTarget = document.getElementById("missionTarget");
          
          const target = Math.floor(Math.random() * json.length);
          console.log(target);
          for(let i=0; i<json.length;i++){
            if(i === target){
               missionTarget.innerHTML += `<h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[i].name}</li>
                  <li>Diameter: ${json[i].diameter}</li>
                  <li>Star: ${json[i].star}</li>
                  <li>Distance from Earth: ${json[i].distance}</li>
                  <li>Number of Moons: ${json[i].moons}</li>
               </ol>
               <img src="${json[i].image}">`;
            }
          }
          
       });
      });
     
      
});

function faultyItems(pilotName,copilotName){
   document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
   document.getElementById("launchStatus").style.color = "red";
   document.getElementById("faultyItems").style.visibility ="visible";
   document.getElementById("pilotStatus").innerHTML = `${pilotName} is ready for launch`;
   document.getElementById("copilotStatus").innerHTML=`${copilotName} is ready for launch`;
}
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
