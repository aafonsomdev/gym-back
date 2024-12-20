import { Request, Response } from 'express';
import Exercise from '../models/Exercise';

export const createExercise = async (req: Request, res: Response) => {
  const { userId, name } = req.body;

  try {
    const exercise = new Exercise({
      name,
      userId: userId,
    });

    await exercise.save();

    res.status(201).json({
      ok: true,
      uid: exercise.id,
      name: exercise.name,
      userId: exercise.userId,
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
