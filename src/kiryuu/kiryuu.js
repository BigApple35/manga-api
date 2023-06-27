import { genreList, manga, popular, recent, searchQuery, chapter } from './scrap.js'
import express from 'express'

const app = express.Router()



app.get('/popular', async (req, res) =>{
    try {
        const data = await popular()
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(400)
    }
})

app.get('/recent', async (req, res) =>{
    try {
        const { p } = req.query
        const data = await recent(p)
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(400)
    }
})

app.get('/genre', async (req, res) =>{
    try {
        const data =  await genreList()
        res.status(200).json(data)
    } catch (error) {
        console.log(erro);
    }
})

app.get('/search', async (req, res) => {
    try {
        const {stauts, type, order, genre} = req.query
        const data = await searchQuery(stauts, type, order, genre)
        res.status.json(data)
    } catch (error) {
        console.log(error);
    }
})

app.get('/komik/:title', async (req, res) =>{
    try {
        const { title } = req.params
        const data = await manga(title)
        res.status(200).json(data)    
    } catch (error) {
        console.log(error);
    }
})

app.get('/komik/:komikTitle/:komikChapter', async (req, res) =>{
    try {
        const { komikTitle, komikChapter } = req.params
        const data = await chapter(komikTitle, komikChapter)
        res.status(200).json(data)    
    } catch (error) {
        console.log(error);
    }
})


export default app