let canvas = document.getElementById("canvas");
let buffer = canvas.getContext("2d");
drw.bindContext(buffer);

let population = 100;
let maxIterations = 100;
let fitnesses = [];
let successRate = [];

function Projectile(x, y)
{
    this.pos = new Vector(x, y);
    this.vel = new Vector();
    
    this.launch = function(x, y)
    {
        this.vel.x = x;
        this.vel.y = -y;
    }
    
    this.update = function()
    {
        this.pos = addVectors(this.pos, this.vel)
        this.vel.y += 0.5;
    }
}

let projectiles = [];

for(let i = 0; i < population; i++)
{
    projectiles.push(new Projectile(getRand(100, 700), getRand(100, 700)));
}

//testProjectile.launch(15, 15);

function test()
{
    for(let i = 0; i < population; i++)
    {
        drw.circle(projectiles[i].pos, "#ffffff", 10);
    }
    
    testProjectile.update();
    
    requestAnimationFrame(test);
}

requestAnimationFrame(test);