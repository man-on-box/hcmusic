import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'x6ftvyem',
    dataset: 'production',
  },
  schemaExtraction: {
    enabled: true,
  },
  typegen: {
    enabled: true,
    path: '../website/src/**/*.{ts,tsx,astro}',
    generates: '../website/src/sanity/sanity.types.ts',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'yd0dde6ejx8lpxjj1g0n552g',
  },
})
