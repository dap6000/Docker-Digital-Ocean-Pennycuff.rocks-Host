(function() {
	config = {
  	button_id : "moar",
  	bucket_id : "result"
	}
	var button = document.getElementById(config.button_id);
  var bucket = document.getElementById(config.bucket_id);
  var demo_do = function() {
  	var reply = demo.rollable.roll();
  	bucket.textContent = reply;
  	console.log(reply);
  }
  button.addEventListener('click', demo_do);
  demo_do();
})();