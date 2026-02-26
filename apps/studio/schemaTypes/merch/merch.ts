import {defineType, defineField} from 'sanity'
import {ShoppingBag} from 'lucide-react'

export const merch = defineType({
  name: 'merch',
  title: 'Merch',
  type: 'document',
  icon: ShoppingBag,
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
      name: 'coverImage',
      title: 'Cover Image',
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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'Price in US dollars.',
      validation: (Rule) => Rule.required().positive(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Book, Apparel, Accessory',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this product in the homepage merch section.',
      initialValue: false,
    }),

    defineField({
      name: 'storeUrl',
      title: 'Store URL',
      type: 'url',
      description: 'Link to this product on the external store.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      price: 'price',
      category: 'category',
    },
    prepare(selection) {
      const {title, media, price, category} = selection
      return {
        title,
        media,
        subtitle: `${category ?? ''} · $${price ?? '—'}`,
      }
    },
  },
})
