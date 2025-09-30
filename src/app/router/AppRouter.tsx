import { type FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '@/shared/config';
import { MailPage } from '@/pages/mail';
import { NotFound } from '@/pages/not-found';
import { LetterPage } from '@/pages/letter';

export const AppRouter: FC = () => {
	return (
		<Routes>
			<Route key={routes.mail()} path={routes.mail()} element={<MailPage />} />
			<Route key={routes.letter()} path={routes.letter()} element={<LetterPage />} />
			<Route path={routes.main()} element={<Navigate to={routes.mail()} replace />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
