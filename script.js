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
    const tankContainer = document.querySelector(`.${focusedTank.name}`);
    const rect = tankContainer.getBoundingClientRect();
    return Math.floor(Math.random() * (rect.height - 250)) + rect.top;
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

fishOptions.forEach(option => {
    option.addEventListener('click', ()=>{
        unselectAllFish();
        option.classList.add('selected');
    })
});

buyButton.addEventListener('click', ()=>{
    const tankContainer = document.querySelector(`.${focusedTank.name}`);
    const option = document.querySelector('.selected');    
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
            x: rect.left,
            y: getRandomPositionHeight()
        });
        fishes.push(newFish); //all fish - todo remove eventually
        focusedTank.addFish(newFish)
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
    
    focusedTank.closeAquarium();

};

function openTank(tank, waterType){
    canvas.classList.add('hidden');
    aquariumContainer.classList.remove('hidden');
    addContainer.classList.remove('hidden');

    focusedTank = tanks.find(t => t.name === tank);
    focusedTank.type = waterType;
    focusedTank.openAquarium();
    
    console.log(tank, waterType, focusedTank)
    document.querySelector('.tank-title').textContent = `water type: ${focusedTank.type}`;
}

function unselectAllFish(){
    fishOptions.forEach(op=>{op.classList.remove('selected')});
}

// function updateTankFishCount(tankName) {
//     const tankElement = document.querySelector(`.aquarium[name="${tankName}"]`);
//     const tankInfo = filledAquariums.find(tank => tank.name === tankName);

//     tankElement.innerHTML = `
//         <div>${tankInfo.name}</div>
//         <div>${tankInfo.fishes.length}</div>
//     `;
// }
