export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IRequestFilters extends IPaginationOptions {
  searchTerm: string;
}
