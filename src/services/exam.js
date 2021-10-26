

// import models
import { Json } from 'sequelize/types/lib/utils'
import { Exam } from '../models'


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
    async findList({orderBy = 'desc',isDeleted = false,studentId,bookId}) { // sId, bId
        // query options 
        let options  = {
            order: [['id',orderBy]],
            where:{
                isDeleted:isDeleted === 'all' ? undefined : isDeleted,
                $and:[{sId: studentId},{bId: bookId}]
            }
        }

        // delete undefined property
        options.where = JSON.parse(JSON.stringify(options))
        
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
		await Books.update(realInfo, {
			where: { id, isDeleted: false },
		})

		const updatedExam = await Exam.findOne({
			where: { id, isDeleted: false },
			
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

		// [ERROR] Exam_DELETED
		if (book.isDeleted) throw Error('Exam_DELETED')

		

		// deleting exam in Exam
		await Exam.destroy({where: { sId: id}})

	}
}
export default ExamService()