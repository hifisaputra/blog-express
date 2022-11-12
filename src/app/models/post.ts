import mongoose from '@src/lib/mongoose'
import { Document, Schema, Types, Model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'

/**
 * @description Post interface
 * @interface Post
 * @property {string} _id
 * @property {string} title
 * @property {string} slug
 * @property {string} content
 * @property {string} excerpt
 * @property {string} featuredImage
 * @property {string} status
 */
 export interface PostInterface extends Document {
    _id: Types.ObjectId,
    title: string,
    slug?: string,
    content?: string,
    excerpt?: string,
    featuredImage?: string,
    status?: string
}

/**
 * @description Post database schema
 * @constant PostSchema
 * @type {Schema<PostInterface}
 * @extends Schema
 * @see https://mongoosejs.com/docs/schematypes.html
 */
const PostSchema: Schema<PostInterface> = new Schema<PostInterface, Model<PostInterface>>({
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
    }
}, { timestamps: true })

/**
 * @description Register soft delete plugin
 * @see https://www.npmjs.com/package/mongoose-delete
 */
 PostSchema.plugin(MongooseDelete)

 /**
  * @description Register method to generate post slug
  * @see https://mongoosejs.com/docs/api.html#schema_Schema-queue
  */
PostSchema.methods.generateSlug = (title: string): string => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

/**
 * @description Register pre hook method to automatically generate slug when creating a post.
 */
PostSchema.pre('save', async function(next) {
    if(!this.slug) {
        // let slug = this.generateSlug(this.title)
    }
})

/**
 * @description Post database model
 * @constant Post
 * @type {Model<PostInterface>}
 * @extends Model
 * @see https://mongoosejs.com/docs/models.html
 */
const Post: Model<PostInterface> = mongoose.models.User || mongoose.model<PostInterface>('Post', PostSchema)

export default Post