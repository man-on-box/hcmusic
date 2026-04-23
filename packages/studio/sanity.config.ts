import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {resolve} from './lib/resolve'

export default defineConfig({
  name: 'default',
  title: 'HelenCurtisMusic',

  projectId: 'x6ftvyem',
  dataset: 'production',

  plugins: [
    media(),
    structureTool({
      structure,
    }),
    visionTool(),
    presentationTool({
      resolve,
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],

  form: {
    image: {
      assetSources: (sources) => sources.filter((source) => source.name !== 'sanity-default'),
    },
  },

  schema: {
    types: schemaTypes,
  },
})
