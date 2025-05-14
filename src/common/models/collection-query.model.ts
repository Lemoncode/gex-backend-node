export interface Pagination {
  // TODO: Change from totalPages to totalDocuments
  totalPages: number;
}

export interface CollectionQuery<T> {
  data: T[];
  pagination: Pagination;
}
