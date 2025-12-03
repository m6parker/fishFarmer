class Fish {
    constructor({type, tank, speed, disposition, x, y}) {
        this.type = type;
        this.tank = tank;
        this.speed = speed;
        this.disposition = disposition
        this.x = x;
        this.y = y;
        this.element = this.makeFish();
        this.selected = false;
        this.happiness = this.calculateHappiness();
    }
    
    makeFish(){
        const tankContainer = document.querySelector(`.${this.tank.name}`);
        const fish = document.createElement('div');
        fish.className = `fish ${this.type} fish-right`;
        fish.style.left = `${this.x}px`;
        fish.style.top = `${this.y}px`;
        fish.style.backgroundImage = `url('img/fish/${this.type}.png')`
        console.log(tankContainer, fish, this)
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
                    <div>disposition: ${this.disposition}</div>
                    <div>happiness: ${this.happiness}</div>
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
        const tankContainer = document.querySelector(`.${this.tank.name}`);
        const rect = tankContainer.getBoundingClientRect();
        if(this.selected){ return; }

        if (this.direction === 'right') {
            this.x += this.speed;
            if (this.x > rect.right - 200) {
                this.x = rect.right - 200;
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

    calculateHappiness(){
        //todo - based off schooling and water type/temp

        console.log(this)

        return '100%';
    }

    render(){
        // Only render if the fishs tank is open
        if (this.tank.open) {
            const aquarium = document.querySelector(`.${this.tank.name}`);
            aquarium.appendChild(this.element);
        }
    }
}