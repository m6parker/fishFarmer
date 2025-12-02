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

const noteBookPages = ['wallet', 'fish'];
let currentPage = 0;

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
    unselectedImg: prevImage
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
    unselectedImg: nextImage
});

const noteSprite = new Sprite({
    position:{
        x: 200,
        y: 120
    },
    image: noteImage,
    width: 500,
    height: 550,
    name: 'note',
    selectedImg: noteImage,
    unselectedImg: noteImage
});

const faucetSprite = new Sprite({
    position:{
        x: 1100,
        y: 800
    },
    image: faucetImage,
    width: 100,
    height: 100,
    name: 'faucet',
    selectedImg: faucetImageSelected,
    unselectedImg: faucetImage
});

const drainSprite = new Sprite({
    position:{
        x: 970,
        y: 800
    },
    image: drainImage,
    width: 100,
    height: 100,
    name: 'drain',
    selectedImg: drainImageSelected,
    unselectedImg: drainImage
});

const blueprintPaperSprite = new Sprite({
    position:{
        x: 815,
        y: 100
    },
    image: blueprintPaperImage,
    width: 600,
    height: 700,
    name: 'blueprint',
});

const freshwaterSelectionSprite = new Sprite({
    position:{
        x: 200,
        y: 630
    },
    image: waterSelectionFreshwater,
    width: 600,
    height: 600,
    name: 'freshwater',
});

const saltwaterSelectionSprite = new Sprite({
    position:{
        x: 200,
        y: 630
    },
    image: waterSelectionSaltwater,
    width: 600,
    height: 600,
    name: 'saltwater',
});

const brackishSelectionSprite = new Sprite({
    position:{
        x: 200,
        y: 630
    },
    image: waterSelectionBrackish,
    width: 600,
    height: 600,
    name: 'brackish',
});

const tropicalSelectionSprite = new Sprite({
    position:{
        x: 200,
        y: 630
    },
    image: waterSelectionTropical,
    width: 600,
    height: 600,
    name: 'tropical',
});


//tanks

const tank1Sprite = new Sprite({
    position:{
        x: 1000,
        y: 170
    },
    image: tankEmptyFrontImage,
    width: 200,
    height: 100,
    name: 'tank1',
    selectedImg: tankEmptyFrontImageSelected,
    unselectedImg: tankEmptyFrontImage,
    isEmpty: true
});

const tank2Sprite = new Sprite({
    position:{
        x: 1000,
        y: 350
    },
    image: tankEmptyFrontImage,
    width: 200,
    height: 100,
    name: 'tank2',
    selectedImg: tankEmptyFrontImageSelected,
    unselectedImg: tankEmptyFrontImage,
    isEmpty: true
});

const tank3Sprite = new Sprite({
    position:{
        x: 1000,
        y: 550
    },
    image: tankEmptyFrontImage,
    width: 200,
    height: 100,
    name: 'tank3',
    selectedImg: tankEmptyFrontImageSelected,
    unselectedImg: tankEmptyFrontImage,
    isEmpty: true
});

const selectables = [
    prevPageSprite, 
    nextPageSprite, 
    noteSprite, 
    tank1Sprite, 
    tank2Sprite, 
    tank3Sprite, 
    faucetSprite, 
    drainSprite
];

const pageOneContents = [
    noteSprite, 
    blueprintPaperSprite,
    tank1Sprite, 
    tank2Sprite, 
    tank3Sprite, 
    faucetSprite, 
    drainSprite,
];

const waterTypes = [
    freshwaterSelectionSprite,
    saltwaterSelectionSprite,
    tropicalSelectionSprite,
    brackishSelectionSprite,
];

let currentWaterSelected = 0;
function changeWaterSelection(type){
    waterTypes[type].draw();
}

function fillTank(tank, type){
    if(type === 'freshwater'){
        tank.image = tankFreshwaterFrontImage;
        tank.unselectedImg = tankFreshwaterFrontImage;
        tank.selectedImg = tankFreshwaterFrontImageSelected;
    }
    if(type === 'saltwater'){
        tank.image = tankSaltwaterFrontImage;
        tank.unselectedImg = tankSaltwaterFrontImage
        tank.selectedImg = tankSaltwaterFrontImageSelected;
    }
    if(type === 'brackish'){
        tank.image = tankBrackishFrontImage;
        tank.unselectedImg = tankBrackishFrontImage
        tank.selectedImg = tankBrackishFrontImageSelected;
    }
    if(type === 'tropical'){
        tank.image = tankTropicalFrontImage;
        tank.unselectedImg = tankTropicalFrontImage
        tank.selectedImg = tankTropicalFrontImageSelected;
    }
    tank.isEmpty = false;
};

function unselectAllBlueprintItems(){
    tank1Sprite.selected = false;
    tank2Sprite.selected = false;
    tank3Sprite.selected = false;
}

const pageTwoContents = [];

function showPageOne(){
    if(currentPage != 0){return;}

    pageOneContents.forEach(item => item.draw());
    // text for money labels
    ctx.fillStyle = "black";
    ctx.font = "30px Courier New";
    ctx.fillText(`Wallet: $${MONEY}`, 320, 300);
    ctx.fillText(`Running Tanks: ${filledAquariums.length}`, 320, 400);
    // ctx.fillText(`Drain`, 975, 925);
    // ctx.fillText(`Fill`, 1115, 925);

    //show correctly checked water selection
    changeWaterSelection(currentWaterSelected);
}

//fish info maybe
function showPageTwo(){
    if(currentPage != 2){return;}

    pageTwoContents.forEach(item => item.draw());
}

function animate(){

    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    backgroundSprite.draw();
    bookSprite.draw();
    prevPageSprite.draw();
    nextPageSprite.draw();
    // selectables.forEach(item => item.draw());

    showPageOne();
    showPageTwo();

    ctx.fillStyle = "transparent";
    // ctx.fillStyle = "red"; //testing
    ctx.fillRect(300, 750, 100, 100);
    // ctx.fillStyle = "green";
    ctx.fillRect(300, 850, 100, 100);
    // ctx.fillStyle = "blue";
    ctx.fillRect(300, 950, 100, 100);
    // ctx.fillStyle = "yellow";
    ctx.fillRect(300, 1050, 100, 100);

    //Testing
    // drawGrid();

};
animate();

let fillMode = false;
let selectedTank;
// let drainMode = false;
canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    //testing
    // console.log("WORLD: ", cameraOffset.x + mouseLocation.x, cameraOffset.y + mouseLocation.y) // sprite coords
    
    //click water buttons (not sprite)
    if (x >= 300 && x <= 400){
        if(y >= 750 && y <= 850){
            currentWaterSelected = 0;
        }else if(y >= 850 && y <= 950){
            currentWaterSelected = 1;
        }else if(y >= 950 && y <= 1050){
            currentWaterSelected = 2;
        }else if(y >= 1050 && y <= 1150){
            currentWaterSelected = 3;
        }
    }

    // clicking sprites
    selectables.forEach(sprite => {
        if (
            mouseLocation.x >= sprite.position.x &&
            mouseLocation.x <= sprite.position.x + sprite.width &&
            mouseLocation.y >= sprite.position.y &&
            mouseLocation.y <= sprite.position.y + sprite.height
        ) {
            console.log(`CLICKED ${JSON.stringify(sprite.name)}`); // testing
            
            if(sprite.name === "tank1" || sprite.name === "tank2" ||sprite.name === "tank3" ){
                selectedTank = sprite;
                sprite.selectSprite();
                unselectAllBlueprintItems();
                //select last clicked tank
                sprite.selected = true;
                
                //check if empty and allow to fill
                if(sprite.isEmpty){
                    fillMode = true;
                    console.log('tank is empty')
                }else{
                    fillMode=false;

                    //show tanks
                    // canvas.classList.add('hidden')
                    // topView.classList.remove('hidden')
                }
            }

            if(sprite.name === "next"){
                currentPage++;
            }
            if(sprite.name === "previous"){
                currentPage--;
            }
            //can fill empty tanks only
            if(sprite.name === "faucet"){
                if(fillMode){
                    console.log('filling the tank with: ', waterTypes[currentWaterSelected].name)
                    
                    // fills selected tank with sected water 
                    fillTank(selectedTank, waterTypes[currentWaterSelected].name) // tank, image
                }
                unselectAllBlueprintItems();
            }
            //can only drain filled tanks
            if(sprite.name === "drain"){
                if(fillMode){
                    console.log('cannot drain an empty tank!')
                }else{
                    console.log('draining ', selectedTank.name)
                    //todo - empty tank function
                    selectedTank.image = tankEmptyFrontImage;
                    selectedTank.selectedImg = tankEmptyFrontImageSelected;
                    selectedTank.unselectedImg = tankEmptyFrontImage;
                    selectedTank.isEmpty = true;
                }
                unselectAllBlueprintItems();
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
            sprite.selectSprite();
        }else{
            canvas.style.cursor = 'default';
            if(sprite.selected){return;}
            sprite.unselectSprite();
        }
    });
});