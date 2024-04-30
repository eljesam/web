let directionsRenderer = null
 
let venues = [
    ["Aquatics Centre", 48.92375054104162, 2.355445299969774],
    ["Bercy Arena", 48.8387601511224, 2.3784831759049303],
    ["Bordeaux Stadium", 44.89743919555695, -0.5617075897444002],
    ["Champ de Mars Arena", 48.85331464880319, 2.3024093557791057],
    ["Château de Versailles", 48.805204080554525, 2.120291026835482],
    ["Chateauroux Shooting Centre", 46.81815728863651, 1.7572235063977795],
    ["Champ de Mars", 48.85330758934801, 2.3024308134580407],
    ["Colline d'Élancourt", 48.78946341557704, 1.968313491629243],
    ["Geoffroy-Guichard Stadium", 45.460697604792706, 4.389476915309867],
    ["Grand Palais", 48.8663031850522, 2.31240075581971],
    ["The Hôtel de Ville", 48.85662377998899, 2.352510059467641],
    ["The Esplanade des Invalides", 48.86097629253086, 2.3132609441251795],
    ["La Beaujoire Stadium", 47.25617621996053, -1.5246320847076187],
    ["Place de la Concorde", 48.86584947094993, 2.321310814500583],
    ["Marie Paradis gymnasium - Le Bourget", 48.938285981554486, 2.4193292459873788],
    ["Golf National", 48.753615929943926, 2.078305189954165],
    ["Groupama Stadium", 45.76542223510646, 4.982082644169884],
    ["Roucas-Blanc Marina", 43.2668849495729, 5.371583745716513],
    ["Orange Vélodrome", 43.2702335139688, 5.3962018512481755],
    ["Allianz Riviera", 43.70565916237662, 7.193210259060181],
    ["Parc des Expositions de Villepinte", 48.971374111002774, 2.5205549880064972],
    ["Parc des Princes", 48.84191529590477, 2.252747941842941],
    ["Paris La Défense Arena", 48.89634247114895, 2.229540118617894],
    ["Stade Pierre Mauroy", 50.61229800334842, 3.1306026971047447],
    ["Pont Alexandre III", 48.864633064176715, 2.313644779961502],
    ["Porte de la Chapelle Arena", 48.900346888109546, 2.3603410226942985],
    ["Stade Roland Garros", 48.84729586138136, 2.2501071799441803],
    ["Saint-Quentin-en-Yvelines BMX Stadium", 48.78714882899492, 2.0343730259145256],
    ["Vélodrome de Saint-Quentin-en-Yvelines", 48.788581981476504, 2.0352157412603966],
    ["South Paris Arena", 48.83012970885559, 2.289261279926715],
    ["Stade de France",48.92501039426678, 2.3604072413989363],
    ["Teahupo'o Wave",-17.856076741259223, -149.25132234544535],
    ["Trocadéro Square",48.86334287217183, 2.287426350328356],
    ["Vaires-sur-Marne Nautical Stadium",48.86079351337574, 2.6374569799579373],
    ["Stade Olympique Yves du Manoir",48.92995331582791, 2.247881618652064]
    ]

let hotels = [
["Virgina Hotel"],
["Hôtel de Paris Opéra"],
["Hôtel Les Dames du Panthéon"],
["Les Degrés de Notre Dame"],
["Esprit de France"],
["Hotel Eiffel Seine"]

]
let cafes = [
["The Caféothèque of Paris"],
["2 Bis Café"],
["Garden Café Paris"],
["Le Petit Cafe"],
["Cafe Du Metro"],
["Fruity Café"]
]
let map
let markers = []
function hidePointsOfInterestAndBusStops(map) {
    let styles = [
        {
            "featureType": "poi",
            "stylers": [{"visibility": "off"}]
        },
        {
            featureType: "transit",
            stylers: [{visibility: "off"}],
        }
    ]

    let styledMapType = new google.maps.StyledMapType(styles, {
        name: "POI Hidden",
        alt: "Hide Points of Interest"
    })
    map.mapTypes.set("hide_poi", styledMapType)

    map.setMapTypeId("hide_poi")
}
function loadMap() {
    new google.maps.places.Autocomplete(start);
    new google.maps.places.Autocomplete(end);

    let parisLocation = {lat: 48.864716, lng: 2.349014}; // Coordinates for Paris

    map = new google.maps.Map(document.getElementById("map"), {
        center: parisLocation,
        mapId: "92f4184feb7c239c",
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {mapTypeIds: ["roadmap", "hybrid", "hide_poi"]}
    });
    hidePointsOfInterestAndBusStops(map)
    let geocoder = new google.maps.Geocoder();

    for (let i = 0; i < hotels.length; i++) {

        let hotel = hotels[i];
        geocoder.geocode({'address': hotel[0]}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                let marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    title: hotel[0],
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                });
            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
                console.error('Failed address: ' + hotel[0]);
            }
        });
    }
    for (let i = 0; i < cafes.length; i++) {
        let cafe = cafes[i];

        geocoder.geocode({'address': cafe[0]}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                let marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    title: cafe[0],
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                });
            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
                console.error('Failed address: ' + cafe[0]);
            }
        });
    }
    for (let i = 0; i < venues.length; i++) {
        let venue = venues[i];

        let marker = new google.maps.Marker({
            position: {lat: venue[1], lng: venue[2]},
            map: map,
            title: venue[0],
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'

        });
        markers.push(marker);
    }




        directionsRenderer = new google.maps.DirectionsRenderer({draggable: true});
        directionsRenderer.setMap(map);
        directionsRenderer.setPanel(document.getElementById("directions"));

        directionsRenderer.addListener("directions_changed", () => {
            const directions = directionsRenderer.getDirections();
            const geocoder = new google.maps.Geocoder();

            // update start address
            let start = directions.geocoded_waypoints[0].place_id;
            geocoder.geocode({placeId: start}, (results, status) => {
                document.getElementById("start").value = results[0].formatted_address;
            });

            // update end address
            let end = directions.geocoded_waypoints[1].place_id;
            geocoder.geocode({placeId: end}, (results, status) => {
                document.getElementById("end").value = results[0].formatted_address;
            });
        });

        calculateRoute("DRIVING");
    }


    window.addEventListener('load', loadMap);

    function calculateRoute(travelMode = "DRIVING") {
        document.getElementById("transport-mode").innerHTML = travelMode
        let start = document.getElementById("start").value
        let end = document.getElementById("end").value

        let request = {
            origin: start,
            destination: end,
            travelMode: travelMode
        }
        directionsService = new google.maps.DirectionsService()
        directionsService.route(request, (route, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(route)
            }
        })

    }



function filterData() {
    let filterInput = document.getElementById('filterInput').value;
    let filteredVenues = venues.filter(venue => venue[0].toLowerCase().includes(filterInput.toLowerCase()));
    let filteredCafes = cafes.filter(cafe => cafe[0].toLowerCase().includes(filterInput.toLowerCase()));
    let filteredHotels = hotels.filter(hotel => hotel[0].toLowerCase().includes(filterInput.toLowerCase()));
    map.clearOverlays = function () {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    };
    map.clearOverlays();
    for (let i = 0; i < filteredVenues.length; i++) {
        let venue = filteredVenues[i];
        let marker = new google.maps.Marker({
            position: {lat: venue[1], lng: venue[2]},
            map: map,
            title: venue[0],
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
    }
    for (let i = 0; i < filteredCafes.length; i++) {
        let cafe = filteredCafes[i];
        let marker = new google.maps.Marker({
            position: {lat: cafe[1], lng: cafe[2]},
            map: map,
            title: cafe[0],
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        });
    }
    for (let i = 0; i < filteredHotels.length; i++) {
        let hotel = filteredHotels[i];
        let marker = new google.maps.Marker({
            position: {lat: hotel[1], lng: hotel[2]},
            map: map,
            title: hotel[0],
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
    }
}
