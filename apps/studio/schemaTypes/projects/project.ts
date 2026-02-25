import {defineField, defineType} from 'sanity'

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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'previewMedia',
      title: 'Preview Media',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              {title: 'Image', value: 'image'},
              {title: 'Video', value: 'video'},
            ],
            layout: 'radio',
          },
          validation: (rule) => rule.required(),
        },
        {
          name: 'image',
          title: 'Preview Image',
          type: 'image',
          options: {hotspot: true},
          hidden: ({parent}) => parent?.type !== 'image',
          // validation: (rule) => rule.required(),
        },
        {
          name: 'video',
          title: 'Preview Video',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({parent}) => parent?.type !== 'video',
          // validation: (rule) => rule.required(),
        },
      ],
    }),
    /////----- Frontend usage -------///////
    // previewMedia.type === 'image'
    // previewMedia.image

    // previewMedia.type === 'video'
    // previewMedia.video

    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
      validation: (rule) => rule.max(3),
      description: 'Optional. You can add up to 3 images.',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'reference',
      to: [{type: 'gallery'}],
      validation: (rule) => rule.required(),
    }),
  ],
})
