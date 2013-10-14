require 'httparty'
require 'addressable/uri'
require 'sinatra/base'


def build_uri
  url = "https://www.airbnb.ca/search/ajax_get_results"

  params = {
    'checkin' => '07-03-2014',
    'checkout' => '10-03-2014',
    'guests' => '2',
    'location' => 'New Orleans, LA',
    'neighborhoods[]' => ['Bywater District',
                          'French Quarter',
                          'Lower Garden District',
                          'Marigny/Bywater',
                          'Seventh Ward'],
    'room_types[]' => 'Entire home/apt',
    'search_view' => '2',
    'source' => 'bb'
  }

  uri = Addressable::URI.parse(url)
  uri.query_values = params
  uri.to_s
end

class ProxyApp < Sinatra::Base
  get '/' do
    headers 'Access-Control-Allow-Origin' => '*'
    content_type 'application/json'
    r = HTTParty.get(build_uri, :headers => { 'Accept' => '*/*' })
    r.body
  end
end
