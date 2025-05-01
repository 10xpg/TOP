function buildFileSystem(nodes, parentId = null) {
  return nodes
    .filter((node) => node.parentId === parentId)
    .map((node) => ({
      ...node,
      subdirs: buildFileSystem(nodes, node.id)
    }))
}

module.exports = { buildFileSystem }
