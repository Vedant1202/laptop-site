
var map = new ol.Map({
  target: 'map',
  size: [10, 10],
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([72.870793, 19.021478]),
    zoom: 17
  })
});


$(document).ready(function () {
  fetchCart(getData('user')[1].uid, true);
});

function checkEmail(val) {
  var value = val.trim();
  var re = /\S+@\S+\.\S+/;
  // console.log(value);
  if (!re.test(value)) {
    // alert('Please enter correct email address');
    return false;
  } else {
    return true;
  }
}

//
