/* eslint-disable import/prefer-default-export */
import expressLoader from './express';

import './database';

export const appInitLoader = (app) => {
  expressLoader(app);
};
