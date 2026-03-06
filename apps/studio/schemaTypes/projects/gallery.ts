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
      name: 'year',
      title: 'Year',
      type: 'number',
      description:
        'Optional. Used for Finfest gallery: one gallery per year (e.g. slug "finfest-2024", year 2024). Enables grouping and ordering by year.',
      validation: (rule) => rule.min(2000).max(2100).integer(),
    }),

    defineField({
      name: 'items',
      title: 'Gallery Items',
      type: 'array',
      options: {layout: 'grid'},
      of: [
        {
          type: 'object',
          name: 'mediaItem',
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
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              hidden: ({parent}) => parent?.type !== 'image',
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  type: 'string',
                },
              ],
            },

            {
              name: 'video',
              title: 'Video',
              type: 'file',
              options: {
                accept: 'video/*',
              },
              hidden: ({parent}) => parent?.type !== 'video',
            },

            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },

            {
              name: 'useAsThumbnail',
              title: 'Use as thumbnail',
              type: 'boolean',
              initialValue: false,
              description:
                'Use this item as the gallery thumbnail. Only image items are used. If multiple are toggled, the first wins.',
              hidden: ({parent}) => parent?.type !== 'image',
            },
          ],
          preview: {
            select: {
              type: 'type',
              image: 'image',
              useAsThumbnail: 'useAsThumbnail',
            },
            prepare({type, image, useAsThumbnail}) {
              const title = type === 'image' ? 'Image' : 'Video'
              return {
                title: useAsThumbnail ? `${title} (thumbnail)` : title,
                media: image,
              }
            },
          },
        },
      ],
    }),
  ],
})

///----- Frontend usage -------///////

// gallery.items.map(item => {
//   if (item.type === 'image') {
//     // Render image using item.image
//     --return <Image ... />--
//   } else if (item.type === 'video') {
//     // Render video using item.video
//     --return <Video ... />--
//   }
// })
