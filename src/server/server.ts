import EventEmitter from 'events'
import { join } from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'

import express from 'express'
import { nodeService } from './nodes'

const emitter = new EventEmitter()

const port = process.env.PORT || 65432

enum EventType {
  ADD_NODES = 'ADD_NODES',
}

type AddTextEvent = {
  eventType: EventType.ADD_NODES
  data: string
}

export function run() {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(express.static(join(__dirname, 'assets')))

  app.get('/', async (req, res) => {
    res.json({
      items: nodeService.readItems(),
      hello: 'world!',
    })
  })

  app.all('/add-text', (req, res) => {
    const { method } = req
    if (!['POST', 'GET'].includes(method)) {
      res.json({ success: false })
      return
    }

    const text = method === 'POST' ? req.body.text : req.query.text

    nodeService.addText(text)

    const data = nodeService.readItems()

    emitter.emit(EventType.ADD_NODES, {
      eventType: EventType.ADD_NODES,
      data,
    })

    res.json({
      success: true,
    })
  })

  app.post('/add-nodes', (req, res) => {
    const nodes = req.body.nodes

    // console.log('==========nodes:', nodes)

    nodeService.addNodes(nodes)

    const data = nodeService.readItems()

    emitter.emit(EventType.ADD_NODES, {
      eventType: EventType.ADD_NODES,
      data,
    })

    res.json({
      success: true,
    })
  })

  app.get('/add-nodes-successfully', async (req, res) => {
    nodeService.clearDB()
    // console.log('successfully added nodes======')

    res.json({
      success: true,
    })
  })

  app.get('/agent-sse', (req, res) => {
    // app.post("/agent-sse", (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const data = `data: ${JSON.stringify({})}\n\n`
    res.write(data)

    emitter.on(EventType.ADD_NODES, (ev: AddTextEvent) => {
      const msg = JSON.stringify(ev)
      const data = `data: ${msg}\n\n`
      res.write(data)
    })

    req.on('close', () => {
      // console.log("close=========");
      // TODO: how to unsubscribe?
      // redis.unsubscribe(CHANNEL);
    })
  })

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
}
