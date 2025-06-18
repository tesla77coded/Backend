import express from 'express';
import { getJournal, getJournals, createJournal, updateJournal, deleteJournal } from '../controllers/journalController.js';

const router = express.Router();

router.route('/')
  .get(getJournals)
  .post(createJournal)

router.route('/:id')
  .get(getJournal)
  .patch(updateJournal)
  .delete(deleteJournal)

export default router;
