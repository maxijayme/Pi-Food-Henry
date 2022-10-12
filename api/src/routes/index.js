const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesMiddleware = require('./recipes.js');
const dietsMiddleware  = require('./diets.js')



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes',recipesMiddleware);
router.use('/diets',dietsMiddleware);


module.exports = router;
