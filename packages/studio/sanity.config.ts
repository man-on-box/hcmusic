import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
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
    structureTool({
      structure,
    }),
    visionTool(),
    presentationTool({
      resolve,
      previewUrl: {
        initial: 'https://hcmusic-website.theapricoteffect.workers.dev',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'page-with-parent',
        title: 'Page with Parent',
        schemaType: 'page',
        parameters: [{name: 'parentId', type: 'string'}],
        value: (params: any) => ({
          pageSlug: {
            parent: {
              _type: 'reference',
              _ref: params.parentId,
            },
          },
        }),
      },
    ],
  },
})
