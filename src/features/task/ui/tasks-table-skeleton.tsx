import { Skeleton } from '@/shared/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'

export const TasksTableSkeleton = () => {
  return (
    <div className='w-full'>
      <div className='flex items-center gap-4 py-4'>
        <Skeleton className='h-10 w-10 rounded-md' />
        <Skeleton className='h-10 max-w-sm flex-1' />
        <Skeleton className='h-10 w-[180px]' />
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className='h-4 w-16' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-24' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-20' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-16' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-20' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-16' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-16' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className='h-4 w-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-16 rounded-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-8 rounded-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-20' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-5' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-20' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between py-4'>
        <Skeleton className='h-10 w-28' />
        <div className='flex items-center gap-2'>
          <Skeleton className='h-8 w-[180px]' />
        </div>
      </div>
    </div>
  )
}
