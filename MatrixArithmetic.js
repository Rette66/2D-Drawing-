
function CreateMatrix(a){
    var b = new Array(16);
    if (a) {
        b[0] = a[0];
        b[1] = a[1];
        b[2] = a[2];
        b[3] = a[3];
        b[4] = a[4];
        b[5] = a[5];
        b[6] = a[6];
        b[7] = a[7];
        b[8] = a[8];
        b[9] = a[9];
        b[10] = a[10];
        b[11] = a[11];
        b[12] = a[12];
        b[13] = a[13];
        b[14] = a[14];
        b[15] = a[15]
    }
    return b
}

function InitialMatrix(a){
    a[0] = 1;
    a[1] = 0;
    a[2] = 0;
    a[3] = 0;
    a[4] = 0;
    a[5] = 1;
    a[6] = 0;
    a[7] = 0;
    a[8] = 0;
    a[9] = 0;
    a[10] = 1;
    a[11] = 0;
    a[12] = 0;
    a[13] = 0;
    a[14] = 0;
    a[15] = 1;
    return a
}



function Translate(currentMatrix, translation) {
        currentMatrix[12] = currentMatrix[0] * translation[0] + currentMatrix[4] * translation[1] + currentMatrix[8] * translation[2] + currentMatrix[12];
        currentMatrix[13] = currentMatrix[1] * translation[0] + currentMatrix[5] * translation[1] + currentMatrix[9] * translation[2] + currentMatrix[13];
        currentMatrix[14] = currentMatrix[2] * translation[0] + currentMatrix[6] * translation[1] + currentMatrix[10] * translation[2] + currentMatrix[14];
        currentMatrix[15] = currentMatrix[3] * translation[0] + currentMatrix[7] * translation[1] + currentMatrix[11] * translation[2] + currentMatrix[15];
        return currentMatrix
};


function Scale(CurrentMatrix, scale){
    CurrentMatrix[0]*=scale[0];
    CurrentMatrix[1]*=scale[0];
    CurrentMatrix[2]*=scale[0];
    CurrentMatrix[3]*=scale[0];
    CurrentMatrix[4]*=scale[1];
    CurrentMatrix[5]*=scale[1];
    CurrentMatrix[6]*=scale[1];
    CurrentMatrix[7]*=scale[1];
    CurrentMatrix[8]*=scale[2];
    CurrentMatrix[9]*=scale[2];
    CurrentMatrix[10]*=scale[2];
    CurrentMatrix[11]*=scale[2];
    return CurrentMatrix
}

function Rotate(currentMatrix, rotation, axis, d) {
    var e = axis[0], g = axis[1];
    axis = axis[2];
    var f = Math.sqrt(e * e + g * g + axis * axis);
    if (!f)
        return null;
    if (f != 1) {
        f = 1 / f;
        e*=f;
        g*=f;
        axis*=f
    }
    var h = Math.sin(rotation), i = Math.cos(rotation), j = 1 - i;
    rotation = currentMatrix[0];
    f = currentMatrix[1];
    var k = currentMatrix[2], l = currentMatrix[3], o = currentMatrix[4], m = currentMatrix[5], n = currentMatrix[6], p = currentMatrix[7], r = currentMatrix[8], s = currentMatrix[9], A = currentMatrix[10], B = currentMatrix[11], t = e * e * j + i, u = g * e * j + axis * h, v = axis * e * j - g * h, w = e * g * j - axis * h, x = g * g * j + i, y = axis * g * j + e * h, z = e * axis * j + g * h;
    e = g * axis * j - e * h;
    g = axis * axis * j + i;
    if (d) {
        if (currentMatrix != d) {
            d[12] = currentMatrix[12];
            d[13] = currentMatrix[13];
            d[14] = currentMatrix[14];
            d[15] = currentMatrix[15]
        }
    } else 
        d = currentMatrix;
    d[0] = rotation * t + o * u + r * v;
    d[1] = f * t + m * u + s * v;
    d[2] = k * t + n * u + A * v;
    d[3] = l * t + p * u + B * v;
    d[4] = rotation * w + o * x + r * y;
    d[5] = f * w + m * x + s * y;
    d[6] = k * w + n * x + A * y;
    d[7] = l * w + p * x + B * y;
    d[8] = rotation * z + o * e + r * g;
    d[9] = f * z + m * e + s * g;
    d[10] = k * z + n * e + A * g;
    d[11] = l * z + p * e + B * g;
    return d
};

