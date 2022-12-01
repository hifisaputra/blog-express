import { Schema, Types, Model, model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import { strToSlug } from '@src/lib/utils'

/**
 * @description The post document interface
 * @interface PostDocument
 * @property {string} _id The post id authomaticaly generated by MongoDB
 * @property {string} title The post title
 * @property {string} slug The post slug generated from title
 * @property {string} content The post content in html format
 * @property {string} excerpt The post excerpt
 * @property {string} featuredImage The url of the post featured image
 * @property {string} status The post status
 * @property {string} author The post author id
 * @property {string[]} categories The post categories in array of string id
 */
interface PostDocument {
    _id: Types.ObjectId,
    title: string,
    slug?: string,
    content?: string,
    excerpt?: string,
    featuredImage?: string,
    status?: string,
    author?: Types.ObjectId,
    categories?: Types.ObjectId[],
}

/**
 * @description The post method interface
 * @interface PostMethod
 */
interface PostMethod {
    generateSlug(): Promise<string>
}

/**
 * @description The post model interface
 * @interface PostModel
 * @extends Model<PostDocument>
 */
interface PostModel extends Model<PostDocument, {}, PostMethod> {}

/**
 * @description Post database schema
 * @constant PostSchema
 * @type {Schema<PostDocument, PostModel, PostMethod>}
 * @extends Schema
 * @see https://mongoosejs.com/docs/schematypes.html
 */
const PostSchema: Schema<PostDocument, PostModel, PostMethod> = new Schema<PostDocument, PostModel, PostMethod>({
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
 * @description Method to generate unique slug from title
 * if slug is already exist, it will append number to the end of slug
 *
 * @method method
 * @param {string} 'generateSlug'
 * @param {function} async function
 * @returns {Promise<string>}
 */
PostSchema.method('generateSlug', async function() {
    let slug = strToSlug(this.title)
    let count = await this.model('Post').countDocuments({ slug })
    if (count > 0) {
        slug = `${slug}-${count}`
    }
    return slug
})

/**
 * @description Pre save hook to generate slug
 * @method pre
 * @param {string} 'save'
 * @param {function} async function
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/middleware.html
 */
PostSchema.pre('save', async function() {
    if (!this.slug) {
        this.slug = await this.generateSlug()
    }
})

/**
 * @description Create post model for mongoose
 * @constant Post
 * @type {PostModel}
 * @see https://mongoosejs.com/docs/models.html
 */
const Post: PostModel = model<PostDocument, PostModel>('Post', PostSchema)

export default Post