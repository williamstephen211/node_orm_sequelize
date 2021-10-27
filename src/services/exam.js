

// import models

import models from '../models/index.js'

const { Exam } = models
// singleton instance
let instance = null

class ExamService {
    constructor() {
        if (!instance) {
            console.log('ExamService Create' + this)
        }
        return instance
    }

    // exam create
    async create(info) {

        return await Exam.create(info) // info - {sId, bId}
     }

    // student findlist
    async findList({orderBy = 'desc', studentId, bookId}) { // sId, bId
        // query options 
        let cond = []
        studentId && cond.push({sId: studentId}); bookId && cond.push({bId: bookId}) 
        let options  = {
            order: [['id',orderBy]],
            where:{
                
                // $and:[{sId: studentId},{bId: bookId}]
                $and:cond
            }
        }

        // delete undefined property
        options.where = JSON.parse(JSON.stringify(options.where))
        console.log(options)
        return await Exam.findAndCountAll(options)
    }

    async findById(id) {
		return await Exam.findByPk(id)
	}

    async updateById(id, uInfo) {
        
		const {studentId, bookId} = uInfo
        const info = {sId: studentId ? studentId : undefined, bId: bookId ? bookId : undefined}

        // removing undefine
        const realInfo = JSON.parse(JSON.stringify(info))

		// update user
		await Exam.update(realInfo, {
			where: { id },
		})

		const updatedExam = await Exam.findOne({
			where: { id },
			
		})

		// [ERROR] Exam_NOT_FOUND
		if (updatedExam === null) throw Error('Exam_NOT_FOUND')

		// return updated Exam
		return updatedExam
	}

    async count(where) {
		const count = await Exam.count({
			where,
		})
		return count
	}

    async Deleting(id) {
		const book = await Exam.findByPk(id)

		// [ERROR] Exam_NOT_FOUND
		if (book === null) throw Error('Exam_NOT_FOUND')

		
		// deleting exam in Exam
		await Exam.destroy({where: { id }})

	}
}
export default new ExamService()