const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000
const playerData = {}

app.post("/update", (req, res) => {
  const { userId, name, pos, rot } = req.body
  playerData[userId] = { name, pos, rot, time: Date.now() }
  res.send({ status: "ok" })
})

app.get("/ghosts", (req, res) => {
  const now = Date.now()
  const result = {}
  for (const id in playerData) {
    if (now - playerData[id].time < 5000) {
      result[id] = playerData[id]
    }
  }
  res.send(result)
})

app.get("/ping", (req, res) => {
  res.send({ status: "alive" })
})

app.post("/debug", (req, res) => {
  console.log("🔧 Debug received:", req.body)
  res.send({ received: true })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
