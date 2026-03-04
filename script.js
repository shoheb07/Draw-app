const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const eraser = document.getElementById("eraser");
const clearCanvas = document.getElementById("clearCanvas");
const saveImage = document.getElementById("saveImage");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.8;

let painting = false;
let currentColor = "#000000";

colorPicker.addEventListener("change", (e)=>{
    currentColor = e.target.value;
});

eraser.addEventListener("click", ()=>{
    currentColor = "#ffffff";
});

function startPosition(e){
    painting = true;
    draw(e);
}

function endPosition(){
    painting = false;
    ctx.beginPath();
}

function draw(e){
    if(!painting) return;

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

clearCanvas.addEventListener("click", ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

saveImage.addEventListener("click", ()=>{
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
});
