import * as admin from 'firebase-admin'
import { ServiceAccount } from 'firebase-admin'
import { Configuration } from "./config.key"
import configService from "./config.service"

const serviceAccount: ServiceAccount = require('./ecommerce-33601-firebase-adminsdk-5vbyt-1e967ae272.json')

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: configService.get(Configuration.FIREBASE_CONNECTION)
})

const db = app.firestore()


export { db }