function fillSchemaDemo() {
  const sSrc = [{space: 1}, {space: 2}, {space: 1}]

  // both return: s: [1,2], reachedLimit: false, schemaLeft: []
  fillSchema([1,2], sSrc.map(i => i), [], fillSchema)
  fillSchema([2,1], sSrc.map(i => i), [], fillSchema)

  // returns: s: [1], reachedLimit: true, schemaLeft: [1,1]
  fillSchema([], sSrc, [1,1,1], g.fillSchema)

  // returns: s: [1,1], reachedLimit: true, schemaLeft: [1]
  fillSchema([1,1,1], [{space: 1}, {space: 1}], [], fillSchema)
}
