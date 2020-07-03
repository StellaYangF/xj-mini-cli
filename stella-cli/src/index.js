import { betterRequire } from './utils/common';
// eslint-disable-next-line import/order
import { resolve } from 'path';

const apply = (actionName, ...args) => {
  betterRequire(resolve(__dirname, `./${actionName}`))(...args);
};
export default apply;
