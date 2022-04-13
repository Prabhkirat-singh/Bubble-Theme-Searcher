// Initialization
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let gravity = 0.5;
let accelation;
let searchInput
let searchedData

class creatingBubbles {
  constructor({ position, velocity }, color, radius) {
    this.position = position;
    this.velocity = velocity;
    this.color = color;
    this.radius = radius;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    c.fill();
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    // Creating Gravity
    if (this.position.y + this.radius + this.velocity.y >= canvas.height) {
      accelation = this.velocity.y;
      this.velocity.y = 0;
      // You can also do (accelation * gravity) but it will stop bouncing after some time so that's why i am adding some value two time so that my ball bounce always
      this.velocity.y -= ((accelation * gravity) + (accelation * gravity));
    } else this.velocity.y += gravity;

    // Collision detection if bubbles is going out from screen x velocity will add in bubble
    if (this.position.x + this.radius >= canvas.width) {
      this.velocity.x = -5;
    } else if (this.position.x + this.radius <= 100) {
      this.velocity.x = 5;
    }
    // Collision detection if bubbles is going out from the y asis 
    if (this.position.y + this.radius + this.velocity.y <= -1) {
      this.velocity.y = 0;
    }
  }
}

const bubbles = [];

for (let index = 0; index < 60; index++) {
  let bubble = new creatingBubbles(
    {
      position: {
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * (canvas.height - 100)),
      },
      velocity: {
        x: 0,
        y: 0,
      },
    },`rgba(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, 0.${Math.floor(Math.random()*99)})`, Math.floor(Math.random()*50));

  bubbles.push(bubble);
}
// <----------------------BACKUP---------------------->
// let bubble = new creatingBubbles(
//   {
//     position: {
//       x: 0,
//       y: 70,
//     },
//     velocity: {
//       x: 0,
//       y: 0,
//     },
//   },
//   `rgb(${Math.floor(Math.random() * 30)},${Math.floor(Math.random() * 30)},${Math.floor(Math.random() * 30)})`, 50);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Calling every bubble in the bubbles array with forEach function
  bubbles.forEach((element) => {
    element.update();
  });
}

function search() {
  searchInput = document.querySelector('input');
  searchedData = searchInput.value;
  location.href = `https://search.brave.com/search?q=${searchedData.replace(" ", "+")}&source=web`;
  searchedData.innerText = ""
}

addEventListener('keypress', (element)=>{
  if(element.key === "Enter"){
    console.log("pressing enter");
    search()
  }
})
animate();
