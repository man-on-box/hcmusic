import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {resolve} from './lib/resolve'
import {SINGLETON_ACTIONS, SINGLETON_TYPES} from './schemaTypes/constants'

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

  document: {
    actions: (input, context) => {
      if (SINGLETON_TYPES.has(context.schemaType)) {
        return input.filter(({action}) => action && SINGLETON_ACTIONS.has(action))
      }
      return input
    },
    newDocumentOptions: (prev) => prev.filter((item) => !SINGLETON_TYPES.has(item.templateId)),
  },
})
