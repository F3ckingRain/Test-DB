import React, { useState } from 'react';
import { postAPI } from '../services/PostService';
import { PostItem } from './PostItem';
import { sortAndSearch, TSortListType, TSortType } from '../utils';
import { IPost } from '../models/IPost';


export const PostContainer = () => { 
    const [limit, setLimit] = useState<number>(10)
    //Получение данных с json-server через Api
    const {
        data: posts,
        error,
        isLoading,
    } = postAPI.useFetchAllPostsQuery(limit);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortList, setSortList] = useState<string>('');
    const [sortType, setSortType] = useState<string>('');

    let newPosts: Array<IPost> = [];
    //Сортировка только после получения списка
    if (posts) {
        newPosts = sortAndSearch(
           searchQuery, [...posts], sortList as TSortListType,  sortType as TSortType
        ) || []
    }
    return (
        <div className="post__list">
            <div className="filter_bar">
                <select
                    value={sortList === '' ? 'Сортировка' : sortList}
                    onChange={(e) => setSortList(e.target.value)}
                >
                    <option disabled>Сортировка</option>
                    <option>По названию</option>
                    <option>По количеству</option>
                    <option>По расстоянию</option>
                </select>
                <select
                    value={sortType === '' ? 'По типу' : sortType}
                    onChange={(e) => setSortType(e.target.value)}
                >
                    <option disabled>По типу</option>
                    <option>Равно</option>
                    <option>Содержит</option>
                    <option>Больше</option>
                    <option>Меньше</option>
                </select>
                <input
                    value={searchQuery}
                    placeholder="Поиск..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                ></input>
            </div>
            {isLoading && <h1>Идёт загрузка ...</h1>}
            {error && <h1>Произошла ошибка при загрузке</h1>}
            {newPosts
                ? newPosts &&
                  newPosts.map((post, index) => (
                      <PostItem
                          key={`${post}_${index}`}
                          post={post}
                      />
                  ))
                : posts &&
                  posts.map((post, index) => (
                      <PostItem
                          key={`${post}_${index}`}
                          post={post}
                      />
                  ))}
            <div className='page_list'>
                <p onClick={() => setLimit(10)}>1</p>
                <p onClick={() => setLimit(20)}>2</p>
                <p onClick={() => setLimit(30)}>3</p>
            </div>  
        </div>
    );
};
