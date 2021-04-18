
rightPanel = document.querySelector(".storage-txt");



var canvas = document.querySelector(".grid-container");
let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;
canvas.style.height = clientHeight + "px";
rightPanel.style.height = clientHeight -100 + "px";
rightPanel.style.width = clientWidth - 30 + "px";
console.log(clientWidth);

let firstTouchX = 0;




//Получение холста и его контекста
// const canvas = document.querySelector("grid-container");
console.log(canvas)
// const ctx = canvas.getContext("2d");

//Чувствительность — количество пикселей, после которого жест будет считаться свайпом
const sensitivity = 100;

//Получение поля, в котором будут выводиться сообщения
const msgBox = document.getElementById("msg-box");

var touchStart = null; //Точка начала касания
var touchPosition = null; //Текущая позиция
let nowMargin = 0;
//Перехватываем события
canvas.addEventListener("touchstart", function (e) { TouchStart(e); }); //Начало касания
canvas.addEventListener("touchmove", function (e) { TouchMove(e); }); //Движение пальцем по экрану
//Пользователь отпустил экран
canvas.addEventListener("touchend", function (e) { TouchEnd(e, "green"); });
//Отмена касания
canvas.addEventListener("touchcancel", function (e) { TouchEnd(e, "red"); });

function TouchStart(e)
{
    //Получаем текущую позицию касания
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };
    nowMargin = canvas.style.marginLeft.split('px').join('');
    // firstTouchX = touchStart.x;
    // return firstTouchX;
    // Draw(touchPosition.x, touchPosition.y, 6, "blue"); //Рисуем точку начала касания
}

function TouchMove(e)
{
    //Получаем новую позицию
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    // Draw(touchPosition.x, touchPosition.y, 2); //Рисуем точку текущей позиции
    console.log((touchPosition.x - touchStart.x + +nowMargin) + "px")
    canvas.style.marginLeft = (touchPosition.x - touchStart.x + +nowMargin) + "px";
    console.log("nowMargin"+nowMargin)
    // leftPanel.style.marginLeft = touchPosition.x + "px";
    // leftPanel.style.marginTop = touchPosition.y + "px";
    // rightPanel.style.marginLeft = (touchPosition.x+200) + "px";
    // rightPanel.style.marginTop = touchPosition.y + "px";
}

function TouchEnd(e, color)
{
    // DrawLine(); //Рисуем линию между стартовой и конечной точками
    // Draw(touchPosition.x, touchPosition.y, 6, color); //Рисуем конечную точку
    CheckAction(); //Определяем, какой жест совершил пользователь
    // //Очищаем позиции
    touchStart = null;
    touchPosition = null;
    if (+(canvas.style.marginLeft.split('px').join(''))<(-(clientWidth))/2) {
        canvas.style.marginLeft = "-" + clientWidth + "px"
    } else {
        canvas.style.marginLeft = "0px"
    }
}

function CheckAction()
{
    var d = //Получаем расстояния от начальной до конечной точек по обеим осям
    {
   	 x: touchStart.x - touchPosition.x,
   	 y: touchStart.y - touchPosition.y
    };

    var msg = ""; //Сообщение

    // if(Math.abs(d.x) > Math.abs(d.y)) //Проверяем, движение по какой оси было длиннее
    // {
   	 if(Math.abs(d.x) > sensitivity) //Проверяем, было ли движение достаточно длинным
   	 {
   		 if(d.x > 0) //Если значение больше нуля, значит пользователь двигал пальцем справа налево
   		 {
   			 msg = "Swipe Left";
                // gridArea.style.marginLeft = "-" + clientWidth + "px"
            
   		 }
   		 else //Иначе он двигал им слева направо
   		 {
   			 msg = "Swipe Right";
                // gridArea.style.marginLeft = "0px"
   		 }
   	 }
    // }
    // else //Аналогичные проверки для вертикальной оси
    // {
   	//  if(Math.abs(d.y) > sensitivity)
   	//  {
   	// 	 if(d.y > 0) //Свайп вверх
   	// 	 {
   	// 		 msg = "Swipe up";
   	// 	 }
   	// 	 else //Свайп вниз
   	// 	 {
   	// 		 msg = "Swipe down";
   	// 	 }
   	//  }
    // }

    msgBox.innerText = msg; //Выводим сообщение

}

// function Draw(x, y, weight, color = "#000") //Функция рисования точки
// {
//     ctx.fillStyle = color;

//     let weightHalf = weight / 2;

//     ctx.fillRect(x - weightHalf, y - weightHalf, weight, weight);
// }

// function DrawLine() //Функция рисования линии
// {
//     ctx.strokeStyle = "#ccc";

//     ctx.beginPath();

//     ctx.moveTo(touchStart.x, touchStart.y);
//     ctx.lineTo(touchPosition.x, touchPosition.y);

//     ctx.stroke();
// }


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('real-time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
startTime()
  


var inputText = document.getElementById("fly-txt");
var startBtn = document.getElementById("fly-btn");
var storageText = document.querySelector(".storage-txt");
var animBox = document.querySelector(".anim-text"+idTxt);
var idTxt = 0;
posEnd=80;
function addTask () {
    console.log(inputText.value)
    if(inputText.value) {
    //   var textItem = createNewElement(inputText.value);
    var newDiv = document.createElement("div");
    newDiv.className="anim-text"+idTxt;
    newDiv.style.position="absolute";
    newDiv.style.display= "inline-block";
    newDiv.style.fontSize="30px"
    newDiv.innerText=inputText.value;
    storageText.appendChild(newDiv);
    inputText.value="";
    
            var movD = setInterval(moveDown, 1);
            var pos = 0;
            function moveDown() {
                var animBox = document.querySelector(".anim-text"+idTxt);
                if (pos == posEnd) {
                    
                    console.log(animBox.style.marginTop);
                    clearInterval(movD)
                    idTxt++;
                    console.log(animBox.style.clientHeight)
                    posEnd+=+(animBox.clientHeight)+10;
                    console.log(posEnd)
                } else {
                    pos+=1;
                    animBox.style.marginTop=pos+"px";
                    console.log(animBox.style.marginTop);
                }
            }

        
    }
}

startBtn.onclick=addTask;

