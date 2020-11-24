/* eslint-disable no-underscore-dangle */
import crypto from 'crypto';
import bcrypt from 'bcrypt';

// to prevent Rainbow Tables Attack
const _hashFunction = (_password) => crypto.createHash('sha384').update(_password).digest().toString('base64');

export const generatePasswordHashFn = async (password) => {
  const passwordHashed = _hashFunction(password);
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(passwordHashed, saltRounds);
  return hashedPassword;
};

export const passwordMatchesFn = async (plainPassword, hashedPassword) => {
  const password = _hashFunction(plainPassword);
  const isPasswordEqual = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordEqual) throw new Error('Incorrect password');

  return isPasswordEqual;
};
