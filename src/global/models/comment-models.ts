export interface CommentResponse {
    id: number;
    content: string;
    isActive: boolean;
    dateCreated: string;
    dateModified: string;
    creator: string;
    comments: CommentResponse[];
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
    initial: boolean;
    asc: boolean;
  }
  