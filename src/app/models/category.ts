import mongoose from '@src/lib/mongoose'
import { Document, Schema, Types, Model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import { generateSlug } from '@src/lib/utils'

/**
 * @description The category document interface
 * @interface CategoryDocument
 * @property {string} _id
 * @property {string} name
 * @property {string} slug
 * @property {Function} generateSlug
 */
interface CategoryDocument extends Document {
    _id: Types.ObjectId,
    name: string,
    slug?: string,
    generateSlug: Function
}

/**
 * @description The category model interface
 * @interface CategoryModel
 * @extends Model<CategoryDocument>
 */
interface CategoryModel extends Model<CategoryDocument> {}

/**
 * @description Category database schema
 * @constant CategorySchema
 * @type {Schema<CategoryInterface}
 * @extends Schema
 * @see https://mongoosejs.com/docs/schematypes.html
 */
const CategorySchema: Schema<CategoryDocument> = new Schema<CategoryDocument, Model<CategoryDocument>>({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    }
}, { timestamps: true })

/**
 * @description Generate slug before save
 * @function generateSlug
 * @returns {void}
 * @see https://mongoosejs.com/docs/middleware.html
 */
CategorySchema.pre('save', async function (this: CategoryDocument, next) {
    if(!this.slug) {
        let slug = generateSlug(this.name)

        const sameSlugCount = await Category.count({ slug })
        if(sameSlugCount) slug = `${slug}-${sameSlugCount}`

        this.slug = slug
    }
    next()
})

/**
 * @description Add soft delete to schema
 * @function softDelete
 * @returns {void}
 * @see https://www.npmjs.com/package/mongoose-delete
 */
CategorySchema.plugin(MongooseDelete)

/**
 * @description Category model
 * @constant Category
 * @type {CategoryModel}
 * @see https://mongoosejs.com/docs/models.html
 */
const Category: CategoryModel = mongoose.model<CategoryDocument, CategoryModel>('Category', CategorySchema)

export default Category