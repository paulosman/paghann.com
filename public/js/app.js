(function() {
  LISTINGS_ENDPOINT = 'http://localhost:4567';
  AIRBNB_PROPERTY_URL = 'http://airbnb.com/rooms/';

  App = Ember.Application.create();

  App.Router.map(function() {
    this.resource('details');
    this.resource('listings');
    this.resource('register');
  });

  App.ListingsView = Ember.View.extend({
    mapId: 'paulosman.map-1nhg1ybl',

    didInsertElement: function() {
      var map = L.mapbox.map('map', this.get('mapId'));
      var features = [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-90.037736, 29.963803]
        },
        properties: {
          'marker-symbol': 'star',
          'marker-color': '#fdb913',
          image: 'http://maisonmacarty.com/mdmimg/room7_2_500.jpg',
          url: 'http://maisonmacarty.com/main.php',
          name: 'Maison de Macarty'
        }
      }];

      $(this.get('controller').get('model')).each(function(i, e) {
        features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [e.lng, e.lat],
          },
          properties: {
            'marker-symbol': 'lodging',
            'marker-color': '#ff4444',
            image: e.thumbnail_url,
            url: e.permalink_url,
            name: e.name,
            price: '$' + e.price + ' per night (USD)'
          }
        });
      });

      var markers = $(features).map(function(i, f) {
        var coords = f.geometry.coordinates;
        return new L.Marker([coords[1], coords[0]]);
      });

      map.markerLayer.on('layeradd', function(e) {
        var marker = e.layer,
           feature = marker.feature;

        var popupContent =  '<a target="_blank" class="popup" href="' + feature.properties.url + '">' +
          '<img src="' + feature.properties.image + '">' +
          '   <h2>' + feature.properties.name + '</h2>' +
          '</a>';
        if (feature.properties.price) {
          popupContent += '<p><strong>Price:</strong> ' + feature.properties.price + '</p>';
        }

        marker.bindPopup(popupContent,{
          closeButton: false,
          minWidth: 320
        });
      });

      map.markerLayer.on('click', function(e) {
        map.panTo(e.layer.getLatLng());
      });

      map.fitBounds(new L.featureGroup(markers).getBounds());
      map.markerLayer.setGeoJSON(features);
    }
  });

  App.ListingsRoute = Ember.Route.extend({
    model: function() {
      return $.getJSON(LISTINGS_ENDPOINT).then(function(data) {
        return data.properties.map(function(property) {
          property.thumbnail_url = property.thumbnail_url.replace('small', 'large');
          property.permalink_url = AIRBNB_PROPERTY_URL + property.id;
          return property;
        });
      });
    }
  });

})();
