const {doRecursivelyIterate, makeRecursivelyIterate} = require('recursion-and-discrete-math')

function binaryPermutations(l) {
  const p = []

  const rIterator = makeRecursivelyIterate((v, data, depth, cb) => {
    // console.log('v: ', v, 'data: ', data, 'depth: ', depth)
    cb((v) ? [data].concat(v) : [data])
  })

  rIterator([0,1], l, true, (v) => {p.push(v); console.log(v)}, rIterator)

  // console.log(p);
  return p
}

function demoBinaryPermutations() {
  const p = binaryPermutations(9)
  console.log(p)
  return p
}

module.exports = {
  binaryPermutations, demoBinaryPermutations
}
