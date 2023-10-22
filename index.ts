import express, { Request, Response, NextFunction } from 'express'
import { applefarmDB, client } from './shared/lib/db'
import cors from 'cors'
import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import dotenv from 'dotenv'
import { indexRouter } from './src/routers/'
import cookieParser from 'cookie-parser'
import { postController } from './src/controllers'
const passportConfig = require('./src/passport')
dotenv.config()

const appServer = async () => {
	const app = express()

	const corsOptions = {
		origin: ['http://localhost:8000', '*'],
		credentials: true,
	}

	app.use(cors(corsOptions))
	app.use(express.json())
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	try {
		await applefarmDB.startServer()
	} catch (err) {
		console.error(err)
		throw new Error(`Can not connect DATABASE`)
	}

	passportConfig()

	app.use(cookieParser(process.env.MY_KEY))
	app.use(
		session({
			resave: false,
			saveUninitialized: false,
			secret: process.env.MY_KEY as string,
			cookie: {
				httpOnly: true,
				secure: false,
			},
		}),
	)
	app.use(passport.initialize())
	app.use(passport.session())

	app.use('/', indexRouter)

	app.get('/', (req: Request, res: Response, next: NextFunction) => {
		res.send('Hello World!')
	})

	app.get('/test', postController.getPosts)

	app.listen('8000', () => {
		console.log(`
            #############################################
                🛡️ Server listening on port: 8000 🛡️
            #############################################  
        `)
	})
}

if (require.main === module) {
	appServer()
}

export { appServer }
