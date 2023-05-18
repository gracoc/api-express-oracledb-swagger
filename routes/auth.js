const { Router } = require('express');
const { loginUser } = require('../controllers/auth');
const { validToken } = require('../middelwares/tokenValidator');
const { validateLogin } =  require('../validators/vAuth')
const tryCatch = require("../util/tryCatch");

const router = Router();

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - auth
 *     summary: Autenticación de usuarios
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - usuario
 *              - password
 *            properties:
 *              usuario:
 *                type: string
 *                default: user
 *              password:
 *                type: string
 *                default: pass
 *     responses:
 *      200:
 *        description: Ok
 *      500:
 *        description: Error interno
 */
router.post('/login', [validateLogin] , tryCatch(loginUser));


// Ejm. uso del middelware validToken
//router.get('/', [validToken, validateLogin] , tryCatch(loginUser));

module.exports = router;