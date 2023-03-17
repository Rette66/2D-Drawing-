
class CircleShape extends Shape{

    constructor(mousePosition, color, vertex_num){
        super(mousePosition,color, vertex_num);
        this.initialShape();
        this.initialColor();
    }

    initialShape(){
        super.initialShape();
        var vertices = [];
            for(var i = 0; i < this.vertex_num; i++){
                var angle = (i / this.vertex_num) * 2 * Math.PI;
                var x = Math.cos(angle)*0.1 + this.position[0];
                var y = Math.sin(angle)*0.1 + this.position[1];
                vertices.push(x, y, 0);
            }
        console.log(vertices);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.VertexPositionBuffer.itemSize = 3;     //three floats (x,y,z) per vertex
        this.VertexPositionBuffer.numItems = this.vertex_num;     //number of  vertices  
    }

    initialColor(){
        super.initialColor();
        var colors = [];
        var i;
        for ( i = 0; i < this.vertex_num; i++){
            colors.push(this.color[0]);
            colors.push(this.color[1]);
            colors.push(this.color[2]);
        }
        console.log(colors);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        this.VertexColorBuffer.itemSize = 3;
        this.VertexColorBuffer.numItems = this.vertex_num;
    }

    drawShape(shaderProgram){
        super.drawShape(shaderProgram);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.VertexPositionBuffer.numItems);
    }
    
}