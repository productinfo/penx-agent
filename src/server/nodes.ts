import { v4 as uuidv4 } from 'uuid'
import { app } from 'electron'
import { join } from 'path'
import jetpack from 'fs-jetpack'
import { createNodeFromText } from './createNodeFromText'
import { INode } from './INode'

function getDbPath() {
  const fileName = 'db.json'
  const configPath = join(app.getPath('userData'), fileName)
  return configPath
}

function writeDB(data: Item[]) {
  const dbPath = getDbPath()
  jetpack.write(dbPath, data)
}

function readDB(): Item[] {
  const dbPath = getDbPath()
  if (!jetpack.exists(dbPath)) return [] as Item[]
  return jetpack.read(dbPath, 'json') || []
}

interface Item {
  id: string
  nodeData: string
  added: boolean
}

class NodeService {
  addText(text: string) {
    const node = createNodeFromText(text)
    const data = readDB()
    data.push({
      id: uuidv4(),
      nodeData: JSON.stringify(node),
      added: false,
    })
    writeDB(data)
  }

  addNodes(nodes: INode[]) {
    const data = readDB()
    for (const node of nodes) {
      data.push({
        id: uuidv4(),
        nodeData: JSON.stringify(node),
        added: false,
      })
    }
    writeDB(data)
  }

  clearDB() {
    writeDB([])
  }

  readItems(): Item[] {
    return readDB()
  }
}

export const nodeService = new NodeService()
