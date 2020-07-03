/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable prefer-const */
export const betterRequire = (absPath) => {
  const module = require(absPath);
  if (module.default) {
    return module.default;
  }
  return module;
};
