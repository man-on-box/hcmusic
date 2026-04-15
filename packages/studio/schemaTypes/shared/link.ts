import {defineField, defineType} from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'internal',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'page',
      title: 'Internal Page',
      type: 'reference',
      to: [{type: 'page'}, {type: 'project'}, {type: 'eventsPage'}],
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'external',
      title: 'External URL',
      type: 'url',
      placeholder: 'https://example.com',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor / Section ID',
      type: 'slug',
      description: 'Jump to a specific section in the page (optional)',
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
  ],
})
