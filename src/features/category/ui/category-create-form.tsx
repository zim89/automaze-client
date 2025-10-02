'use client'

import { useState } from 'react'
import { type CreateCategoryDto } from '@/entities/category'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useCreateCategory } from '../model'

interface CategoryCreateFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CategoryCreateForm = ({
  open,
  onOpenChange,
}: CategoryCreateFormProps) => {
  const [formData, setFormData] = useState<CreateCategoryDto>({
    name: '',
    color: '#3B82F6',
  })

  const createCategory = useCreateCategory({
    onSuccess: () => {
      onOpenChange(false)
      setFormData({
        name: '',
        color: '#3B82F6',
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createCategory.mutate(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[400px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category for your tasks
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>
                Name <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='name'
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder='Enter category name'
                required
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='color'>Color</Label>
              <div className='flex gap-2'>
                <Input
                  id='color'
                  type='color'
                  value={formData.color}
                  onChange={e =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className='h-10 w-20'
                />
                <Input
                  value={formData.color}
                  onChange={e =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  placeholder='#3B82F6'
                  className='flex-1'
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={createCategory.isPending}>
              {createCategory.isPending ? 'Creating...' : 'Create Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
