/*
function formGroupsConsecutive(spaceToFill, sequence) {
  const groups = []
  sequence = sequence.map((item, i) => {
    return {...item, i}
  })

  while (sequence.length > 0) {
    const g = formSideBySpace([], [].concat(sequence), spaceToFill)
    groups.push(g)
    sequence.splice(0, g.s.length)
  }

  return groups
}

function formGroup(schemas, sequence) {
  let g = {s:[], schemaLeft: [null]}

  while (g.shemaLeft.length === 0 || schemas.length > 0) {
    g = formSideBySchema([], [].concat(sequence), schemas.shift())
  }

  return g
}
*/

// the core logic in both formGroupBySpace (fillSpace) and formGroupBySchema (fillSchema) is
// the same, thus it might be better to put it in a single place.
// The equivalent would be to use fillSpace for space and fillSchema for
// for schema
/*
// this hasn't been run
function fillSpace(d, sSrc, s, formSide) {
  if (sSrc.length === 0) return {s, d, reachedLimit: true}
  const isSchema = 'object' === typeof(d)

  const item = sSrc.shift()
  const dNew = (isSchema) ? d : d - item.space

  if (
    isSchema && !dNew.includes(item.space)
    || !isSchema && dNew < 0
  ) return {s, d, reachedLimit: true}

  if (isSchema) dNew.splice(dNew.indexOf(item.space), 1)
  s.push(item)

  if (
    isSchema && dNew.length === 0
    || !isSchema && 0 === dNew
  ) return {s, d: dNew, reachedLimit: false}

  return formSide(dNew, sSrc, s, formSide)
}
*/
