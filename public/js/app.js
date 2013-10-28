(function() {
  LISTINGS_ENDPOINT = 'http://localhost:4567';
  AIRBNB_PROPERTY_URL = 'http://airbnb.com/rooms/';

  App = Ember.Application.create();

  App.Router.map(function() {
    this.resource('details');
    this.resource('listings');
    this.resource('register');
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
