declare var google: any

export function getCirclePoints(center, radius, numPoints, clockwise) {
    var points: any[] = [];
    for (var i = 0; i < numPoints; ++i) {
        var angle = i * 360 / numPoints;
        if (!clockwise) {
            angle = 360 - angle;
        }

        // the maps API provides geometrical computations
        // just make sure you load the required library (libraries=geometry)
        var p = google.maps.geometry.spherical.computeOffset(center, radius, angle);
        points.push(p);
    }

    // 'close' the polygon
    points.push(points[0]);
    console.log(points)
    return points;
}