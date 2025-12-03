class Tank {
    constructor(name) {
        this.type = null;
        this.size = 20;
        this.name = name;
        this.fishes = [];
        this.element = this.makeTank();
        this.open = false;
    }

    makeTank(){
        const tankContainer = document.querySelector('.aquarium-container');
        const tank = document.createElement('div');
        tank.className = `aquarium ${this.type} ${this.name} hidden`;
        tankContainer.appendChild(tank);

        return tank;
    }

    totalFish(){
        return this.fishes.length;
    }
}