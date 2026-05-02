import {defineType, defineField} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const pageSlugType = defineType({
  name: 'pageSlug',
  title: 'Slug',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Slug of the page (the path where the page exists)',
      options: {
        source: 'title',
        slugify: (input) => input.trim().toLowerCase().replace(/\s+/g, '-').slice(0, 100),
      },
      validation: (rule) => rule.required(),
    }),
  ],
})
