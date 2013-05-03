/*var path = new Path();
var path2 = new Path();
var path3 = new Path();
var point1 = new Point(60, 60);
var point2 = new Point(200, 60);
var point3 = new Point(130, 180);
path.strokeColor = 'white';
path3.strokeColor = 'blue';

path.add(point1, point2, point3);
path2.add(new Point(30, 30), new Point(100, 30), new Point(65, 90));
path3.add(new Point(180, 80), new Point(240, 70), new Point(140, 140));
path.closed = 'true';
path2.closed = 'true';
path3.closed = 'true';
path2.strokeColor = 'red';
var destination = new Point(130, 270);


function onFrame(event){
    var vector = destination - path.position;
    if (vector.length < 5) {
        destination.y = destination.y*-1 + 350;
    }
    path.position += vector /15;
    path.rotate(3);
    path2.rotate(5);
    path3.rotate(7);
    
    
    
}*/

var width, height, center;
var points = 10;
var smooth = true;
var path = new Path();
var mousePos = view.center / 2;
var pathHeight = mousePos.y;
path.fillColor = 'white';
initializePath();

function initializePath() {
    center = view.center;
    width = view.size.width;
    height = view.size.height / 2;
    path.segments = [];
    path.add(view.bounds.bottomLeft);
    for (var i = 1; i < points; i++) {
        var point = new Point(width / points * i, center.y);
        path.add(point);
    }
    path.add(view.bounds.bottomRight);
    
}

function onFrame(event) {
    pathHeight += (center.y - mousePos.y - pathHeight) / 10;
    for (var i = 1; i < points; i++) {
        var sinSeed = event.count + (i + i % 10) * 100;
        var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
        var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
        path.segments[i].point.y = yPos;
    }
    if (smooth)
        path.smooth();
}

function onMouseMove(event) {
    mousePos = event.point;
}


// Reposition the path whenever the window is resized:
function onResize(event) {
    initializePath();
}
