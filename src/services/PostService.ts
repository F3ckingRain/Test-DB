import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react';
import { IPost } from '../models/IPost';

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], number>({
            query: (limit: number = 10, page:number =  1) => ({
                url: '/posts',
                params: {
                    _limit: limit,
                    _page: page
                }
            })
        })
    })
});
