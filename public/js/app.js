(function() {
  //$('.guestlist-link').click(function(e) {
  //  e.preventDefault();
  //});

  App = Ember.Application.create();

  App.Router.map(function() {
    this.resource('details');
    this.resource('where-to-stay');
    this.resource('register');
  });

})();
