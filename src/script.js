storageArea = document.querySelector(".storage-txt");



var mainArea = document.querySelector(".grid-container");
let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;
mainArea.style.height = clientHeight + "px";
storageArea.style.height = clientHeight - 200 + "px";
storageArea.style.width = clientWidth - 30 + "px";

mainArea.addEventListener("touchstart", function (e) { TouchStart(e); }); //Начало касания
mainArea.addEventListener("touchmove", function (e) { TouchMove(e); }); //Движение пальцем по экрану
mainArea.addEventListener("touchend", function () { TouchEnd(); }); //Прекращение движения по экрану

var touchStart = null; //Точка начала касания
var touchPosition = null; //Текущая позиция
let nowMargin = 0;

function TouchStart(e)
{
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };
    nowMargin = mainArea.style.marginLeft.split('px').join('');
}

function TouchMove(e)
{
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    mainArea.style.marginLeft = (touchPosition.x - touchStart.x + +nowMargin) + "px";
}

function TouchEnd()
{
    touchStart = null;
    touchPosition = null;
    if (+(mainArea.style.marginLeft.split('px').join(''))<(-(clientWidth))/2) {
        mainArea.style.marginLeft = "-" + clientWidth + "px"
    } else {
        mainArea.style.marginLeft = "0px"
    }
}


//Падающий текст

var inputText = document.getElementById("fly-txt");
var startBtn = document.getElementById("fly-btn");
var storageText = document.querySelector(".storage-txt");
//Класс для каждого падающего блока
var idTxt = 0;
var animBox = document.querySelector(".anim-text"+idTxt);

var posEnd=5;

//Добавление + анимация текста
function addText () {
    startBtn.disabled="disabled";
    if(inputText.value) {
        //создание нового уникального div
        var newDiv = document.createElement("div");
        //css свойства
        newDiv.className="anim-text"+idTxt;
        newDiv.style.position="absolute";
        newDiv.style.display= "inline-block";
        newDiv.style.fontSize="30px";
        newDiv.style.width = clientWidth - 30 + "px";
        newDiv.style.wordWrap= "break-word";
        newDiv.innerText=inputText.value;
        storageText.appendChild(newDiv);
        inputText.value="";
            //анимация
            var movD = setInterval(moveDown, 1);
            var pos = 0;
            function moveDown() {
                var animBox = document.querySelector(".anim-text"+idTxt);
                if (pos == posEnd) {
                    clearInterval(movD)
                    startBtn.disabled="";
                    idTxt++;
                    posEnd+=+(animBox.clientHeight);
                } else {
                    pos+=1;
                    animBox.style.marginTop=pos+"px";
                }
            }

        
    }
}
startBtn.onclick=addText;

