import {defineField, defineType} from 'sanity'
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
  ],
})
