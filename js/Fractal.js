class Fractal{
    constructor(axiom, rule, angle){
        this.axiom = axiom;
        this.rule = rule;
        this.angle = angle;
        this.currentIteration = 1;
    }
    updateAxiom(){
        this.axiom = this.axiom.replace(/F/g, this.rule);
    }
    
    drawFractal(context, x, y, l, color){
        //Инициализация контекста
        //Длина, начальные и конечные координаты, угол
        var lineLength = Number(l) / this.currentIteration;//Math.pow(this.currentIteration, 2);
        var x1 = Number(x);
        var y1 = Number(y);
        var alpha = 315;
        context.strokeStyle = color;
        //Начинаем рисовать
        context.beginPath();
        context.moveTo(x, y);
        for(let i = 0; i < this.axiom.length; i++){
            switch(this.axiom[i]){
                case 'F':{
                    x1 += 2 * lineLength * Math.cos((alpha * Math.PI) / 180);
                    y1 += 2 * lineLength * Math.sin((alpha * Math.PI) / 180);
                    context.lineTo(x1, y1);
                    }
                    break;
                case '+':{
                    alpha += this.angle;
                    }
                    break;
                case '-':{
                    alpha -= this.angle;
                    }
                    break;
            }
        }
        context.stroke();
        this.currentIteration++;
    }
    
}
