let canvas = document.getElementById("canvas");
let buffer = canvas.getContext("2d");
drw.bindContext(buffer);



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
        this.vel.y += 0.3;
    }
}

let projectiles = [];

for(let i = 0; i < population; i++)
{
    projectiles.push(new Projectile(100, 500));
}

let target = new Vector(getRand(600, 700), getRand(100, 700));

let population = 10;
let maxIterations = 100;
let fitnesses = [];
let successRate = [];

function test()
{
    buffer.clearRect(0, 0, canvas.width, canvas.height);

    drw.circle(target, "#ffffff", 10);

    for(let i = 0; i < population; i++)
    {
        drw.circle(projectiles[i].pos, "#ffffff", 10);
        projectiles[i].update();
    }
    
    requestAnimationFrame(test);
}

function main()
{
}

requestAnimationFrame(main);
