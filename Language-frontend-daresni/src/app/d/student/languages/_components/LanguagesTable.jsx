"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const languages = [
  {
    id: "1",
    language: "English",
    level: "A1",
    subject: "Grammaire",
  },
  {
    id: "2",
    language: "Francais",
    level: "B2",
    subject: "Vocabulaire",
  },
];

const LEVELS = ["A1", "A2", "B1", "B2"];
const SUBJECTS = ["Grammaire", "Vocabulaire"];

const columns = [
  {
    accessorKey: "language",
    header: "Langue",
  },
  {
    accessorKey: "level",
    header: "Niveau",
  },
  {
    accessorKey: "subject",
    header: "Sujet",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-right flex justify-end gap-4">
        <Link href={`/d/student/languages/${row.id}`}>
          <Button variant="link">Passer examen</Button>
        </Link>
        <Link href={`/languages/${row.id}`}>
          <Button>Learn</Button>
        </Link>
      </div>
    ),
  },
];

export default function LanguagesTable() {
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: languages,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4">
        <Input
          placeholder="Langue..."
          value={table.getColumn("language")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("language")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          name="subject"
          id="subject"
          defaultValue={table.getColumn("subject")?.getFilterValue() ?? ""}
          onValueChange={(value) =>
            table.getColumn("subject")?.setFilterValue(value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sujet" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sujet</SelectLabel>
              <SelectItem value={null}>All</SelectItem>
              {SUBJECTS.map((subject) => (
                <SelectItem
                  key={subject.value ?? subject}
                  value={subject.value ?? subject}
                >
                  {subject.label ?? subject}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          name="level"
          id="level"
          defaultValue={table.getColumn("level")?.getFilterValue() ?? ""}
          onValueChange={(value) =>
            table.getColumn("level")?.setFilterValue(value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Niveau</SelectLabel>
              <SelectItem value={null}>All</SelectItem>
              {LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
