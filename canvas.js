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

const prevPageSprite = new Sprite({
    position:{
        x: 150,
        y: 850
    },
    image: prevImage,
    width: 125,
    height: 100,
    name: 'previous',
    selectedImg: prevImageSelected,
});

const nextPageSprite = new Sprite({
    position:{
        x: 1270,
        y: 850
    },
    image: nextImage,
    width: 125,
    height: 100,
    name: 'next',
    selectedImg: nextImageSelected,
});

const noteSprite = new Sprite({
    position:{
        x: 200,
        y: 250
    },
    image: noteImage,
    width: 500,
    height: 550,
    name: 'note',
    selectedImg: noteImage,
});

const selectables = [prevPageSprite, nextPageSprite, noteSprite];

function animate(){

    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    backgroundSprite.draw();
    bookSprite.draw();
    selectables.forEach(item => item.draw());

    

    //Testing
    drawGrid();

};
animate();


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
    selectables.forEach(sprite => {
        if (
            mouseLocation.x >= sprite.position.x &&
            mouseLocation.x <= sprite.position.x + sprite.width &&
            mouseLocation.y >= sprite.position.y &&
            mouseLocation.y <= sprite.position.y + sprite.height
        ) {
            console.log(`CLICKED ${JSON.stringify(sprite.name)}`);

            // sprite.selected = sprite.selected ? false : true;
            // sprite.selectSprite();

            if(sprite.name === "previous"){
                spriteTooltip.classList.remove('hidden');
            }
        }
    });
});

document.addEventListener('mousemove', (e) => {
    mouseLocation.x = e.clientX;
    mouseLocation.y = e.clientY;

    //hover sprites       
    selectables.forEach(sprite => {
        if(
            mouseLocation.x >= sprite.position.x &&
            mouseLocation.x <= sprite.position.x + sprite.width &&
            mouseLocation.y >= sprite.position.y &&
            mouseLocation.y <= sprite.position.y + sprite.height
        ){
            canvas.style.cursor = 'pointer';
            sprite.selected = true;
            sprite.selectSprite();
        }else{
            // canvas.style.cursor = 'default';
            sprite.unselectSprite();
        }
    });
});