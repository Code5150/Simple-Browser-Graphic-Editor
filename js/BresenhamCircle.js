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

class BresenhamCircle{
    constructor(x, y, r){
        this.xStart = x;
        this.yStart = y;
        this.r = r;
    }
    draw8Pixels(x, y, context, imgData){
        context.putImageData(imgData, this.xStart + x, this.yStart + y);
        context.putImageData(imgData, this.xStart + x, this.yStart - y);
        context.putImageData(imgData, this.xStart - x, this.yStart + y);
        context.putImageData(imgData, this.xStart - x, this.yStart - y);
        context.putImageData(imgData, this.xStart + y, this.yStart + x);
        context.putImageData(imgData, this.xStart + y, this.yStart - x);
        context.putImageData(imgData, this.xStart - y, this.yStart + x);
        context.putImageData(imgData, this.xStart - y, this.yStart - x);
    }
    drawBresenhamCircle(context, color){
        let x = 0;
        let y = this.r;
        let d = 3 - 2*this.r;
        var imgData = context.createImageData(1, 1);
        imgData.data[0] = hexToRgb(color).r;
        imgData.data[1] = hexToRgb(color).g;
        imgData.data[2] = hexToRgb(color).b;
        imgData.data[3] = 255;
        while(y >= x){
            this.draw8Pixels(x, y, context, imgData);
            if (d < 0){
                d = d + 4*x + 6;
            }
            else{
                d = d + 4*(x-y) + 10;
                y--;
            }
            x++;
        }
    }
}