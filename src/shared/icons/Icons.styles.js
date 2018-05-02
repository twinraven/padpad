import styled from 'styled-components';

/**
 * Use this component to wrap all icons so that styles can be applied to any
 * icon type from within a parent component, e.g:
 *
 * const Button = styled.button.attrs({ type: 'button' })`
 *   ${Icon} {
 *     margin-left: 4px;
 *   }
 * `
 *
 * **N.B.** A styled component has been used for reduced boilerplate
 * and to take advantage of their property whitelisting.
 */
export const Icon = styled.svg``;

Icon.defaultProps = {
	width: '15',
	height: '15',
};
