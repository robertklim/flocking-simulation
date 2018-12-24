class Bird {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.1;
        this.maxSpeed = 5;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    align(birds) {
        // align only with birds that you can see
        let perceptionRadius = 50;
        // calculate neighbors average velocity
        let steering = createVector();
        let total = 0;
        for (let bird of birds) {
            let d = dist(this.position.x, this.position.y, bird.position.x, bird.position.y);
            if (d < perceptionRadius && bird !== this) {
                steering.add(bird.velocity);
                total++;
            }
        }
        if (total > 0) {
            // get average neighbors velocity
            steering.div(total);
            // set speed
            steering.setMag(this.maxSpeed);
            // calculate steering force
            steering.sub(this.velocity);
            // limit steering force
            steering.limit(this.maxForce);
        }
        // return steering force
        return steering;
    }

    flock(birds) {
        // calculate alignment force
        let alignment = this.align(birds);
        // apply alignment
        this.acceleration = alignment;;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

    show() {
        strokeWeight(10);
        stroke(255);
        point(this.position.x, this.position.y);
    }

}