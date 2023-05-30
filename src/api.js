import { Manga, komikList, recentUpdate } from './index.js'
import  express  from 'express'
const app = express()
const port = 3001


app.get('/manga', async (req, res) =>{
    const { t } = req.query
    const mangaData = await Komik(t)
    res.status(200).json(mangaData)
})

app.get('/recent', async (req, res) =>{
    const { p } = req.query
    const data = await recentUpdate(p)
    res.status(200).json(data)
})

app.get('/komik', async (req, res) =>{
    const { p, q, genre, type, status, colored, order } = req.query
    console.log(genre);
    const data = await searchKomik(q, genre, status, colored, order, type, p)
    res.status(200).json(data)
})

app.listen(port, () =>{
    console.log('api is ready');
})