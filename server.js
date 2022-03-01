const express = require('express')
const app = express()
const port = process.env.PORT || 1234

// Needed for access from local host
const cors = require('cors')
app.use(cors())

// middlewares
app.use(express.json())

//routers
const userRouter = require('./routes/userRouter.js')
app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.send('User!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Pushing to heroku: ///////////////////
// git push heroku main 