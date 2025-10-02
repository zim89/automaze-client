import { type LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
}

export const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend: _trend = 'neutral',
}: StatsCardProps) => {
  return (
    <div className='bg-card rounded-lg border p-4 shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          <p className='text-muted-foreground text-xs font-medium'>{title}</p>
          <div className='mt-1 flex items-baseline gap-2'>
            <h3 className='text-2xl font-bold'>{value}</h3>
          </div>
          {description && (
            <p className='text-muted-foreground mt-0.5 text-xs'>
              {description}
            </p>
          )}
        </div>
        <div className='bg-primary/10 text-primary rounded-full p-2'>
          <Icon className='h-5 w-5' />
        </div>
      </div>
    </div>
  )
}
