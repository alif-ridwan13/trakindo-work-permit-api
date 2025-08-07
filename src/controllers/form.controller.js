import prisma from '../configurations/prismaClient.js';
import { success, error } from '../helpers/response.js';
import { validateAnswer } from '../helpers/validateAnswer.js';

export const getAllForms = async (req, res) => {
	try {
		const data = await prisma.form.findMany();
		return success(res, data);
	} catch (e) {
		return error(res, e.message);
	}
};

export const getFormById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.form.findUnique({
			where: { id: BigInt(id) },
		});
		if (!data) return error(res, 'Not found', 404);
		return success(res, data);
	} catch (e) {
		return error(res, e.message);
	}
};

export const createForm = async (req, res) => {
	try {
		const data = await prisma.form.create({ data: req.body });
		return success(res, data, 'Created successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const updateForm = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await prisma.form.update({
			where: { id: BigInt(id) },
			data: req.body,
		});
		return success(res, data, 'Updated successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const deleteForm = async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.form.delete({
			where: { id: BigInt(id) },
		});
		return success(res, null, 'Deleted successfully');
	} catch (e) {
		return error(res, e.message);
	}
};

export const getFormSubmissionForReview = async (req, res) => {
	try {
		const { submissionId } = req.params;

		const submission = await prisma.formSubmission.findUnique({
			where: { id: BigInt(submissionId) },
			include: {
				form: {
					include: {
						sections: {
							include: {
								questions: {
									include: { options: true },
								},
							},
							orderBy: { index_number: 'asc' },
						},
					},
				},
				answers: true,
			},
		});

		if (!submission) {
			return error(res, 'Submission tidak ditemukan.', 404);
		}

		const answerMap = new Map(submission.answers.map((ans) => [String(ans.questionId), ans.value]));

		const formatted = submission.form.sections.map((section) => {
			const questions = section.questions.map((q) => {
				const rawValue = answerMap.get(String(q.id));

				let parsedAnswer = rawValue;
				if (q.type === 'Checkbox' || q.type === 'CheckboxFromMaster') {
					try {
						parsedAnswer = JSON.parse(rawValue || '[]');
					} catch (err) {
						parsedAnswer = [];
					}
				}

				return {
					id: q.id,
					value: q.value,
					type: q.type,
					answer: parsedAnswer,
				};
			});

			return {
				section: section.name,
				questions,
			};
		});

		return success(res, formatted, 'Berhasil mengambil data submission untuk direview.');
	} catch (err) {
		console.error(err);
		return error(res, err.message);
	}
};

export const getFormQuestions = async (req, res) => {
	try {
		const { slug } = req.params;

		const form = await prisma.form.findUnique({
			where: { slug },
			include: {
				sections: {
					include: {
						questions: {
							include: { options: true },
						},
					},
					orderBy: { index_number: 'asc' },
				},
			},
		});

		if (!form) {
			return error(res, 'Form tidak ditemukan.');
		}

		const formatted = await Promise.all(
			form.sections.map(async (section) => {
				const formattedQuestions = await Promise.all(
					section.questions.map(async (q) => {
						if (q.type === 'CheckboxFromMaster') {
							const categoryEnum = getSafetyCategoryFromValue(q.value);

							if (!categoryEnum) {
								return {
									value: q.value,
									type: q.type,
									options: [],
								};
							}

							const equipment = await prisma.safetyEquipment.findMany({
								where: { category: categoryEnum },
								orderBy: { name: 'asc' },
							});

							return {
								id: q.id,
								value: q.value,
								type: q.type,
								options: equipment.map((e) => e.name),
							};
						}

						return {
							id: q.id,
							value: q.value,
							type: q.type,
							options: q.options?.map((o) => o.value) || [],
						};
					})
				);

				return {
					section: section.name,
					questions: formattedQuestions,
				};
			})
		);

		return success(res, formatted, 'Berhasil mendapatkan daftar pertanyaan.');
	} catch (err) {
		console.error(err);
		return error(res, err.message);
	}
};

export const submitForm = async (req, res) => {
	try {
		const { slug } = req.params;
		const { submittedBy, answers } = req.body;

		const form = await prisma.form.findUnique({
			where: { slug },
			include: {
				sections: {
					include: {
						questions: {
							include: { options: true },
						},
					},
				},
			},
		});

		if (!form) return error(res, 'Form tidak ditemukan', 404);

		const allQuestions = form.sections.flatMap((s) => s.questions);
		const safetyEquipments = await prisma.safetyEquipment.findMany();

		for (const ans of answers) {
			const question = allQuestions.find((q) => q.id === BigInt(ans.questionId));
			console.log(question);
			if (!question) return error(res, `Pertanyaan dengan ID ${ans.questionId} tidak ditemukan`, 400);

			const validationError = await validateAnswer(ans, question, safetyEquipments);
			if (validationError) return error(res, validationError, 400);
		}

		const submission = await prisma.formSubmission.create({
			data: {
				formId: form.id,
				submittedBy,
				status: 'PENDING',
				answers: {
					create: answers.map((ans) => ({
						questionId: ans.questionId,
						value: ans.value,
					})),
				},
			},
		});

		return success(res, submission, 'Form berhasil disubmit.');
	} catch (err) {
		return error(res, err.message);
	}
};

const getSafetyCategoryFromValue = (value) => {
	switch (value) {
		case 'Alat Pelindung Diri (APD)':
			return 'APD';
		case 'Perlengkapan Keselamatan & Darurat':
			return 'Emergency';
		default:
			return null;
	}
};
