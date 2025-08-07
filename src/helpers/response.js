export const sendResponse = (res, statusCode, data = null, message = '') => {
	const safeData = JSON.parse(JSON.stringify(data, (_, value) => (typeof value === 'bigint' ? value.toString() : value)));

	return res.status(statusCode).json({ data: safeData, message });
};

export const success = (res, data = null, message = 'success') => {
	const safeData = JSON.parse(JSON.stringify(data, (_, value) => (typeof value === 'bigint' ? value.toString() : value)));

	return res.json({ data: safeData, message });
};

export const error = (res, message = 'error', code = 500) => {
	return res.status(code).json({ data: null, message });
};
