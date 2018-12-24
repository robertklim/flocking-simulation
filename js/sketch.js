let flock = [];

function setup() {
    createCanvas(600, 400);
    flock.push(new Bird());
}

function draw() {
    background(0);

    for (let bird of flock) {
        bird.show();
    }

}