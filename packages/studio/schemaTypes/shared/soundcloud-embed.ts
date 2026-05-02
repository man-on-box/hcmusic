import {defineType, defineField} from 'sanity'
import {MicrophoneIcon} from '@sanity/icons'

export const soundcloudType = defineType({
  name: 'soundcloud',
  type: 'object',
  title: 'SoundCloud Embed',
  icon: MicrophoneIcon,
  fields: [
    defineField({
      name: 'songUrl',
      type: 'string',
      title: 'Song URL',
      description:
        "Full URL of the song in SoundCloud. You can find this by opening the song on SoundCloud, click 'Share' and paste the full URL here.",
    }),
  ],
})
