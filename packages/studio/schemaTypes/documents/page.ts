import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

const CONTENT_GROUP = 'content'
const SEO_GROUP = 'seo'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: CONTENT_GROUP, title: 'Content', default: true},
    {name: SEO_GROUP, title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      group: CONTENT_GROUP,
    }),
    defineField({
      name: 'pageSlug',
      type: 'pageSlug',
      group: CONTENT_GROUP,
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'pageBuilder',
      group: CONTENT_GROUP,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: SEO_GROUP,
      description: 'Optional SEO fields for this page',
    }),
  ],
})
