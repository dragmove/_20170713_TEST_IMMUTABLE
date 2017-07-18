// original document : https://facebook.github.io/immutable-js/
// translate : https://medium.com/@kimyongin/immutable-js-2bdf0b66489a

import Immutable from 'immutable';

(function ($) {
  'use strict';

  const Map = Immutable.Map,
    Seq = Immutable.Seq;

  $(document).ready(init);

  function init() {
    map();
    mergeMap();

    seq();

    fromJS();

    deep();

    nested();

    lazySeq();

    changeMapToLazySeq();

    equal();

    mutation();
  }

  function map() {
    // get, set Map
    const map1 = Map({a: 1, b: 2, c: 3});
    const map2 = map1.set('b', 50);

    console.log(map1.get('b'));
    console.log(map2.get('b'));
  }

  function mergeMap() {
    const map1 = Immutable.Map({a: 1, b: 2, c: 3, d: 4});

    const map2 = Immutable.Map({c: 10, a: 20, t: 30});

    const obj = {d: 100, o: 200, g: 300};

    const map3 = map1.merge(map2, obj); // Map { a: 20, b: 2, c: 10, d: 100, g: 300, o: 200, t: 30 }
    console.log('mergeMap :', map3.toObject());
  }

  function seq() {
    const myObject = {a: 1, b: 2, c: 3};
    console.log('seq :', Immutable.Seq(myObject).map(x => x * x).toObject()); // { a: 1, b: 4, c: 9 }
  }

  function fromJS() {
    var obj = {1: 'one'};

    var map = Immutable.fromJS(obj);
    console.log('map.get :', map.get('1')); // 'one'
    console.log('map.get :', map.get(1)); // undefined !!!
  }

  function deep() {
    var deep = Immutable.Map({a: 1, b: 2, c: Immutable.List.of(3, 4, 5)});

    console.log('toObject :', deep.toObject()); // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
    console.log('toArray :', deep.toArray()); // [ 1, 2, List [ 3, 4, 5 ] ]
    console.log('toJS :', deep.toJS()); // { a: 1, b: 2, c: [ 3, 4, 5 ] }

    var json = JSON.stringify(deep) // '{"a":1,"b":2,"c":[3,4,5]}'
    console.log('json :', json);
  }

  function nested() {
    var nested = Immutable.fromJS({a: {b: {c: [3, 4, 5]}}});
    console.log('nested :', nested); // Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }

    var nested2 = nested.mergeDeep({a: {b: {d: 6}}});
    console.log('nested2 :', nested2); // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }

    console.log('getIn :', nested2.getIn(['a', 'b', 'd']));

    var nested3 = nested2.updateIn(['a', 'b', 'd'], value => value + 1);
    console.log('nested3 :', nested3.toObject()); // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }

    var nested4 = nested3.updateIn(['a', 'b', 'c'], list => list.push(6));
    console.log('nested4 :', nested4); // Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }
  }

  function lazySeq() {
    console.log('Seq.of(1, 2, 3, 4, 5, 6, 7, 8, 9) :', Seq.of(1, 2, 3, 4, 5, 6, 7, 8, 9));

    var oddSquares = Seq.of(1, 2, 3, 4, 5, 6, 7, 8, 9)
      .filter(x => {
        console.log('seq filter x :', x);
        return x % 2;
      })
      .map(x => {
        console.log('seq map x :', x);
        return x * x;
      });

    console.log('oddSquares.get(0) :', oddSquares.get(0)); // 1
    console.log('oddSquares.get(1) :', oddSquares.get(1)); // 9
    console.log('oddSquares.get(2) :', oddSquares.get(2)); // 25
  }

  function changeMapToLazySeq() {
    var seq = Map({a: 1, b: 2, c: 3}).toSeq();
    console.log('changeMapToLazySeq - seq :', seq);
  }

  function equal() {
    const map1 = Immutable.Map({a: 1, b: 2, c: 3});
    const map2 = Immutable.Map({a: 1, b: 2, c: 3});

    console.log('Immutable.is :', Immutable.is(map1, map2));
    console.log('Immutable.equals :', map1.equals(map2));
  }

  function mutation() {
    // you must use set, push, pop in withMutation function. (don't use map, filter, sort, splice, etc... in withMutation function.)

    const list1 = Immutable.List.of(1, 2, 3);
    const list2 = list1.withMutations(function(list) {
      list.push(4).push(5).push(6);
    });

    console.log('mutation - list1.size :', list1.size);
    console.log('mutation - list2.size :', list2.size);
  }
}(jQuery));