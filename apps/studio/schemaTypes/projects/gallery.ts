import {Images} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: Images,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      options: {layout: 'grid'},
      of: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
})
