import {defineType, defineField, defineArrayMember} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

const CONTENT_GROUP = 'content'
const LAYOUT_GROUP = 'layout'

export const textSectionType = defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  icon: BlockContentIcon,
  groups: [
    {name: CONTENT_GROUP, title: 'Content', default: true},
    {name: LAYOUT_GROUP, title: 'Layout'},
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
  ],
})
