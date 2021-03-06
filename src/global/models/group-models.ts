export interface GroupResponse {
  name: string;
  description: string;
  isActive: boolean;
  postCount: number;
  subscriberCount: number;
  dateCreated: string; 
  tags: string[];
}

export interface AddGroup {
  name: string;
  description: string;
  tags: string[];
}

export interface GroupPagination {
  limit: number;
  lastCount: number;
  initial: boolean;
  asc: boolean;
}
