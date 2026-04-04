import {defineField, defineType, defineArrayMember} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'pageBuilder',
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
