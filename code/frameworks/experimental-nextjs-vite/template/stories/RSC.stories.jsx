import React from 'react';

import { Nested, RSC } from './RSC';

export default {
  component: RSC,
  args: { label: 'label' },
  parameters: {
    react: {
      rsc: true,
    },
  },
};

export const Default = {};

export const DisableRSC = {
  tags: ['!test'],
  parameters: {
    chromatic: { disable: true },
    nextjs: { rsc: false },
  },
};

export const Error = {
  tags: ['!test', '!vitest'],
  parameters: {
    chromatic: { disable: true },
  },
  render: () => {
    throw new Error('RSC Error');
  },
};

export const NestedRSC = {
  render: (args) => (
    <Nested>
      <RSC {...args} />
    </Nested>
  ),
};
