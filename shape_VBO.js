
class Shape {

    constructor(mousePosition,color,vertex_num){
        this.position = mousePosition;
        this.color = color;
        this.vertex_num = vertex_num;
        this.initialShape();
    }

    initialShape(){
        this.VertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);

    }

    initialColor(){
        this.VertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexColorBuffer);
    }


    drawShape(shaderProgram){
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.VertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
        // console.log("drawing...");
    }

    changeColor(color){
        this.color = color;
        this.initialColor();
    }

    // changePosition(position){
    //     // mat4.identity(this.mvMatrix)
    //     var trasnlation = [position[0]-this.position[0], position[1] - this.position[1], 0]
    //     this.translationMatrix = mat4.translate(this.mvMatrix, trasnlation);
    //     this.mvMatrix = mat4.multiply(this.mvMatrix, this.translationMatrix);
    //     this.position = position;
    // }

    // rotate(degree){
    //     // mat4.identity(this.mvMatrix)
    //     this.degree = degree;
    //     this.mvMatrix = mat4.rotate(this.mvMatrix, degree, [0,0,1])
    // }

    containsMousePosition(currentMousePosition){

    }




}