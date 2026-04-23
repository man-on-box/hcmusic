import {defineType, defineField, defineArrayMember} from 'sanity'
import {InlineElementIcon} from '@sanity/icons'

const CONTENT_GROUP = 'content'
const MEDIA_GROUP = 'media'
const OPTIONS_GROUP = 'options'

export const featureCardsBlockType = defineType({
  name: 'featureCardsBlock',
  title: 'Feature Cards Block',
  type: 'object',
  icon: InlineElementIcon,
  groups: [
    {name: CONTENT_GROUP, title: 'Content', default: true},
    {name: OPTIONS_GROUP, title: 'Options'},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: CONTENT_GROUP,
    }),
    defineField({
      name: 'cards',
      title: 'Feature cards',
      type: 'array',
      group: CONTENT_GROUP,
      of: [
        defineArrayMember({
          name: 'card',
          title: 'Feature card',
          type: 'object',
          groups: [
            {name: CONTENT_GROUP, title: 'Content', default: true},
            {name: MEDIA_GROUP, title: 'Media'},
          ],
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              group: CONTENT_GROUP,
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              group: CONTENT_GROUP,
            }),
            defineField({
              name: 'cardImage',
              title: 'Card image',
              type: 'image',
              group: MEDIA_GROUP,
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'link',
              title: 'Link to page',
              type: 'link',
              group: CONTENT_GROUP,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      group: OPTIONS_GROUP,
      initialValue: 'light',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title ?? 'Feature cards block',
        subtitle: 'Feature cards',
      }
    },
  },
})
