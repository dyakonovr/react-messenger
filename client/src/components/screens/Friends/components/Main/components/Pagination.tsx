import { Button } from "@/src/components/ui";

interface Props {
  currentPage: number;
  totalPages: number;
  onClick: (page: number) => void;
}

function getPageNumbers(currentPage: number, totalPages: number): number[] {
  if (!totalPages || !currentPage) return [];

  const pages = [];

  if (currentPage > 1) {
    pages.push(currentPage - 1);
  }

  pages.push(currentPage);

  if (currentPage < totalPages) {
    pages.push(currentPage + 1);
  }

  if (pages.length < 3) {
    if (pages[0] > 1) {
      pages.unshift(pages[0] - 1);
    } else if (pages[pages.length - 1] < totalPages) {
      pages.push(pages[pages.length - 1] + 1);
    }
  }

  return pages;
}

export function FriendsPagination({ currentPage, totalPages, onClick }: Props) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mx-auto my-3 flex items-center gap-3">
      {pages.map((page) => (
        <Button
          variant={page === currentPage ? "contained" : "transparent"}
          key={page}
          onClick={() => onClick(page)}
          className="flex size-10 items-center justify-center !border-[var(--main-color)] p-2.5"
        >
          {page}
        </Button>
      ))}
    </div>
  );
}
