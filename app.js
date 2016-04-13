'use strict';
var foursquareUrlBase = 'https://api.foursquare.com/v2/';
var clientId = 'C1GWYNEMDEE51PKOWLVQA1P41BNL0YQYGWPLNVWGE4ESPAFR';
var clientSecret = '4QBQMINO2VDDNVDDOGYIPKYZO04XUTK5YLBK0ARKSQ4OC3VD';
var version = '20160322';

function getVenues(param){
  var searchterm = document.getElementById("searchVenues").value || param;

  var categoryId = '4d4b7105d754a06374d81259'; // food categoryId
  var requestUrl = foursquareUrlBase + 'venues/search?near=' + encodeURI(searchterm)
        + '&categoryId=' + categoryId
        + '&limit=' + 30
        + '&client_id=' + clientId
        + '&client_secret=' + clientSecret
        + '&v=' + version
        + '&t=' + Math.random();

  get(requestUrl)
    .then(JSON.parse, function(error) {
       console.error("Failed to get data", error);
     })
    .then(function(response){
      // console.log(response.response.venues);
      var hasMenuVenues = [];
      response.response.venues.map(function(venue){
        if(venue.hasMenu==true){
          hasMenuVenues.push(venue);
        }
      });
      console.log(hasMenuVenues);
      displayVenues(hasMenuVenues);
    });
}

function displayVenues(venueList){
  console.log("displayVenues() start");

  var listingsEle = document.getElementById("listings");
  listingsEle.innerHTML = "";

  if(venueList.length <= 0){
    var p = document.createElement("p").appendChild(document.createTextNode("No Menus Found for Venues Near This Location."));
    listingsEle.appendChild(p);
  }

  var ol = document.createElement("ol");

  venueList.forEach(function(venue){
    // create the list item for venue name
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#";
    a.innerHTML = venue.name;
    a.setAttribute("onclick", "getMenu(" + JSON.stringify(venue.id) + ")");

    li.appendChild(a);
    ol.appendChild(li);
  });
  listingsEle.appendChild(ol);
  console.log("displayVenues() end");
}

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

  return res;
}


function getMenu(venueId){
  console.log("getMenu... " + venueId);
  var menu_ele = document.getElementById("menu");
  menu_ele.innerHTML = "";
  var ul_menu = document.createElement("ul");

  var url = foursquareUrlBase + 'venues/' + venueId + "/menu?" + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + version + '&t=' + Math.random();
  get(url)
    .then(JSON.parse)
    .then(function(response){
      // console.log(response);
      if(response.response.menu.menus.count > 0){
        // console.log(hasMenu);
        var items = response.response.menu.menus.items;
        //console.log(items);
        var itemAndPriceArr = flattenMenu(items);
        itemAndPriceArr.forEach(function(itemAndPrice){
          // console.log(itemAndPrice);
          var li = document.createElement("li");
          if(itemAndPrice.price != undefined){
            var text = document.createTextNode(itemAndPrice.name + " - $" + itemAndPrice.price);
          }else{
            var text = document.createTextNode(itemAndPrice.name);
          }

          li.appendChild(text);
          ul_menu.appendChild(li);
        });
      }
      else{
        ul_menu.appendChild(document.createTextNode("No Menu Available"));
      }
  });

  menu_ele.appendChild(ul_menu);
}



function get(url) {
  console.log("GET...  " + url);

  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    // console.log("new promise...");
    var req = new XMLHttpRequest();
    req.open('GET', url, true);

    req.onload = function() {
      // console.log("onload...");
      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}
