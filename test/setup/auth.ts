import User from '../../src/app/models/user'

export const userData = {
    _id: '5f9f1b9b9c9d9c0b8c8b8b8b',
    name: 'John Doe',
    email: 'user@test.com',
    password: 'password',
    role: 'user',
}

export const adminData = {
    _id: '5f9f1b9b9c9d9c0b8c8b8b8c',
    name: 'Admin',
    email: 'admin@test.com',
    password: 'password',
    role: 'admin',
}

/**
 * @description Store user data to mongodb and return the generated token
 * @returns {Promise<string>}
 */
export const createUserToken = async (): Promise<string> => {
    const user = new User(userData)
    await user.save()
    return user.generateToken()
}

/**
 * @description Store admin data to mongodb and return the generated token
 * @returns {Promise<string>}
 */
export const createAdminToken = async (): Promise<string> => {
    const user = new User(adminData)
    await user.save()
    return user.generateToken()
}

export const deleteAllUsers = async (): Promise<void> => {
    await User.deleteMany({})
}