import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { getSubmissionsByProblemSlugQueryOptions } from "../queries/get-submissions-by-problem-slug";
import { Submission } from "../types";

dayjs.extend(relativeTime);

type ProblemSubmissionsProps = {
  problemSlug: string;
};

const columnHelper = createColumnHelper<Submission>();

const columns = [
  columnHelper.display({
    id: "no",
    cell: ({ row }) => row.index + 1,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      return (
        <span
          className={cn(
            "font-medium",
            row.original.status === "Accepted"
              ? "text-green-500"
              : "text-red-500"
          )}
        >
          {row.original.status}
        </span>
      );
    },
  }),
  columnHelper.accessor("language", {
    header: "Language",
  }),
  columnHelper.accessor("createdAt", {
    header: "Submitted At",
    cell: ({ row }) => {
      return dayjs(row.original.createdAt).fromNow();
    },
  }),
];

export const SubmissionTable = ({ problemSlug }: ProblemSubmissionsProps) => {
  const { data: submissions } = useQuery(
    getSubmissionsByProblemSlugQueryOptions(problemSlug)
  );

  const submissionTable = useReactTable({
    data: submissions?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {submissionTable.getHeaderGroups()[0].headers.map((header) => (
            <TableHead key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissionTable.getRowModel().rows.map((row) => (
          <TableRow key={row.original.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
