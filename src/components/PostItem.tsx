import { IPost } from '../models/IPost';
import React, { FC } from 'react';

interface PostItemProps {
    post: IPost;
}
export const PostItem: FC<PostItemProps> = ({ post }) => {
    return (
        <div className="post_item">
            Дата: {post.date}. Название: {post.name}. Количество:{' '}
            {post.count}. Расстояние: {post.distance}
        </div>
    );
};
