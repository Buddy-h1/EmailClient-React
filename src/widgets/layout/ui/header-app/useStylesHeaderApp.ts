import { createStyles } from 'antd-style';

export const useStylesHeaderApp = createStyles(({ token }) => ({
	hoverBgPrimary: {
		transition: `background-color ${token.motionDurationMid} ease`,
		'&:hover': {
			backgroundColor: `${token.controlItemBgActive} !important`,
		},
	},
	menuItem: {
		'&:not(:last-child)': {
			marginBottom: `${token.marginXXS}px !important`,
		},
	},
}));
