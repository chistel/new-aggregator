import {createAction} from '@reduxjs/toolkit';

export const getArticles = createAction('@article/getAll');
export const getArticle = createAction('@article/getSingle');
