const channel = new BroadcastChannel("my-channel");

images = [
  "https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D",
  "https://upload.wikimedia.org/wikipedia/commons/e/e2/Ebnit06061.JPG",
];

image_idx = 0;

function post() {
  channel.postMessage(images[image_idx++ % images.length]);
}

setInterval(post, 3000);
