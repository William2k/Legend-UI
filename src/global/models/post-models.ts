export interface PostResponse {
  id: number;
  name: string;
  content: string;
  isActive: boolean;
  commentsCount: number;
  subscriberCount: number;
  commentsTodayCount: number;
  dateCreated: string;
  dateModified: string;
}

export interface AddPost {
  name: string;
  content: string;
  group: string;
}

export interface PostPagination {
  group: string;
  limit: number;
  lastCount: number;
  initial: boolean;
  asc: boolean;
}
