import { Schema, SortOrder } from 'mongoose'

export interface PaginationParameters {
    page: number
    limit: number
    sort: string | { [key: string]: SortOrder }
    populate?: Record<string, unknown>[]
}

export interface PaginationResult {
    docs: Record<string, unknown>[]
    meta: {
        page: number
        limit: number
        pages: number
        count: number
    }
}

export const paginate = function (schema: Schema) {
    schema.static('paginate', async function (query: Record<string, unknown>, options: PaginationParameters) {
        const { page, limit, sort } = options
        const skip = (page - 1) * limit
        const count = await this.countDocuments(query)
        const pages = Math.ceil(count / limit)
        const docs = await this.find(query)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .populate(options.populate)
        return {
            data: docs,
            meta: {
                page,
                limit,
                pages,
                count
            }
        }
    })
}
