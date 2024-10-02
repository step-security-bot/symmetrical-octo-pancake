import { normalizeStories } from '@storybook/core/common';
import type { DocsOptions, Options } from '@storybook/core/types';

import { StoryIndexGenerator } from './StoryIndexGenerator';
import type { ServerChannel } from './get-server-channel';
import { router } from './router';
import { useStoriesJson } from './stories-json';

export async function getStoryIndexGenerator(
  features: {
    argTypeTargetsV7?: boolean;
  },
  options: Options,
  serverChannel: ServerChannel
): Promise<StoryIndexGenerator | undefined> {
  const workingDir = process.cwd();
  const configDir = options.configDir;
  const directories = {
    configDir,
    workingDir,
  };
  const stories = options.presets.apply('stories');
  const indexers = options.presets.apply('experimental_indexers', []);
  const docsOptions = options.presets.apply<DocsOptions>('docs', {});
  const normalizedStories = normalizeStories(await stories, directories);

  const generator = new StoryIndexGenerator(normalizedStories, {
    ...directories,
    indexers: await indexers,
    docs: await docsOptions,
    workingDir,
  });

  const initializedStoryIndexGenerator = generator.initialize().then(() => generator);

  useStoriesJson({
    router,
    initializedStoryIndexGenerator,
    normalizedStories,
    serverChannel,
    workingDir,
    configDir,
  });

  return initializedStoryIndexGenerator;
}
