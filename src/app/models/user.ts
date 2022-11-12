import mongoose from '@src/lib/mongoose'
import { Document, Schema, Types, Model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '@src/config'

/**
 * @description User interface
 * @interface User
 * @property {string} _id User id
 * @property {string} name User name
 * @property {string} email User email
 * @property {string} password User password
 * @property {string} profilePicture User profile picture
 */
export interface UserInterface extends Document {
    _id: Types.ObjectId,
    name: string
    email: string
    password: string
    profilePicture?: string,
}

/**
 * @description User schema
 * @constant UserSchema
 * @type {Schema<UserInterface}
 * @extends Schema
 * @see https://mongoosejs.com/docs/schematypes.html
 */
const UserSchema: Schema<UserInterface> = new Schema<UserInterface, Model<UserInterface>>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        set: (password: string) => bcrypt.hashSync(password, 10)
    },
    profilePicture: {
        type: String,
        default: null
    }
}, { timestamps: true })

/**
 * @description Register soft delete plugin
 * @see https://www.npmjs.com/package/mongoose-delete
 */
UserSchema.plugin(MongooseDelete)

 /**
  * @description Validate user password
  * @param {string} password User password
  * @returns {Promise<boolean>}
  */
  UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

/**
 * @description Generate user token
 * @returns {Promise<string>}
 * @see https://www.npmjs.com/package/jsonwebtoken
 */
UserSchema.methods.generateToken = async function (): Promise<string> {
    const token: string = jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
    }, config.app.secret)

    return token
}

/**
 * @description User model
 * @constant User
 * @type {Model<UserInterface>}
 * @extends Model
 * @see https://mongoosejs.com/docs/models.html
 */
const User: Model<UserInterface> = mongoose.models.User || mongoose.model<UserInterface>('User', UserSchema)

export default User