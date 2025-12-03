const aquariumContainer = document.querySelector('.aquarium-container');
const addContainer = document.querySelector('.add-container');

let focusedTank;
let MONEY = 0;
let filledAquariums = [];
let fishes = [];
let decor = [];
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
function getRandomPositionHeight(type){
    // todo - set bounds for differetn size tanks
    // const tankContainer = document.querySelector(`.${focusedTank.name}`);
    // const rect = tankContainer.getBoundingClientRect();
    // return Math.floor(Math.random() * (rect.height)-200) + rect.top;
    if(type==='fish'){
        // return (Math.random() * (550) + 300);
        return getRandomFloat(300, 850)
    }else if(type==='decor'){
        return (Math.random() * (850) + 300);
    }
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function loop() {
    const aquarium = document.querySelector('.aquarium');
    if(aquarium)aquarium.innerHTML = '';

    if (focusedTank && focusedTank.open) {
        focusedTank.showFish();
    }
    requestAnimationFrame(loop);
}
loop();

const fishOptions = document.querySelectorAll('.fish-option');
fishOptions.forEach(option => {
    option.addEventListener('click', ()=>{
        unselectAllFish();
        option.classList.add('selected-fish');
    })
});

const buyButton = document.querySelector('.buy-button');
buyButton.addEventListener('click', ()=>{
    const tankContainer = document.querySelector(`.${focusedTank.name}`);
    const option = document.querySelector('.selected-fish');    
    if (!option) {
        console.error("no fish selected!");
        return;
    }
    const rect = tankContainer.getBoundingClientRect();
    const species = fishSpecies.find(fish => fish.species === option.id);

    if(species){
        const newFish = new Fish({
            type: option.textContent,
            tank: focusedTank,
            speed: species.speed,
            disposition: species.disposition,
            x: rect.left +70,
            y: getRandomFloat(300, 800),
        });
        fishes.push(newFish); //all fish - todo remove eventually
        focusedTank.addFish(newFish)
    }else{
        console.log('error adding fish')
    }
});

const decorOptions = document.querySelectorAll('.decor-option');
decorOptions.forEach(option => {
    option.addEventListener('click', ()=>{
        unselectAllDecor();
        option.classList.add('selected-decor');
    })
});

document.querySelector('.buy-decor-button').addEventListener('click', ()=>{
    // const tankContainer = document.querySelector(`.${focusedTank.name}`);
    const option = document.querySelector('.selected-decor');    
    // const rect = tankContainer.getBoundingClientRect();

    if(option){
        const newDecor = new Decor({
            type: option.textContent,
            tank: focusedTank,
            x: getRandomPositionHeight('decor'),
            y: getRandomFloat(750, 770),
        });
        decor.push(newDecor);
    }else{
        console.log(`error adding ${decor.type}`)
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
    
    focusedTank.closeAquarium();

};

function openTank(tank, waterType){
    canvas.classList.add('hidden');
    aquariumContainer.classList.remove('hidden');
    addContainer.classList.remove('hidden');

    focusedTank = tanks.find(t => t.name === tank);
    focusedTank.openAquarium();
    focusedTank.changeWaterType(waterType);
    console.log(tank, focusedTank, waterType, focusedTank.type)
    
    document.querySelector('.tank-title').textContent = `water type: ${focusedTank.type}`;
}

function unselectAllFish(){
    fishOptions.forEach(op=>{op.classList.remove('selected-fish')});
}

function unselectAllDecor(){
    decorOptions.forEach(op=>{op.classList.remove('selected-decor')});
}

// function updateTankFishCount(tankName) {
//     const tankElement = document.querySelector(`.aquarium[name="${tankName}"]`);
//     const tankInfo = filledAquariums.find(tank => tank.name === tankName);

//     tankElement.innerHTML = `
//         <div>${tankInfo.name}</div>
//         <div>${tankInfo.fishes.length}</div>
//     `;
// }
