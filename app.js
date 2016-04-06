var data;

function getData() {
  console.log("getData()...");

  var url = 'https://api.foursquare.com/v2/venues/search?near=600%20Guererro%20st,%20San%20Francisco,%20CA&client_id=GRNE1GQUI5DF4ISNN2FYQVQDCV55GLNJG0BQFGZT3MZ25HA3&client_secret=XT3OKVHWZXJSAGT52ISZQHONFWGPUDEFFCZHJU3SVL3HKKLO&v=20160322';

  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", reqListener);

  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'text/plain');
  xhr.send();

  // console.log("status: " + xhr.status);
}

function reqListener () {
  // console.log("this: " + this);
  console.log("status: " + this.status)
  console.log("response: " + this.responseText);
  data = this.responseText;
}

function attachToElement(data){
  console.log(document);
  var ele = document.getElementById("listings");
  console.log(document.getElementById("list1"));
  ele.innerHTML = data;
}

var data = getData();

window.onload = function(){
  console.log("DATA: " + data);
  attachToElement(data);

};
