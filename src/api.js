import { Manga } from './index.js'
import  express  from 'express'
const app = express()
const port = 3001


app.get('/', async (req, res) =>{
    const { slug } = req.query
    const mangaData = await Manga(slug)
    res.status(200).json(mangaData)
})

app.listen(port, () =>{
    console.log('api is ready');
})