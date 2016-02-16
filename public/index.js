$(function() {
  checkCookie();
})

function checkCookie() {
  $('#text').html('Checking to see if we have a cookie.');
  
  setTimeout(function() {
    makeRequest();
  }, 1000);
}   

function makeRequest() {
  // Lets check and see if jquery has a cookie...
  $.post('/cookie-test.json', function(data) {
    console.log('Data: ' + JSON.stringify(data,2));
    if (data.hasCookie) {
      return $('#text').html('Yes, we have a cookie!');
    }
    
    $('#text').html('No, we do not have a cookie.  Time to try again...');
    setTimeout(function() {
      checkCookie();
    },2000);
    
  }).fail(function(err) {
    
  })
}