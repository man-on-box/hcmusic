import {defineField, defineType, defineArrayMember} from 'sanity'

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
      name: 'image',
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
          of: [defineArrayMember({type: 'block', styles: [], lists: []})],
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'string',
          description: 'Call to action, used in the button under the blurb.',
        }),
        defineField({
          name: 'linkToPage',
          title: 'Link to page',
          type: 'reference',
          to: [{type: 'page'}],
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features section',
      type: 'object',
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
          description: 'Cards highlighting your main features.',
          validation: (rule) => rule.required().length(3),
          of: [
            defineArrayMember({
              name: 'card',
              title: 'Feature card',
              type: 'object',
              fields: [
                defineField({name: 'title', title: 'Title', type: 'string'}),
                defineField({name: 'description', title: 'Description', type: 'string'}),
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
    }),
  ],
})
