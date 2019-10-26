export interface CommentResponse {
    content: string;
    isActive: boolean;
    dateCreated: string;
    dateModified: string;
    creator: string;
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
  