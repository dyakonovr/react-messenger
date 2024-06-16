export class PaginationResponseDto {
  currentPage: number;
  totalPages: number;
  items: unknown[];

  constructor(items: unknown[], currentPage: number, totalPages: number) {
    this.currentPage = currentPage;
    this.items = items;
    this.totalPages = totalPages;
  }
}
