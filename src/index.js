const express = require("express")
const {
  validation,
  survivorCount,
  errorHandler,
  notFound
} = require("./controllers")

const app = express()

app.use(express.json({ limit: '50mb' }))

app.post("/survivorCount", validation, survivorCount)

app.use(notFound)
app.use(errorHandler)

console.info("Starting server. url: http://localhost:8080/")

app.listen(8080)