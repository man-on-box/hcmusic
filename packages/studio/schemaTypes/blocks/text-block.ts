import {defineType, defineField, defineArrayMember} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

const CONTENT_GROUP = 'content'
const LAYOUT_GROUP = 'layout'
const CTA_LAYOUT_GROUP = 'cta'
const FEATURE_IMAGE_GROUP = 'featureImage'

export const textBlockType = defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  icon: BlockContentIcon,
  groups: [
    {name: CONTENT_GROUP, title: 'Content', default: true},
    {name: LAYOUT_GROUP, title: 'Layout'},
    {name: FEATURE_IMAGE_GROUP, title: 'Feature Image'},
    {name: CTA_LAYOUT_GROUP, title: 'CTA'},
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
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
          },
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
      name: 'featureImage',
      title: 'Feature image',
      type: 'image',
      group: FEATURE_IMAGE_GROUP,
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
      name: 'imageAlign',
      title: 'Align Feature Image',
      type: 'string',
      group: FEATURE_IMAGE_GROUP,
      initialValue: 'left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
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
      name: 'leadInText',
      title: 'Lead-in Text',
      type: 'boolean',
      group: LAYOUT_GROUP,
      initialValue: false,
      description: 'Styles first line of text with lead-in styles.',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'string',
      group: CTA_LAYOUT_GROUP,
      description: 'Optional call to action, a button to show under the text',
    }),
    defineField({
      name: 'linkToPage',
      title: 'Link to page',
      type: 'reference',
      group: CTA_LAYOUT_GROUP,
      to: [{type: 'page'}],
    }),
  ],
  preview: {
    select: {
      title: 'content',
    },
  },
})
