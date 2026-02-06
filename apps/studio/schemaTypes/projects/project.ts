import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'reference',
      to: [{ type: 'gallery' }],
    }),
  ],
})
