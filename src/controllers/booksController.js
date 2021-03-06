import services from '../services/index.js'

const {booksService} = services
export default class BooksController{


    /**
	 * create - book creating
	 * method: POST
	 * path: /v2/books	 	 
	 */ 
    static create(req, res) {

        try {

            const { studentId,title } = req.body
            const book = booksService.create(studentId,title)

            // create response
			const response = {
				success: true,
				data: {
					book,
				},
			}
			res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

   /**
	 * findList - book list
	 * method: GET
	 * path: /v2/books	 	 
	 */ 
    static async findList(req, res) {
        
     
        try{

            const { title } = req.query
    
            // get book list
            const books = await booksService.findList({title})
    
            // create response
            const response = {
                success: true,
                data: {
                    total: books.count,
                    books:books.rows
                }
            }
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

    /**
	 * update - book update
	 * method: PATCH
	 * path: /v2/books/:id	 	 
	 */ 
    static async update(req, res) {
       
        try {
            const { id } = req.params
            const { studentId, title} = req.body
            const updateBooks = await booksService.updateById(id,{
                studentId,title
            })

            // create response
            const response = {
                success: true,
                data: {
                    books: updateBooks
                }
            }
            res.send(response)
        } catch(e) {
            res.send(e)
        }
    }

    /**
	 * delete - book deleting
	 * method: DELETE
	 * path: /v2/books/:id	 	 
	 */
     static async delete(req, res) {
		
		try {
			
			const { id } = req.params

			
			// deleting book info
			await booksService.Deleting(id)

			// create response
			const response = {
				success: true,
			}

			res.send(response)
		} catch (e) {
			res.send(e)
		}
	}
}