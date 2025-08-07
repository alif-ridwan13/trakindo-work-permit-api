import prisma from '../configurations/prismaClient.js';
import { success, error } from '../helpers/response.js';

export const getAllOptions = async (req, res) => {
	try {
		const data = await prisma.option.findMany();
		return success(res, data);
	} catch (e) {
		return error(res, e.message);
	}
};

export const getOptionById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.option.findUnique({
			where: { id: BigInt(id) },
		});
		if (!data) return error(res, 'Not found', 404);
		return success(res, data);
	} catch (e) {
		return error(res, e.message);
	}
};

export const createOption = async (req, res) => {
	try {
		const data = await prisma.option.create({ data: req.body });
		return success(res, data, 'Created successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const updateOption = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.option.update({
			where: { id: BigInt(id) },
			data: req.body,
		});
		return success(res, data, 'Updated successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const deleteOption = async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.option.delete({
			where: { id: BigInt(id) },
		});
		return success(res, null, 'Deleted successfully');
	} catch (e) {
		return error(res, e.message);
	}
};
