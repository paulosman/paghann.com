(function() {
  $('.guestlist-link').click(function(e) {
    e.preventDefault();
  });

  $.getJSON('https://www.airbnb.ca/search/ajax_get_results?checkin=07-03-2014&checkout=10-03-2014&guests=2&search_view=2&source=bb&room_types%5B%5D=Entire+home%2Fapt&neighborhoods%5B%5D=Bywater+District&neighborhoods%5B%5D=French+Quarter&neighborhoods%5B%5D=Lower+Garden+District&neighborhoods%5B%5D=Marigny%2FBywater&neighborhoods%5B%5D=Seventh+Ward&location=New+Orleans%2C+LA', function(data) {
    console.log(data);
  });
})();
