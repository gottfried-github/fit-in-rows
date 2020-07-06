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

function logPretty(sequence) {
  return sequence.toString()
}

module.exports = {
  randomBinarySequence, randomBinarySequences, compare, logPretty
}
