import { searchKomik, Komik, recentUpdate, manhuaList, manhwaList, coloredManga, genresList } from './index.js'
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
    const data = await searchKomik(q, genre, status, colored, order, type, p)
    res.status(200).json(data)
})

app.get('/manhua', async (req, res) =>{
    const { p } = req.query
    const data = await manhuaList(p)
    res.status(200).json(data)
})

app.get('/manhwa', async (req, res) =>{
    const { p } = req.query
    const data = await manhwaList(p)
    res.status(200).json(data)
})

app.get('/colored', async (req, res) =>{
    const { p } = req.query
    const data = await coloredManga(p)
    res.status(200).json(data)
})

app.get('/genre', async (req, res) =>{
    const { p } = req.query
    const data = await genresList()
    res.status(200).json(data)
})

app.listen(port, () =>{
    console.log('api is ready');
})