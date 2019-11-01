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

class BresenhamLine{
    constructor(x0, y0, x1, y1){
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
    }
    colorPixel(color, data){
        data[0] = hexToRgb(color).r;
        data[1] = hexToRgb(color).g;
        data[2] = hexToRgb(color).b;
        data[3] = 255;
    }
    drawLine(context, color){
        //Инициализация переменных
        let x = this.x0;
        let y = this.y0;
        //Значения шага по Х и У в зависимости от дельты
        let stepX = 0, stepY = 0;
        let dx = this.x1 - this.x0;
        if (dx < 0) stepX = -1;
        else if (dx > 0) stepX = 1;
        let dy = this.y1 - this.y0;
        if (dy < 0) stepY = -1;
        else if (dy > 0) stepY = 1;
        let m, ctr, isDX;
        //В зависимости от dx и dy выбираются ось отсчета и угловой коэффициент
        if(Math.abs(dy) < Math.abs(dx)){
            m = Math.abs(dy / dx);
            ctr = Math.abs(dx);
            isDX = true;
        }
        else{
            m = Math.abs(dx / dy);
            ctr = Math.abs(dy);
            isDX = false;
        }
        let e = m - 0.5;
        let i = 0;
        //Создаем окрашенный пиксель
        var imgData = context.createImageData(1, 1);
        imgData.data[0] = hexToRgb(color).r;
        imgData.data[1] = hexToRgb(color).g;
        imgData.data[2] = hexToRgb(color).b;
        imgData.data[3] = 255;
        //Помещаем окрашенный пиксель по координатам
        context.putImageData(imgData, x, y);
        //Алгоритм
        while(i < ctr){
            if (e >= 0){
                //Производится изменение координат в зависимости от оси
                if (isDX) y += stepY;
                else x += stepX;
                e = e + m - 1;
            }
            else{
                e += m;
            }
            //Производится изменение координат в зависимости от оси
            if (isDX) x += stepX;
            else y += stepY;
            context.putImageData(imgData, x, y);
            i++;
        }
    }
}