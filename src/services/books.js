


// import models
import models from '../models/index.js'

const { Books } = models
// singleton instance
let instance = null

class BooksService {
    constructor() {
        if (!instance) {
            console.log('BooksService Create' + this)
        }
        return instance
    }

    // book create
    async create(studentId,title) {

        return await Books.create({sId:studentId,title})
    }

    // book findlist
    async findList({title,orderBy = 'desc',isDeleted = false}) { // keyword -- name
        // query options 
        let options  = {
            order: [['id',orderBy]],
            where:{
                isDeleted:isDeleted === 'all' ? undefined : isDeleted,
                title:{$like:`%${title ? title : ''}%`}
            }
        }
        
        // delete undefined property
        options.where = JSON.parse(JSON.stringify(options.where))
        
        return await Books.findAndCountAll(options)
    }

    async findById(id) {
		return await Books.findByPk(id)
	}

    async updateById(id, updateData) {

		const { studentId, title } = updateData
        const parseData = {sId: studentId ? studentId : undefined, title: title ? title : undefined }
        const data = JSON.parse(JSON.stringify(parseData))
		// update book
		await Books.update(data, {
			where: { id, isDeleted: false },
		})

		const updatedBook = await Books.findOne({
			where: { id, isDeleted: false },
			
		})

		// [ERROR] Book_NOT_FOUND
		if (updatedBook === null) throw Error('Book_NOT_FOUND')

		// return updated book
		return updatedBook
	}

    async count(where) {
		const count = await Books.count({
			where,
		})
		return count
	}

    async Deleting(id) {
		const book = await Books.findByPk(id)

		// [ERROR] BOOK_NOT_FOUND
		if (book === null) throw Error('Book_NOT_FOUND')

		// [ERROR] BOOK_DELETED
		if (book.isDeleted) throw Error('Book_DELETED')

		

		// deleting book in books
		await Books.destroy({where: { id }})

	}
}
export default new BooksService()