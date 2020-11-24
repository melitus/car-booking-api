/* eslint-disable import/prefer-default-export */
import expressLoader from './express';
import databaseLoader from './database';

export const appInitLoader = async (app) => {
  await databaseLoader();
  expressLoader(app);
};
