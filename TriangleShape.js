
class TriangleShape extends Shape{

    constructor(mousePosition, color,vertex_num){
        super(mousePosition,color,vertex_num);
        this.initialShape();
        this.initialColor();
    }

    initialShape(){
        super.initialShape();
        var vertices = [
            0.1 + this.position[0],  0.1 + this.position[1],  0.0,
            -0.1 + this.position[0],  0.1 + this.position[1],  0.0,
            0.1 + this.position[0], -0.1 + this.position[1],  0.0
        ];
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
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.VertexPositionBuffer.numItems);
    }
    
}