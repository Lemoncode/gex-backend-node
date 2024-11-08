import { Router } from 'express';
import { userRepository } from '#dals/user/user.repository.js';
import { mapUserListFromModelToApi } from './user.mappers.js';

export const userApi = Router();

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Retrieves a list of users
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A paginated list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: './user.schema.ts'
 */

userApi.get('/', async (req, res, next) => {
  try {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);
    const userList = await userRepository.getUserList(page, pageSize);

    res.send(mapUserListFromModelToApi(userList));
  } catch (error) {
    next(error);
  }
});
