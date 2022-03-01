// Initalization
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

// middlewares
app.use(express.json())
app.use(cors()) // Needed for access from local host

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

// RESTART HEROKU
// $ git commit -m "Heroku Exec" --allow-empty
// $ git push heroku master
// $ git reset HEAD^