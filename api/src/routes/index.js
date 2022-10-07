const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesMiddleware = require('./recipes.js');
const dietsMiddleware  = require('./diets.js')
const dishesMiddleware  = require('./dishes.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes',recipesMiddleware);
router.use('/diets',dietsMiddleware);
router.use('/dishes',dishesMiddleware);

module.exports = router;
