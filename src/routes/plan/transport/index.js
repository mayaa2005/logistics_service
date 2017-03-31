import React from 'react';
import TransportContainer from './TransportContainer';

export default {
  path: '/transport/:key1/:key2',

  action({params: {key1, key2}}) {
    if (key2 === 'index.js.map') {
      return null;
    }

    return {
      wrap: true,
      component: <TransportContainer key1={key1} key2={key2} special={false} />
    };
  }
}
