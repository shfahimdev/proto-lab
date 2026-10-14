let player_state = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", e => {
  player_state = e.target.value;
})

const canvas        = document.getElementById("canvas1");
const context       = canvas.getContext('2d');
const canvas_width  = canvas.width  = 600;
const canvas_height = canvas.height = 600;

const player_image  = new Image();
player_image.src = 'shadow_dog.png';

const sprite_width  = 575;
const sprite_height = 523;

const staggerFrames = 5;
let gameFrame = 0;
let frameCounts = [6,6,6,8,10,4,6,6,11,3];

let states = {
  idle: 0, jump: 1, fall: 2,
  run: 3, dizzy: 4, sit: 5,
  roll: 6, bite: 7, ko: 8,
  getHit: 9
};

let frameX = 0;

const animate = () => {
  let frameY = states[player_state];

  context.clearRect(0, 0, canvas_width, canvas_height);
  context.drawImage(
    player_image,
    frameX * sprite_width, frameY * sprite_height, sprite_width, sprite_height, // sx, sy, sw, sh  
    0, 0, sprite_width, sprite_height                                           // dx, dy, dw, dh
  );
  if(gameFrame % staggerFrames === 0) {
    if(frameX < frameCounts[frameY]) frameX++;
    else frameX = 0;
  }
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();

