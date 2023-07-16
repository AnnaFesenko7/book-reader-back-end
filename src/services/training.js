const { Training } = require('../models');

const addTraining = async (owner, body) => {
  console.log('🚀 ~ file: training.js:4 ~ addTraining ~ body:', body);

  await Training.create({
    ...body,
    owner: owner,
  });
  const training = await Training.findOne({ owner }).populate('books');
  return training;
};

// const getTraining = async owner => {
//   return await Training.findOne({ owner });
// };
const getTraining = async owner => {
  const training = await Training.findOne({ owner }).populate('books');
  return training;
};

const getTrainingWithBooks = async owner => {
  const training = await Training.findOne({ owner }).populate('books');
  return training;
};

const updateTraining = async (
  _id,
  owner,
  { completed, completenessReason }
) => {
  return await Training.findByIdAndUpdate(
    { _id, owner },
    { $set: { completed, completenessReason } },
    {
      upsert: true,
      new: true,
    }
  ).populate('books');
};

const completeness = async (_id, owner, { completed }) => {
  return await Training.findByIdAndUpdate(
    { _id, owner },
    { $set: { completed } },
    { new: true }
  ).populate('books');
};

const addResults = async (id, body) => {
  return await Training.findOneAndUpdate(
    { _id: id },
    { $push: { results: { ...body } } },
    { upsert: true, new: true }
  ).populate('books');
};

const deleteTraining = async (id, owner) => {
  console.log('🚀 ~ file: training.js:59 ~ deleteTraining ~ id:', id);

  await Training.findByIdAndRemove({ _id: id, owner });
};

module.exports = {
  addTraining,
  getTraining,
  updateTraining,
  deleteTraining,
  addResults,
  completeness,
  getTrainingWithBooks,
};
