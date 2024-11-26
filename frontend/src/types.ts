export type TMeta = {
   current_page?: number;
   from?: number;
   last_page?: number;
   path?: string;
   per_page?: number;
   to?: number;
   total?: number;
   errors?: {
      [key: string]: string[];
   };
};


export type TCommon = {
   loading?: boolean;
   loaded?: boolean;
   error?: TError;
   meta?: TMeta;
   updating?: boolean;
   updated?: boolean;
};

export type TError = {
   message: string;
   code: number;
};

export interface UserPreference {
   uuid: string;
   providers: string[] | undefined;
   authors: string[] | null;
   categories: string[] | null;
}

export interface User {
   uuid: string;
   name: string | null;
   email: string;
   preference?: UserPreference;
}

export interface Article {
   uuid: string;
   title: string;
   description: string;
   author: string | null;
   source: string;
   published_at: string | null;
   image_url: string | null;
   created_at: string;
   updated_at: string;
}


export interface Pagination {
   currentPage: number;
   totalPages: number;
}

export type UserState = TCommon &  {
   users: User[];
   loading: boolean;
   error: string | null;
}

export type AuthState = TCommon & {
   loading: boolean;
   user: null | User;
   token: string | null;
   isAuthenticated: boolean;
}


export type NewsState = TCommon & {
   all: Article[];
   single: Article | null;
   loading: boolean;
}

export type UserNewsState = TCommon & {
   all: Article[];
   loading: boolean;
}
