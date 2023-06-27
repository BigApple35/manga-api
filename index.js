import bacakomik from "./src/baca-komik/bacakomik.js";
import kiryuu from "./src/kiryuu/kiryuu.js"
import express from 'express'
import cors from 'cors'


const app = express()


app.use(cors())
app.get('/', (req, res) =>{
    res.send('api is runnin')
})

app.use('/bk', bacakomik)
app.use('/kr', kiryuu)


app.listen(process.env.PORT || 3001, () => {
    console.warn("\nReady 🚀");
  });