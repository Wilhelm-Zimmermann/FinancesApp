export interface GenericApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}