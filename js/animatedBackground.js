const { random, atan2, cos, sin, hypot } = Math;
const max = 200;
const canvas = document.getElementById("canvas");
const $ = canvas.getContext('2d');
const particles = [];

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let point = {	x: width/2,	y: height/2 };
let hue = 0;

function Particle(){};

Particle.prototype = {
	init() {
		this.hue = hue + this.random(-20, 20); // Random variation around the base hue
		this.alpha = this.random(0.5, 1); // Initial brightness
		this.size = this.random(1, 3); // Smaller stars for realism
		this.x = this.random(0, width);
		this.y = this.random(0, height);
		this.velocity = 0; // Stars don't move much in realistic scenarios
		this.changed = null;
		this.changedFrame = 0;
		this.maxChangedFrames = 50;
		return this;
	}
	,
	/* draw(){
		$.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
		$.beginPath();
		$.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		$.stroke();
		this.update();
	}, */
	draw() {
		const gradient = $.createRadialGradient(
			this.x, this.y, 0, // Inner circle (center)
			this.x, this.y, this.size // Outer circle (edges)
		);
		gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${this.alpha})`); // Bright center
		gradient.addColorStop(1, `hsla(${this.hue}, 100%, 20%, 0)`); // Fading edges
	
		$.fillStyle = gradient;
		$.beginPath();
		$.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		$.fill();
	
		this.update();
	},	
	update() {
		if (this.changed) {
			this.alpha *= 0.92; // Fade out over time
			this.size -= 0.5; // Shrink instead of growing
	
			if (this.size <= 0) {
				this.reset(); // Reset once the particle disappears
			}
	
			this.changedFrame++;
			if (this.changedFrame > this.maxChangedFrames) {
				this.reset();
			}
		} else if (this.distance(point.x, point.y) < 50) {
			this.changed = true; // Trigger the "explosion" state
		} else {
			let dx = point.x - this.x;
			let dy = point.y - this.y;
			let angle = atan2(dy, dx);
	
			this.alpha += 0.01; // Gradual fade-in
			this.x += this.velocity * cos(angle); // Move toward the point
			this.y += this.velocity * sin(angle); // Move toward the point
			this.velocity += 0.02; // Increase velocity over time
		}
	},
	reset(){
		this.init();
	},
	distance(x, y){
		return hypot(x - this.x, y - this.y);	
	},
	random(min, max) {
  	return random() * (max - min) + min;
	}
}

function animate(){
	$.fillStyle = `rgba(0,0,0, .2)`;
	$.fillRect(0, 0, width, height);
	particles.forEach((p) => {
		p.draw();
	});
	hue += .3;
	window.requestAnimationFrame(animate);
}

function touches(e){
	point.x = e.touches ? e.touches[0].clientX : e.clientX;
	point.y = e.touches ? e.touches[0].clientY : e.clientY;
}

function setup(){
	for(let i=0; i<max; i++){
		setTimeout(() => {
			let p = new Particle().init();
			particles.push(p);
		}, i * 500);
	}
	
	canvas.addEventListener("mousemove", touches);
	canvas.addEventListener("touchmove", touches);
	canvas.addEventListener("mouseleave", () => {
		point = {	x: width/2,	y: height/2 };
	});
	window.addEventListener("resize", () => {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
		point = {	x: width/2,	y: height/2 };
	});
	animate();
}

setup();