class Fish {
    constructor(type, tank, speed, x, y) {
        this.type = type;
        this.tank = tank;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.element = this.makeFish();
        this.selected = false;

    }
    
    makeFish(){
        const tankContainer = document.querySelector(`.${this.tank}`);
        const fish = document.createElement('div');
        fish.className = `fish ${this.type} fish-right`;
        fish.style.left = `${this.x}px`;
        fish.style.top = `${this.y}px`;
        fish.style.backgroundImage = `url('img/fish/${this.type}.png')`
        tankContainer.appendChild(fish);

        const info = document.querySelector('.fish-info');
        fish.addEventListener('click', ()=> {
            console.log('clicked ', this.type, this.tank);
            if(this.selected){
                this.selected = false;
                info.classList.add('hidden');
            }
            else{
                this.selected = true;    
                //show info
                info.classList.remove('hidden');
                info.innerHTML = `
                    <div>type: ${this.type}</div>
                    <div>tank: ${this.tank}</div>
                `;
                info.style.left = `${this.x}px`;
                info.style.top = `${this.y - 30}px`;

                // make him swim again after 3 seconds
                setTimeout(() => {
                    this.selected = false;
                    info.classList.add('hidden');
                }, 3000);
            }
        });
        fish.addEventListener('mouseover', ()=> {
            fish.style.border = '3px solid white';
            fish.style.borderRadius = '10px';
        });
        fish.addEventListener('mouseout', ()=> {
            fish.style.border = 'none';
        });

        return fish;
    }

    swim(){
        const tankContainer = document.querySelector(`.${this.tank}`);
        const rect = tankContainer.getBoundingClientRect();
        if(this.selected){ return; }

        if (this.direction === 'right') {
            this.x += this.speed;
            if (this.x > rect.right - 100) {
                this.x = rect.right - 100;
                this.direction = 'left';
                this.element.classList = `fish ${this.type} fish-left`;
            }
        } else {
            this.x -= this.speed;
            if (this.x < rect.left) {
                this.x = rect.left;
                this.direction = 'right';
                this.element.classList = `fish ${this.type} fish-right`;
            }
        }
        this.element.style.left = `${this.x}px`;
    }
}