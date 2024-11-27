import {createAction} from '@reduxjs/toolkit';

export const userLogin = createAction('@user/Login');
export const userRegister = createAction('@user/Register');
export const userPasswordResetRequest = createAction('@user/PasswordResetRequest');
export const userResetPassword = createAction('@user/ResetPassword');
export const getUser = createAction('@user/Fetch');
export const userPersonalisedArticles = createAction('@user/PersonalisedArticles');
export const userSavePreference = createAction('@user/SavePreference');
