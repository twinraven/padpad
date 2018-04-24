import { complement, isNil } from 'ramda';

export const hasValue = input => isDefined(input) && input.length;

export const isUndefined = isNil;

export const isDefined = complement(isUndefined);
