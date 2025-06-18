import Journal from "../models/journalModels.js";

export const getJournals = async (req, res) => {
  const journals = await Journal.find();
  res.status(200).json(journals);
};

export const getJournal = async (req, res) => {
  const journal = await Journal.findById(req.params.id);
  if (!journal) return res.status(404).json({ message: 'Not found.' });
  res.json(journal);
};

export const createJournal = async (req, res) => {
  const { title, content } = req.body;
  const newJournal = new Journal({ title, content });
  await newJournal.save();
  res.status(201).json(newJournal);
};

export const updateJournal = async (req, res) => {
  const journal = await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!journal) return res.status(404).json({ message: 'Not found.' })
  res.json(journal);
};

export const deleteJournal = async (req, res) => {
  const journal = await Journal.findByIdAndDelete(req.params.id);
  if (!journal) return res.status(404).json({ message: 'Not found.' });
  res.json({ message: 'Deleted Successfully.' });
};

