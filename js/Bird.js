class Bird {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.2;
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

    // steer towards average heading of neighbours
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

    // steer towards average position of neighbours(long range attraction)
    cohesion(birds) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let bird of birds) {
            let d = dist(this.position.x, this.position.y, bird.position.x, bird.position.y);
            if (d < perceptionRadius && bird !== this) {
                steering.add(bird.position);
                total++;
            }
        }
        if (total > 0) {
            // get average neighbors velocity
            steering.div(total);
            steering.sub(this.position);
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

    // avoid crowding neighbours(short range repulsion)
    separation(birds) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let bird of birds) {
            let d = dist(this.position.x, this.position.y, bird.position.x, bird.position.y);
            if (d < perceptionRadius && bird !== this) {
                let diff = p5.Vector.sub(this.position, bird.position);
                // closer you are to the neighbor stronger the repulsion
                diff.div(d);
                steering.add(diff);
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
        // calculate cohesion force
        let cohesion = this.cohesion(birds);
        // calculate separation force
        let separation = this.separation(birds);

        // scale forces
        alignment.mult(alignmentSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());

        // use add to apply all forces
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        // reset acceleration
        this.acceleration.set(0, 0);
    }

    show() {
        strokeWeight(10);
        stroke(255);
        point(this.position.x, this.position.y);
    }

}