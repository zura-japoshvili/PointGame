const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    drawPlayer (){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}

class Bullet {
    constructor(x, y, radius, color, speed){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
    }
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    update(){
        this.draw();
        this.x = this.x + this.speed.x;
        this.y = this.y + this.speed.y;
    }
}

class Enemy {
    constructor(x, y, radius, color, speed){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
    }
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    update(){
        this.draw();
        this.x = this.x + this.speed.x;
        this.y = this.y + this.speed.y;
    }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 20, 'blue');

const bullets = [];
const enemies = [];

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 5) + 5;
        let x;
        let y;

        if(Math.random() < 0.5){
            x = Math.random() < 0.5 ? 0 - radius: canvas.width + radius;
            y = Math.random() * canvas.height;
        }else{
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius: canvas.height + radius;
        }
        const color = "red";
        const angle = Math.atan2(
            canvas.height / 2 - y,
            canvas.width / 2 - x,
        )
        
        const speed = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x,y,radius,color,speed))

    }, 2000)
}

 
function animate (){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.drawPlayer();
    bullets.forEach((bullet) => {
    bullet.update()
    });

    enemies.forEach((Enemy, index) => {
        Enemy.update();

        bullets.forEach((bullet, bulletIndex) => {
            const dist = Math.hypot(bullet.x - Enemy.x, bullet.y - Enemy.y);
            if(dist - Enemy.radius - bullet.radius < 1){
                setTimeout(() =>{
                    enemies.splice(index, 1);
                    bullets.splice(bulletIndex, 1);
                }, 0);
            }
        });
    });
}

addEventListener("click", function(event) {
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2,
    )
    const speed = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    bullets.push(
        new Bullet(
            canvas.width / 2,
            canvas.height / 2, 
            5, "yellow", speed)  
    )
});

spawnEnemies();
animate();