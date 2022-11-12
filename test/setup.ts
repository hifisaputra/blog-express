import { connectDB, closeDB } from '../src/app'
import server from '../src/app'
import supertest from 'supertest'
import User from '../src/app/models/user'
import { generateToken } from '../src/lib/auth'

/**
 * @description Default user for test
 * @constant {Object} user
 */
const userData = {
    name: 'John Doe',
    email: 'johndoe@mail.com',
    password: 'password'
}
let userToken = ''

export const defaultUser = userData

beforeAll(async () => {
    await connectDB()

    let user = await User.findOne({ email: userData.email })
    if (!user || !user._id) {
        user = new User(userData)
        await user.save()
    }
    userToken = await generateToken(user)
})

afterAll(async () => {
    await User.deleteMany({ email: { $ne: userData.email } })
    await closeDB()
})

export const app = () => {
    return server
}

export const request = () => {
    return supertest(server)
}

export const getDefaultToken = () => {
    return userToken
}