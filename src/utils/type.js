import { complement, isNil } from 'ramda';

export const isUndefined = isNil;

export const isDefined = complement(isUndefined);
