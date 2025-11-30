const tankContainer = document.querySelector('.tank');
const fishOptions = document.querySelectorAll('.fish-option');
const buyButton = document.querySelector('.buy-button');
let fishes = [];
// place fish in the tank at random heights using the tanks boundaries
function getRandomPositionHeight(){
    // console.log(rect)
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
        fishOptions.forEach(op=>{op.classList.remove('selected')});
        option.classList.add('selected');
    })
});

buyButton.addEventListener('click', ()=>{
    const option = document.querySelector('.selected');
    console.log('cicked', option.textContent)
    const rect = tankContainer.getBoundingClientRect();

    // todo - need to keep track of different fish speeds/qualities
    const newFish = new Fish(option.textContent, 'tank1', 3, rect.left, getRandomPositionHeight());
    fishes.push(newFish)
});

const aquariums = document.querySelectorAll('.aquarium');
const topView = document.querySelector('.top-view');
const sideView = document.querySelector('.side-view');
aquariums.forEach(aquarium => {
    aquarium.addEventListener('click', ()=>{
        if(aquarium.classList.contains('empty')){
            aquarium.classList.remove('empty');     
        }else{
            topView.classList.add('hidden');
            sideView.classList.remove('hidden');
        }
    });
});

const mapButton = document.querySelector('.map-button');
mapButton.addEventListener('click', ()=>{
    topView.classList.remove('hidden');
    sideView.classList.add('hidden');
});