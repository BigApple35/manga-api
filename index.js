import api from "./src/baca-komik/api.js";
import express from 'express'
import cors from 'cors'


const app = express()


app.use(cors())
app.get('/', (req, res) =>{
    res.send('api is runnin')
})

app.use('/bc', api)

app.listen(process.env.PORT || 3001, () => {
    console.warn("\nReady 🚀");
  });