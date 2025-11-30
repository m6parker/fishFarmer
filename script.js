const fishOptions = document.querySelectorAll('.fish-option');
const buyButton = document.querySelector('.buy-button');
let fishes = [];
let filledAquariums = [];
let tankCounter = 1;
let currentTank = '';
let goldfish = {
    species: 'goldfish',
    speed: 3,
    type: 'freshwater',
    disposition: 'friendly'
};
let neonTetra = {
    species: 'neonTetra',
    speed: 5,
    type: 'tropical',
    disposition: 'friendly'
};
let minnow = {
    species: 'minnow',
    speed: 5,
    type: 'freshwater',
    disposition: 'friendly'
};
let tigerBarb = {
    species: 'tigerBarb',
    speed: 4,
    type: 'tropical',
    disposition: 'aggressive'
};
let fishSpecies = [
    goldfish,
    tigerBarb,
    minnow,
    neonTetra
]

// place fish in the tank at random heights using the tanks boundaries
function getRandomPositionHeight(){
    // console.log(rect)
    const tankContainer = document.querySelector(`.${currentTank}`);
    const rect = tankContainer.getBoundingClientRect();
    return Math.floor(Math.random() * rect.height-50) + rect.top;
}
// fish = type, tank, speed, x, y
// const tetra = new Fish('neon-tetra', 'tank1', 5, rect.left, getRandomPositionHeight());
// const tetra2 = new Fish('neon-tetra', 'tank1', 5, rect.left, getRandomPositionHeight());
// const tetra3 = new Fish('neon-tetra', 'tank1', 5, rect.left, getRandomPositionHeight());
// const goldfish = new Fish('goldfish', 'tank1', 2, rect.left, getRandomPositionHeight());
// const tigerBarb = new Fish('tiger-barb', 'tank1', 3, rect.left, getRandomPositionHeight());
// const minnow = new Fish('minnow', 'tank1', 3, rect.left, getRandomPositionHeight());

function loop() {
    // tetra.swim();
    // tetra2.swim();
    // tetra3.swim();
    // goldfish.swim();
    // tigerBarb.swim();
    // minnow.swim();
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

    if(species){
        const newFish = new Fish(
            option.textContent,
            currentTank,
            species.speed,
            rect.left,
            getRandomPositionHeight()
        );
        fishes.push(newFish);
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
            showSelectedTankUpClose(aquarium.textContent);
            currentTank = aquarium.textContent;
            console.log('currentTank: ', currentTank)
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
});

waterOptions.forEach(option => {
    option.addEventListener('click', ()=>{
        unselectAllWater();
        option.classList.add('selected-water');
    });
});

document.querySelector('.fill-button').addEventListener('click', ()=>{
    const selectedWater = document.querySelector('.selected-water');
    const selectedTank = document.querySelector('.selected-tank');
    const tankName = `tank${tankCounter}`;
    tankCounter++;
    console.log('filled tank with ', selectedWater.textContent)

    const newTank = new Tank(selectedWater.textContent, 20, tankName);
    selectedTank.classList.remove('empty');
    selectedTank.textContent = newTank.name;
    selectedTank.classList.add(`${selectedWater.textContent}`)
    filledAquariums.push(newTank.name);

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
    console.log(sideViewTanks)
    sideViewTanks.forEach(op=>{op.classList.add('hidden')});
}
function showSelectedTankUpClose(tankName){
    document.querySelector(`.${tankName}`).classList.remove('hidden')
}