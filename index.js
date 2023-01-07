const unitTest = false;

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
const width = window.innerWidth
const height = window.innerHeight
const max = width > height ? width : height

const arc = {
  x: width / 2,
  y: height / 2,
  size: 4,
  twist: 1.03,

  angle: 0,
  omega: 1,
  w: 0.01,

  times: Math.floor(max / 2),
  strokeStyle: 'rgba(0, 0, 0, .5)',
  hslAngle: 0,
  
  set: function () {
    this.size = 4
    this.angle = 0
    this.times = Math.floor(max / 2)
  },

  spin: function () {
    this.omega >= 90 ? this.omega = 0 : this.omega
    this.omega += this.w
  }
}

function setBackgroundColor () {
  
}


function degToRad (degrees) {
  return degrees * (Math.PI / 180);
}

function setCanvasWidth (canvas, width) {
  canvas.width = width

  unitTest && 
  console.log(`canvas width set to: ${canvas.width}`)
}

function setCanvasHeight (canvas, height) {
  canvas.height = height

  unitTest &&
  console.log(`canvas height set to: ${canvas.height}`)
}

function appendCanvas (canvas) {
  document.body.appendChild(canvas)

  unitTest &&
  console.log(`body appended ${document.body.lastChild}`)
}

function draw() {
  context.save();
  context.strokeStyle = arc.strokeStyle;
  context.translate(arc.x, arc.y);
  context.rotate(degToRad(arc.angle));
  context.beginPath();
  context.rect(-arc.size/2, -arc.size/2, arc.size, arc.size);
  context.lineWidth = arc.size/100;
  context.stroke();
  
  arc.angle += arc.omega
  arc.size *= arc.twist
  context.restore();
}

function render () {
  while(arc.times--) {
    draw()
  }
  arc.set()
}


setCanvasWidth(canvas, window.innerWidth)
setCanvasHeight(canvas, window.innerHeight)
appendCanvas(canvas)

// function loop() {
//   window.requestAnimationFrame(loop)
//   context.clearRect(0, 0, width, height)
//   render()
//   arc.spin()
// }

// loop()

let fps = 60;
let now;
let then = Date.now();
let interval = 1000/fps;
let delta;
  
function loop() {
     
    requestAnimationFrame(loop);
     
    now = Date.now();
    delta = now - then;
     
    if (delta > interval) {
        // update time stuffs
         
        // Just `then = now` is not enough.
        // Lets say we set fps at 10 which means
        // each frame must take 100ms
        // Now frame executes in 16ms (60fps) so
        // the loop iterates 7 times (16*7 = 112ms) until
        // delta > interval === true
        // Eventually this lowers down the FPS as
        // 112*10 = 1120ms (NOT 1000ms).
        // So we have to get rid of that extra 12ms
        // by subtracting delta (112) % interval (100).
        // Hope that makes sense.
         
        then = now - (delta % interval);
         
        // ... Code for Drawing the Frame ...
        context.clearRect(0, 0, width, height)
        render()
        arc.spin()
    }
}
 
loop();