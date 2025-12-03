class Fish {
    constructor({type, tank, speed, disposition, x, y}) {
        this.type = type;
        this.tank = tank;
        this.speed = speed;
        this.disposition = disposition
        this.direction = 'right';
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
        // tankContainer.appendChild(fish);

        fish.addEventListener('click', this.handleFishClick.bind(this));

        fish.addEventListener('mouseover', ()=> {
            fish.style.border = '3px solid white';
            fish.style.borderRadius = '10px';
        });
        fish.addEventListener('mouseout', ()=> {
            fish.style.border = 'none';
        });

        return fish;
    }

    handleFishClick(event){
        event.stopPropagation();
        console.log('clicked ', this.type, this.tank);
        const info = document.querySelector('.fish-info');
        this.calculateHappiness();

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
    }

    swim(){
        const tankContainer = document.querySelector(`.${this.tank.name}`);
        const rect = tankContainer.getBoundingClientRect();
        if(this.selected){ return; }

        if (this.direction === 'right') {
            this.x += this.speed;
            if (this.x > rect.right - 110) {
                this.x = rect.right - 110;
                this.direction = 'left';
                this.element.classList = `fish ${this.type} fish-left`;
            }
        } else {
            this.x -= this.speed;
            if (this.x < rect.left+70) {
                this.x = rect.left+70;
                this.direction = 'right';
                this.element.classList = `fish ${this.type} fish-right`;
            }
        }
        this.element.style.left = `${this.x}px`;
    }

    calculateHappiness(){
        //todo - based off schooling and water type/temp
        let happiness = 100;
        if(this.tank.fishes.length > 10){
            happiness = happiness - 25;
        }
        return `${happiness}%`;
    }

    render(aquarium){
        // Only render if the fishs tank is open
        if (this.tank.open) {
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;

            // keeps click listeners working
            if (!this.element.parentElement) {
                aquarium.appendChild(this.element);
            }
            this.swim();
        }
    }
}