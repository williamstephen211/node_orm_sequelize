import services from '../services/index.js'

const {studentService} = services
export default class StudentController{


    /**
	 * create - student creating
	 * method: POST
	 * path: /v2/student	 	 
	 */ 
    static async create(req, res) {

        try {

            const { name } = req.body
            const student = await studentService.create({name})

            // create response
			const response = {
				success: true,
				data: {
					student,
				},
			}
			res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

   /**
	 * findList - student list
	 * method: GET
	 * path: /v2/student	 	 
	 */ 
    static async findList(req, res) {
        
     
        try{

            const { name } = req.query
            
            // get student list
            const students = await studentService.findList({keyword:name})
    
            // create response
            const response = {
                success: true,
                data: {
                    total: students.count,
                    students:students.rows
                }
            }
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

    /**
	 * update - student update
	 * method: PATCH
	 * path: /v2/student/:id	 	 
	 */ 
    static async update(req, res) {
        
        try {
            const { id } = req.params
            const { changeName } = req.body

            const updateStudent = await studentService.updateById(id,{
                name:changeName
            })

            // create response
            const response = {
                success: true,
                data: {
                    student: updateStudent
                }
            }
            res.send(response)
        } catch(e) {
            res.send(e)
        }
    }

    /**
	 * delete - student deleting
	 * method: DELETE
	 * path: /v2/student/:id	 	 
	 */
     static async delete(req, res) {
		
		try {
			
			const { id } = req.params
            console.log('here')
			
			// deleting student info
			await studentService.Deleting(id)

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