import { connectDB, closeDB } from '../../src/app'
import server from '../../src/app'
import supertest from 'supertest'
import { createUserToken, userData, adminData, deleteAllUsers } from './auth'

let userToken: string
let adminToken: string

beforeAll(async () => {
    await connectDB()
    await deleteAllUsers()

    userToken = await createUserToken()
})

afterAll(async () => {
    await closeDB()

})

export const app = () => {
    return server
}

export const request = () => {
    return supertest(server)
}

export const getUserToken = () => userToken
export const getAdminToken = () => adminToken
export const getUserData = () => userData
export const getAdminData = () => adminData