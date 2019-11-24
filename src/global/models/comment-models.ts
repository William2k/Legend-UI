import { SortType } from "../enums";

export interface CommentResponse {
  id: number;
  content: string;
  likes: number;
  isActive: boolean;
  dateCreated: string;
  dateModified: string;
  creator: string;
  comments: CommentResponse[];
  liked: boolean | null;
}

export interface AddComment {
  postId: number;
  content: string;
  parentCommentId: number;
}

export interface CommentPagination {
  post: number;
  limit: number;
  lastDateCreated: Date;
  lastLikes: number;
  initial: boolean;
  maxLevel: number;
  asc: boolean;
  sortType?: SortType;
}
