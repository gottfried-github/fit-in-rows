const {
  randomBinarySequence, randomBinarySequences, compare,
  randomBinaryProportionateSeqSecond,
  binaryPermutations, demoBinaryPermutations
} = require('./helpers')
const {
  maximizeGroupsDifference, sortItemsBySpace,
  formGroups, formGroupsLegacy,
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

function tryOutFormGroupsLegacy(slots, n,w, nSpace,wSpace) {
  const s = randomBinaryProportionateSeqSecond(n,w, nSpace,wSpace)
  const sS = sortItemsBySpace(s).get(2)
  const r = formGroupsLegacy(sS, slots, s)

  const sP = s.map(i => i.space)

  const rM = []
  r.forEach(r => rM[r.i] = r.gs[0].map(i => sP[i]))

  const rP = []
  rM.forEach(r => (r) ? rP.push(r) : null)

  return {sP, rM}
}

module.exports = {
  randomPropSortedSeqSecond, prettifyGroupsByItem,
  tryOutFormGroups
}
