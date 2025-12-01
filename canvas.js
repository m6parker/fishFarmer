const canvas = document.querySelector(".notebook-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cameraOffset = { x: 0, y: 0 };
let mouseX = 0, mouseY = 0;
let worldX = 0, worldY = 0;
const mouseLocation = { x: 0, y: 0};

const BOOK_WIDTH = 1500;
const BOOK_HEIGHT = 1100;

// TESTING
function drawGrid() {
    const gridSize = 50; // Space between grid lines
    ctx.strokeStyle = "rgba(200, 200, 200, 0.5)";
    ctx.font = "10px Arial";
    ctx.fillStyle = "rgba(200, 200, 200, 0.7)";

    // Draw vertical lines and labels
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        ctx.fillText(x, x, 10);
    }

    // Draw horizontal lines and labels
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        ctx.fillText(y, 0, y + 10);
    }
}

const ResizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
ResizeCanvas();

window.addEventListener("resize", () => ResizeCanvas());

const backgroundSprite = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    width: canvas.width,
    height: canvas.height,
    image: tableImage
});

const bookSprite = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    image: bookImage,
    width: BOOK_WIDTH,
    height: BOOK_HEIGHT,
    name: 'notebook',
    selectedImg: selectedbookImage,
});

const buttonSprite = new Sprite({
    position:{
        x: 150,
        y: 850
    },
    image: bookImage,
    width: 100,
    height: 100,
    name: 'button',
    selectedImg: selectedbookImage,
});

const selectables = [bookSprite, buttonSprite];

function animate(){

    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    backgroundSprite.draw();
    selectables.forEach(item => item.draw());

};
animate();

// bookImage.onload = function() {
//     ctx.drawImage(backgorundImage, 0, 0, canvas.width, canvas.height);
//     ctx.drawImage(bookImage, 0, 0, BOOK_WIDTH, BOOK_HEIGHT);
    
//     // buttons for turning pages
//     ctx.fillStyle = "black";
//     ctx.fillRect(150, 880, 50, 50);
//     ctx.fillRect(1340, 880, 50, 50);

//     // button for clicking tanks

//     // text for turning pages
//     ctx.fillStyle = "white";
//     ctx.font = "35px Courier New";
//     ctx.textAlign = "center";
//     ctx.fillText(`<`, 175, 910);
//     ctx.fillText(`>`, 1365, 910);
    
//     // text for money labels
//     ctx.fillStyle = "black";
//     ctx.fillText(`Wallet: $${MONEY}`, 400, 470);
//     ctx.fillText(`Running Tanks: ${filledAquariums.length}`, 450, 530);
    
//     hiveSprite.draw();
//     // drawGrid();
// };

canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // canvas.classList.add('hidden')

    if (
        x > canvas.width / 3 - 50 &&
        x < canvas.width / 3 + 50 &&
        y > canvas.height / 2 - 25 &&
        y < canvas.height / 2 + 25
    ) {
        console.log("Button clicked!");
    }

    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    console.log("WORLD: ", cameraOffset.x + mouseLocation.x, cameraOffset.y + mouseLocation.y) // sprite coords
    
    // clicking sprites
    selectables.forEach(movable => {
        if (
            mouseLocation.x >= movable.position.x &&
            mouseLocation.x <= movable.position.x + movable.width &&
            mouseLocation.y >= movable.position.y &&
            mouseLocation.y <= movable.position.y + movable.height
        ) {
            console.log(`CLICKED ${JSON.stringify(movable.name)}`);

            movable.selected = movable.selected ? false : true;
            movable.selectSprite();

            if(movable.name === "frog"){
                spriteTooltip.classList.remove('hidden');
                spriteTooltip.style.left = `${mouseLocation.x + 10}px`;
                spriteTooltip.style.top = `${mouseLocation.y + 10}px`;
                spriteTooltip.innerHTML = `${movable.name}: points/health/info`;
            }
        }
    });
});

document.addEventListener('mousemove', (e) => {
    mouseLocation.x = e.clientX;
    mouseLocation.y = e.clientY;

    //hover sprites       
    selectables.forEach(movable => {
        if(
            mouseLocation.x >= movable.position.x &&
            mouseLocation.x <= movable.position.x + movable.width &&
            mouseLocation.y >= movable.position.y &&
            mouseLocation.y <= movable.position.y + movable.height
        ){
            canvas.style.cursor = 'pointer';
        }
    });
});