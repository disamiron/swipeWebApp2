// var leftPanel = document.querySelector(".leftPanel");
// var rightPanel = document.querySelector(".rightPanel");



var gridArea = document.querySelector(".grid-container");
let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;
gridArea.style.height = clientHeight + "px";
console.log(gridArea.style.marginLeft);

let firstTouchX = 0;




//Получение холста и его контекста
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Чувствительность — количество пикселей, после которого жест будет считаться свайпом
const sensitivity = 20;

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
    console.log(touchStart.x)
    nowMargin = gridArea.style.marginLeft.split('px').join('');
    // firstTouchX = touchStart.x;
    // return firstTouchX;
    Draw(touchPosition.x, touchPosition.y, 6, "blue"); //Рисуем точку начала касания
}

function TouchMove(e)
{
    //Получаем новую позицию
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    Draw(touchPosition.x, touchPosition.y, 2); //Рисуем точку текущей позиции
    console.log((touchPosition.x - touchStart.x + +nowMargin) + "px")
    gridArea.style.marginLeft = (touchPosition.x - touchStart.x + +nowMargin) + "px";
    // leftPanel.style.marginLeft = touchPosition.x + "px";
    // leftPanel.style.marginTop = touchPosition.y + "px";
    // rightPanel.style.marginLeft = (touchPosition.x+200) + "px";
    // rightPanel.style.marginTop = touchPosition.y + "px";
}

function TouchEnd(e, color)
{
    DrawLine(); //Рисуем линию между стартовой и конечной точками
    Draw(touchPosition.x, touchPosition.y, 6, color); //Рисуем конечную точку
    CheckAction(); //Определяем, какой жест совершил пользователь
    // //Очищаем позиции
    touchStart = null;
    touchPosition = null;
}

function CheckAction()
{
    var d = //Получаем расстояния от начальной до конечной точек по обеим осям
    {
   	 x: touchStart.x - touchPosition.x,
   	 y: touchStart.y - touchPosition.y
    };

    var msg = ""; //Сообщение

    if(Math.abs(d.x) > Math.abs(d.y)) //Проверяем, движение по какой оси было длиннее
    {
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
    }
    else //Аналогичные проверки для вертикальной оси
    {
   	 if(Math.abs(d.y) > sensitivity)
   	 {
   		 if(d.y > 0) //Свайп вверх
   		 {
   			 msg = "Swipe up";
   		 }
   		 else //Свайп вниз
   		 {
   			 msg = "Swipe down";
   		 }
   	 }
    }

    msgBox.innerText = msg; //Выводим сообщение

}

function Draw(x, y, weight, color = "#000") //Функция рисования точки
{
    ctx.fillStyle = color;

    let weightHalf = weight / 2;

    ctx.fillRect(x - weightHalf, y - weightHalf, weight, weight);
}

function DrawLine() //Функция рисования линии
{
    ctx.strokeStyle = "#ccc";

    ctx.beginPath();

    ctx.moveTo(touchStart.x, touchStart.y);
    ctx.lineTo(touchPosition.x, touchPosition.y);

    ctx.stroke();
}


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
  
 