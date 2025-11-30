class Tank {
    constructor(type, size, name) {
        this.type = type;
        this.size = size;
        this.name = this.name;
        this.fishes = [];
        this.element = this.makeTank();
    }

    makeTank(){
        const tankContainer = document.querySelector('.tank-container');
        const tank = document.createElement('div');
        tank.className = `tank ${this.type}`;
        tankContainer.appendChild(tank);
    }
}