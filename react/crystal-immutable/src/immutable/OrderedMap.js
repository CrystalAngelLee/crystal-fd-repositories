const { OrderedMap } = require("immutable");

const map = OrderedMap({})
const map2 = map.set('z', 1);
const map3 = map2.set('x', 2);

map3.forEach((v, k) => console.log(v, k))