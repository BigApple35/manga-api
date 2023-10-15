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

export const latesUpdate = async () =>{
    const data = await axios.get(URL)
    const $ = cheerio.load(data.data)
    const result = []
    
    $('.bixbox').eq(2).find('.listupd .uta').each((i, el) =>{
        const chapter = []

        $(el).find('.luf li').each((i, el) =>{
            chapter.push({
                chapter : $(el).find('a').html().slice(4),
                slug : $(el).find('a').prop("href").slice(18).slice(0, -1),
                time : $(el).find('span').html()
            })
        })  

        result.push({
            title : $(el).find('.luf a').attr('title'),
            cover : $(el).find('.imgu img').attr('src'),
            slug : $(el).find('a').attr('href').slice(24).slice(0, -1),
            chapter : chapter
        })
    })

    return result
}

export const recommended = async () =>{
    const data = await axios.get(`${URL}`)
    const $ = cheerio.load(data.data)
    const result = []

    
    $('.postbody .series-gen .listupd .tab-pane').each((i, el) =>{
            $(el).find('.bs a').each((i, el) =>{
                result.push({
                    title : $(el).find('.bigor .tt').text().replace('\n', '').replace('\t\t\t\t', '').replace('\t\t\t', ''),
                    slug : $(el).attr('href').slice(24).slice(0, -1),
                    chapter: $(el).find('.bigor .adds .epxs').html().slice(8),
                    rating : $(el).find('.bigor .adds .rt .numscore').html(),
                    cover : $(el).find('.limit img').attr('src'),
                    type: $(el).find('.limit .type').attr('class').split(' ')[1]
                })
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
                slug : $(el).attr('href').slice(24).slice(0, -1),
                tipe : $(el).find('.limit .type').attr('class').split(' ')[1],
                cover : $(el).find('.limit img').attr('src'),
                chapter : $(el).find('.bigor .adds .epxs').html()
            }
        )
    })
    return result


}

export const search = async (q = '', p = 1) =>{
    const data = await axios.get(`${URL}page/${p}/?s=${q}`)
    const $ = cheerio.load(data.data)
    const result = []



    $('div.listupd .bs .bsx a').each((i, el) =>{
        result.push(
            {
                title : $(el).find('.bigor .tt').text(),
                tipe : $(el).find('.limit .type').attr('class').split(' ')[1],
                cover : $(el).find('.limit img').attr('src'),
                slug : $(el).attr('href').slice(24).replace('/', '')
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
    result.alt = ($('article .seriestucon .seriestualt').html() || "").split(' Bahasa Indonesia')[0]
    result.cover = $('article .seriestucontent img').attr('src')
    result.synopsis = $('article .seriestucontent .seriestucontentr .entry-content p').html().replaceAll("<br>", "\n")
    result.info = {
        status : $('article .seriestucontent .seriestucontentr .infotable tr:nth-child(1) td:nth-child(2)').html(),
        type : $('article .seriestucontent .seriestucontentr .infotable tr:nth-child(2) td:nth-child(2)').html(),
        released : $('article .seriestucontent .seriestucontentr .infotable tr:nth-child(3) td:nth-child(2)').html(),
        Author : $('article .seriestucontent .seriestucontentr .infotable tr:nth-child(4) td:nth-child(2)').html(),
        artist : $('article .seriestucontent .seriestucontentr .infotable tr:nth-child(5) td:nth-child(2)').html(),
    },
    result.slug = title
    result.genre = [] 
    result.chapter = []

    $('.eplister li').each((i, el) =>{
        result.chapter.push({
            chapter : $(el).find('.eph-num .chapternum').html().slice(8),
            chapterSlug : $(el).find('.eph-num .chapternum').html().slice(8).replace('.', '-'),
            chapterLink : $(el).find('.eph-num a').prop("href").slice(18).slice(0, -1),
            date : $(el).find('.eph-num .chapterdate').text()
        })
    })

    $('article .seriestucontent .seriestucontentr .seriestugenre a').each((i, el) =>{
        result.genre.push($(el).html())
    })

    return result
}

export const chapter = async (slug) =>{
    const data = await axios.get(`${URL}/${slug}`)
    const $ = cheerio.load(data.data)
    const result = []


    $($('.postarea article .entry-content #readerarea noscript').html()).find('img').each((i, el) =>{
        result.push($(el).attr('src'))
    })

    return result
}

const test = async () =>{
    const data = await manga("return-of-the-greatest-lancer")
    console.log(data);
}
test()