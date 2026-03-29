import {defineField, defineType, defineArrayMember} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
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
      description: 'Optional subheading in the hero image.',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'Slug of the page (the path where the page exists)',
      options: {
        source: 'heading',
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 100),
      },
      validation: (rule) => rule.required(),
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
          description: 'Visual description of the image',
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
  ],
})
