import {defineType, defineArrayMember} from 'sanity'

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [defineArrayMember({type: 'heroSection'}), defineArrayMember({type: 'textSection'})],
})
