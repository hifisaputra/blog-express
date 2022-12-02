import { connectDB, closeDB } from '../../app'
import { populateUsers } from './userSeeder'
import { populateCategories } from './categorySeeder'
import { populatePosts } from './postSeeder'

const seed = async (): Promise<void> => {
    await connectDB()

    await populateUsers(10)
    await populateCategories(20)
    await populatePosts(9000000)

    await closeDB()
}


seed()