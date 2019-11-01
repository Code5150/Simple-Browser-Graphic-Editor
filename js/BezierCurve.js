class BezierCurve{
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
    drawBezierCurve(context, color){
        context.strokeStyle = color;
        context.beginPath();
        let pointArray = [];
        for(let t = 0; t <= 1; t += 0.01){
            this.calculateBezierCurvePoints(color, this.points, pointArray, t);
        }
        context.moveTo(pointArray[0].pointX, pointArray[0].pointY);
        for(let i = 1; i < pointArray.length; i++){
            context.lineTo(pointArray[i].pointX, pointArray[i].pointY);
        }
        context.lineTo(this.points[this.points.length - 1].pointX, this.points[this.points.length - 1].pointY);
        context.stroke();
    }
    calculateBezierCurvePoints(color, pivotArray, pointArray, t){
        if (pivotArray.length == 1){
            pointArray.push(pivotArray[0]);
        }
        else{
            let newPts = [];
            for(let i = 0; i < pivotArray.length - 1; i++){
                var pt = {
                    x: pivotArray[i].pointX + (pivotArray[i + 1].pointX - pivotArray[i].pointX) * t,
                    y: pivotArray[i].y + (pivotArray[i + 1].y - pivotArray[i].y) * t 
                };
                newPts.push({
                    pointX: pivotArray[i].pointX + (pivotArray[i + 1].pointX - pivotArray[i].pointX) * t,
                    pointY: pivotArray[i].pointY + (pivotArray[i + 1].pointY - pivotArray[i].pointY) * t 
                });
            }
            this.calculateBezierCurvePoints(color, newPts, pointArray, t);
        }
    }
}