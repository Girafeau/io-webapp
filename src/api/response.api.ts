export type Response<T> = {
    statusCode?: number,
    error?: boolean,
    message?: string[],
    data?: T
}
