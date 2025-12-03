class Tank {
    constructor(name) {
        this.type;
        this.size = 20;
        this.name = name;
        this.fishes = [];
        this.element = this.makeTank();
        this.open = false;
    }

    makeTank(){
        const tankContainer = document.querySelector('.aquarium-container');
        const tank = document.createElement('div');
        tank.className = `aquarium ${this.name} hidden`;
        tankContainer.appendChild(tank);

        return tank;
    }

    totalFish(){
        return this.fishes.length;
    }

    showFish() {
        if (this.open) {
            this.fishes.forEach(fish => {
                fish.render(this.element);
            });
        }
    }

    openAquarium() {
        this.open = true;
        this.element.classList.remove('hidden');
    }

    closeAquarium() {
        this.open = false;
        this.element.classList.add('hidden');
    }

    addFish(fish) {
        this.fishes.push(fish);
    }

    changeWaterType(water){
        this.type = water;
        this.element.classList.add(`aquarium-${water}`);
    }


}