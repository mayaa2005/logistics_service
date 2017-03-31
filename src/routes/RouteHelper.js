import React from 'react';
import Layout from '../components/Layout';
import fetch from '../core/fetch';

const RouteHelper = (prefix, title, children, items) => {
  let last = '';
  let isInit = false;

  const init = (items) => {
    isInit = true;
    last = items[0].key;

    if (items[0].isFolder) {
      last += items[0].children[0].key;
    }

    for (let item of items) {
      if (item.isFolder) {
        for (let child of item.children) {
          child.href = `${prefix}${item.key}${child.key}`;
        }
      } else {
        item.href = `${prefix}${item.key}`;
      }
    }
  };

  if (typeof items !== 'string') {
    init(items);
  }

  let action = async ({next, params}) => {
    if (!isInit) {
      let res = await fetch(items);
      items = await res.json();
      init(items);
    }

    if (!params['0']) {
      return {redirect: `${prefix}${last}`};
    }

    const route = await next();
    if (!route.wrap) {
      return route;
    }

    last = params['0'];

    return {
      title,
      component: <Layout nav1={prefix} nav2={last} items={items}>{route.component}</Layout>
    };
  };

  return {
    path: new RegExp(`${prefix}(?=(.*))`),
    children,
    action
  }
}

export default RouteHelper;
