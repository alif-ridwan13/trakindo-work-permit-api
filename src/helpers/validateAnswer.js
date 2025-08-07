export const validateAnswer = async (answer, question, safetyEquipments) => {
	const { value: rawValue } = answer;
	const { type, options, value: questionLabel } = question;

	switch (type) {
		case 'Option':
		case 'YesNoNA':
			if (!options.some((o) => o.value === rawValue)) {
				return `Jawaban tidak valid untuk pertanyaan "${questionLabel}".`;
			}
			break;

		case 'CheckboxFromMaster': {
			let parsed;
			try {
				parsed = JSON.parse(rawValue);
				if (!Array.isArray(parsed)) throw new Error();
			} catch {
				return `Format jawaban untuk "${questionLabel}" harus berupa array JSON.`;
			}

			const category = questionLabel.includes('APD') ? 'APD' : 'Emergency';
			const allowed = safetyEquipments.filter((e) => e.category === category).map((e) => e.name);

			const invalid = parsed.filter((item) => !allowed.includes(item) && item !== 'Lainnya');
			if (invalid.length > 0) {
				return `Beberapa nilai tidak valid untuk pertanyaan "${questionLabel}": ${invalid.join(', ')}.`;
			}
			break;
		}

		case 'Checkbox': {
			let parsed;
			try {
				parsed = JSON.parse(rawValue);
				if (!Array.isArray(parsed)) throw new Error();
			} catch {
				return `Format jawaban untuk "${questionLabel}" harus berupa array JSON.`;
			}

			const validOptionValues = options.map((o) => o.value);
			const invalidChoices = parsed.filter((v) => !validOptionValues.includes(v));
			if (invalidChoices.length > 0) {
				return `Pilihan tidak valid untuk "${questionLabel}": ${invalidChoices.join(', ')}.`;
			}
			break;
		}

		case 'Paragraph':
		case 'Text':
		case 'Date':
		case 'Number':
		case 'Signature':
			if (typeof rawValue !== 'string') {
				return `Jawaban untuk "${questionLabel}" harus berupa string.`;
			}
			break;

		default:
			return `Tipe pertanyaan "${type}" belum didukung.`;
	}

	return null;
};
