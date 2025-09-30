(function () {
	const originalFetch = window.fetch;
	window.fetch = async (...args) => {
		const shouldFail = Math.random() < 0.2;

		if (shouldFail) {
			const serverErrors = [
				{ status: 500, message: 'Internal Server Error' },
				{ status: 502, message: 'Bad Gateway' },
				{ status: 503, message: 'Service Unavailable' },
			];
			const error = serverErrors[Math.floor(Math.random() * serverErrors.length)];

			return new Response(JSON.stringify({ message: error.message }), {
				status: error.status,
				statusText: error.message,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		return originalFetch(...args);
	};
})();
