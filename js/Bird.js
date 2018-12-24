class Bird {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector();
        this.acceleration = createVector();
    }

    show() {
        strokeWeight(10);
        stroke(255);
        point(this.position.x, this.position.y);
    }

}