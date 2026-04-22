import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Card } from "../ui/card";

export interface Column<T> {
  label: string;
  width?: string;
  align?: "left" | "right" | "center";
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[] | undefined;
  isLoading?: boolean;
  skeleton?: ReactNode;
  emptyState?: ReactNode;
  rowKey: (row: T) => string | number;
  onRowClick?: (row: T) => void;
}

export default function Table<T>({
  columns,
  data,
  isLoading,
  skeleton,
  emptyState,
  rowKey,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <Card className="p-0 overflow-hidden">
      {isLoading ? (
        skeleton
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                {columns.map(({ label, width, align }, i) => (
                  <th
                    key={label}
                    style={{ width }}
                    className={`
                    h-12 px-6 bg-gray-50
                    text-[12px] font-semibold tracking-[0.07em] uppercase
                    text-black/80
                    ${align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left"}
                  `}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {align !== "right" && (
                        <span className="inline-block w-[3px] h-[3px] rounded-full bg-gray-300" />
                      )}
                      {label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {!data?.length ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-16 text-center"
                  >
                    {emptyState}
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={rowKey(row)}
                    onClick={() => onRowClick?.(row)}
                    className={` odd:bg-white even:bg-gray-50
    hover:bg-gray-100 transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
                  >
                    {columns.map(({ label, align, render }) => (
                      <td
                        key={label}
                        className={cn(
                          "px-6 py-4 whitespace-nowrap",
                          align === "right"
                            ? "text-right"
                            : align === "center"
                              ? "text-center"
                              : "text-left",
                        )}
                      >
                        {render(row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
