const aquariumContainer = document.querySelector('.aquarium-container');
const addContainer = document.querySelector('.add-container');
const fishOptions = document.querySelectorAll('.fish-option');
const buyButton = document.querySelector('.buy-button');

let focusedTank;
let MONEY = 0;
let filledAquariums = [];
let fishes = [];
let tankCounter = 1;
let goldfish = {
    species: 'goldfish',
    speed: 3,
    type: 'freshwater',
    disposition: 'friendly',
    school: false
};
let neonTetra = {
    species: 'neonTetra',
    speed: 5,
    type: 'tropical',
    disposition: 'friendly',
    school: true
};
let minnow = {
    species: 'minnow',
    speed: 5,
    type: 'freshwater',
    disposition: 'friendly',
    school: true
};
let tigerBarb = {
    species: 'tigerBarb',
    speed: 4,
    type: 'tropical',
    disposition: 'aggressive',
    school: true
};
let fishSpecies = [
    goldfish,
    tigerBarb,
    minnow,
    neonTetra
]

// place fish in the tank at random heights using the tanks boundaries
function getRandomPositionHeight(){
    const tankContainer = document.querySelector(`.open`);
    const rect = tankContainer.getBoundingClientRect();
    return Math.floor(Math.random() * (rect.height - 50)) + rect.top;
}

function loop() {
    fishes.forEach(fish => {
        fish.swim();
    });
    requestAnimationFrame(loop);
}
loop();

fishOptions.forEach(option => {
    option.addEventListener('click', ()=>{
        unselectAllFish();
        option.classList.add('selected');
    })
});

buyButton.addEventListener('click', ()=>{
    const tankContainer = document.querySelector(`.aquarium`);
    const option = document.querySelector('.selected');
    const rect = tankContainer.getBoundingClientRect();
    const species = fishSpecies.find(fish => fish.species === option.id);
    // const focusedTank = document.querySelector('.open');

    if(species){
        const newFish = new Fish(
            option.textContent,
            // focusedTank.name,
            focusedTank,
            species.speed,
            species.disposition,
            rect.left,
            getRandomPositionHeight()
        );
        fishes.push(newFish);
        focusedTank.fishes.push(newFish)
    }else{
        console.log('error adding fish')
    }
});

//create tanks
const tank1 = new Tank('tank1');
const tank2 = new Tank('tank2');
const tank3 = new Tank('tank3');

const tanks = [tank1, tank2, tank3];

const mapButton = document.querySelector('.map-button');
mapButton.addEventListener('click', ()=>{
    openNotebook();
});

function openNotebook(){
    canvas.classList.remove('hidden');
    aquariumContainer.classList.add('hidden');
    addContainer.classList.add('hidden');

    //close all tanks
    // tank1.classList.remove('open')
    // tank2.classList.remove('open')
    // tank3.classList.remove('open')
    focusedTank.open = false;
};

function openTank(tank, waterType){
    canvas.classList.add('hidden');
    aquariumContainer.classList.remove('hidden');
    addContainer.classList.remove('hidden');

    focusedTank = tanks.find(t => t.name === tank);
    focusedTank.type = waterType;
    focusedTank.open = true;
    
    document.querySelector(`.${tank}`).classList.remove('hidden');
    document.querySelector(`.${tank}`).classList.add('open');

    console.log(tank, waterType, focusedTank)
    document.querySelector('.tank-title').textContent = `water type: ${focusedTank.type}`;
}
//     hideAllSideViewTanks();
//     // topView.classList.remove('hidden');
//     canvas.classList.remove('hidden')
//     sideView.classList.add('hidden');
//     unselectAllFish(); 
//     unselectAllTanks();

//     updateTankFishCount(currentTank);
// });

// // waterOptions.forEach(option => {
// //     option.addEventListener('click', ()=>{
// //         unselectAllWater();
// //         option.classList.add('selected-water');
// //     });
// // });

// // const fillButton = document.querySelector('.fill-button');
// // fillButton.addEventListener('click', ()=>{
// //     const selectedWater = document.querySelector('.selected-water');
// //     if(!selectedWater){return;}
// //     const selectedTank = document.querySelector('.selected-tank');
// //     const tankName = `tank${tankCounter}`;
// //     selectedTank.setAttribute('name', tankName)
// //     tankCounter++;

// //     const newTank = new Tank(selectedWater.textContent, 20, tankName);
// //     selectedTank.classList.remove('empty');
// //     selectedTank.innerHTML = `
// //         <div>${newTank.name}</div>
// //         <div>${newTank.fishes.length}</div>
// //     `;
// //     selectedTank.classList.add(selectedWater.textContent)
// //     filledAquariums.push(newTank);

// //     waterOptionContainer.classList.add('hidden');
// //     unselectAllTanks();
// //     unselectAllWater();
// // });


// function unselectAllTanks(){
//     aquariums.forEach(op=>{op.classList.remove('selected-tank')});
// }
function unselectAllFish(){
    fishOptions.forEach(op=>{op.classList.remove('selected')});
}
// function unselectAllWater(){
//     waterOptions.forEach(op=>{op.classList.remove('selected-water')});
// }
// function hideAllSideViewTanks(){
//     const sideViewTanks = document.querySelectorAll('.tank');
//     sideViewTanks.forEach(op=>{op.classList.add('hidden')});
// }
// function showSelectedTankUpClose(tankName){
//     console.log(tankName)
//     document.querySelector(`.${tankName}`).classList.remove('hidden');
// }
// function updateTankFishCount(tankName) {
//     const tankElement = document.querySelector(`.aquarium[name="${tankName}"]`);
//     const tankInfo = filledAquariums.find(tank => tank.name === tankName);

//     tankElement.innerHTML = `
//         <div>${tankInfo.name}</div>
//         <div>${tankInfo.fishes.length}</div>
//     `;
// }
