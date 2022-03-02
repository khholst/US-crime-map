//##################################################//
//               Karl Hendrik Holst                 //
//          Final Project in GEOG-581 @ SDSU        //
//##################################################//


//Create upper map canvas and add elements to it
var sketch = function(mapCanvas) {
  
  mapCanvas.mapMin = "";
  mapCanvas.mapMax = ""
  mapCanvas.selectState = ""

  mapCanvas.preload = function() {
    crimes = loadTable("data/CrimeByState.csv", "csv", "header")   
  }

  
  mapCanvas.setup = function() {
    canvas = mapCanvas.createCanvas(900, 400)
    mapCanvas.background(0)
    canvas.position(0, 380)
      
    totalCrime = mapCanvas.createButton("Total crime")
    totalCrime.position(20, 395)
    totalCrime.size(120)
    totalCrime.mousePressed(totalCrimeChangeID)

    murder = mapCanvas.createButton("Murder")
    murder.position(100, 445)
    murder.size(120)
    murder.mousePressed(murderChangeID)

    rape = mapCanvas.createButton("Rape")
    rape.position(170, 395)
    rape.size(120)
    rape.mousePressed(rapeChangeID)

    robbery = mapCanvas.createButton("Robbery")
    robbery.position(250, 445)
    robbery.size(120)
    robbery.mousePressed(robberyChangeID)

    assault = mapCanvas.createButton("Assault")
    assault.position(320, 395)
    assault.size(120)
    assault.mousePressed(assaultChangeID)

    propertyCrime = mapCanvas.createButton("Property crime")
    propertyCrime.position(400, 445)
    propertyCrime.size(120)
    propertyCrime.mousePressed(PropertyCrimeChangeID)

    burglary = mapCanvas.createButton("Burglary")
    burglary.position(470, 395)
    burglary.size(120)
    burglary.mousePressed(burglaryChangeID)
    
    larcenyTheft = mapCanvas.createButton("Larceny-theft")
    larcenyTheft.position(550, 445)
    larcenyTheft.size(120)
    larcenyTheft.mousePressed(larcenyTheftChangeID)

    vehicleTheft = mapCanvas.createButton("Vehicle theft")
    vehicleTheft.position(620, 395)
    vehicleTheft.size(120)
    vehicleTheft.mousePressed(vehicleTheftChangeID)
    
    // timeLapse = p.createButton("Time lapse")
    // timeLapse.mousePressed(timeLapseFunc)
    // timeLapse.position(800, 900)
    
    timeLine = mapCanvas.createSlider(1960, 2014, 2014)
    timeLine.position(63.5, 745)
    timeLine.size(640)
  }
  
  mapCanvas.draw = function() {
    mapCanvas.mapMin = 100000000;
    mapCanvas.mapMax = 0;
    var rowCount = crimes.getRowCount();
    mapCanvas.columnValues = []
    for (var i = stateIndex; i < rowCount; i+=51) {
      mapCanvas.columnValues[i] = crimes.getNum(i, crime);
      
          
      if (mapCanvas.columnValues[i] > mapCanvas.mapMax){
        mapCanvas.mapMax = mapCanvas.columnValues[i];
      }
      if (mapCanvas.columnValues[i] < mapCanvas.mapMin){
        mapCanvas.mapMin = mapCanvas.columnValues[i];
      }
    }
    
    
    mapCanvas.background(0)
    // p.stroke(217, 146, 0)
    // p.line (70, 350, 70, 150);
    // p.line (70, 350, 1150, 350);
    for (var j = 0; j < 54; j += 1) {
      let x = map(j, 0, 54, 70, 700);
      mapCanvas.stroke(180, 180, 180, 100);
      mapCanvas.strokeWeight(1)
      mapCanvas.line(x, 150, x, 350);
    }
    mapCanvas.line(700, 150, 700, 350)

    mapCanvas.textAlign(RIGHT)
    mapCanvas.textSize(17)
    mapCanvas.textFont("times new roman")
    mapCanvas.stroke(255, 165, 0, 50)
    mapCanvas.strokeWeight(2)
    mapCanvas.text(mapCanvas.mapMin, 55, 360)
    mapCanvas.text(mapCanvas.mapMax, 55, 155)
    mapCanvas.text("1960", 83, 385)
    mapCanvas.text("2014", 710, 385)
    mapCanvas.stroke(255, 165, 0, 75)
    mapCanvas.textSize(30)
    mapCanvas.textAlign(CENTER)
    mapCanvas.text(selectState.toUpperCase().split('').join('   '), 390, 388) 
    
    mapCanvas.textSize(60)
    xdd = yearr.toString()
    mapCanvas.text(xdd.split('').join(' '), 805, 120)
    mapCanvas.strokeWeight(1)
    mapCanvas.textSize(32)
    if (crime == "Murder and nonnegligent manslaughter rate") {
      mapCanvas.text("Murder and manslaughter rate".split('').join(' '), 385, 133)
    }else{
      mapCanvas.text(crime.split('').join(' '), 385, 133)
    }

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
    mapCanvas.text(Number(Math.floor(mapMin)) + "   -   " + Number(Math.floor(break1)), 770, 189)
    mapCanvas.text(Number(Math.floor(break1)) + "   -   " + Number(Math.floor(break2)), 770, 225)
    mapCanvas.text(Number(Math.floor(break2)) + "   -   "   + Number(Math.floor(break3)), 770, 262)
    mapCanvas.text(Number(Math.floor(break3)) + "   -   " + Number(Math.floor(mapMax)), 770, 299)
    mapCanvas.text("No Data", 770, 336)
    
    mapCanvas.fill(255, 165, 0, 100);
    mapCanvas.stroke(0, 76, 74, 150);
    mapCanvas.strokeWeight(5);
    mapCanvas.beginShape();
    for (let i = stateIndex; i < mapCanvas.columnValues.length; i+=51) {
      var x = map(i, 0, mapCanvas.columnValues.length-1, 70, 700);
      var y = map(mapCanvas.columnValues[i], mapCanvas.mapMin, mapCanvas.mapMax, 350, 150);
      mapCanvas.vertex(x, y);
      
    }


    mapCanvas.vertex(700, 350)
    mapCanvas.vertex(70, 350)
    mapCanvas.endShape();
    mapCanvas.strokeWeight(5)
    mapCanvas.stroke(217, 146, 0, 150)
    mapCanvas.line (70, 350, 70, 150)
  }
}
    
    
new p5(sketch)

let myMap;

let canvas;

const mappa = new Mappa('Leaflet');

const options = {
  lat: 39.5,
  lng: -98.0,
  zoom: 4,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}
var selectState = "California"
var stateIndex = 4

var stateSelected;
var stateUnselected;

var polygons;

var states = []

var PolygonLookup;
var MultipolygonLookup;

var tableValues = []
var yr = []


var crime = "Index offense rate"

var yearr = 2014

var mapMin
var mapMax

var break1
var break2
var break3


stateList = []

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

  myMap.onChange(drawStates); 
}


function draw() {
  yearr = timeLine.value().toString()
  drawStates()
}

function totalCrimeChangeID() {
  crime = "Index offense rate"
}

function rapeChangeID() {
  crime = "Forcible rape rate"
}

function murderChangeID() {
  crime = "Murder and nonnegligent manslaughter rate"
}

function robberyChangeID() {
  crime = "Robbery rate" 
}

function assaultChangeID() {
 crime = "Aggravated assault rate" 
}

function PropertyCrimeChangeID() {
  crime = "Property crime rate"
}

function burglaryChangeID() {
  crime = "Burglary rate"
}

function larcenyTheftChangeID() {
  crime = "Larceny-theft rate"
}

function vehicleTheftChangeID() {
 crime = "Motor vehicle theft rate"
}



function mouseMoved() {
  const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  for (let i = 0; i < polygons.length; i++)
    polygons[i].selected = false; // Remove this if multi-select is ok 
  for (let i = 0; i < polygons.length; i++) {
    if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
      polygons[i].selected = true;
    }
  }
  for (var m = 0; m < multiPolygons.length; m++)
    for (let i = 0; i < multiPolygons[m].length; i++) {
      multiPolygons[m].selected = false;
      if (pnpoly(multiPolygons[m][i][0].length, multiPolygons[m][i][0], mousePosition.lng, mousePosition.lat) == true) {
        multiPolygons[m].selected = true;
        drawStates();
      }
    }
}


function mousePressed() {
  redraw()
  if (mouseButton == LEFT) {
    var stateVal = clickedState();
  }
}


function clickedState() {
  const mousePosition = myMap.pixelToLatLng(mouseX, mouseY);
  
  for (let i = 0; i < polygons.length; i++) 
    polygons[i].selected = false; // Remove this if multi-select is ok
  for (let i = 0; i < polygons.length; i++) {
    if (pnpoly(polygons[i][0].length, polygons[i][0], mousePosition.lng, mousePosition.lat) == true) {
      polygons[i].selected = true;
      let row = polygonLookup.findRow(i.toString(), 'Polygon');
      selectState = row.obj.State
      break;
    }
  }
  
  for (var m = 0; m < multiPolygons.length; m++)
    for (let i = 0; i < multiPolygons[m].length; i++) {
      multiPolygons[m].selected = false;
      if (pnpoly(multiPolygons[m][i][0].length, multiPolygons[m][i][0], mousePosition.lng, mousePosition.lat) == true) {
        multiPolygons[m].selected = true;
        let row = multiPolygonLookup.findRow(m.toString(), 'MultiPolygon');
        selectState = row.obj.State;
        break;
      }
    }
  
  i = 0
  while (i < 51) {
    state = (crimes.getString(i, 2))
    states.push(state)
    i = i + 1
  }
  stateIndex = states.indexOf(selectState)
}

function pnpoly(nvert, vert, testx, testy) {
  var i, j = 0;
  var c = false;
  for (i = 0, j = nvert - 1; i < nvert; j = i++) {
    if (((vert[i][1] > testy) != (vert[j][1] > testy)) &&
      (testx < (vert[j][0] - vert[i][0]) * (testy - vert[i][1]) / (vert[j][1] - vert[i][1]) + vert[i][0]))
      c = !c;
  }
  return c;
}


crimeRates = []

function drawStates() {
  
  let rows = crimes.getColumn(crime)
  var minValue = Math.min.apply(0, rows.filter(Boolean))
  
  for(var i = 0; i < rows.length; i++){ 
    if (rows[i] == 0) {
      rows.splice(i, 1); 
      i--
    }
  }
  mapMin = min(rows);
  mapMax = max(rows);
  cnt = 0
  for(k = 0; k < rows.length; k++) {
    cnt = cnt + Number(rows[k])
  }
  mapAvg = cnt/rows.length
            
  
  
  
  clear();
  for (let i = 0; i < polygons.length; i++) {
    beginShape();
    var currentYear = polygon.findRows(yearr, 'Year');
    var crimeVal = currentYear[i].obj[crime];
    
    break1 = (mapMin + mapAvg)/2
    break2 = mapAvg
    break3 = (mapMax + mapAvg)/2

    
    
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
         
    for (let j = 0; j < polygons[i][0].length; j++) {
      let lat = polygons[i][0][j][1];
      let long = polygons[i][0][j][0];
      let pos = myMap.latLngToPixel(lat, long);
      vertex(pos.x, pos.y);
    }
    endShape();
  }


  for (let mm = 0; mm < multiPolygons.length; mm++) {
    beginShape()
    var currentYear2 = multiPolygon.findRows(yearr, 'Year');
    var crimeVal2 = currentYear2[mm].obj[crime];

    for (let j = 0; j < multiPolygons[mm].length; j++) {
      beginShape();
      
    if (multiPolygons[mm].selected) {
      fill(217, 146, 0, 150)
      //strokeWeight(2)
      
    }else if(crimeVal2 == 0){
      fill(0, 0, 0, 100)
      
    }else if (crimeVal2 < break1) {
      //fill(255, 171, 0)
      //fill(124, 171, 255)
      fill(0, 153, 149, 100)
      
    }else if(crimeVal2 < break2){
      //fill(217, 146, 0)
      //fill(93, 143, 231)
      fill(0, 114, 111, 100)
      
    }else if(crimeVal2 < break3){
      //fill(181, 121, 0)
      //fill(64, 120, 219)
      fill(0, 77, 75, 100)
    }else{
      //fill(141, 95, 0)
      //fill(41, 100, 204)
      fill(0, 47, 45, 100)
    }
          
      for (let k = 0; k < multiPolygons[mm][j][0].length; k++) {
        let lat = multiPolygons[mm][j][0][k][1];
        let long = multiPolygons[mm][j][0][k][0];
        let pos = myMap.latLngToPixel(lat, long);
        vertex(pos.x, pos.y);
      }
      endShape();
    }
  }
}



