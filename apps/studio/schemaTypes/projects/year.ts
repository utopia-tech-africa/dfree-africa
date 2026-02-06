import {Calendar} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const year = defineType({
  name: 'year',
  title: 'Year',
  type: 'document',
  icon: Calendar,
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'year',
    },
  },
})
