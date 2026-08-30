const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
//height="600" width="800"
const centerY = canvas.height / 2;

// Move the origin to the center
ctx.translate(centerX, centerY);

// Flip the y-axis;
ctx.scale(1, -1);

// // Draw x-axis
// ctx.beginPath();
// ctx.moveTo(-centerX, 0);
// ctx.lineTo(centerX, 0);

// // Draw y-axis
// ctx.moveTo(0, -centerY);
// ctx.lineTo(0, centerY);

// ctx.stroke();

const gridSize = 25;

for(let x = gridSize; x <= centerX; x+=25){
    ctx.beginPath();
    
    ctx.moveTo(x, -centerY);
    ctx.lineTo(x, centerY);

    ctx.moveTo(-x, -centerY);
    ctx.lineTo(-x, centerY);

    ctx.stroke();
}

for(let y = gridSize; y <= centerY; y+=25){
    ctx.beginPath();

    ctx.moveTo(-centerX, y);
    ctx.lineTo(centerX, y);

    ctx.moveTo(-centerX, -y);
    ctx.lineTo(centerX, -y);

    ctx.stroke();
}

ctx.save();

ctx.scale(1, -1);
// X-axis labels
for(let x = gridSize; x <= centerX; x+=25){
    const value = x/gridSize;

    ctx.fillText(value, x+3, 15);
    ctx.fillText(-value, -x+3, 15);
}

// Y-axis labels
for(let y = gridSize; y <= centerY; y+=25){
    const value = y/gridSize;

    ctx.fillText(value, 15, -y+3);
    ctx.fillText(-value, 15, y+3);
}

ctx.restore();

const triangle = [
    {x : 1, y : 1},
    {x : 4, y : 1},
    {x : 2, y : 3}
]

function drawPoint(x, y){
    ctx.beginPath();
    ctx.arc(x*gridSize, y*gridSize, 5, 0, Math.PI *2);
    //ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
}

function drawTriangle(points){
    ctx.beginPath();

    ctx.moveTo(points[0].x*gridSize, points[0].y*gridSize);
    for(let i = 1; i < points.length; i++){
        ctx.lineTo(points[i].x*gridSize, points[i].y*gridSize);
    }

    ctx.closePath();
    ctx.stroke();
}

let currentTriangle = triangle;

function scalePoint(point, factor){
    return {
        x: point.x*factor,
        y: point.y*factor
    }
}

function scaleTriangle(points, factor){
    return points.map(point => scalePoint(point, factor));
}

currentTriangle = scaleTriangle(triangle, 2);

drawTriangle(currentTriangle);