import prisma from '../configurations/prismaClient.js';
import { success, error } from '../helpers/response.js';

export const getAllSafetyEquipment = async (req, res) => {
	try {
		const data = await prisma.safetyEquipment.findMany();
		return success(res, data);
	} catch (e) {
		return error(res, e.message);
	}
};

export const getSafetyEquipmentById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.safetyEquipment.findUnique({
			where: { id: BigInt(id) },
		});
		if (!data) return error(res, 'Not found', 404);
		return success(res, data);
	} catch (e) {
		return error(res, e.message);
	}
};

export const createSafetyEquipment = async (req, res) => {
	try {
		const { name, category } = req.body;
		const data = await prisma.safetyEquipment.create({
			data: { name, category },
		});
		return success(res, data, 'Created successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const updateSafetyEquipment = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, category } = req.body;
		const data = await prisma.safetyEquipment.update({
			where: { id: BigInt(id) },
			data: { name, category },
		});
		return success(res, data, 'Updated successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const deleteSafetyEquipment = async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.safetyEquipment.delete({
			where: { id: BigInt(id) },
		});
		return success(res, null, 'Deleted successfully');
	} catch (e) {
		return error(res, e.message);
	}
};
