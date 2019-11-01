function recursiveStartpoint(x, y, context, pixel, background){
    let clickImgData = context.getImageData(x, y, 1, 1);
    if (clickImgData.data[0] === background.data[0] && clickImgData.data[1] === background.data[1] && 
        clickImgData.data[2] === background.data[2] && clickImgData.data[3] === background.data[3]){
        //Если цвет выбранного пиксела равен цвету фона, красим пиксел и запускаем рекурсию
        context.putImageData(pixel, x, y);
        recursiveStartpoint(x-1, y, context, pixel, background);
        recursiveStartpoint(x+1, y, context, pixel, background);
        recursiveStartpoint(x, y-1, context, pixel, background);
        recursiveStartpoint(x, y+1, context, pixel, background);
    }
}

function modifiedRecursiveStartpoint(x, y, context, pixel, background){
    let clickImgData = context.getImageData(x, y, 1, 1);
    let xLeft, xRight;
    let xCur = x;
    while (clickImgData.data[0] === background.data[0] && clickImgData.data[1] === background.data[1] && 
        clickImgData.data[2] === background.data[2] && clickImgData.data[3] === background.data[3]){
        //Если цвет выбранного пиксела равен цвету фона, красим пиксел и двигаемся вправо
        context.putImageData(pixel, xCur, y);
        xRight = xCur;
        xCur++;
        clickImgData = context.getImageData(xCur, y, 1, 1);
    }
    xCur = x-1;
    clickImgData = context.getImageData(xCur, y, 1, 1);
    while (clickImgData.data[0] === background.data[0] && clickImgData.data[1] === background.data[1] && 
        clickImgData.data[2] === background.data[2] && clickImgData.data[3] === background.data[3]){
        //Если цвет выбранного пиксела равен цвету фона, красим пиксел и двигаемся влево
        context.putImageData(pixel, xCur, y);
        xLeft = xCur;
        xCur--;
        clickImgData = context.getImageData(xCur, y, 1, 1);
    }
    let intervalUp, intervalDown;
    for(let i = xLeft; i<=xRight+1; i++){
        clickImgData = context.getImageData(i, y-1, 1, 1);
        //Если цвет выбранного пиксела равен цвету фона, точка принадлежит интервалу
        if (clickImgData.data[0] === background.data[0] && clickImgData.data[1] === background.data[1] && 
            clickImgData.data[2] === background.data[2] && clickImgData.data[3] === background.data[3]){
                intervalUp = i;
        }
        else{
            //Если х-1 текущей точки равен interval, то запускаем для x-1 процедуру
            if((i-1) === intervalUp) modifiedRecursiveStartpoint(intervalUp, y-1, context, pixel, background);
        }
        clickImgData = context.getImageData(i, y+1, 1, 1);
        if (clickImgData.data[0] === background.data[0] && clickImgData.data[1] === background.data[1] && 
            clickImgData.data[2] === background.data[2] && clickImgData.data[3] === background.data[3]){
                intervalDown = i;
        }
        else{
            if((i-1) === intervalDown) modifiedRecursiveStartpoint(intervalDown, y+1, context, pixel, background);
        }
    }
    if(intervalUp === xRight+1) modifiedRecursiveStartpoint(intervalUp-1, y-1, context, pixel, background);
    if(intervalDown === xRight+1) modifiedRecursiveStartpoint(intervalDown-1, y+1, context, pixel, background);
    //interval = -1;
    /*for(let i = xLeft; i<=xRight+1; i++){
        clickImgData = context.getImageData(i, y+1, 1, 1);
        if (clickImgData.data[0] === background.data[0] && clickImgData.data[1] === background.data[1] && 
            clickImgData.data[2] === background.data[2] && clickImgData.data[3] === background.data[3]){
                interval = i;
        }
        else{
            if((i-1) === interval) modifiedRecursiveStartpoint(interval, y+1, context, pixel, background);
        }
    }
    if(interval === xRight+1) modifiedRecursiveStartpoint(interval-1, y-1, context, pixel, background);*/
}