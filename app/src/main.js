import Immutable from 'immutable';

(function ($) {
  "use strict";

  const Map = Immutable.Map;

  $(document).ready(init);

  function init() {

    // Map
    const map1 = Map({a: 1, b: 2, c: 3});
    const map2 = map1.set('b', 50);

    console.log(map1.get('b'));
    console.log(map2.get('b'));

  }
}(jQuery));