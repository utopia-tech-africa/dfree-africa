import {Users2} from 'lucide-react'
import {defineType, defineField} from 'sanity'

export const pastSpeaker = defineType({
  name: 'pastSpeaker',
  title: 'Past Speaker',
  type: 'document',
  icon: Users2,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
