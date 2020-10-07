function sortItemsBySpace(sequence) {
  return sequence.reduce((topology, v, i) => {
    if (topology.has(v.space)) {
      topology.get(v.space).push(i)
    } else {
      topology.set(v.space, [i])
    }

    return topology
  }, new Map())
}

function countItems(sequence) {
  return sequence.reduce((itemsCount, i) => {
    if (i === 0) { itemsCount.n++ }
    else if (i === 1) { itemsCount.w++ }
    else { throw new Error("i must be either 0 or 1")}

    return itemsCount
  }, {n: 0, w: 0})
}

/**
  @param {Array} g a group, produced by maximizeGroupsDifference
*/
function isDenseGroup(g) {
  if (g.length <= 1) return null

  return (g.length <= 1)
    ? null
    : (g[0] === g[1]) ? true
    : false
}

function maximizeGroupsDifference(seq) {
  return seq.reduce((groups, v) => {
    if (groups.length === 1 && groups[groups.length-1].length === 0) {
      groups[groups.length-1].push(v)
      return groups
    }

    const lastGroup = groups[groups.length-1]
    const last = lastGroup[lastGroup.length-1]
    const secondToLast = lastGroup[lastGroup.length-2]

    if (secondToLast === undefined ||
      v === last && secondToLast === last ||
      v !== last && secondToLast !== last
    ) {lastGroup.push(v)} else if (
      v === last && secondToLast !== last
    ) {groups.push([lastGroup.pop(), v])} else if (
      v !== last && secondToLast === last
    ) {
      groups.push([v])
    }

    return groups
  }, [[]])
}

module.exports = {
  maximizeGroupsDifference,
  sortItemsBySpace, countItems,
}
