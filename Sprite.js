class Sprite{
    constructor({position, image, height, width, selectedImg, name, isEmpty=true, unselectedImg=null}){
        this.position = position;
        this.image = image;
        this.height = height;
        this.width = width;
        this.selected = false;
        this.selectedImg = selectedImg;
        this.unselectedImg = unselectedImg;
        this.name = name;
        this.isEmpty = isEmpty;
        
    }

    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    // selecting image highlights border
    selectSprite(){
        // this.selected ? this.image = this.selectedImg : this.image = this.unselectedImg;
        this.image = this.selectedImg;
    }

    unselectSprite(){
        // this.image = this.unselectedImg;
        this.image = this.unselectedImg;
    }
}