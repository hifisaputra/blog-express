import { connectDB, closeDB } from '../../src/app'
import server from '../../src/app'
import supertest from 'supertest'
import { createUserToken, createAdminToken, userData, adminData, deleteAllUsers } from './auth'
import { createCategory, deleteAllCategories, categoryData } from './category'

let userToken: string
let adminToken: string

beforeAll(async () => {
    await connectDB()
    await deleteAllUsers()
    await deleteAllCategories()

    await createCategory()
    userToken = await createUserToken()
    adminToken = await createAdminToken()
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
export const getCategoryData = () => categoryData