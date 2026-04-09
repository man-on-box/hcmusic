import {defineType, defineField} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const internalLinkType = defineType({
  name: 'internalLink',
  title: 'Link to page',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{type: 'page'}],
    }),
    defineField({
      name: 'target',
      title: 'Target section',
      type: 'slug',
      description: 'Optional target a specific section in the page',
      options: {
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 100),
      },
    }),
  ],
})
