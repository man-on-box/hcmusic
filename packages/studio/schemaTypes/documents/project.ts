import {defineField, defineType} from 'sanity'
import {ProjectsIcon} from '@sanity/icons'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
    }),
    defineField({
      name: 'pageSlug',
      type: 'pageSlug',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'pageBuilder',
    }),
  ],
})
