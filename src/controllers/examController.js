import { examService } from '../services'

export default class ExamController{


    /**
	 * create - exam creating
	 * method: POST
	 * path: /v2/exam	 	 
	 */ 
    static create(req, res) {

        try {

            const { studentId,bookId } = req.body
            const exam = examService.create({sId:studentId,bId:bookId})

            // create response
			const response = {
				success: true,
				data: {
					exam,
				},
			}
			res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

   /**
	 * findList - exam list
	 * method: GET
	 * path: /v2/exam	 	 
	 */ 
    static async findList(req, res) {
        
     
        try{

            const { studentId,bookId } = req.query
    
            // get exam list
            const exam = await booksService.findList({studentId,bookId})
    
            // create response
            const response = {
                success: true,
                data: {
                    total: exam.count,
                    exam:exam.rows
                }
            }
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

    /**
	 * update - exam update
	 * method: PATCH
	 * path: /v2/exam/:id	 	 
	 */ 
    static async update(req, res) {
        
        try {
            const { id, studentId,bookId } = req.params

            const updateBooks = await examService.updateById(id,{
                sId:studentId,bId:bookId
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
	 * delete - exam deleting
	 * method: DELETE
	 * path: /v2/exam/:id	 	 
	 */
     static async delete(req, res) {
		
		try {
			
			const { id } = req.params

			
			// deleting exam info
			await examService.Deleting(id)

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