

//////////////////////////////////////////////////////.........
//
//    Simple 2D Drawing
//
//    Ray Wei  
//
    var gl;
    var shaderProgram;
    //shape type:
    //p for point as 0
    //h for horizontal line as 1
    //v for vertical line as 2
    //t for triangle as 3 (default)
    //q for square as 4
    //R for circle as 5
    var draw_shape = 3;
    
    //default red color
    var draw_color = [1.0, 0.0, 0.0];
    var vertex_num = 3;

    var currentShape;
    var currnetMatrix;
    var currentOnScreenShape;

    var shapeList;
    var onScreenShapeList;

    var globalTransform;

    var canvas;

// ************** Init OpenGL Context etc. ************* 

    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
        console.log(gl);
    }


//  ************** Initialize VBO  *************** 

    var squareVertexPositionBuffer;
    var squareVertexColorBuffer;

    // ---------------- keyborad event--------------
    function onKeyDown(event) {
        console.log(event.key);

        if(event.key =='r')
            currentShape.changeColor([1,0,0]);
        else if(event.key == 'g')
            currentShape.changeColor([0,1,0]);
        else if(event.key == 'b')
            currentShape.changeColor([0,0,1]);
        else if(event.key == 'p')
            currentShape = shapeList[0]
        else if(event.key == 'h')
            currentShape = shapeList[1]
        else if(event.key == 'v')
            currentShape = shapeList[2]
        else if(event.key == 't')
            currentShape = shapeList[3]
        else if(event.key == 'q')
            currentShape = shapeList[4]
        else if(event.key == 'd')
            redraw();
        else if(event.key == 'c')
            clear();
        else if(event.key == 'R')
            currentShape = shapeList[5]
        else if(event.key == 's')
            shrink();
        else if(event.key == 'S')
            enlarge();
        else if(event.key == 'W')
            globalTransform = true;
        else if(event.key == 'w')
            globalTransform = false;
        // console.log(currentOnScreenShape);

        drawScene();
    }

    // ----------------- generate corresponding shape vertices and bind them into array buffer-------------
    function initialShape(mousePosition){

        shapeList[0] = new PointShape([0, 0], draw_color, 1);
        shapeList[1] = new HorizontalLineShape([0, 0], draw_color, 2);
        shapeList[2] = new VerticalLineShape([0, 0], draw_color, 2);
        shapeList[3] = new TriangleShape([0, 0], draw_color, 3);
        shapeList[4] = new SquareShape([0, 0], draw_color, 4);
        shapeList[5] = new CircleShape([0, 0], draw_color, 32);
        currentShape = shapeList[3];
    }


    // function CheckIfDrawn(mousePosition){
    //     for( i = 0; i< onScreenShapeList.length; i++){
    //         if(){

    //         }
    //     }
    // }


    function onDocumentMouseDown(event){

        event.preventDefault();      

        document.addEventListener("mousemove", onDoucmentMouseMove);
        document.addEventListener("mouseup", onDoucmentMouseUp);
        document.addEventListener("mouseout", onDoucmentMouseOut);
        //update mouse position
        var mouseX = event.clientX;
        var mouseY = event.clientY;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        //if global transition then do not add new shape
        if(globalTransform)
            return 0;
        
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.top;
        var y = event.clientY - rect.left;
        var canvasX = 2 * x / canvas.width - 1;
        var canvasY = 1 - 2 * y / canvas.height;
        var mousePosition = [canvasX, canvasY, 0]; 

        // CheckIfDrawn(mousePosition);

        currnetMatrix = CreateMatrix();
        InitialMatrix(currnetMatrix);
        currnetMatrix = Translate(currnetMatrix, mousePosition);

        currentOnScreenShape = onScreenShapeList.length;
        onScreenShapeList[currentOnScreenShape] = [currnetMatrix,currentShape];



        drawScene();
    }

    function degreeToRad(degree){
        return degree * Math.PI / 180;
    }

    var lastMouseX = 0, lastMouseY = 0;

    function onDoucmentMouseMove(event){
        var mouseX = event.clientX;
        var mouseY = event.ClientY; 

        var diffX = mouseX - lastMouseX;
        var diffY = mouseY - lastMouseY;

        if(globalTransform){
            for(var i = 0; i < onScreenShapeList.length; i++){
                onScreenShapeList[i][0] = Rotate(onScreenShapeList[i][0], degreeToRad(diffX/5), [0,0,1]);
            }
        }
        else
            onScreenShapeList[currentOnScreenShape][0] = Rotate(onScreenShapeList[currentOnScreenShape][0], degreeToRad(diffX/5), [0,0,1]);

        lastMouseX = mouseX;
        lastMouseY = mouseY;
        drawScene();
    }

    function enlarge(){
        if(globalTransform){
            for(var i = 0; i < onScreenShapeList.length; i++){
                onScreenShapeList[i][0] = Scale(onScreenShapeList[i][0], [1.05, 1.05, 1.05]);
            }
        }
        else
            onScreenShapeList[currentOnScreenShape][0] = Scale(onScreenShapeList[currentOnScreenShape][0], [1.05, 1.05, 1.05]);
        drawScene();
    }

    function shrink(){
        if(globalTransform){
            for(var i = 0; i < onScreenShapeList.length; i++){
                onScreenShapeList[i][0] = Scale(onScreenShapeList[i][0], [0.95, 0.95, 0.95]);
            }
        }
        else
        onScreenShapeList[currentOnScreenShape][0] = Scale(onScreenShapeList[currentOnScreenShape][0], [0.95, 0.95, 0.95]);
        drawScene();
    }

    function onDoucmentMouseUp(event){
        document.removeEventListener('mousemove', onDoucmentMouseMove);
        document.removeEventListener('mouseout', onDoucmentMouseOut);
        document.removeEventListener('mouseup', onDoucmentMouseUp);
    }

    function onDoucmentMouseOut(event){
        document.removeEventListener('mousemove', onDoucmentMouseMove);
        document.removeEventListener('mouseout', onDoucmentMouseOut);
        document.removeEventListener('mouseup', onDoucmentMouseUp);
    }


    
    function drawVBOWithTransform(onScreenShape){
        // onScreenShape[0] = mat4.multiply(onScreenShape[0], currnetMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, onScreenShape[0])
        console.log("matrix is " + onScreenShape[0]);
        console.log("current shape position is " + currentShape.position);
        onScreenShape[1].drawShape(shaderProgram);
    }

    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

        for(i = 0; i < onScreenShapeList.length; i++){
            drawVBOWithTransform(onScreenShapeList[i])
        }
    }


    function webGLStart() {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('mousedown', onDocumentMouseDown);

        shapeList = [];
        onScreenShapeList = [];

        canvas = document.getElementById("lab1-canvas");
        initGL(canvas);
        initShaders();
        globalTransform = false;

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute); 

        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        
        initialShape();

        gl.clearColor(1.0, 1.0, 0.0, 1.0);
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }


    function shape(type, count){
        draw_shape = type;
        vertex_num = count;
    }

    function color(type){
        draw_color = type;
    }

    function clear(){
        onScreenShapeList = new Array();
        currentOnScreenShape = onScreenShapeList.length-1;
        drawScene();
    }

    function redraw(){
        onScreenShapeList.pop();
        currentOnScreenShape = onScreenShapeList.length-1;
        drawScene();
    }