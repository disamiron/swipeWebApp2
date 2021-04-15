document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

const leftBar = document.querySelector(".left-panel");
const rightBar = document.querySelector(".right-panel");
// console.log(leftBar.offsetWidth);
// console.log(document.documentElement.clientWidth);
let clientWidth = document.documentElement.clientWidth+"px";
let clientWidthPx = document.documentElement.clientWidth/2;
console.log(clientWidthPx);
// document.body.style.width=clientWidth;
document.body.style.setProperty('width', clientWidth);
document.body.style.setProperty('max-width', clientWidth);
leftBar.style.width=clientWidth;
rightBar.style.width=clientWidth;
leftBar.style.zIndex=1;
rightBar.style.zIndex=0;

let x1 = null;
let y1 = null;

function handleTouchStart(event){
    const firstTouch = event.touches[0];
    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;
    console.log(x1+" "+y1)
}

function handleTouchMove(event){
    if(!x1||!y1) {
        return false
    } 
    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;
    let xDiff = x2-x1;
    let yDiff = y2-y1;
    if (Math.abs(xDiff)>Math.abs(yDiff)){
        if (xDiff>0){
            var pos = 0; 
            var movF = setInterval(moveLeft, 10)
            function moveLeft() {                            
                if (pos == clientWidthPx) {
                    clearInterval(movF);
                    changeZIndex ();
                    leftBar.style.left = "0px";
                    rightBar.style.left = "0px";
                } else if (leftBar.style.zIndex==1) {
                    pos+=10;
                    console.log(document.documentElement.clientWidth)
                    leftBar.style.left = pos + "px";
                    rightBar.style.left = "-"+ pos + "px";
                } else {
                    pos+=10;
                    console.log(document.documentElement.clientWidth)
                    leftBar.style.left = "-"+ pos + "px";
                    rightBar.style.left = pos + "px";
                }
            }
            
        } else {
            changeZIndex ()
        }
    }
    x1 = null;
    y1 = null;
}


function zIndexCheck (num) {
    if (num == 0) {
        return 1
    } else {
        return 0
    }
}

function changeZIndex () {
    leftBar.style.zIndex = zIndexCheck(leftBar.style.zIndex);
    rightBar.style.zIndex = zIndexCheck(rightBar.style.zIndex);
}



// function fromZeroToHero (num) {
//     if (clientWidthPx>num) {
//         num +=10;
//         leftBar.style.left = num+"px";
//     }
// }