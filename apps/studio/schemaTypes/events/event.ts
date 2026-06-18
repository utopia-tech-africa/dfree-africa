import {CalendarDays} from 'lucide-react'
import {defineType, defineField} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarDays,
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
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Pillar category shown on the event card.',
      options: {
        list: [
          {title: 'BDC', value: 'BDC'},
          {title: 'Africa', value: 'Africa'},
          {title: 'FinFE$T', value: 'FinFE$T'},
          {title: 'Scholarships', value: 'Scholarships'},
          {title: 'Community Campaigns', value: 'Community Campaigns'},
        ],
      },
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'Shown after the category on the card (e.g. Workshop, Seminar).',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A short summary displayed on the event card.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative Text', type: 'string'})],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. New Brunswick, New Jersey',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      description: 'The event date used for display and sorting.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Event Link',
      type: 'url',
      description:
        'External link to the event page or registration. Leave empty to default to /events.',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
      description: 'Show this event on the home page carousel.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first. Leave empty to sort by event date.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
      eventDate: 'eventDate',
    },
    prepare(selection) {
      const {title, media, category, eventDate} = selection
      const date = eventDate ? new Date(eventDate).toLocaleDateString() : 'No date set'
      return {
        title,
        media,
        subtitle: `${category ?? 'Event'} • ${date}`,
      }
    },
  },

  orderings: [
    {
      title: 'Event Date (Newest)',
      name: 'eventDateDesc',
      by: [{field: 'eventDate', direction: 'desc'}],
    },
    {
      title: 'Event Date (Oldest)',
      name: 'eventDateAsc',
      by: [{field: 'eventDate', direction: 'asc'}],
    },
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
})
