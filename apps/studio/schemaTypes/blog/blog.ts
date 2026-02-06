import {defineType, defineField} from 'sanity'
import {BookOpen} from 'lucide-react'

export const blog = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: BookOpen,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary for previews.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'Main content of the blog post',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Important for SEO and accessibility',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),

    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      readTime: 'readTime',
      published: 'publishedDate',
    },
    prepare(selection) {
      const {title, media, readTime, published} = selection

      const date = published ? new Date(published).toLocaleDateString() : 'Unpublished'

      const time = readTime ? `${readTime} min read` : 'Read time not set'

      return {
        title,
        media,
        subtitle: `${time} • ${date}`,
      }
    },
  },
})
