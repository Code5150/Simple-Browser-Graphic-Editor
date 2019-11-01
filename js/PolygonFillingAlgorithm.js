function compareCoord(a, b){
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}

function findMinMax(array){
    let miny = array[0].pointY;
    let maxy = array[0].pointY;
    let minx = array[0].pointX;
    let maxx = array[0].pointX;
    for(let i = 1; i < array.length; i++){
        if(array[i].pointY > maxy) maxy = array[i].pointY;
        if(array[i].pointY < miny) miny = array[i].pointY;
        if(array[i].pointX > maxx) maxx = array[i].pointX;
        if(array[i].pointX < minx) minx = array[i].pointX;
    }
    return {
        MinX: minx,
        MaxX: maxx,
        MinY: miny,
        MaxY: maxy
    };
}

function checkXinRange(pointStart, pointEnd, y, array){
    //Нахождение точек пересечения отрезка points[k-1]points[k] с У
    let x = pointEnd.pointX - (pointEnd.pointY - y)*(pointEnd.pointX - pointStart.pointX)/(pointEnd.pointY - pointStart.pointY);
    //Если точка не выходит за пределы по Х, то записываем её в массив
    if (compareCoord(pointStart.pointX, pointEnd.pointX) > 0){
        if((x >= pointEnd.pointX)&&(x <= pointStart.pointX)) array.push(x);
    }
    else{
        if((x >= pointStart.pointX)&&(x <= pointEnd.pointX)) array.push(x);
    }
}

class Polygon{
    constructor(){
        this.points = [];
    }
    addPivot(x, y){
        this.points.push({
            pointX: x,
            pointY: y
        });
        //console.log(this.points[this.points.length - 1].x + " " + this.points[this.points.length - 1].y);
    }
    fillPolygon(context, color){
        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(this.points[0].pointX, this.points[0].pointY);
        for(let i = 1; i < this.points.length; i++){
            context.lineTo(this.points[i].pointX, this.points[i].pointY);
        }
        //context.closePath();
        context.stroke();
        //context.beginPath();
        //Находим макс. значения Х и У
        let MinMax = findMinMax(this.points);
        let miny = MinMax.MinY;
        let maxy = MinMax.MaxY;
        let minx = MinMax.MinX;
        let maxx = MinMax.MaxX;
        //Выполняем цикл от У мин. до У макс.
        for(let i = miny; i <= maxy; i++){
            let crossPts = [];
            let x;
            //Пересечение точек контура с горизонталью У
            for(let k = 1; k < this.points.length; k++){
                checkXinRange(this.points[k-1], this.points[k], i, crossPts);
            }
            //Проверка первой и последней точки контура
            checkXinRange(this.points[0], this.points[this.points.length - 1], i, crossPts);
            //Сортируем массив Х по возрастанию
            crossPts.sort(compareCoord);
            if(crossPts.length %2 != 0){
                for(let i = 0; i< crossPts.length - 1; i++){
                    if(crossPts[i] == crossPts[i+1]) crossPts.splice(i, 1);
                }
            }
            console.log(crossPts);
            //Т.к. точка пересекает контур чётное кол-во раз,
            //то обходим все точки массива с шагом 2
            for(let k = 0; k < crossPts.length; k += 2){
            
                context.moveTo(crossPts[k], i);
                context.lineTo(crossPts[k + 1], i);
            }
            context.stroke();
        }
    }
}