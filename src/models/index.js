import Sequelize from 'sequelize'
import dbConfig from '../config/db-config.js'

// import models
import StudentModel from './Student.js'
import BooksModel from './Books.js'
import ExamModel from './Exam.js'

// const env = process.env.NODE_ENV || 'development'
// const config = dbConfig[env]
// const  sequelize = new Sequelize(config.database, config.username, config.password, config)
const  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)


// init models
const models = {
    Student: StudentModel.init(sequelize,Sequelize),
    Books: BooksModel.init(sequelize,Sequelize),
    Exam: ExamModel.init(sequelize,Sequelize)
}

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
    .filter((model)=>typeof model.associate === 'function')
    .forEach((model)=> model.associate(models))

// export models and sequelize
const model = {
    ...models,
    sequelize,
    Sequelize
}
export default model
