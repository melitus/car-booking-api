/* eslint-disable import/prefer-default-export */
import expressLoader from './express';

export const appInitLoader = (app) => {
  expressLoader(app);
};
