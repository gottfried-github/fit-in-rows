const {
  randomBinarySequence, randomBinarySequences, compare,
  randomBinaryProportionateSeqSecond,
  binaryPermutations, demoBinaryPermutations
} = require('./helpers')
const {
  maximizeGroupsDifference, sortItemsBySpace,
  formGroups,
} = require('./sophos-grid')

function tryOutFormGroups(slots, n, w, nSpace, wSpace) {
  const {s, sS} = randomPropSortedSeqSecond(n, w, nSpace, wSpace)
  console.log(s, sS)
  return prettifyGroupsByItem(formGroupsDev(slots, s, sS), s)
}

function randomPropSortedSeqSecond(n,w, nSpace,wSpace) {
  const s = randomBinaryProportionateSeqSecond(n,w, nSpace,wSpace)
  return {s, sS: sortItemsBySpace(s).get(wSpace)}
}

function prettifyGroupsByItem(gs, s) {
  const sP = s.map(i => i.space)
  const gsM = []
  gsM.forEach(g => gsM[g.i] = g.gs[0].map(i => sP[i]))

  return {sP, gsM}
}

module.exports = {
  randomPropSortedSeqSecond, prettifyGroupsByItem,
  tryOutFormGroups
}
