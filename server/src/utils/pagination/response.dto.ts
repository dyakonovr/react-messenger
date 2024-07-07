type ItemsType = unknown[] | Record<string | number | symbol, unknown>;

export class PaginationResponseDto {
  currentPage: number;
  totalPages: number;
  items: ItemsType;

  constructor(items: ItemsType, currentPage: number, totalPages: number) {
    this.currentPage = currentPage;
    this.items = items;
    this.totalPages = totalPages;
  }
}
