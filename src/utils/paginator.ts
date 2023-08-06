import * as Post from '../types/postType';

export const paginator = (list: Post.Posts, page: number, size: number, sorting: boolean) => {
  const startIndex = (page - 1) * size;

  const endIndex = startIndex + size;

  const sortedList = sorting ? list.slice().reverse() : list;

  const pageRows = sortedList.slice(startIndex, endIndex);
  const pageInfo = {
    page,
    size,
    totalElements: list.length,
    totalPages: Math.ceil(list.length / size),
  };

  const pagenatedInfo = {
    pageInfo,
    pageRows,
  };

  return pagenatedInfo;
};
