function getData(){
  console.log("getData()...");

  //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var query = 'count=2&q=%23beardown';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.twitter.com/1.1/search/tweets.json?' + query, true);
  xhr.setRequestHeader('Authorization', 'OAuth oauth_consumer_key="LMo00AFrOFL3Wl4oPJgw6AX1B", auth_nonce="65de40c836b93dbe53ea03b98dedee9c", oauth_signature="LbveOuw3V98lVXLDxUKjygakXns%3D", auth_signature_method="HMAC-SHA1", oauth_timestamp="1458544078", oauth_token="1013771893-JGOhrEZjdn1L54qB58nMcRHCQj0yg1fmUIUEayM", oauth_version="1.0"');
  xhr.onreadystatechange = function(){
    var DONE = 4;
    var OK = 200;
    if(xhr.readyState === DONE){
      if(xhr.status === OK){
        console.log(xhr.responseText);
      }else{
        console.log('Error: ' + xhr.status);
      }
    }
  };
  xhr.send();


  console.log(xhr.status);
  console.log(xhr.responseText);

}

getData();



 // curl
//  --get 'https://api.twitter.com/1.1/search/tweets.json'
//  --data 'count=2&q=%23beardown'
//  --header 'Authorization: OAuth
//             oauth_consumer_key="LMo00AFrOFL3Wl4oPJgw6AX1B",
//             oauth_nonce="65de40c836b93dbe53ea03b98dedee9c",
//             oauth_signature="LbveOuw3V98lVXLDxUKjygakXns%3D",
//             oauth_signature_method="HMAC-SHA1",
//             oauth_timestamp="1458544078",
//             oauth_token="1013771893-JGOhrEZjdn1L54qB58nMcRHCQj0yg1fmUIUEayM",
//             oauth_version="1.0"'
// --verbose
