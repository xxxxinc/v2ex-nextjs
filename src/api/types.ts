export type Response<T> = {
    success: boolean
    message: string
    result: T
}
export interface Topic {
    id: number
    title: string
    content: string
    content_rendered: string
    syntax: number
    url: string
    replies: number
    last_reply_by: string
    created: number
    last_modified: number
    last_touched: number
    member: any
    node: any
    supplements: any
}