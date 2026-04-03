import {defineType, defineField} from 'sanity'
import {RocketIcon} from '@sanity/icons'

const CONTENT_GROUP = 'content'
const MEDIA_GROUP = 'media'
const LAYOUT_GROUP = 'layout'

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: RocketIcon,
  groups: [
    {name: CONTENT_GROUP, title: 'Content', default: true},
    {name: MEDIA_GROUP, title: 'Media'},
    {name: LAYOUT_GROUP, title: 'Layout'},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: CONTENT_GROUP,
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: CONTENT_GROUP,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      group: MEDIA_GROUP,
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Visual description of the image',
        }),
      ],
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      group: LAYOUT_GROUP,
      description: 'Size of hero. Use small size for most pages.',
      initialValue: 'small',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Large', value: 'large'},
        ],
        layout: 'radio',
      },
    }),
  ],
})
