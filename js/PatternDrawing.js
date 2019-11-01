class PixelPattern{
    constructor(imgData, context){
        this.imgData = imgData;
        this.patternMap = this.createPatternMap(context);
        console.log(this.patternMap);
    }
    createPatternMap(context){
        let patternMap = new Array(50);
        for(let i = 0; i<patternMap.length; i++) patternMap[i] = new Array(50);
        //Обход по строкам(в строке 200 эл-тов), исключая 1-ю и последнюю
        for (let i = 0; i < 10000; i+=200){//i - ось y поля ввода
            //Обход строки по эл-там, исключая первые и последние 2
            for(let j = 0; j < 200; j+=4){//j - ось х поля ввода
                patternMap[(j/4)][(i/200)] = context.createImageData(1, 1);
                patternMap[(j/4)][(i/200)].data[0] = this.imgData.data[i+j];
                patternMap[(j/4)][(i/200)].data[1] = this.imgData.data[i+j+1];
                patternMap[(j/4)][(i/200)].data[2] = this.imgData.data[i+j+2];
                patternMap[(j/4)][(i/200)].data[3] = this.imgData.data[i+j+3];
            }
        }
        return patternMap;
    }
    fillPattern(x, y, context, background){
        //let patternMap = this.createPatternMap(context);
        let clickImgData = context.getImageData(x, y, 1, 1);
        if (clickImgData.data[0] === background.data[0] && clickImgData.data[1] === background.data[1] && 
            clickImgData.data[2] === background.data[2] && clickImgData.data[3] === background.data[3]){
            //Если цвет выбранного пиксела равен цвету фона, красим пиксел и запускаем рекурсию
            context.putImageData(this.patternMap[x%50][y%50], x, y);
            this.fillPattern(x-1, y, context, background);
            this.fillPattern(x+1, y, context, background);
            this.fillPattern(x, y-1, context, background);
            this.fillPattern(x, y+1, context, background);
        }
        //console.log(patternMap);
        //context.putImageData(this.imgData, x, y);
    }
}