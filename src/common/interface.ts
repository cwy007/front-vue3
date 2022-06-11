/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserInfo {
  _id: string;
  username?: string;
  name?: string;
  location?: string;
  gender?: string;
  regmark?: string;
  pic?: string;
  isSign?: boolean;
  lastSign?: string;
  count?: number;
  favs?: number;
}

export interface LoginInfo {
  username: string;
  password: string;
  code: string;
  sid?: string;
}

export interface RegInfo extends LoginInfo {
  name: string;
  repassword?: string;
}

export interface ResetInfo {
  key: string;
  password: string;
  code: string;
  sid: string;
}

export interface ForgetInfo {
  username: string;
  code: string;
}

export interface HttpResponse {
  code: number;
  data?: any;
  msg?: string | Record<string, any>;
  total?: number;
  count?: number;
  favs?: number;
  lastSign?: string;
  isCollect?: boolean;
  token?: string;
  notify?: any;
  userInfo?: any;
}

export interface ValidationResult {
  errors: string[];
}

export declare type SubmitEvent = Event & {
  target: HTMLFormElement;
};
export interface PageCommon {
  page: number;
  limit: number;
  index?: number;
}

export interface PostPageCommon extends PageCommon{
  uid: string;
}

export interface SimpleUserInfo {
  isVip: string;
  name: string;
  pic: string;
  _id: string;
}

export interface SortOptions extends PageCommon{
  catalog?: string;
  isTop?: number;
  sort?: string;
  tag?: string;
  status?: string;
}

export interface PostInfo {
  title: string;
  catalog?: string;
  content: string;
  fav?: number;
  code?: string;
  sid?: string;
  isEnd?: string;
  isFav?: number;
  tags?: Array<string>;
  sort?: string;
  status?: string;
  uid?: SimpleUserInfo;
  updated?: string;
  created?: string;
}

export interface CommentsInfo {
  _id: string;
  content: string;
  code: string;
  sid: string;
}
