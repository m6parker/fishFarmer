class Decor{
    constructor({type, tank, x, y}){
        this.type = type;
        this.tank = tank;
        this.x = x;
        this.y = y;
        this.element = this.makeDecor();
    }

    makeDecor(){
        const tankContainer = document.querySelector(`.${this.tank.name}`);
        const decor = document.createElement('div');
        decor.className = `decor ${this.type}`;
        decor.style.left = `${this.x}px`;
        decor.style.top = `${this.y}px`;
        decor.style.backgroundImage = `url('img/decor/${this.type}1.png')`
        tankContainer.appendChild(decor);

        return decor;
    }
}