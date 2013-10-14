(function() {
  LISTINGS_ENDPOINT = '/airbnb';

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
          property.permalink_url = 'http://airbnb.com/rooms/' + property.id;
          return property;
        });
      });
    }
  });

})();
