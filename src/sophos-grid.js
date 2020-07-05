/**
  @param {[0 || 1, ...]} arr
*/
function makeSeq(arr) {
  return new Proxy(arr, {
    get(t, p, r) {
      if ("w" === p) {
        let w = 0
        t.forEach(i => {if (i === 1) {w++}})
        return w
      } else if ("n" === p) {
        let n = 0
        t.forEach(i => {if (i === 0) {n++}})
        return n
      } else if ("ratio" === p) {
        return r.n / r.w
      } else if ('splice' === p) {
        // @param {{v: (the value of what to pass to splice)} || null (if not to pass anything)} items
        return (start, n, items) => {
          return (items)
            ? makeSeq(t.splice(start, n, items.v))
            : makeSeq(t.splice(start, n))
          }
      } else {
        return t[p]
      }
    }, set() {}
  })
}

function iterate(seq) {
  let [subseq0, subseq1] = [seq, seq.splice(0, Math.round(seq.length/2))]

  
  return {subseq0, subseq1}
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

/*
  @param {[0 || 1, ...]} seq
function calculate(seq) { // calculateRatio
  let w = 0, n = 0
  seq.forEach(i => (i === 1)
    ? w++ : n++
  )

  return {w, n}
}

function analyzeSubseq(seq) {
  const res = calculate(seq)
  res.ratio = res.w / res.n
  return res
}
*/

module.exports = {
  // calculate, analyze,
  makeSeq, iterate
}
