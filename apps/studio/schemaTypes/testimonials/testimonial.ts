import {MessageSquareQuote} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const TESTIMONIAL_PAGE_OPTIONS = [
  {title: 'Home Page', value: 'home'},
  {title: 'BDC Page', value: 'billion-dollar-challenge'},
] as const

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: MessageSquareQuote,
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      description: 'Which page this testimonial appears on.',
      options: {
        list: [...TESTIMONIAL_PAGE_OPTIONS],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description:
        'Display order on the page (lower numbers appear first). Use this to arrange text and video testimonials (e.g. 1, 2, 3…).',
      validation: (Rule) => Rule.required().integer().min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Organization',
      type: 'string',
      description: 'Optional subtitle shown under the name.',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'Testimonial text. Used for image cards; optional for video testimonials.',
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for accessibility and SEO.',
        }),
      ],
      description: 'Optional profile photo for image testimonials.',
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload the testimonial video file.',
      hidden: ({parent}) => parent?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((video, context) => {
          const parent = context.parent as {mediaType?: string} | undefined

          if (parent?.mediaType === 'video' && !video) {
            return 'Video file is required for video testimonials.'
          }

          return true
        }),
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
    {
      title: 'Created Date (Oldest First)',
      name: 'createdAtAsc',
      by: [{field: '_createdAt', direction: 'asc'}],
    },
    {
      title: 'Created Date (Newest First)',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      page: 'page',
      mediaType: 'mediaType',
      sortOrder: 'sortOrder',
      media: 'profilePhoto',
    },
    prepare({name, role, page, mediaType, sortOrder, media}) {
      const pageLabel =
        TESTIMONIAL_PAGE_OPTIONS.find((entry) => entry.value === page)?.title ?? page
      const typeLabel = mediaType === 'video' ? 'Video' : 'Image'

      return {
        title: name || 'Untitled testimonial',
        subtitle: [`#${sortOrder ?? 0}`, pageLabel, typeLabel, role].filter(Boolean).join(' • '),
        media,
      }
    },
  },
})
