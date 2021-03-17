import React from 'react';
import why from '@welldone-software/why-did-you-render';

why(React, {trackAllPureComponents: true, trackHooks: true});

if (process.env.NODE_ENV === 'development') {
  async function inject() {
    const {default: why} = await import(
      '@welldone-software/why-did-you-render'
    );
    why(React, {
      trackAllPureComponents: true,
    });
  }
  inject();
}
