//Variables
var figureStack = [], figureStackCounter = 0, buttonDraw, buttonContinue, buttonAbort, 
cvs = document.getElementById("canvas"), color, x, y, x1, y1, l, angle, axiom, rule;
var figure;
var imgData = cvs.getContext('2d').createImageData(1, 1);

//Functions
//Собрать данные из полей
function collectFieldsData(){
    buttonDraw = document.getElementById("draw");
    buttonContinue = document.getElementById("continue");
    buttonAbort = document.getElementById("abort");
    cvs = document.getElementById("canvas");
    color = document.getElementById("color").value;
    l = document.getElementById("length").value;
    angle = document.getElementById("angle").value;
    axiom = document.getElementById("axiom").value;
    rule = document.getElementById("rule").value;
}
function collectFieldData(value){
    value.map(item => {
        switch(item){
            case 'draw':
                buttonDraw = document.getElementById(item); 
                break;
            case 'continue':
                buttonContinue = document.getElementById(item); 
                break;
            case 'color': 
                color = document.getElementById(item).value;
                break;
            case 'length': 
                l = document.getElementById(item).value;
                break;
        }
    });
}
//Изменить форму в зависимости от выбранного элемента списка
function changeFields(value){
    clickOnMainCanvas(value);
    switch(value){
        case 'fractal':
            //alert('Fractal');
            document.getElementById('angle-input').style.display = 'flex';
            document.getElementById('axiom-input').style.display = 'flex';
            document.getElementById('rule-input').style.display = 'flex';
            document.getElementById('length-input').style.display = 'flex';
            document.getElementById('forlength').innerHTML = 'Длина: ';
            document.getElementById('pattern-input').style.display = 'none';
            document.getElementById('continue').style.display = 'flex';
            document.getElementById('continue').value = 'Продолжить';
            document.getElementById('continue').style.display = 'flex';
            document.getElementById('abort').style.display = 'flex';
            document.getElementById("draw").disabled = false;
            document.getElementById("continue").disabled = true;
            document.getElementById("abort").disabled = true;
            break;
        case 'bezier':
            //Кривая Безье
            document.getElementById('angle-input').style.display = 'none';
            document.getElementById('axiom-input').style.display = 'none';
            document.getElementById('rule-input').style.display = 'none';
            document.getElementById('length-input').style.display = 'none';
            document.getElementById('pattern-input').style.display = 'none';
            document.getElementById("draw").disabled = true;
            document.getElementById('continue').value = 'Ввести точку';
            document.getElementById("continue").disabled = false;
            document.getElementById('continue').style.display = 'flex';
            document.getElementById('abort').style.display = 'flex';
            document.getElementById("abort").disabled = false;
            figure = new BezierCurve();
            break;
        case 'polygon':
            //Заполнение многоугольника
            document.getElementById('angle-input').style.display = 'none';
            document.getElementById('axiom-input').style.display = 'none';
            document.getElementById('rule-input').style.display = 'none';
            document.getElementById('length-input').style.display = 'none';
            document.getElementById('pattern-input').style.display = 'none';
            document.getElementById("draw").disabled = true;
            document.getElementById('continue').value = 'Ввести точку';
            document.getElementById("continue").disabled = false;
            document.getElementById('continue').style.display = 'flex';
            document.getElementById('abort').style.display = 'flex';
            document.getElementById("abort").disabled = false;
            figure = new Polygon();
            break;
        case 'brez-line':
            //Линия Брезенхама
            document.getElementById('angle-input').style.display = 'none';
            document.getElementById('axiom-input').style.display = 'none';
            document.getElementById('rule-input').style.display = 'none';
            document.getElementById('length-input').style.display = 'none';
            document.getElementById('pattern-input').style.display = 'none';
            document.getElementById("draw").disabled = false;
            document.getElementById('continue').style.display = 'none';
            document.getElementById('abort').style.display = 'flex';
            document.getElementById("abort").disabled = false;
            break;
        case 'brez-circle':
            //Окружность Брезенхама
            document.getElementById('angle-input').style.display = 'none';
            document.getElementById('axiom-input').style.display = 'none';
            document.getElementById('rule-input').style.display = 'none';
            document.getElementById('length-input').style.display = 'flex';
            document.getElementById('pattern-input').style.display = 'none';
            document.getElementById('forlength').innerHTML = 'Радиус: ';
            document.getElementById('continue').style.display = 'none';
            document.getElementById("draw").disabled = false;
            document.getElementById('pattern-input').style.display = 'none';
            document.getElementById('abort').style.display = 'flex';
            document.getElementById("abort").disabled = false;
            break;
        case 'pattern':
            document.getElementById('angle-input').style.display = 'none';
            document.getElementById('axiom-input').style.display = 'none';
            document.getElementById('rule-input').style.display = 'none';
            document.getElementById('length-input').style.display = 'none';
            document.getElementById('pattern-input').style.display = 'flex';
            document.getElementById('abort').style.display = 'flex';
            document.getElementById('continue').style.display = 'none';
            document.getElementById("draw").disabled = false;
            document.getElementById("abort").disabled = false;
            break;
        case 'rectangle':
            //Затравка
            document.getElementById('angle-input').style.display = 'none';
            document.getElementById('axiom-input').style.display = 'none';
            document.getElementById('rule-input').style.display = 'none';
            document.getElementById('length-input').style.display = 'none';
            document.getElementById('pattern-input').style.display = 'none';
            document.getElementById("draw").disabled = false;
            document.getElementById('continue').style.display = 'none';
            document.getElementById('abort').style.display = 'flex';
            document.getElementById("abort").disabled = false;
            break;
        default:
             //Затравка
            document.getElementById('angle-input').style.display = 'none';
            document.getElementById('axiom-input').style.display = 'none';
            document.getElementById('rule-input').style.display = 'none';
            document.getElementById('length-input').style.display = 'none';
            document.getElementById('pattern-input').style.display = 'none';
            document.getElementById("draw").disabled = false;
            document.getElementById('continue').style.display = 'none';
            document.getElementById('abort').style.display = 'flex';
            document.getElementById("abort").disabled = false;
            break;
    }
}
//Рисование на Canvas
function drawOnCanvas(value){
    collectFieldsData();
    switch(value){
        case 'bezier':
            if (figure.points.length < 2) alert('Введите хотя бы 2 точки');
            else{
                figure.drawBezierCurve(cvs.getContext("2d"), color);
                figureStack.push(figure);
                figure = new BezierCurve();
            }
            break;
        case 'polygon':
            figureStack.push(figure);
            figure.fillPolygon(cvs.getContext("2d"), color);
            break;
    }
}

function abortDrawing(value){
    //collectFieldsData();
    switch(value){
        case 'fractal':
            buttonDraw.disabled = false;
            buttonContinue.disabled = true;
            buttonAbort.disabled = true;
            break;
        case 'bezier':
            buttonDraw.disabled = true;
            figure = new BezierCurve();
            console.log('BEZIER CLEARED');
            break;
        case 'polygon':
            buttonDraw.disabled = true;
            figure = new Polygon();
            console.log('POLYGON CLEARED');
            break;
        case 'pattern':
            let ptrnCvs = document.getElementById("pattern");
            ptrnCvs.getContext("2d").clearRect(0, 0, ptrnCvs.width, ptrnCvs.height);
            break;
    }
    cvs.getContext("2d").clearRect(0, 0, cvs.width, cvs.height);
}
//Обработка нажатий на canvas
function clickOnMainCanvas(value){
    collectFieldData(['color']);
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    switch(value){
        //Линия Брезенхама
        case 'brez-line':
            canvas.onmousedown = (e) => {
                x = e.offsetX;
                y = e.offsetY;
            };
            canvas.onclick = (e) => {
                figure = new BresenhamLine(x, y, e.offsetX, e.offsetY);
                figureStackCounter++;
                figureStack.push(figure);
                figure.drawLine(canvas.getContext("2d"), color);
            }
            break;
        //Окружность Брезенхама
        case 'brez-circle':
            canvas.onclick = (e) => {
                collectFieldData(['length']);
                figure = new BresenhamCircle(e.offsetX, e.offsetY, Number(l));
                figureStackCounter++;
                figureStack.push(figure);
                figure.drawBresenhamCircle(canvas.getContext("2d"), color);
            }
            break;
        //Кривая Безье
        case 'bezier':
            collectFieldData(['draw']);
            canvas.onclick = (e) => {
                figure.addPivot(e.offsetX, e.offsetY);
                console.log(`X: ${e.offsetX}, Y: ${e.offsetY}`);
                if (figure.points.length >= 2) {
                    buttonDraw.disabled = false;
                }
            };
            break;
        //Заливка многоугольника
        case 'polygon':
            collectFieldData(['draw']);
            canvas.onclick = (e) => {
                figure.addPivot(e.offsetX, e.offsetY);
                console.log(`X: ${e.offsetX}, Y: ${e.offsetY}`);
                if (figure.points.length >= 3) {
                    buttonDraw.disabled = false;
                }
            };
            break;
        //Значение пиксела
        case 'test':
            canvas.onclick = (e) => {
                let imgData = context.getImageData(e.offsetX, e.offsetY, 1, 1);
            }
            break;
        //Заполнение области узором
        case 'pattern':
            canvas.onclick = (e) => {
                let background = context.getImageData(e.offsetX, e.offsetY, 1, 1); 
                let ptrnCvs = document.getElementById("pattern");
                let ptrnContext = ptrnCvs.getContext("2d");
                let ptrnData = ptrnContext.getImageData(0, 0, ptrnCvs.width, ptrnCvs.height);
                figure = new PixelPattern(ptrnData, context);
                figureStack.push(figure);
                figure.fillPattern(e.offsetX, e.offsetY, context, background);
            }
            break;
        //Заливка прямоугольника
        case 'rectangle':
            canvas.onmousedown = (e) => {
                x = e.offsetX;
                y = e.offsetY;
            };
            canvas.onclick = (e) => {                                                                                                            
                context.fillStyle = color;
                context.fillRect(x, y, e.offsetX - x, e.offsetY - y);                               
            }
            break;
        //Рекурсивный алгоритм заливки с затравкой
        case 'recursiveStartpoint':
            canvas.onclick = (e) => {
                let background = context.getImageData(e.offsetX, e.offsetY, 1, 1);                                                                                                                  
                let pixel = context.createImageData(1, 1);
                pixel.data[0] = hexToRgb(color).r;
                pixel.data[1] = hexToRgb(color).g;
                pixel.data[2] = hexToRgb(color).b;    
                pixel.data[3] = 255;    
                recursiveStartpoint(e.offsetX, e.offsetY, context, pixel, background);                      
            }
            break;
        //Модифицированный рекурсивный алгоритм заливки с затравкой
        case 'modifiedRecursiveStartpoint':
            canvas.onclick = (e) => {
                let background = context.getImageData(e.offsetX, e.offsetY, 1, 1);                                                                                                                  
                let pixel = context.createImageData(1, 1);
                pixel.data[0] = hexToRgb(color).r;
                pixel.data[1] = hexToRgb(color).g;
                pixel.data[2] = hexToRgb(color).b;    
                pixel.data[3] = 255;    
                modifiedRecursiveStartpoint(e.offsetX, e.offsetY, context, pixel, background);                      
            }
            break;
    } 

}
//Обработка поля паттерна
function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}
function ptrnMouseDown(){
    let patternX, patternY;
    let patternInput = document.getElementById("pattern");
    let patternContext = patternInput.getContext("2d");
    patternInput.onmousedown = (e) => {
        patternX = e.offsetX;
        patternY = e.offsetY;
    }
    patternInput.onmouseup = e => {
        collectFieldData(['color']); 
        patternContext.strokeStyle = color;
        patternContext.beginPath();
        patternContext.moveTo(patternX, patternY);
        patternContext.lineTo(e.offsetX, e.offsetY);
        patternContext.stroke();
    }
}
//Преобразование RGB из 16-ричного в цифровые значения
//Взято отсюда: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
    } : null;
}