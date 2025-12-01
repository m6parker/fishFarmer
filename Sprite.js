class Sprite{
    constructor({position, image, height, width, selectedImg}){
        this.position = position;
        this.image = image;
        this.height = height;
        this.width = width;
        this.selected = false;
        this.selectedImg = image;
        this.unselectedImg = image;
        
    }

    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    // selecting image highlights border
    selectSprite(){
        this.selected ? this.image = this.selectedImg : this.image = this.unselectedImg;
    }
}