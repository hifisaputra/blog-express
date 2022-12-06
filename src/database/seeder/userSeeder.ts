import User from '@src/app/models/user'
import { faker } from '@faker-js/faker'

/**
 * @description Method to populate the users collection with fake data
 * @param {number} [count=1] - Number of users to be created
 * @returns {Promise<void>}
 */
export const populateUsers = async (count: number): Promise<void> => {
    await insertDefaultUsers()

    const users = []
    for (let i = 0; i < count; i++) {
        users.push({
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            profilePicture: faker.image.imageUrl(),
            role: faker.helpers.arrayElement(['user', 'admin']),
        })
    }
    await User.insertMany(users)
}

const insertDefaultUsers = async (): Promise<void> => {
    const userData = {
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password: '123456',
        profilePicture: 'https://example.com/profile-picture.jpg',
        role: 'admin'
    }
    const userExists = await User.exists({ email: userData.email })

    if (!userExists) {
        const user = new User(userData)
        await user.save()
    }
}