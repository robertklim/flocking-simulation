const flockSize = 100;

let flock = [];

let alignmentSlider, cehesionSlider, separationSlider;

function setup() {
    createCanvas(600, 400);

    // add controlls
    alignmentSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);

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