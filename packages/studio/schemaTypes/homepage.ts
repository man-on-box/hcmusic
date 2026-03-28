import {defineField, defineType} from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading in the hero image.',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'Subheading in the hero image.',
    }),
    defineField({
      name: 'poster',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
          name: 'blurb',
          title: 'Blurb',
          type: 'array',
          description: 'Short blurb intro to yourself.',
          of: [{type: 'block', styles: []}],
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'string',
          description: 'Call to action, used in the button under the blurb.',
        }),
      ],
    }),
  ],
})
