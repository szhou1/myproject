var clientId = 'GRNE1GQUI5DF4ISNN2FYQVQDCV55GLNJG0BQFGZT3MZ25HA3';
var clientSecret = 'XT3OKVHWZXJSAGT52ISZQHONFWGPUDEFFCZHJU3SVL3HKKLO';
var version = '20160322';
var urlbase = 'https://api.foursquare.com/v2/';

function getLocalVenues(loadEndListener){
  var address = "600%20Guererro%20st,%20San%20Francisco,%20CA";
  var categoryId = '4d4b7105d754a06374d81259'; // food categoryId
  sendRequest('venues/search?near=' + address + '&categoryId=' + categoryId + '&limit=' + 30, loadEndListener);
}

function getMenuByVenueId(venueId, loadEndListener){
  sendRequest('venues/' + venueId + "/menu?", loadEndListener);
}

function sendRequest(query, loadEndListener) {
  console.log("sendRequest() start");
  var url = urlbase + query + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + version;

  console.log(url);

  var req = new XMLHttpRequest();
  req.addEventListener("load", reqListener);
  req.addEventListener("loadend", loadEndListener);
  req.open('GET', url, true);
  req.setRequestHeader('Content-Type', 'text/plain');
  req.send();

  console.log("sendRequest() end");
}

function reqListener () {
  console.log("reqListener() start");
  console.log("status: " + this.status)
  console.log("reqListener() end");
}

// function loadEndListener(){
//   console.log("loadEndListener start");
//   attachToElement(this.responseText);
//   console.log("loadEndListener end")
// }

function attachToElement(data){
  console.log("attachToElement() start");
  var listingsEle = document.getElementById("listings");

  var jsonData = JSON.parse(data);
  var response = jsonData.response;
  // var venueList = response.venues.map(function(venue){
  //   var id = venue.id;
  //   return {id : venue.id, name : venue.name};
  // });
  var venueList = response.venues;
  console.log(venueList);

  // var venueIdList = response.venues.map(function(venue){
  //   return venue.id;
  // });

  // console.log(venueIdList);

  var ul = document.createElement("ul");
  venueList.forEach(function(venue){
    // create list items for menu items
    var ul_menu = document.createElement("ul");

    // getMenuByVenueId("42814b00f964a52002221fe3", function(){
    //   console.log(this.responseText);
    // });
    getMenuByVenueId(venue.id, function(){
      var response = JSON.parse(this.responseText);
      //console.log("menu: " + response);
      //console.log("menu count: " + response.response.menu.menus.count);
      if(response.response.menu.menus.count > 0){
        var items = response.response.menu.menus.items;
        //console.log(items);
        var itemAndPriceArr = flattenMenu(items);
        //console.log(itemAndPrice);
        itemAndPriceArr.forEach(function(itemAndPrice){
          var li = document.createElement("li");
          var text = document.createTextNode(itemAndPrice.name + " - $" + itemAndPrice.price);
          li.appendChild(text);
          ul_menu.appendChild(li);
        });
      }
    });
    // create the list item for venue name
    var li = document.createElement("li");
    var text = document.createTextNode(venue.name);
    li.appendChild(text);
    li.appendChild(ul_menu);
    ul.appendChild(li);
  });
  listingsEle.appendChild(ul);
  console.log("attachToElement() end");
}


//
function flattenMenu(items){

  var res = [];

  items.forEach(function(menu){
    //console.log(menu.entries.items);
      menu.entries.items.forEach(function(section){
        //console.log(section.name);
        section.entries.items.map(function(entry){
          //console.log(entry.name + " " + entry.price);
          res.push({name: entry.name, price: entry.price});
        });
      });
    });

  res.forEach(function(item){
    //console.log(item);
  });
  return res;
}


window.onload = function(){
  console.log("onload() start");

  getLocation();

  getLocalVenues(function(){
      attachToElement(this.responseText);
  });

  console.log("onload() end");
};
