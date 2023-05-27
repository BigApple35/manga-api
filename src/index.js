import axios from 'axios';
import cheerio from 'cheerio';



export const Manga = async (title) =>{
	const komik = await axios.get(`https://bacakomik.co/komik/${title}/`)
	const $ = cheerio.load(komik.data)
	const genreKomik = []
	
	
	$('.genre-info a').each((e, i) =>{
		genreKomik.push($(i).html())
	})


	const dataKomik = {
		title : $('.infoanime h1').html().slice(6),
		cover : $('.infoanime .thumb img').attr('src'),
		status : $('.spe span:nth-child(1)').text().slice(8),
		format : $('.spe span:nth-child(2)').text().slice(8),
		dirilis : $('.spe span:nth-child(3)').text().slice(9),
		pengarang : $('.spe span:nth-child(4)').text().slice(11),
		jenis : $('.spe span:nth-child(5)').text().slice(13),
		genre: genreKomik,
		synopsis : $('#sinopsis p').html()
	}


	


	return dataKomik

}

const recentUpdate = async (page) =>{
	const data = await get('https://bacakomik.co/komik-terbaru')
	const $ = load(data.data);
	const recentList = []

	
	$('.listupd .animepost .animposx').each((e, i) =>{
		recentList.push({
			nama : 	$(i).find('h4').html(),
			cover : $(i).find('img').attr('src'),
			chapter : $(i).find('.bigor .adds a').text(),
			tipe : $(i).find('.typeflag').attr('class').split(' ')[1],
		});
	})

	return recentList
}


const komikList = async (title, genre, status, berwarna, sortby, tipe) => {
	const genreQ = genre.map((val, i) =>{
		val = `genre%5B%5D=${val}&`
		return val
	}).join('')

	const OngingQ = status ? 'Ongoing' : status === '' ?  '' : 'Completed' 
	const BerwarnaQ = berwarna ? 1 : status === undefined ?  '' : 0 
	const tipeQ = tipe ? tipe : ''
	const sortbyQ = sortby ? sortby : ''
	const titleQ = title ? title : ''

	const komik = await get(
		`https://bacakomik.co/daftar-manga/?status=${OngingQ}&type=${tipeQ}&format=${BerwarnaQ}&order=${sortbyQ}&title=`)
	const $ = load(komik.data)
	const list = []


	$('.listupd .animepost').each((e, i) =>{
		list.push({
			nama : 	$(i).find('h4').html(),
			cover : $(i).find('img').attr('src'),
			rating : $(i).find('i').text(),
			tipe : $(i).find('.typeflag').attr('class').split(' ')[1],
		});
	})

	return list
}


const manhuaList = async (query) => {
	const komik = await get('https://bacakomik.co/manhua/')
	const $ = load(komik.data)
	const list = []


	$('.animepost').each((e, i) =>{
		list.push({
			nama : 	$(i).find('.tt').html(),
			cover : $(i).find('img').attr('src'),
			rating : $(i).find('i').text(),
			tipe : $(i).find('.typeflag').attr('class').split(' ')[1],
		});
	})

	return list
}


const manhwaList = async (query) => {
	const komik = await get('https://bacakomik.co/manhwa/')
	const $ = load(komik.data)
	const list = []


	$('.animepost .animposx').each((e, i) =>{
		list.push({
			nama : 	$(i).find('.tt').html(),
			cover : $(i).find('img').attr('src'),
			rating : $(i).find('i').text(),
			tipe : $(i).find('.typeflag').attr('class').split(' ')[1],
		});
	})

	return list
}


const coloredManga = async (page) =>{
	const data = await get('https://bacakomik.co/komik-terbaru')
	const $ = load(data.data);
	const coloredList = []

	
	$('.listupd .animepost .animposx').each((e, i) =>{
		coloredList.push({
			nama : 	$(i).find('h4').html(),
			cover : $(i).find('img').attr('src'),
			chapter : $(i).find('.bigor .adds a').text(),
			tipe : $(i).find('.typeflag').attr('class').split(' ')[1],
		});
	})

	return coloredList
}


const genresList = async () =>{
	const data = await get('https://bacakomik.co/daftar-genre/')
	const $ = load(data.data)
	const list = []


	$('main ul.genrelist li').each((e, i) => {
		list.push($(i).find('a').html())
	})

	return list
}





const test = async () =>{
	data = await recentUpdate()
	console.log(data);
}



