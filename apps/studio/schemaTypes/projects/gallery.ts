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
          ],
          preview: {
            select: {
              type: 'type',
              image: 'image',
            },
            prepare({type, image}) {
              return {
                title: type === 'image' ? 'Image' : 'Video',
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
