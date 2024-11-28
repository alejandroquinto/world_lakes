mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlamFuZHJvcXVpbnRvIiwiYSI6ImNseDZxbGFpcjE1ZHMyanNjZWg1eDIzejkifQ.VYiLvOBYgX5WwchhqO0I8w'; // Replace with your Mapbox access token

// Initialize the Mapbox map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [0, 20],
    zoom: 1.5,
    projection: 'globe',
    antialias: true
});

map.on('load', () => {
    // Add the GeoJSON source
    map.addSource('world_lakes', {
        type: 'geojson',
        data: './world_lakes.geojson'
    });

    // Debug: Temporarily remove the filter to display all features
    map.addLayer({
        id: 'lakes-layer',
        type: 'fill',
        source: 'world_lakes',
        paint: {
            'fill-color': '#00FFFF', // Electric blue color
            'fill-opacity': 0.6
        }
    });

    map.addLayer({
        id: 'lakes-outline',
        type: 'line',
        source: 'world_lakes',
        paint: {
            'line-color': '#0000FF',
            'line-width': 1
        }
    });

    // Add hover interaction
    const infoBox = document.getElementById('info-box');
    map.on('mousemove', 'lakes-layer', (e) => {
        const feature = e.features[0];
        if (!feature) return;

        const { TYPE, LAKE_NAME, AREA_SKM, COUNTRY } = feature.properties;

        infoBox.innerHTML = `
            <strong>Type:</strong> ${TYPE || 'Unknown'}<br>
            <strong>Name:</strong> ${LAKE_NAME || 'Unknown'}<br>
            <strong>Area (sq km):</strong> ${AREA_SKM || 'Unknown'}<br>
            <strong>Country:</strong> ${COUNTRY || 'Unknown'}
        `;
        infoBox.style.display = 'block';
    });

    map.on('mouseleave', 'lakes-layer', () => {
        infoBox.style.display = 'none';
    });
});
