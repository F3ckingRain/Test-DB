import { IPost } from '../models/IPost';

export type TSortListType =  'По названию' | 'По количеству' | 'По расстоянию';
export type TSortType = 'Равно' | 'Содержит' | 'Больше' | 'Меньше';

// Функция для сортировки и фильтрации массива объектов
export const sortAndSearch = (
    searchQuery: string,
    arr?: IPost[],
    sortList?: TSortListType,
    sortType?: TSortType,
) => {
    if (!arr) {
        return [];
    }
    //Сортировка
    const sortListFunctions: Record<TSortListType, (a: IPost, b: IPost) => any> = {
        'По названию': (a, b) => a.name.localeCompare(b.name),
        'По количеству': (a, b) => a.count - b.count,
        'По расстоянию': (a, b) => a.distance - b.distance,
    }
 
    if (sortList && sortListFunctions[sortList]) {
        arr.sort(sortListFunctions[sortList]);
    }
    //Сортировка и фильтрация
    const sortFunctions: Record<TSortType, Record<TSortListType, (post: IPost) => any>> = {
        'Равно': {
            'По названию': (post) => post.name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase(),
            'По количеству': (post) => post.count === Number(searchQuery),
            'По расстоянию': (post) =>post.distance === Number(searchQuery)
        },
        'Содержит': {
            'По названию': (post) => post.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
            'По количеству': (post) => post.count.toString().toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
            'По расстоянию': (post) => post.distance.toString().toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
        },
        'Больше': {
            'По названию': (post) => post.name.length > searchQuery.length,
            'По количеству': (post) => post.count > Number(searchQuery),
            'По расстоянию': (post) => post.distance > Number(searchQuery),
        },
        'Меньше': {
            'По названию': (post) => post.name.length < searchQuery.length,
            'По количеству': (post) => post.count < Number(searchQuery),
            'По расстоянию': (post) => post.distance < Number(searchQuery),
        }
    }
 
    if (sortList && sortType && searchQuery && sortFunctions[sortType] && sortFunctions[sortType][sortList]) {
        return arr.filter(sortFunctions[sortType][sortList]);
    }
 
    return arr;
};