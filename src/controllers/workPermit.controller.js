import prisma from '../configurations/prismaClient.js';
import { success, error } from '../helpers/response.js';

export const getAllWorkPermits = async (req, res) => {
	try {
		const data = await prisma.workPermit.findMany();
		return success(res, data);
	} catch (e) {
		return error(res, e.message);
	}
};

export const getWorkPermitById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.workPermit.findUnique({
			where: { id: BigInt(id) },
		});
		if (!data) return error(res, 'Not found', 404);
		return success(res, data);
	} catch (e) {
		return error(res, e.message);
	}
};

export const createWorkPermit = async (req, res) => {
	try {
		const data = await prisma.workPermit.create({ data: req.body });
		return success(res, data, 'Created successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const updateWorkPermit = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.workPermit.update({
			where: { id: BigInt(id) },
			data: req.body,
		});
		return success(res, data, 'Updated successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const deleteWorkPermit = async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.workPermit.delete({
			where: { id: BigInt(id) },
		});
		return success(res, null, 'Deleted successfully');
	} catch (e) {
		return error(res, e.message);
	}
};
