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
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 100),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent page',
      type: 'reference',
      to: [{type: 'page'}],
      description: 'Select a parent page to nest this page under (optional).',
    }),
  ],
})
