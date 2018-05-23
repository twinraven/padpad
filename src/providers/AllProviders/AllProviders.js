import React from 'react';
import { ConfigProvider } from 'providers/ConfigProvider/ConfigProvider';
import { PersistenceProvider } from 'providers/PersistenceProvider/PersistenceProvider';

export const Providers = ({ children }) => {
	return (
		<ConfigProvider>
			<PersistenceProvider>{children}</PersistenceProvider>
		</ConfigProvider>
	);
};
