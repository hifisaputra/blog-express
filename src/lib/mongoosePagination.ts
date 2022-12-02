import { SortOrder } from 'mongoose'

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
