import express from 'express';
import * as Form from '../controllers/form.controller.js';
import * as Section from '../controllers/section.controller.js';
import * as Question from '../controllers/question.controller.js';
import * as Option from '../controllers/option.controller.js';
import * as WorkPermit from '../controllers/workPermit.controller.js';
import * as Answer from '../controllers/answer.controller.js';
import * as safetyEquipment from '../controllers/safetyEquipment.controller.js';

const router = express.Router();

// Form routes
router.get('/forms', Form.getAllForms);
router.get('/forms/:id', Form.getFormById);
router.post('/forms/insert', Form.createForm);
router.put('/forms/:id/update', Form.updateForm);
router.delete('/forms/:id/delete', Form.deleteForm);

// Public Form routes
router.get('/public/forms/:slug', Form.getFormQuestions);
router.post('/public/forms/:slug/submit', Form.submitForm);

// Admin Form Submission
router.get('/admin/form-submissions/:submissionId/review', Form.getFormSubmissionForReview);

// Section routes
router.get('/sections', Section.getAllSections);
router.get('/sections/:id', Section.getSectionById);
router.post('/sections/insert', Section.createSection);
router.put('/sections/:id/update', Section.updateSection);
router.delete('/sections/:id/delete', Section.deleteSection);

// Question routes
router.get('/questions', Question.getAllQuestions);
router.get('/questions/:id', Question.getQuestionById);
router.post('/questions/insert', Question.createQuestion);
router.put('/questions/:id/update', Question.updateQuestion);
router.delete('/questions/:id/delete', Question.deleteQuestion);

// Option routes
router.get('/options', Option.getAllOptions);
router.get('/options/:id', Option.getOptionById);
router.post('/options/insert', Option.createOption);
router.put('/options/:id/update', Option.updateOption);
router.delete('/options/:id/delete', Option.deleteOption);

// Work Permit routes
router.get('/work-permits', WorkPermit.getAllWorkPermits);
router.get('/work-permits/:id', WorkPermit.getWorkPermitById);
router.post('/work-permits/insert', WorkPermit.createWorkPermit);
router.put('/work-permits/:id/update', WorkPermit.updateWorkPermit);
router.delete('/work-permits/:id/delete', WorkPermit.deleteWorkPermit);

// Answer routes
router.get('/answers', Answer.getAllAnswers);
router.get('/answers/:id', Answer.getAnswerById);
router.post('/answers/insert', Answer.createAnswer);
router.put('/answers/:id/update', Answer.updateAnswer);
router.delete('/answers/:id/delete', Answer.deleteAnswer);

// Safety Equpment routes
router.get('/safety-equipments', safetyEquipment.getAllSafetyEquipment);
router.get('/safety-equipments/:id', safetyEquipment.getSafetyEquipmentById);
router.post('/safety-equipments/insert', safetyEquipment.createSafetyEquipment);
router.put('/safety-equipments/:id/update', safetyEquipment.updateSafetyEquipment);
router.delete('/safety-equipments/:id/delete', safetyEquipment.deleteSafetyEquipment);

export default router;
