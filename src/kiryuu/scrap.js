import axios from 'axios';
import cheerio from 'cheerio';


const URL = 'https://kiryuu.id/'


export const popular = async () =>{
    const data = await axios.get(`${URL}`)
    const $ = cheerio.load(data.data)
    const result = {
        weekly : [],
        monthly : [],
        alltime : []
    }

    $('.wpop-weekly li').each((i, el) =>{
        const genre = []    
        $(el).find('.leftseries span a').each((i, el) =>{
             genre.push($(el).html())       
        })
        
        result.weekly.push({
                title : $(el).find('.leftseries h2 a').html(),
                img : $(el).find('.imgseries img').attr('src'),
                genre : genre
            })
    })
    
    $('.wpop-monthly li').each((i, el) =>{
        const genre = []    
        $(el).find('.leftseries span a').each((i, el) =>{
             genre.push($(el).html())       
        })
        
        console.log(genre);
        result.monthly.push({
                title : $(el).find('.leftseries h2 a').html(),
                img : $(el).find('.imgseries img').attr('src'),
                genre : genre
            })
    })

    $('.wpop-alltime li').each((i, el) =>{
        const genre = []    
        $(el).find('.leftseries span a').each((i, el) =>{
             genre.push($(el).html())       
        })
        
        console.log(genre);
        result.alltime.push({
                title : $(el).find('.leftseries h2 a').html(),
                img : $(el).find('.imgseries img').attr('src'),
                genre : genre
            })
    })

    return result
}

export const recent = async (page = 1) =>{
    const data = await axios.get(`${URL}/manga/?page=${page}&order=update`)
    const $ = cheerio.load(data.data)
    const result = []


    $('div.listupd .bsx a').each((i, el) =>{
        result.push(
            {
                title : $(el).attr('title'),
                tipe : $(el).find('.limit span').attr('class').split(' ')[1],
                cover : $(el).find('.limit img').attr('src'),
                chapter : $(el).find('.bigor .adds .epxs').html()
            }
        )
    })

    return result
}

export const genreList = async () =>{
    const data = await axios.get(`${URL}/manga`)
    const $ = cheerio.load(data.data)
    const result = []

    $('form ul.genrez li').each((i, el) =>{
        result.push({
            genre : $(el).find('label').html(),
            number : $(el).find('label').attr('for')
        })
    })

    return result
}

export const searchQuery = async (status = '', type = '', order = '', genre = '') =>{
    // status : completed, hiatus, ongoing
    // type : manga, manhwa, manhua, comic, novel
    // order : title, titlereverse, update, added, popular
    // genre : look at /genre to see genre list 

    const data = await axios.get(`${URL}/manga/?status=${status}&type=${type}&order=${order}`)
    const $ = cheerio.load(data.data)
    const result = []



    $('div.listupd .bsx a').each((i, el) =>{
        result.push(
            {
                title : $(el).attr('title'),
                tipe : $(el).find('.limit .type').attr('class').split(' ')[1],
                cover : $(el).find('.limit img').attr('src'),
                chapter : $(el).find('.bigor .adds .epxs').html()
            }
        )
    })
    return result


}

export const manga = async (title) => {
    const data = await axios.get(`${URL}/manga/${title}`)
    const $ = cheerio.load(data.data)
    const result = {}

    result.title = $('article .seriestucon h1').html().split(' Bahasa Indonesia')[0]
    result.cover = $('article .seriestucontent img').attr('src')
    result.synopsis = $('article .seriestucontent .seriestucontentr .entry-content p').html()
    result.info = {
        staus : $('article .seriestucontent .seriestucontentr .infotable tr:nth-child(1) td:nth-child(2)').html(),
        type : $('article .seriestucontent .seriestucontentr .infotable tr:nth-child(2) td:nth-child(2)').html(),
        released : $('article .seriestucontent .seriestucontentr .infotable tr:nth-child(3) td:nth-child(2)').html(),
        Author : $('article .seriestucontent .seriestucontentr .infotable tr:nth-child(4) td:nth-child(2)').html(),
        artist : $('article .seriestucontent .seriestucontentr .infotable tr:nth-child(5) td:nth-child(2)').html(),
    }
    result.genre = [] 
    

    $('article .seriestucontent .seriestucontentr .seriestugenre a').each((i, el) =>{
        result.genre.push($(el).html())
    })

    return result
}

export const chapter = async (title, chapter) =>{
    const data = await axios.get(`${URL}/${title}-chapter-${chapter}`)
    const $ = cheerio.load(data.data)
    const result = []


    $($('.postarea article .entry-content #readerarea noscript').html()).find('img').each((i, el) =>{
        result.push($(el).attr('src'))
    })

    return result
}

const test = async () =>{
    const data = await chapter('mercenary-enrollment', '1')
    console.log(data);
}
test()