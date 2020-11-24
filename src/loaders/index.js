/* eslint-disable import/prefer-default-export */
import expressLoader from './express';
import databaseLoader from './database';

export const appInitLoader = (app) => {
//   databaseLoader();
  expressLoader(app);
};
