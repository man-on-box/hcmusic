import {defineType, defineField, defineArrayMember} from 'sanity'
import {InlineElementIcon} from '@sanity/icons'

export const featureCardsBlockType = defineType({
  name: 'featureCardsBlock',
  title: 'Feature Cards Block',
  type: 'object',
  icon: InlineElementIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'cards',
      title: 'Feature cards',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'card',
          title: 'Feature card',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'string'}),
            defineField({
              name: 'cardImage',
              title: 'Card image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                  description: 'Visual description of the image.',
                }),
              ],
            }),
            defineField({
              name: 'linkToPage',
              title: 'Link to page',
              type: 'reference',
              to: [{type: 'page'}],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
  },
})
