// const {doRecursivelyIterate, makeRecursivelyIterate} = require('recursion-and-discrete-math')
const {
  randomBinarySequence, randomBinarySequences, compare,
  randomBinaryProportionateSeqSecond,
  binaryPermutations, demoBinaryPermutations
} = require('./helpers')
const {
  maximizeGroupsDifference, check, sortItemsBySpace, fit,
  iterate, doIterate, makeSeq
} = require('./sophos-grid')

function tryOutCheck(slots, n, w, nSpace, wSpace) {
  const s = randomBinaryProportionateSeqSecond(n,w, nSpace,wSpace)
  const sS = sortItemsBySpace(s).get(2)
  const r = check(slots, sS, s)

  const sP = s.map(i => i.space)
  const rM = []
  r.forEach(r => rM[r.i] = r.gs[0].map(i => sP[i]))
  const rP = []
  rM.forEach(r => (r) ? rP.push(r) : null)

  return {rM, rP, s, sP}
}


const layouts = {
  l: {}, m: {
    n: {min: 3, max: 5},
    w: {min: 1, max: 3}
  }, s: {}
}

function createAndFitIntoM() {
  const s = randomBinaryProportionateSeq(30, 20)
  const sG = maximizeGroupsDifference(s)
  const fitted = fit({n: 3, w: 1}, {n: 5, w: 3}, sG)


}

function fitGroupsIntoM(groups) {

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

function maximizeGroupsDifferenceRandomSeqs() {
  // randomBinarySequence()
}

module.exports = {
  tryOutCheck,
  analyzeSequences,
  iterateSequences, iterateRandomSequences
}
