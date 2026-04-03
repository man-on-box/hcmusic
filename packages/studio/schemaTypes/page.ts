import {defineField, defineType, defineArrayMember} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
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
      description: 'Optional subheading in the hero image.',
    }),
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'Slug of the page (the path where the page exists)',
      options: {
        source: 'title',
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 100),
      },
      validation: (rule) => rule.required(),
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
      name: 'content',
      title: 'Page Content',
      type: 'array',
      description: 'Content of the page',
      of: [defineArrayMember({type: 'block', styles: [], lists: []})],
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'pageBuilder',
    }),
  ],
})
