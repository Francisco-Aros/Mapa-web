mapboxgl.accessToken = 'pk.eyJ1Ijoia3VydmYiLCJhIjoiY2tkdW1mNHF1MDZieTJ4bzhpNzg5MGR2biJ9.wZ_zpcAFiUi91fmAmoGGzA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/kurvf/cln0indok063101p78ijy8lnc',
  center: [-71.647, -39.9],
  zoom: 9
});

let popup;
let activeLayer = null;

map.on('load', () => {
  // Cambia el cursor al pasar sobre la capa 'apr-panguipulli-7s1o9d'
  map.on('mouseenter', 'apr-panguipulli-7s1o9d', () => {
    map.getCanvas().style.cursor = 'pointer';
    activeLayer = 'apr-panguipulli-7s1o9d';
  });

  // Cambia el cursor al pasar sobre la capa 'entidades-panguipulli-camione-0cnhh1'
  map.on('mouseenter', 'entidades-panguipulli-camione-0cnhh1', () => {
    map.getCanvas().style.cursor = 'pointer';
    activeLayer = 'entidades-panguipulli-camione-0cnhh1';
  });

  // Restablece el cursor cuando sale de ambas capas
  map.on('mouseleave', () => {
    map.getCanvas().style.cursor = 'default';
    activeLayer = null;
    // Cierra el cuadro de diálogo emergente al salir de las capas
    if (popup) {
      popup.remove();
    }
  });

  // Agrega un evento mousemove para mostrar la información de ambas capas
  map.on('mousemove', (event) => {
    const featuresPuntos = map.queryRenderedFeatures(event.point, { layers: ['apr-panguipulli-7s1o9d'] });
    const featuresPoligonos = map.queryRenderedFeatures(event.point, { layers: ['entidades-panguipulli-camione-0cnhh1'] });

    // Elimina cualquier cuadro de diálogo previo
    if (popup) {
      popup.remove();
    }

    // Verifica si hay características en la capa 'apr-panguipulli-7s1o9d' y muestra la información correspondiente
    if (activeLayer === 'apr-panguipulli-7s1o9d' && featuresPuntos.length > 0) {
      const Nombre__of = featuresPuntos[0].properties.Nombre__of;
      const Beneficiar = featuresPuntos[0].properties.Beneficiar;

      // Crea un nuevo cuadro de diálogo con la información de la capa de puntos
      popup = new mapboxgl.Popup()
        .setLngLat(event.lngLat)
        .setHTML(`<h3>${Nombre__of}</h3><p><strong><em>Beneficiarios: ${Beneficiar}</em></strong></p>`)
        .addTo(map);
    }

    // Verifica si hay características en la capa 'entidades-panguipulli-camione-0cnhh1' y muestra la información correspondiente
    if (activeLayer === 'entidades-panguipulli-camione-0cnhh1' && featuresPoligonos.length > 0) {
      const Lt_entrega = featuresPoligonos[0].properties.Lt_entrega;
      const NOMBRE_LOC = featuresPoligonos[0].properties.NOMBRE_LOC;
      const DISTRITO = featuresPoligonos[0].properties.DISTRITO;

      // Crea un nuevo cuadro de diálogo con la información de la capa de polígonos
      popup = new mapboxgl.Popup()
        .setLngLat(event.lngLat)
        .setHTML(`<h3>Nombre de localidad: ${NOMBRE_LOC}</h3><p><strong><em>Litros entregados semanalmente: ${Lt_entrega}</em></strong></p><p><strong><em>Distrito censal: ${DISTRITO}</em></strong></p>`)
        .addTo(map);
    }
  });

  // Cierra el cuadro de diálogo emergente cuando se hace clic en el mapa
  map.on('click', () => {
    if (popup) {
      popup.remove();
    }
  });

  // Obtén los elementos de los checkboxes del controlador de capas
  let puntosToggle = document.getElementById('puntos-toggle');
  let poligonosToggle = document.getElementById('poligonos-toggle1');

  // Agrega eventos change para controlar la visibilidad de las capas
  puntosToggle.addEventListener('change', function () {
    if (this.checked) {
      map.setLayoutProperty('apr-panguipulli-7s1o9d', 'visibility', 'visible');
    } else {
      map.setLayoutProperty('apr-panguipulli-7s1o9d', 'visibility', 'none');
    }
  });

  poligonosToggle.addEventListener('change', function () {
    if (this.checked) {
      map.setLayoutProperty('entidades-panguipulli-camione-0cnhh1', 'visibility', 'visible');
    } else {
      map.setLayoutProperty('entidades-panguipulli-camione-0cnhh1', 'visibility', 'none');
    }
  });
});
