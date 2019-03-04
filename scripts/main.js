let canvas = document.getElementById("canvas");
let buffer = canvas.getContext("2d");
drw.bindContext(buffer);

let genCounter = document.getElementById("genCounter");

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
        this.pos = addVectors(this.pos, this.vel);
        this.vel.y += 0.3;
    }
}

function getFitnesses(averageDistances)
{
    let fitnesses = [];
    let total = 0;
    for(let i = 0; i < averageDistances.length; ++i)
    {
        total += averageDistances[i];
    }
    
    for(let i = 0; i < averageDistances.length; ++i)
    {
        fitnesses.push((total - averageDistances[i]) / total);
    }
    
    return fitnesses;
}

function eval()
{
    for(let i = 0; i < population; ++i)
    {
        averageDistances[i] += subtractVectors(projectiles[i].pos, target).getMagnitude();
    }
    
    if(attempt >= maxAttempts)
    {
        for(let i = 0; i < population; ++i)
        {
            averageDistances[i] = averageDistances[i] / maxAttempts;
        }
        
        fitnesses = getFitnesses(averageDistances);
        sortNeuralNets(netList, fitnesses);
        successRates = getSuccessRates(fitnesses);
        netList = getNextGen(netList, successRates);
        
        for(let i = 0; i < population; ++i)
        {
            averageDistances[i] = 0;
        }
        
        generation++;
        attempt = 1;
        
        genCounter.innerHTML = "Generation: " + generation;
    }
    
    for(let i = 0; i < population; ++i)
    {
        projectiles[i].pos.x = 100;
        projectiles[i].pos.y = 500;
    }
    
    target.x = getRand(600, 700);
    target.y = getRand(100, 700);
    
    attempt++;
    
    main();
}

function simulate()
{
    buffer.clearRect(0, 0, canvas.width, canvas.height);

    drw.circle(target, "#ff0000", 10);

    for(let i = 0; i < population; i++)
    {
        drw.circle(projectiles[i].pos, "#ffffff", 10);
        projectiles[i].update();
    }
    
    if(projectiles[0].pos.x < target.x)
        requestAnimationFrame(simulate);
    else
        requestAnimationFrame(eval);
}

function main()
{
    for(let i = 0; i < population; ++i)
    {
        netList[i].input([target.x, target.y]);
        projectiles[i].launch(15, netList[i].getOutput()[0] * 15);
    }
    
    if(generation < maxGenerations)
        requestAnimationFrame(simulate);
}

let target = new Vector(getRand(600, 700), getRand(100, 700));

let population = 20;

let maxGenerations = 100;
let generation = 0;

let maxAttempts = 10;
let attempt = 1;

let fitnesses = [];
let successRates = [];

let projectiles = [];
let netList = [];
let averageDistances = [];
for(let i = 0; i < population; i++)
{
    projectiles.push(new Projectile(100, 500));
    netList.push(new MLP(2, 8, 1));
    averageDistances.push(0);
}

main();
