


// import models
import { Books } from '../models'


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
    async create(studentId) {

        return await Books.create({sId:studentId})
    }

    // book findlist
    async findList({studentId,orderBy = 'desc',isDeleted = false}) { // keyword -- name
        // query options 
        let options  = {
            order: [['id',orderBy]],
            where:{
                isDeleted:isDeleted === 'all' ? undefined : isDeleted,
                sId: studentId
            }
        }

        // delete undefined property
        options.where = JSON.parse(JSON.stringify(options))
        
        return await Books.findAndCountAll(options)
    }

    async findById(id) {
		return await Books.findByPk(id)
	}

    async updateById(id, studentId) {
		

		// update book
		await Books.update({sId:studentId}, {
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
		await Books.destroy({where: { sId: id}})

	}
}
export default new BooksService()