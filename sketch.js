//##################################################//
//               Karl Hendrik Holst                 //
//          Final Project in GEOG-581 @ SDSU        //
//##################################################//


//Create upper map canvas and add elements to it
var sketch = function(mapCanvas) {
  
  //mapCanvas.mapMin = ""; //Crime stat maximum on the map during selected year
  //mapCanvas.mapMax = ""; //Crime stat minimum on the map during selected year
  //mapCanvas.selectState = ""; //Selected state on the map
  const numberOfStates = 51;
  let runTimeLapse = false;
  let timeLapseStart;
  let startImg;
  let pauseImg;

  //Load crime dataset
  mapCanvas.preload = function() {
    crimes = loadTable("data/CrimeByState.csv", "csv", "header");
  }

  
  mapCanvas.setup = function() {
    canvas = mapCanvas.createCanvas(900, 400);
    mapCanvas.background(0);
    canvas.position(0, 380);
    
    //CREATE CRIME TYPE BUTTONS AND ATTACH FUNCTIONS TO THEM
    totalCrime = mapCanvas.createButton("Total crime");
    totalCrime.position(20, 395);
    totalCrime.size(120);
    totalCrime.mousePressed(() => crime = "Index offense rate");

    murder = mapCanvas.createButton("Murder");
    murder.position(100, 445);
    murder.size(120);
    murder.mousePressed(() => crime = "Murder and nonnegligent manslaughter rate");

    rape = mapCanvas.createButton("Rape");
    rape.position(170, 395);
    rape.size(120);
    rape.mousePressed(() => crime = "Forcible rape rate");

    robbery = mapCanvas.createButton("Robbery");
    robbery.position(250, 445);
    robbery.size(120);
    robbery.mousePressed(() => crime = "Robbery rate");

    assault = mapCanvas.createButton("Assault");
    assault.position(320, 395);
    assault.size(120);
    assault.mousePressed(() => crime = "Aggravated assault rate");

    propertyCrime = mapCanvas.createButton("Property crime");
    propertyCrime.position(400, 445);
    propertyCrime.size(120);
    propertyCrime.mousePressed(() => crime = "Property crime rate");

    burglary = mapCanvas.createButton("Burglary");
    burglary.position(470, 395);
    burglary.size(120);
    burglary.mousePressed(() => crime = "Burglary rate");
    
    larcenyTheft = mapCanvas.createButton("Larceny-theft");
    larcenyTheft.position(550, 445);
    larcenyTheft.size(120);
    larcenyTheft.mousePressed(() => crime = "Larceny-theft rate");

    vehicleTheft = mapCanvas.createButton("Vehicle theft");
    vehicleTheft.position(620, 395);
    vehicleTheft.size(120);
    vehicleTheft.mousePressed(() => crime = "Motor vehicle theft rate");

    
    //Slider for changing the year
    timeLine = mapCanvas.createSlider(1960, 2014, 2014);
    timeLine.position(65, 725);
    timeLine.size(637);
  }
  

  mapCanvas.draw = function() {
    mapCanvas.mapMin = 100000000; //Initialize crime stat maximum on the graph
    mapCanvas.mapMax = 0; //Initialize crime stat minimum on the graph
    let rowCount = crimes.getRowCount(); //Total entries in crime dataset
    mapCanvas.crimeByYear = []; //Array of selected state and crime values each year (for the graph)


    for (let i = selectedStateIndex; i < rowCount; i+=numberOfStates) {
      const crimeInYear = crimes.getNum(i, crime);
      mapCanvas.crimeByYear.push(crimeInYear);
          
      if (crimeInYear > mapCanvas.mapMax){
        mapCanvas.mapMax = crimeInYear;
      }
      if (crimeInYear < mapCanvas.mapMin){
        mapCanvas.mapMin = crimeInYear;
      }
    }

    mapCanvas.background(0)

    //Draw year lines for graph
    for (let i = 0; i <= 54; i++) {
      const x = map(i, 0, 54, 70, 700);
      mapCanvas.stroke(180, 180, 180, 100);
      mapCanvas.strokeWeight(1)
      mapCanvas.line(x, 150, x, 350);
    }

    //Draw text and data on the graph
    mapCanvas.fill(255, 165, 0, 100);
    mapCanvas.textAlign(RIGHT);
    mapCanvas.textSize(17);
    mapCanvas.textFont("times new roman");
    mapCanvas.stroke(255, 165, 0, 50);
    mapCanvas.strokeWeight(2);
    mapCanvas.text(mapCanvas.mapMin, 60, 358);
    mapCanvas.text(mapCanvas.mapMax, 60, 155);
    mapCanvas.text("1960", 85, 385);
    mapCanvas.text("2014", 717, 385);
    mapCanvas.stroke(255, 165, 0, 75);
    mapCanvas.textSize(30);
    mapCanvas.textAlign(CENTER);
    mapCanvas.text(selectedState.toUpperCase().split('').join('   '), 390, 388);
    
    mapCanvas.textSize(60)
    mapCanvas.text(selectedYear.toString().split('').join(' '), 805, 120)
    mapCanvas.strokeWeight(1)
    mapCanvas.textSize(32)
    if (crime == "Murder and nonnegligent manslaughter rate") {
      mapCanvas.text("Murder and manslaughter rate".split('').join(' '), 385, 136)
    }else{
      mapCanvas.text(crime.split('').join(' '), 385, 136)
    }

    //Legend colours
    mapCanvas.stroke(217, 146, 0)
    mapCanvas.fill(0, 153, 149, 100)
    mapCanvas.ellipse(740, 182, 45, 25)
    mapCanvas.fill(0, 114, 111, 100)
    mapCanvas.ellipse(740, 219, 45, 25)
    mapCanvas.fill(0, 77, 75, 100)
    mapCanvas.ellipse(740, 256, 45, 25)
    mapCanvas.fill(0, 47, 45, 100)
    mapCanvas.ellipse(740, 293, 45, 25)
    mapCanvas.fill(0)
    mapCanvas.ellipse(740, 330, 45, 25)
    mapCanvas.textAlign(LEFT)
    mapCanvas.textSize(20)
    mapCanvas.strokeWeight(2)
    mapCanvas.stroke(255, 165, 0, 75)
    mapCanvas.fill(217, 146, 0, 100)

    //Legend class ranges' text
    mapCanvas.text(Number(Math.floor(statesMin)) + "   -   " + Number(Math.floor(break1)), 770, 189)
    mapCanvas.text(Number(Math.floor(break1)) + "   -   " + Number(Math.floor(break2)), 770, 225)
    mapCanvas.text(Number(Math.floor(break2)) + "   -   "   + Number(Math.floor(break3)), 770, 262)
    mapCanvas.text(Number(Math.floor(break3)) + "   -   " + Number(Math.floor(statesMax)), 770, 299)
    mapCanvas.text("No Data", 770, 336)
    
    //Draw selected crime on the graph as area
    mapCanvas.fill(255, 165, 0, 100);
    mapCanvas.stroke(0, 76, 74, 150);
    mapCanvas.strokeWeight(5);
    mapCanvas.beginShape();

    for (let i = 0; i < mapCanvas.crimeByYear.length; i++) {
      const x = map(i, 0, mapCanvas.crimeByYear.length - 1, 70, 700);
      const y = map(mapCanvas.crimeByYear[i], mapCanvas.mapMin, mapCanvas.mapMax, 350, 150);
      mapCanvas.vertex(x, y);
    }

    //Finish shape along axis
    mapCanvas.vertex(700, 350)
    mapCanvas.vertex(70, 350)
    mapCanvas.endShape();

    //Y axis on the graph
    mapCanvas.strokeWeight(5)
    mapCanvas.stroke(217, 146, 0, 150)
    mapCanvas.line (70, 350, 70, 150)

    //Timelapse
    if (selectedYear != 2014) {
      if (runTimeLapse) {
        if (dist(mapCanvas.mouseX, mapCanvas.mouseY, 385, 315) < 25) {
          mapCanvas.drawTimeLapseButton(true, true);
        } else {
          mapCanvas.drawTimeLapseButton(true, false);
        }

        let timeLapseElapsed = millis() - timeLapseStart;
        
        if (timeLapseElapsed > 250) {
          selectedYear++;
          timeLapseStart = millis();
        }
        timeLine.value(selectedYear);
        if (selectedYear >= 2014) {
          runTimeLapse = false;
        }
      } else {
        if (dist(mapCanvas.mouseX, mapCanvas.mouseY, 385, 315) < 25) {
          mapCanvas.drawTimeLapseButton(false, true);
        } else {
          mapCanvas.drawTimeLapseButton(false, false);
        }
      }
    }
  }

  mapCanvas.drawTimeLapseButton = function(playing, hover) {
    //If not hovering over button
    mapCanvas.stroke(0, 0, 0);
    mapCanvas.fill(0, 0, 0, 100);
    mapCanvas.strokeWeight(3);
    //If hovering
    if (hover) {
      mapCanvas.stroke(255, 255, 255);
      mapCanvas.fill(0, 0, 0, 100);
    }

    mapCanvas.ellipse(385, 315, 50)
    if (!playing) { //If timelapse is currently r
      mapCanvas.beginShape();
      mapCanvas.vertex(375, 300);
      mapCanvas.vertex(375, 330);
      mapCanvas.vertex(402, 315);
      mapCanvas.vertex(375, 300);
      mapCanvas.endShape();
    } else {
      mapCanvas.strokeWeight(5)
      mapCanvas.line(380, 303, 380, 327);
      mapCanvas.line(390, 303, 390, 327);
    }
  }

  mapCanvas.mousePressed = function() {
    if (dist(mapCanvas.mouseX, mapCanvas.mouseY, 385, 315) < 25) {
      timeLapseStart = millis();
      runTimeLapse = !runTimeLapse;
    }
  }
}
    

//UPPER CANVAS
new p5(sketch);

let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

//Map options
const options = {
  lat: 39.5,
  lng: -98.0,
  zoom: 4,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
};

//Selected state vars, initialised
let selectedState = "California";
let selectedStateIndex = 4;
let states;

//Vars for state colours
let stateSelected;
let stateUnselected;

let polygons;
let multiPolygons;
let polygonLookup;
let multiPolygonLookup;
let polygon;
let multiPolygon;


let crime = "Index offense rate";
let selectedYear = 2014;

let statesMin;
let statesMax;

let break1;
let break2;
let break3;


function preload() {
  polygon = loadTable("data/polygon.csv", "csv", "header")
  multiPolygon = loadTable("data/Multipolygon.csv", "csv", "header")
}

function setup() {
  canvas = createCanvas(900, 380); 
    
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  polygons = myMap.geoJSON(statesData, 'Polygon');
  multiPolygons = myMap.geoJSON(statesData, 'MultiPolygon');
  
  polygonLookup = loadTable('data/PolygonLookup.csv', 'csv', 'header')
  multiPolygonLookup = loadTable('data/MultiPolygonLookup.csv', 'csv', 'header')

  stateSelected = color(0, 0, 0, 75);
  stateUnselected = color(255, 53, 3, 75);

  myMap.onChange(drawStates); //Every time map is moved draw the polygons

  //Create list of states for look-up
  states = [];
  i = 0;
  while (i < 51) {
    state = (crimes.getString(i, 2))
    states.push(state)
    i++;
  }
}


function draw() {
  selectedYear = timeLine.value().toString();
  drawStates();
}




function mouseMoved() {
  const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  for (let i = 0; i < polygons.length; i++) {
    polygons[i].selected = false;
  }
    
  for (let i = 0; i < polygons.length; i++) {
    if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
      polygons[i].selected = true;
    }
  }

  for (let i = 0; i < multiPolygons.length; i++) {
    for (let j = 0; j < multiPolygons[i].length; j++) {
      multiPolygons[i].selected = false;
      if (pnpoly(multiPolygons[i][j][0].length, multiPolygons[i][j][0], mousePosition.lng, mousePosition.lat) == true) {
        multiPolygons[i].selected = true;
      }
    }
  }
}


function mousePressed() {
  if (mouseButton == LEFT) {
    selectedStateIndex = getClickedStateIndex();
  }
}


function getClickedStateIndex() {
  const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  
  for (let i = 0; i < polygons.length; i++) 
    polygons[i].selected = false;

  for (let i = 0; i < polygons.length; i++) {
    if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
      polygons[i].selected = true;
      let row = polygonLookup.findRow(i.toString(), 'Polygon');
      selectedState = row.obj.State
      break;
    }
  }
  
  for (let i = 0; i < multiPolygons.length; i++) {
    for (let j = 0; j < multiPolygons[i].length; j++) {
      multiPolygons[i].selected = false;
      if (pnpoly(multiPolygons[i][j][0].length, multiPolygons[i][j][0], mousePosition.lng, mousePosition.lat) == true) {
        multiPolygons[i].selected = true;
        let row = multiPolygonLookup.findRow(i.toString(), 'MultiPolygon');
        selectedState = row.obj.State;
        break;
      }
    }
  }
  return states.indexOf(selectedState)
}

function pnpoly(nvert, vert, testx, testy) {
  let i, j = 0;
  let c = false;
  for (i = 0, j = nvert - 1; i < nvert; j = i++) {
    if (((vert[i][1] > testy) != (vert[j][1] > testy)) &&
      (testx < (vert[j][0] - vert[i][0]) * (testy - vert[i][1]) / (vert[j][1] - vert[i][1]) + vert[i][0]))
      c = !c;
  }
  return c;
}


function drawStates() {
  clear();
  
  //GET RANGES FOR THE LEGEND
  let crimeColumn = crimes.getColumn(crime) //Selected crime column in dataset
  
  for(var i = 0; i < crimeColumn.length; i++){ 
    if (crimeColumn[i] == 0) {
      crimeColumn.splice(i, 1); 
      i--
    }
  }

  statesMin = min(crimeColumn);
  statesMax = max(crimeColumn);

  let statesSum = 0;
  for(k = 0; k < crimeColumn.length; k++) {
    statesSum = statesSum + Number(crimeColumn[k])
  }

  statesAverage = statesSum / crimeColumn.length

  for (let i = 0; i < polygons.length; i++) {
    let currentYear = polygon.findRows(selectedYear, 'Year');
    let crimeVal = currentYear[i].obj[crime];
    
    break1 = (statesMin + statesAverage)/2;
    break2 = statesAverage;
    break3 = (statesMax + statesAverage)/2;

    
    
    strokeWeight(1)
    stroke(217, 146, 0, 150)
    
    if (polygons[i].selected) {
      fill(217, 146, 0, 150)
      
    }else if(crimeVal == 0){
      fill(0, 0, 0, 100)
      
    }else if (crimeVal < break1) {
      fill(0, 153, 149, 100)
      
    }else if(crimeVal < break2){
      fill(0, 114, 111, 100)
      
    }else if(crimeVal < break3){
      fill(0, 77, 75, 100)
    }else{
      fill(0, 47, 45, 100)
    }

    beginShape();
    for (let j = 0; j < polygons[i][0].length; j++) {
      let lat = polygons[i][0][j][1];
      let long = polygons[i][0][j][0];
      let pos = myMap.latLngToPixel(lat, long);
      vertex(pos.x, pos.y);
    }
    endShape();
  }


  for (let i = 0; i < multiPolygons.length; i++) {
    var currentYear = multiPolygon.findRows(selectedYear, 'Year');
    var crimeVal = currentYear[i].obj[crime];

    for (let j = 0; j < multiPolygons[i].length; j++) {
      
    if (multiPolygons[i].selected) {
      fill(217, 146, 0, 150)
      
    }else if(crimeVal == 0){
      fill(0, 0, 0, 100)
      
    }else if (crimeVal < break1) {
      //fill(255, 171, 0)
      //fill(124, 171, 255)
      fill(0, 153, 149, 100)
      
    }else if(crimeVal < break2){
      //fill(217, 146, 0)
      //fill(93, 143, 231)
      fill(0, 114, 111, 100)
      
    }else if(crimeVal < break3){
      //fill(181, 121, 0)
      //fill(64, 120, 219)
      fill(0, 77, 75, 100)
    }else{
      //fill(141, 95, 0)
      //fill(41, 100, 204)
      fill(0, 47, 45, 100)
    }

      beginShape();
      for (let k = 0; k < multiPolygons[i][j][0].length; k++) {
        let lat = multiPolygons[i][j][0][k][1];
        let long = multiPolygons[i][j][0][k][0];
        let pos = myMap.latLngToPixel(lat, long);
        vertex(pos.x, pos.y);
      }
      endShape();
    }
  }
}
