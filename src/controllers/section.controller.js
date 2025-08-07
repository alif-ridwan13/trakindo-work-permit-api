import prisma from '../configurations/prismaClient.js';
import { success, error } from '../helpers/response.js';

export const getAllSections = async (req, res) => {
	try {
		const data = await prisma.section.findMany();
		return success(res, data);
	} catch (e) {
		return error(res, e.message);
	}
};

export const getSectionById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.section.findUnique({
			where: { id: BigInt(id) },
		});
		if (!data) return error(res, 'Not found', 404);
		return success(res, data);
	} catch (e) {
		return error(res, e.message);
	}
};

export const createSection = async (req, res) => {
	try {
		const data = await prisma.section.create({ data: req.body });
		return success(res, data, 'Created successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const updateSection = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.section.update({
			where: { id: BigInt(id) },
			data: req.body,
		});
		return success(res, data, 'Updated successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const deleteSection = async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.section.delete({
			where: { id: BigInt(id) },
		});
		return success(res, null, 'Deleted successfully');
	} catch (e) {
		return error(res, e.message);
	}
};
