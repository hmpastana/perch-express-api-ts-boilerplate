import express from 'express';
import Task from '../database/models/task.model';

const router = express.Router();

// GET /tasks
router.get('/', async (_req, res) => {
  try {
    const tasks = await Task.findAll();

    res.json({
      data: tasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// POST /tasks
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: 'Title and description are required',
      });
    }

    const task = await Task.create({
      title,
      description,
      completed: false,
    });

    res.status(201).json({
      data: task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// PATCH /tasks/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== 'boolean') {
      return res.status(400).json({
        message: 'Completed must be a boolean',
      });
    }

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    task.completed = completed;
    await task.save();

    res.json({
      data: task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    await task.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

export default router;
