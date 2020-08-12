const {doRecursivelyIterate, makeRecursivelyIterate} = require('recursion-and-discrete-math')

function randomBinaryProportionateSeq(n, w) {
  const sN = []; sN.length = n; sN.fill(0)
  const sW = []; sW.length = w; sW.fill(1)
  const _s = sN.concat(sW);
  const s = []

  while (_s.length > 0) {
    s.push(_s.splice(randomBetween(0, _s.length-1), 1)[0])
  }

  return s
}

class Item {
  constructor(space) {
    if (!Number.isInteger(space) || space < 1) throw new Error("space must be an integer, greater than 0")
    this.space = space
  }
}

function randomBinaryProportionateSeqSecond(n, w, nSpace, wSpace) {
  return randomBinaryProportionateSeq(n, w).map((i) => {
    return new Item((i === 0) ? nSpace : wSpace)
    // {space: (i === 0) ? nSpace : wSpace}
  })
}

function randomBinarySequence(l) {
  const arr = []
  while (l >= 0) {
    arr.push(Math.round(Math.random()))
    l--
  }

  return arr
}

function compare(a, b) {
  let lastRepeated = false
  const repeats = []

  a.forEach((v, i) => {
    if (b[i] === v) {
      if (lastRepeated) {
        repeats[0].push(v)
      } else {
        const repeat = []; repeat.start = i
        repeat.push(v)
        repeats.unshift(repeat)
        lastRepeated = true
      }
    } else {
      lastRepeated = false
    }
  })

  let totalLength = 0
  repeats.forEach(i => totalLength += i.length)

  repeats.reverse()
  return {totalLength, repeats}
  // return repeats
}

function crossCompare(sequences) {
  // let i = sequences.length-1

}

function randomBinarySequences(l, n) {
  const sequences = []
  while(n >= 0) {
    const sequence = randomBinarySequence(l)

    sequences.push(sequence); n--
    // compare the generated sequence against all other sequences to make sure
    // they're not too similar (the problem is, given the binary range, there's going to be a lot of similar pieces)
    // if (!sequences.length) {
    //   sequences.push(sequence); n--; continue
    // }

    // const similarities = []
    // sequences.forEach((v, i) => {
    //   similarities.push({comparee: i, totalLength: compare(v, sequence).totalLength})
    // })
  }

  return sequences
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function logPretty(sequence) {
  return sequence.toString()
}

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

module.exports = {
  randomBinarySequence, randomBinarySequences, randomBinaryProportionateSeq,
  randomBinaryProportionateSeqSecond,
  binaryPermutations, demoBinaryPermutations,
  compare, logPretty
}
