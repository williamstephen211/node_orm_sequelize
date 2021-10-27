



// import models
import models from '../models/index.js'

const { Student, Books, Exam } = models
// singleton instance
let instance = null

class StudentService {
    constructor() {
        if (!instance) {
            console.log('StudentService Create' + this)
        }
        return instance
    }

    // student create
    async create(user) {

        return await Student.create(user)
    }

    // student findlist
    async findList({keyword,orderBy = 'desc',isDeleted = false}) { // keyword -- name
        // query options 
        let options  = {
            order: [['id',orderBy]],
            where:{
                isDeleted:isDeleted === 'all' ? undefined : isDeleted,
                name:{$like:`%${keyword ? keyword : ''}%`}
            }
        }

        // delete undefined property
        options.where = JSON.parse(JSON.stringify(options.where))
        console.log(options)
        return await Student.findAndCountAll(options)
    }

    async findById(id) {
		return await Student.findByPk(id)
	}

    async updateById(id, student) {
		

		// update user
		await Student.update(student, {
			where: { id, isDeleted: false },
		})

		const updatedStudent = await User.findOne({
			where: { id, isDeleted: false },
			
		})

		// [ERROR] USER_NOT_FOUND
		if (updatedStudent === null) throw Error('Student_NOT_FOUND')

		// return updated user
		return updatedStudent
	}

    async count(where) {
		const count = await Student.count({
			where,
		})
		return count
	}

    async Deleting(id) {
		const student = await Student.findByPk(id)

		// [ERROR] USER_NOT_FOUND
		if (student === null) throw Error('Student_NOT_FOUND')

		// [ERROR] USER_DELETED
		if (student.isDeleted) throw Error('Student_DELETED')

		

		// deleting student in books
		await Books.destroy({where: { sId: id}})

        // deleting student in Exam
        await Exam.destroy({where: { sId: id}})
		

		// user device 삭제
		await Student.update({isDeleted:true},{ where: { id } })
	}
}
export default new StudentService()