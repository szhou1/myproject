'use strict';
var foursquareUrlBase = 'https://api.foursquare.com/v2/';
var clientId = 'C1GWYNEMDEE51PKOWLVQA1P41BNL0YQYGWPLNVWGE4ESPAFR';
var clientSecret = '4QBQMINO2VDDNVDDOGYIPKYZO04XUTK5YLBK0ARKSQ4OC3VD';
var version = '20160322';

function getVenues(param){
  var searchterm = document.getElementById("searchVenues").value || param;

  var categoryId = '4d4b7105d754a06374d81259'; // food categoryId
  var requestUrl = foursquareUrlBase + 'venues/search?near=' + encodeURI(searchterm) + '&categoryId=' + categoryId + '&limit=' + 10 + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + version+ '&t=' + Math.random();

  get(requestUrl)
    .then(JSON.parse, function(error) {
       console.error("Failed to get data", error);
     })
    .then(function(response){
      // console.log(response.response.venues);
      attachToElement(response);
    });
}

function attachToElement(data){
  console.log("attachToElement() start");
  var listingsEle = document.getElementById("listings");
  listingsEle.innerHTML = "";
  // var jsonData = JSON.parse(data);
  var response = data.response;
  var venueList = response.venues;
  // console.log(venueList);

  var ul = document.createElement("ul");
  venueList.forEach(function(venue){
    // create list items for menu items
    var ul_menu = document.createElement("ul");

    var url = foursquareUrlBase + 'venues/' + venue.id + "/menu?" + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + version + '&t=' + Math.random();
    get(url)
      .then(JSON.parse)
      .then(function(response){
        // console.log(response);
        if(response.response.menu.menus.count > 0){
          var items = response.response.menu.menus.items;
          //console.log(items);
          var itemAndPriceArr = flattenMenu(items);
          itemAndPriceArr.forEach(function(itemAndPrice){
            // console.log(itemAndPrice);
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
