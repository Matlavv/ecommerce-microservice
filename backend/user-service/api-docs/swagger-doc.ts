/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 default: 'John'
 *               lastname:
 *                 type: string
 *                 default: 'Doe'
 *               email:
 *                 type: string
 *                 default: 'johndoe@gmail.com'
 *               password:
 *                 type: string
 *                 default: 'password'
 *               address:
 *                 type: string
 *                 default: '123 Main Street'
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */