import express, { json } from 'express';
import cors from 'cors';
import router from './routes/router.js';

const app = express();
app.use(cors());
app.use(json());

app.use('/api/v1/', router);

app.get('/', (req, res) => {
	res.send({ message: 'API is running' });
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		message: 'Internal Server Error',
		error: err.message,
	});
});

export default app;
