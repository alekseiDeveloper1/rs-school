import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  maxVisiblePages?: number;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  maxVisiblePages = 5,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex items-center gap-1">
        <li>
          <Link
            href={getPageUrl(Math.max(1, currentPage - 1))}
            aria-disabled={currentPage === 1}
          >
            &lt;
          </Link>
        </li>

        {getVisiblePages()[0] > 1 && (
          <>
            <li>
              <Link
                href={getPageUrl(1)}
                className="px-3 py-1 hover:bg-gray-100 rounded"
              >
                1
              </Link>
            </li>
            {getVisiblePages()[0] > 2 && <li className="px-2">...</li>}
          </>
        )}

        {getVisiblePages().map((page) => (
          <li key={page}>
            <Link href={getPageUrl(page)}>{page}</Link>
          </li>
        ))}

        {(getVisiblePages().at(-1) ?? 1000) < totalPages && (
          <>
            {(getVisiblePages().at(-1) ?? 1000) < totalPages - 1 && (
              <li className="px-2">...</li>
            )}
            <li>
              <Link
                href={getPageUrl(totalPages)}
                className="px-3 py-1 hover:bg-gray-100 rounded"
              >
                {totalPages}
              </Link>
            </li>
          </>
        )}

        <li>
          <Link
            href={getPageUrl(Math.min(totalPages, currentPage + 1))}
            aria-disabled={currentPage === totalPages}
          >
            &gt;
          </Link>
        </li>
      </ul>
    </nav>
  );
}
