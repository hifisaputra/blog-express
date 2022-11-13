import mongoose from '@src/lib/mongoose'
import { Document, Schema, Types, Model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import { generateSlug } from '@src/lib/utils'

/**
 * @description The post document interface
 * @interface PostDocument
 * @property {string} _id
 * @property {string} title
 * @property {string} slug
 * @property {string} content
 * @property {string} excerpt
 * @property {string} featuredImage
 * @property {string} status
 * @property {string} author
 * @property {string[]} categories
 * @property {Function} generateSlug
 */
 interface PostDocument extends Document {
    _id: Types.ObjectId,
    title: string,
    slug?: string,
    content?: string,
    excerpt?: string,
    featuredImage?: string,
    status?: string,
    author?: Types.ObjectId,
    categories?: Types.ObjectId[],
    generateSlug: Function
}

/**
 * @description The post model interface
 * @interface PostModel
 * @extends Model<PostDocument>
 */
interface PostModel extends Model<PostDocument> {}

/**
 * @description Post database schema
 * @constant PostSchema
 * @type {Schema<PostInterface}
 * @extends Schema
 * @see https://mongoosejs.com/docs/schematypes.html
 */
const PostSchema: Schema<PostDocument> = new Schema<PostDocument, Model<PostDocument>>({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        default: null
    },
    excerpt: {
        type: String,
        default: null
    },
    featuredImage: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: 'draft'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, { timestamps: true })

/**
 * @description Register soft delete plugin
 * @see https://www.npmjs.com/package/mongoose-delete
 */
PostSchema.plugin(MongooseDelete)

/**
 * @description Generate slug before save
 * @function generateSlug
 * @returns {void}
 * @see https://mongoosejs.com/docs/middleware.html
 */
PostSchema.pre('save', async function (this: PostDocument, next) {
    if(!this.slug) {
        let slug = generateSlug(this.title)

        const sameSlugCount = await Post.count({ slug })
        if(sameSlugCount) slug = `${slug}-${sameSlugCount}`

        this.slug = slug
    }
    next()
})

/**
 * @description Post database model
 * @constant Post
 * @type {Model<PostInterface>}
 * @extends Model
 * @see https://mongoosejs.com/docs/models.html
 */
const Post: Model<PostDocument> = mongoose.models.Post || mongoose.model<PostDocument, PostModel>('Post', PostSchema)

export default Post