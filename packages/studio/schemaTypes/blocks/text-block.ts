import {defineType, defineField, defineArrayMember} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

const CONTENT_GROUP = 'content'
const LAYOUT_GROUP = 'layout'
const CTA_LAYOUT = 'cta'

export const textBlockType = defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  icon: BlockContentIcon,
  groups: [
    {name: CONTENT_GROUP, title: 'Content', default: true},
    {name: LAYOUT_GROUP, title: 'Layout'},
    {name: CTA_LAYOUT, title: 'CTA'},
  ],
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: CONTENT_GROUP,
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
          ],
          lists: [],
        }),
      ],
    }),
    defineField({
      name: 'textAlign',
      title: 'Align Text',
      type: 'string',
      group: LAYOUT_GROUP,
      initialValue: 'left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Justify', value: 'justify'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'string',
      group: CTA_LAYOUT,
      description: 'Optional call to action, a button to show under the text',
    }),
    defineField({
      name: 'linkToPage',
      title: 'Link to page',
      type: 'reference',
      group: CTA_LAYOUT,
      to: [{type: 'page'}],
    }),
  ],
  preview: {
    select: {
      title: 'content',
    },
  },
})
