import { Request, Response } from 'express';
import Exercise from '../models/Exercise';

const handleError = (res: Response, error) => {
  res.status(500).json({
    ok: false,
    error,
  });
};

export const getAllExercises = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const exercises = await Exercise.find({});

    res.json({
      ok: true,
      exercises,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const createExercise = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, name, isPublic } = req.body;

  try {
    const exercise = new Exercise({
      name,
      userId: userId,
      isPublic,
    });

    await exercise.save();

    res.status(201).json({
      ok: true,
      uid: exercise.id,
      name: exercise.name,
      userId: exercise.userId,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateExercise = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, isPublic } = req.body;
  const { id } = req.params;

  try {
    const exercise = await Exercise.findOneAndUpdate(
      { _id: id },
      { name, isPublic }
    );
    console.log(exercise);

    res.status(201).json({
      ok: true,
      msg: 'Se ha actualizado correctamente',
    });
  } catch (error) {
    handleError(res, error);
  }
};
