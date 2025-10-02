'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCategoriesData } from '@/features/category'
import { CategoryCreateForm } from '@/features/category'
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'

interface CategorySelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}

export const CategorySelect = ({
  value,
  onValueChange,
  placeholder = 'Select category',
}: CategorySelectProps) => {
  const [createOpen, setCreateOpen] = useState(false)
  const { data: categoriesData } = useCategoriesData()

  return (
    <>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {categoriesData?.map(category => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
          <div className='border-t p-1'>
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-start'
              onClick={e => {
                e.preventDefault()
                setCreateOpen(true)
              }}
            >
              <Plus className='mr-2 h-4 w-4' />
              Add Category
            </Button>
          </div>
        </SelectContent>
      </Select>

      <CategoryCreateForm open={createOpen} onOpenChange={setCreateOpen} />
    </>
  )
}
