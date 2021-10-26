import express from 'express'
import logger from 'morgan'
import models from './models/index.js'
import createLocaleMiddleware from 'express-locale'
import cors from 'cors'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(__dirname + '/static'))
app.use(createLocaleMiddleware())
app.use(cors({ credentials: true }))

// initialize database
models.sequelize
	.sync({ alter: true })
	.then(() => {	

		app.listen(/* process.env.PORT */3000, () => console.log(`App listening on port 3000`))
	})
	.catch((error) => {
		console.error(error.message)
	})
