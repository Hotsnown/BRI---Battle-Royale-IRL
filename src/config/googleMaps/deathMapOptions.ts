export const deathMapOptions = (maps: any) => {

    return {
        streetViewControl: false,
        scaleControl: true,
        fullscreenControl: false,
        styles: [{
            featureType: "poi.business",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }],
        gestureHandling: "greedy",
        disableDoubleClickZoom: true,
        minZoom: 11,
        maxZoom: 18,
        mapTypeControl: true,
        mapTypeId: maps.MapTypeId.ROADMAP,
        zoomControl: true,
        clickableIcons: false,
    };
}