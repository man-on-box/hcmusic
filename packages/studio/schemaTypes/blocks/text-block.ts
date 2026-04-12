import {defineType, defineField, defineArrayMember} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

const CONTENT_GROUP = 'options'
const OPTIONS_GROUP = 'layout'
const CTA_LAYOUT_GROUP = 'cta'
const FEATURE_IMAGE_GROUP = 'featureImage'

export const textBlockType = defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  icon: BlockContentIcon,
  groups: [
    {name: CONTENT_GROUP, title: 'Content', default: true},
    {name: OPTIONS_GROUP, title: 'Options'},
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
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        }),
        defineArrayMember({
          type: 'youtube',
        }),
        defineArrayMember({
          type: 'mailchimpForm',
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
      group: OPTIONS_GROUP,
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
      group: OPTIONS_GROUP,
      initialValue: false,
      description: 'Styles first line of text with lead-in styles.',
    }),
    defineField({
      name: 'sectionId',
      title: 'Section id',
      type: 'string',
      group: OPTIONS_GROUP,
      description: 'Set a section ID to be able to target this section from another page.',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'string',
      group: CTA_LAYOUT_GROUP,
      description: 'Optional call to action adds a button under the text to link to another page.',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'internalLink',
      group: CTA_LAYOUT_GROUP,
    }),
  ],
  preview: {
    select: {
      title: 'content',
      media: 'featureImage',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title?.[0]?.children?.[0]?.text ?? 'Text block',
        subtitle: 'Text block',
        media: media ?? BlockContentIcon,
      }
    },
  },
})
