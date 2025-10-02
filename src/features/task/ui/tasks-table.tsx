'use client'

import { useMemo, useState } from 'react'
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import { useTasksData } from '../model'
import { TaskCreateForm } from './task-create-form'
import { tasksTableColumns } from './tasks-table-columns'
import { TasksTableEmpty } from './tasks-table-empty'
import { TasksTablePagination } from './tasks-table-pagination'
import { TasksTableSkeleton } from './tasks-table-skeleton'

type StatusFilter = 'all' | 'done' | 'undone'

export const TasksTable = () => {
  const [createOpen, setCreateOpen] = useState(false)

  // Fetch all data with limit 1000
  const { data, isLoading, isError } = useTasksData({ limit: 1000 })

  // Table state
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  // Filter data by status (memoized to prevent recalculation on every render)
  const filteredData = useMemo(() => {
    const allTasks = data?.tasks || []

    if (statusFilter === 'all') return allTasks
    if (statusFilter === 'done') return allTasks.filter(task => task.isDone)
    return allTasks.filter(task => !task.isDone)
  }, [data?.tasks, statusFilter])

  const table = useReactTable({
    data: filteredData,
    columns: tasksTableColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // Client-side sorting
    getFilteredRowModel: getFilteredRowModel(), // Client-side filtering
    getPaginationRowModel: getPaginationRowModel(), // Client-side pagination
    globalFilterFn: 'includesString', // Global search function
  })

  if (isLoading) {
    return <TasksTableSkeleton />
  }

  if (isError) {
    return (
      <div className='text-destructive py-8 text-center'>
        Failed to load tasks
      </div>
    )
  }

  if (!data?.tasks || data.tasks.length === 0) {
    return <TasksTableEmpty onAddTask={() => setCreateOpen(true)} />
  }

  return (
    <div className='w-full'>
      <div className='flex items-center gap-4 py-4'>
        <Button
          size='icon'
          onClick={() => setCreateOpen(true)}
          className='shrink-0'
        >
          <Plus className='h-4 w-4' />
          <span className='sr-only'>Add task</span>
        </Button>
        <Input
          placeholder='Search tasks...'
          value={globalFilter ?? ''}
          onChange={event => setGlobalFilter(event.target.value)}
          className='max-w-sm'
        />
        <Select
          value={statusFilter}
          onValueChange={value => setStatusFilter(value as StatusFilter)}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter by status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Tasks</SelectItem>
            <SelectItem value='done'>Done</SelectItem>
            <SelectItem value='undone'>Undone</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => {
                const task = row.original
                const isDone = task.isDone

                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={isDone ? 'opacity-60' : ''}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className={isDone ? 'line-through' : ''}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tasksTableColumns.length}
                  className='h-24 text-center'
                >
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between py-4'>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          Add Task
        </Button>
        <TasksTablePagination table={table} />
      </div>

      <TaskCreateForm open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}
