import prisma from '../configurations/prismaClient.js';
import { success, error } from '../helpers/response.js';

export const getAllAnswers = async (req, res) => {
	try {
		const data = await prisma.answer.findMany();
		return success(res, data);
	} catch (e) {
		return error(res, e.message);
	}
};

export const getAnswerById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.answer.findUnique({
			where: { id: BigInt(id) },
		});
		if (!data) return error(res, 'Not found', 404);
		return success(res, data);
	} catch (e) {
		return error(res, e.message);
	}
};

export const createAnswer = async (req, res) => {
	try {
		const data = await prisma.answer.create({ data: req.body });
		return success(res, data, 'Created successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const updateAnswer = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.answer.update({
			where: { id: BigInt(id) },
			data: req.body,
		});
		return success(res, data, 'Updated successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const deleteAnswer = async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.answer.delete({
			where: { id: BigInt(id) },
		});
		return success(res, null, 'Deleted successfully');
	} catch (e) {
		return error(res, e.message);
	}
};
