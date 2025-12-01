const fishOptions = document.querySelectorAll('.fish-option');
const buyButton = document.querySelector('.buy-button');
let MONEY = 0;
let fishes = [];
let filledAquariums = [];
let tankCounter = 1;
let currentTank = '';
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
    const tankContainer = document.querySelector(`.${currentTank}`);
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
    const tankContainer = document.querySelector(`.${currentTank}`);
    const option = document.querySelector('.selected');
    const rect = tankContainer.getBoundingClientRect();
    const species = fishSpecies.find(fish => fish.species === option.id);
    const focusedTank = filledAquariums.find(tank => tank.name === currentTank);

    if(species){
        const newFish = new Fish(
            option.textContent,
            focusedTank.name,
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

const aquariums = document.querySelectorAll('.aquarium');
const topView = document.querySelector('.top-view');
const sideView = document.querySelector('.side-view');
const waterOptionContainer = document.querySelector('.water-options');
const waterOptions = document.querySelectorAll('.water-option');
aquariums.forEach(aquarium => {
    aquarium.addEventListener('click', ()=>{
        unselectAllTanks();
        aquarium.classList.add('selected-tank');
        console.log(filledAquariums)
        if(aquarium.classList.contains('empty')){
            waterOptionContainer.classList.remove('hidden');
        }else{
            topView.classList.add('hidden');
            sideView.classList.remove('hidden');
            currentTank = aquarium.getAttribute('name');
            showSelectedTankUpClose(currentTank);
        }
    });
});

const mapButton = document.querySelector('.map-button');
mapButton.addEventListener('click', ()=>{
    hideAllSideViewTanks();
    topView.classList.remove('hidden');
    sideView.classList.add('hidden');
    unselectAllFish();
    unselectAllTanks();

    updateTankFishCount(currentTank);
});

waterOptions.forEach(option => {
    option.addEventListener('click', ()=>{
        unselectAllWater();
        option.classList.add('selected-water');
    });
});

const fillButton = document.querySelector('.fill-button');
fillButton.addEventListener('click', ()=>{
    const selectedWater = document.querySelector('.selected-water');
    if(!selectedWater){return;}
    const selectedTank = document.querySelector('.selected-tank');
    const tankName = `tank${tankCounter}`;
    selectedTank.setAttribute('name', tankName)
    tankCounter++;

    const newTank = new Tank(selectedWater.textContent, 20, tankName);
    selectedTank.classList.remove('empty');
    selectedTank.innerHTML = `
        <div>${newTank.name}</div>
        <div>${newTank.fishes.length}</div>
    `;
    selectedTank.classList.add(selectedWater.textContent)
    filledAquariums.push(newTank);

    waterOptionContainer.classList.add('hidden');
    unselectAllTanks();
    unselectAllWater();
});


function unselectAllTanks(){
    aquariums.forEach(op=>{op.classList.remove('selected-tank')});
}
function unselectAllFish(){
    fishOptions.forEach(op=>{op.classList.remove('selected')});
}
function unselectAllWater(){
    waterOptions.forEach(op=>{op.classList.remove('selected-water')});
}
function hideAllSideViewTanks(){
    const sideViewTanks = document.querySelectorAll('.tank');
    sideViewTanks.forEach(op=>{op.classList.add('hidden')});
}
function showSelectedTankUpClose(tankName){
    console.log(tankName)
    document.querySelector(`.${tankName}`).classList.remove('hidden');
}
function updateTankFishCount(tankName) {
    const tankElement = document.querySelector(`.aquarium[name="${tankName}"]`);
    const tankInfo = filledAquariums.find(tank => tank.name === tankName);

    tankElement.innerHTML = `
        <div>${tankInfo.name}</div>
        <div>${tankInfo.fishes.length}</div>
    `;
}
