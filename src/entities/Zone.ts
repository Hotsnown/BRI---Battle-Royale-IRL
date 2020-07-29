// 2.0833 mètres toutes les 5 secondes
// 1.5 km/h
// 25m/minutes

declare var google: any

class Zone {
    radius: number

    constructor(initialRadius: number) {
        this.radius = initialRadius
    }

    computeRadius() {
        let n = 0
        while (this.radius >= 0) {
            setTimeout(() => {
                this.radius = this.radius - 2.0833
                console.log(this.radius)
            }, 1000);
        }
    }
}

export function getCircle() {
    var circle = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'green',
        fillOpacity: 0.6,
        scale: 2,
        strokeColor: 'green',
        strokeWeight: 1,
        strokeOpacity: 0.6
    };
    return circle;
}

export function animate(map, center, rad, fillop, sw, sop) {
    if (rad >= 0) {
        var circle2 = new google.maps.Circle({
            map: map,
            radius: rad,
            center: center,
            strokeColor: "green",
            fillColor: "green",
            fillOpacity: fillop,
            strokeWeight: sw,
            strokeOpacity: sop
        });
        setTimeout(function () {
            circle2.setMap(null);
        }, 5000);
    }
}

export default Zone 