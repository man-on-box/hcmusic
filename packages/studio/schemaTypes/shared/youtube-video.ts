import {defineType, defineField} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const youtubeType = defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Accessible Label',
      description: 'Briefly describe the video (e.g., "Live performance of Charaga del Norte")',
    }),
    defineField({
      name: 'id',
      type: 'string',
      title: 'Youtube video ID',
      description:
        'Id of the Youtube video. For example if you look in the Youtube video URL "https://www.youtube.com/watch?v=mWX3RF5s5W0", the ID of this video would be "mWX3RF5s5W0"',
    }),
  ],
})
