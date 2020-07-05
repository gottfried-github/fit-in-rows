/**
  @param {[0 || 1, ...]} seq
*/
function calculate(seq) { // calculateRatio
  let w = 0, n = 0
  seq.forEach(i => (i === 1)
    ? w++ : n++
  )

  return {w, n}
}

/**
  @param {Array, such that arr.length is even} seq
*/
function analyze(seq) {
  let [subseq0, subseq1] = [seq, seq.splice(0, seq.length/2)]

  return {
    subseq0: analyzeSubseq(subseq0),
    subseq1: analyzeSubseq(subseq1)
  }
}

function analyzeSubseq(seq) {
  const res = calculate(seq)
  res.ratio = res.w / res.n
  return res
}

module.exports = {
  calculate, analyze
}
