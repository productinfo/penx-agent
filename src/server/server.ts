import EventEmitter from 'events'
import bodyParser from 'body-parser'
import cors from 'cors'

import express from 'express'
import { nodeService } from './nodes'

const emitter = new EventEmitter()

const port = process.env.PORT || 65432

enum EventType {
  ADD_TEXT = 'ADD_TEXT',
  ADD_NODE = 'ADD_NODE',
}

type AddTextEvent = {
  eventType: EventType.ADD_TEXT
  data: string
}

export function run() {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors())

  app.get('/', async (req, res) => {
    res.json({
      items: nodeService.readItems(),
      hello: 'world!',
    })
  })

  app.all('/add-text', (req, res) => {
    const { method } = req
    if (!['POST', 'GET'].includes(method)) {
      res.json({
        success: false,
      })
      return
    }

    const text = method === 'POST' ? req.body.text : req.query.text

    nodeService.addText(text)

    const data = nodeService.readItems()

    emitter.emit(EventType.ADD_TEXT, {
      eventType: EventType.ADD_TEXT,
      data,
    })

    res.json({
      success: true,
    })
  })

  app.get('/add-nodes-successfully', async (req, res) => {
    nodeService.clearDB()

    res.json({
      success: true,
    })
  })

  app.get('/keeper-sse', (req, res) => {
    // app.post("/keeper-sse", (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const data = `data: ${JSON.stringify({})}\n\n`
    res.write(data)

    emitter.on(EventType.ADD_TEXT, (ev: AddTextEvent) => {
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
