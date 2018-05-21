import complement from 'ramda/src/complement';
import isNil from 'ramda/src/isNil';

export const isUndefined = isNil;

export const isDefined = complement(isUndefined);
