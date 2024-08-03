const channel = new BroadcastChannel("my-channel");

channel.addEventListener("message", function(event) {
  var message = event.data;
  console.log(message);
  var img = document.getElementById("image");
  img.src = message;
});

