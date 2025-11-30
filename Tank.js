class Tank {
    constructor(type, size, name) {
        this.type = type;
        this.size = size;
        this.name = name;
        this.fishes = [];
        this.element = this.makeTank();
    }

    makeTank(){
        const tankContainer = document.querySelector('.tank-container');
        const tank = document.createElement('div');
        tank.className = `tank ${this.type} ${this.name} hidden`;
        tankContainer.appendChild(tank);
    }
}