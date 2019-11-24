//import * as ColorConverter from './js/RGBConversion';
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
//Границы
function rangesVisible(){
    document.getElementById('range1-input').style.display = 'flex';
    document.getElementById('range2-input').style.display = 'flex';
}
function rangesInvisible(){
    document.getElementById('range1-input').style.display = 'none';
    document.getElementById('range2-input').style.display = 'none';
}
function fractalVisible(){
    document.getElementById('angle-input').style.display = 'flex';
    document.getElementById('axiom-input').style.display = 'flex';
    document.getElementById('rule-input').style.display = 'flex';
    document.getElementById('length-input').style.display = 'flex';
}
function fractalInvisible(){
    document.getElementById('angle-input').style.display = 'none';
    document.getElementById('axiom-input').style.display = 'none';
    document.getElementById('rule-input').style.display = 'none';
    document.getElementById('length-input').style.display = 'none';
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
            rangesInvisible();
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
            rangesInvisible();
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
            rangesInvisible();
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
            rangesInvisible();
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
            rangesInvisible();
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
            rangesInvisible();
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
            rangesInvisible();
            break;
        case 'img-contrast-filter':
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
            rangesVisible();
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
            rangesInvisible();
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
        //Оттенки серого
        case 'img-gray-filter':
            canvas.onmousedown = (e) => {
                x = e.offsetX;
                y = e.offsetY;
            };
            canvas.onclick = (e) => {      
                let background = context.getImageData(x,y, e.offsetX - x, e.offsetY - y);   
                for(let i = 0; i < background.height*background.width*4; i+=4){
                    background.data[i] = 0.299 * background.data[i];
                    background.data[i+1] = 0.587 * background.data[i+1];
                    background.data[i+2] = 0.114 * background.data[i+2];
                }
                console.log(background);  
                context.putImageData(background, x, y);                                                                                                                     
            }
            break;
        //Контрастное масштабирование на черном фоне
        case 'img-contrast-filter':
            canvas.onmousedown = (e) => {
                x = e.offsetX;
                y = e.offsetY;
            };
            canvas.onclick = (e) => {      
                let background = context.getImageData(x,y, e.offsetX - x, e.offsetY - y); 
                console.log(background);
                let fmin = Number(document.getElementById("range1").value);
                let fmax = Number(document.getElementById("range2").value);
                //console.log(fmin + ' ' + fmax);
                for(let i = 0; i < background.height*background.width*4; i+=4){
                    let brightness = 0.299*background.data[i] + 0.587*background.data[i+1] + 0.114*background.data[i+2];
                    //console.log(brightness);
                    if (brightness > fmin && brightness < fmax){
                        let a = 255/(fmax - fmin);
                        let b = (-(255*fmin))/(fmax - fmin);
                        let g = a*brightness + b;
                        let v = g/255;
                        let hsv = rgbToHsv(background.data[i], background.data[i+1], background.data[i+2]);
                        let rgb = hsvToRgb(hsv[0], hsv[1], v);
                        background.data[i] = rgb[0];
                        background.data[i+1] = rgb[1];
                        background.data[i+2] = rgb[2];                        
                    }
                    else{
                        background.data[i] = 0;
                        background.data[i+1] = 0;
                        background.data[i+2] = 0;
                    }
                }
                context.putImageData(background, x, y);                                                                                                                     
            }
            break;
        //Матричное преобразование
        case 'img-matrix-filter':
                canvas.onmousedown = (e) => {
                    x = e.offsetX;
                    y = e.offsetY;
                };
                canvas.onclick = (e) => {      
                    let background = context.getImageData(x,y, e.offsetX - x, e.offsetY - y); 
                    //MATRIX
                    let patternMap = new Array(background.width);
                    for(let i = 0; i<patternMap.length; i++) patternMap[i] = new Array(background.height);  
                    //Обход по строкам(в строке background.width*4 эл-тов)
                    for(let i = 0; i < background.height*background.width*4; i+=background.width*4){
                        //Обход строки по эл-там
                        for(let j = 0; j < background.width*4; j+=4){//j - ось х поля ввода
                            patternMap[(j/4)][(i/(background.width*4))] = context.createImageData(1, 1);
                            patternMap[(j/4)][(i/(background.width*4))].data[0] = background.data[i+j];
                            patternMap[(j/4)][(i/(background.width*4))].data[1] = background.data[i+j+1];
                            patternMap[(j/4)][(i/(background.width*4))].data[2] = background.data[i+j+2];
                            patternMap[(j/4)][(i/(background.width*4))].data[3] = background.data[i+j+3];
                        }
                    }
                    console.log(patternMap);
                    console.log(background);
                    
                    //context.putImageData(background, x, y);                                                                                                                     
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

/*
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;
  
    var d = max - min;
    s = max == 0 ? 0 : d / max;
  
    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return [ h, s, v ];
  }
  
  /*
   * Converts an HSV color value to RGB. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
   * Assumes h, s, and v are contained in the set [0, 1] and
   * returns r, g, and b in the set [0, 255].
   *
   * @param   Number  h       The hue
   * @param   Number  s       The saturation
   * @param   Number  v       The value
   * @return  Array           The RGB representation
   */
  function hsvToRgb(h, s, v) {
    var r, g, b;
  
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
  
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
  
    return [ r * 255, g * 255, b * 255 ];
  }