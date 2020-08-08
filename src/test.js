const {doRecursivelyIterate, makeRecursivelyIterate} = require('recursion-and-discrete-math')
const {randomBinarySequence, randomBinarySequences, compare} = require('./helpers')
const {iterate, doIterate, makeSeq} = require('./sophos-grid')

function binaryPermutations(l) {
  const p = []

  const rIterator = makeRecursivelyIterate((v, data, depth, cb) => {
    // console.log('v: ', v, 'data: ', data, 'depth: ', depth)
    cb((v) ? [data].concat(v) : [data])
  })

  rIterator([0,1], l, null, (v) => {p.push(v)}, rIterator)

  // console.log(p);
  return p
}

function demoBinaryPermutations() {
  const p = binaryPermutations(9)
  console.log(p)
  return p
}

function analyzeSequences() {
  const p = binaryPermutations(17)
  return p.map(p => {
    const r = analyze(p)
    console.log(r)
    return r
  })
}

function iterateSequences(sequences) {
  const iterated = []
  sequences.forEach(s => iterated.push(doIterate(makeSeq(s))))

  return iterated
}

function iterateRandomSequences() {
  return iterateSequences(randomBinarySequences(64, 100))
}

module.exports = {
  analyzeSequences,
  binaryPermutations, demoBinaryPermutations,
  iterateSequences, iterateRandomSequences
}
