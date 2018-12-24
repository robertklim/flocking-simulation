const flockSize = 100;

let flock = [];

function setup() {
    createCanvas(600, 400);
    for (let i = 0; i < flockSize; i++){
        flock.push(new Bird());
    }
}

function draw() {
    background(0);

    for (let bird of flock) {
        bird.edges();
        bird.flock(flock);
        bird.update();
        bird.show();
    }

}