const {doRecursivelyIterate, makeRecursivelyIterate} = require('recursion-and-discrete-math')

function allSchemas(size, itemTypes, ordered) {
  const ps = createSchemaPermutations(size, itemTypes)
  if (ordered) return ps
  return permutationsToCombinations(ps, itemTypes)
}

function createSchemaPermutations(size, itemTypes) {
  if (itemTypes.filter(t => (t>size) ? true : false).length > 0) throw new Error()

  const schemas = []
  // if (itemTypes.includes(size)) schemas.push([size])

  let pSize = null, l = 0
  while (pSize <= size) {
    const ps = []

    const i = makeRecursivelyIterate((v, data, depth, cb) => {
      // console.log('v: ', v, 'data: ', data, 'depth: ', depth)
      cb((v) ? [data].concat(v) : [data])
    })
    i(itemTypes, l, false, (v) => {ps.push(v)}, i)

    pSize = Math.min(...ps.map(p => getSize(p)))

    ps.forEach(p => {
      if (size === getSize(p)) schemas.push(p)
    })
    
    l++
  }

  return schemas
}

function permutationsToCombinations(ps, itemTypes) {
  const combinations = []

  const ratios = ps.reduce((ratios, p, i) => {
    // console.log('p', ps[i])
    const pR = sortItemsByType(p)
    if (0 === ratios.length) {
      combinations.push(p); return [pR]
    }

    let _i = 0, l = ratios.length
    while (_i < l) {
      // console.log(ps[_i])
      if (isRatioEqual(ratios[_i], pR)) return ratios
      _i++
    }

    combinations.push(ps[i])
    ratios.push(pR)
    return ratios
  }, [])

  return combinations
}

function isRatioEqual(a, b) {
  const bKs = b.keys()
  // console.log(bKs)

  if (a.size !== b.size) return false

  let {done, value} = bKs.next()

  while (!done) {
    if (
    !a.has(value) || a.get(value).length !== b.get(value).length
    ) break

    const res = bKs.next()
    done = res.done; value = res.value
  }

  return done
}

/**
  @param {[Item]} items $Item
*/
function sortItemsByType(items) {
  return items.reduce((topology, v, i) => {
    if (topology.has(v)) {
      topology.get(v).push(i)
    } else {
      topology.set(v, [i])
    }

    return topology
  }, new Map())
}

/**
  @param {Sequence} sequence $Sequence
*/
function getSize(sequence) {
  return sequence.reduce((sum, i) => sum+i, 0)
}

module.exports = {
  createSchemaPermutations, permutationsToCombinations, allSchemas,
  getSize, isRatioEqual,
}
