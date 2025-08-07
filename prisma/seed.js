import { PrismaClient } from '@prisma/client';
import { slugify } from '../src/utilities/slugify.js';

const prisma = new PrismaClient();

async function main() {
	const formName = 'Work Permit A';
	const formSlug = slugify(formName);

	const form = await prisma.form.upsert({
		where: { slug: formSlug },
		update: {},
		create: {
			name: formName,
			slug: formSlug,
			sections: {
				create: [
					{
						name: 'Informasi Umum ',
						index_number: 1,
						questions: {
							create: [
								{ index_number: 1, value: 'Nomor Izin Bekerja', type: 'Paragraph' },
								{ index_number: 2, value: 'Nama Perusahaan', type: 'Paragraph' },
								{ index_number: 3, value: 'Cabang Lokasi Pekerjaan', type: 'Paragraph' },
								{ index_number: 4, value: 'Penanggung Jawab Pekerjaan', type: 'Paragraph' },
								{ index_number: 5, value: 'Lokasi Pekerjaan', type: 'Paragraph' },
								{ index_number: 6, value: 'Seksi / Departemen / Sub-Kontraktor', type: 'Paragraph' },
								{ index_number: 7, value: 'Pemilik Pekerjaan', type: 'Paragraph' },
								{ index_number: 8, value: 'Tanggal Penerbitan Izin Bekerja', type: 'Paragraph' },
								{ index_number: 9, value: 'Jam Penerbitan', type: 'Paragraph' },
								{ index_number: 10, value: 'Lamanya', type: 'Paragraph' },
								{ index_number: 11, value: 'Mulai', type: 'Paragraph' },
								{ index_number: 12, value: 'Sampai', type: 'Paragraph' },
								{ index_number: 13, value: 'Deskripsi tugas yang harus dikerjakan', type: 'Paragraph' },
								{ index_number: 14, value: 'Nama Orang yang diberikan Izin ini', type: 'Paragraph' },
								{ index_number: 15, value: 'Seksi / Departemen / Sub-Kontraktor', type: 'Paragraph' },
								{ index_number: 16, value: 'Nama Supervisor', type: 'Paragraph' },
								{ index_number: 17, value: 'Jumlah Karyawan Sub-Kontraktor', type: 'Paragraph' },
							],
						},
					},
					{
						name: 'Daftar Periksa',
						index_number: 2,
						questions: {
							create: [
								{ index_number: 1, value: 'Apakah pekerjaan ini memiliki Standar Operating Procedure (SOP) atau Instruksi Kerja ?', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] } },
								{ index_number: 2, value: 'Apakah Penilaian Resiko (JSA) telah dilakukan? (lampirkan)', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] } },
								{ index_number: 3, value: 'Apakah Peralatan Kerja dan Peralatan Keselamatan dalam kondisi layak dan aman untuk digunakan?', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] } },
								{ index_number: 4, value: 'Apakah daerah telah diperiksa & diamankan?', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] } },
								{ index_number: 5, value: 'Apakah benda / mesin telah di lock-out?', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] } },
								{ index_number: 6, value: 'Apakah daerah/benda telah dibersihkan/diventilasi?', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] } },
								{ index_number: 7, value: 'Apakah telah diuji untuk memastikan tegangan nol?', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] } },
								{ index_number: 8, value: 'Apakah uji gas diperlukan pada saat bekerja?', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] } },
								{ index_number: 9, value: 'Apakah pekerjaan ini telah dikomunikasikan dengan pengawas dan karyawan ?', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] } },
								{ index_number: 10, value: 'Apakah pekerjaan yang dilakukan menghasilkan limbah baik domestik maupun limbah B3?', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }, { value: 'N/A' }] } },
								{ index_number: 11, value: 'Jika YA, bagaimana cara penanganannya?', type: 'Paragraph' },
							],
						},
					},
					{
						name: 'Klasifikasi Pekerjaan',
						index_number: 3,
						questions: {
							create: [
								{ index_number: 1, value: 'Pekerjaan Panas', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }] } },
								{ index_number: 2, value: 'Pekerjaan Ruang Terbatas', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }] } },
								{ index_number: 3, value: 'Pekerjaan di Ketinggian', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }] } },
								{ index_number: 4, value: 'Pekerjaan di atas atau dekat air', type: 'Option', options: { create: [{ value: 'Ya' }, { value: 'Tidak' }] } },
							],
						},
					},
					{
						name: 'Perlengkapan Kerja',
						index_number: 4,
						questions: {
							create: [
								{ index_number: 1, value: 'Alat', type: 'Paragraph' },
								{ index_number: 2, value: 'Jumlah Alat', type: 'Paragraph' },
								{ index_number: 3, value: 'Mesin', type: 'Paragraph' },
								{ index_number: 4, value: 'Jumlah Mesin', type: 'Paragraph' },
								{ index_number: 5, value: 'Material', type: 'Paragraph' },
								{ index_number: 6, value: 'Jumlah Material', type: 'Paragraph' },
							],
						},
					},
					{
						name: 'Peralatan Keselamatan',
						index_number: 5,
						questions: {
							create: [
								{
									index_number: 1,
									value: 'Alat Pelindung Diri (APD)',
									type: 'CheckboxFromMaster',
								},
								{
									index_number: 2,
									value: 'Perlengkapan Keselamatan & Darurat',
									type: 'CheckboxFromMaster',
								},
							],
						},
					},
				],
			},
		},
	});

	console.log('✅ Seed data inserted:', form.name);
}

await prisma.safetyEquipment.createMany({
	data: [
		// APD
		{ name: 'Helm', category: 'APD' },
		{ name: 'Masker kain', category: 'APD' },
		{ name: 'Masker kimia', category: 'APD' },
		{ name: 'Sarung tangan katun', category: 'APD' },
		{ name: 'Sarung tangan kulit', category: 'APD' },
		{ name: 'Sarung tangan karet', category: 'APD' },
		{ name: 'Sarung tangan las', category: 'APD' },
		{ name: 'Sepatu', category: 'APD' },
		{ name: 'Safety Boots', category: 'APD' },
		{ name: 'Kacamata', category: 'APD' },
		{ name: 'Goggles', category: 'APD' },
		{ name: 'Tameng muka', category: 'APD' },
		{ name: 'Kap Las', category: 'APD' },
		{ name: 'Apron', category: 'APD' },
		{ name: 'Ear Plug / Ear Muff', category: 'APD' },
		{ name: 'Rompi', category: 'APD' },
		{ name: 'Pelampung', category: 'APD' },
		{ name: 'Full Body Harness', category: 'APD' },
		{ name: 'Lainnya', category: 'APD' },

		// Emergency
		{ name: 'Pemadam Api', category: 'Emergency' },
		{ name: 'Barikade', category: 'Emergency' },
		{ name: 'Rambu K3L', category: 'Emergency' },
		{ name: 'LOTO', category: 'Emergency' },
		{ name: 'Radio Komunikasi', category: 'Emergency' },
		{ name: 'Lainnya', category: 'Emergency' },
	],
	skipDuplicates: true,
});

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
