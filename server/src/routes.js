const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const DietsController = require('./controllers/DietsController')
const ProduktsController = require('./controllers/ProduktsController')
const AddingProduktsController = require('./controllers/AddingProduktsController')
const TrainingsController = require('./controllers/TrainingsController')
const TrainingBookmarksController = require('./controllers/TrainingBookmarksController')
const TrainingHistoriesController = require('./controllers/TrainingHistoriesController')
const DietBookmarksController = require('./controllers/DietBookmarksController')
const ProduktBookmarksController = require('./controllers/ProduktBookmarksController')
const DietHistoriesController = require('./controllers/DietHistoriesController')

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login) // login kontroler, który przywoluje autentykację
  app.get('/produkts',
    ProduktsController.index)
  app.get('/produkts/:produktId',
    ProduktsController.show)
  app.put('/produkts/:produktId',
    ProduktsController.put)
  app.post('/produkts',
    ProduktsController.post)
  app.delete('/produkts/:produktId',
    ProduktsController.remove)
  app.get('/trainings',
    TrainingsController.index)
  app.get('/trainings/:trainingId',
    TrainingsController.show)
  app.put('/trainings/:trainingId',
    TrainingsController.put)
  app.post('/trainings',
    TrainingsController.post)
  app.delete('/trainings/:trainingId',
    TrainingsController.remove)
  app.delete('/diets/:dietId',
    DietsController.remove)
  app.get('/diets',
    DietsController.index)
  app.get('/diets/:dietId',
    DietsController.show)
  app.put('/diets/:dietId',
    DietsController.put)
  app.post('/diets',
    DietsController.post)
  app.get('/trainingbookmarks',
    isAuthenticated,
    TrainingBookmarksController.index)
  app.post('/trainingbookmarks',
    isAuthenticated,
    TrainingBookmarksController.post)
  app.delete('/trainingbookmarks/:trainingbookmarkId',
    isAuthenticated,
    TrainingBookmarksController.remove)
  app.get('/traininghistories',
    isAuthenticated,
    TrainingHistoriesController.index)
  app.post('/traininghistories',
    isAuthenticated,
    TrainingHistoriesController.post)
  app.delete('/traininghistories/:traininghistorieId',
    isAuthenticated,
    TrainingHistoriesController.remove)
  app.get('/dietbookmarks',
    isAuthenticated,
    DietBookmarksController.index)
  app.post('/dietbookmarks',
    isAuthenticated,
    DietBookmarksController.post)
  app.delete('/dietbookmarks/:dietbookmarkId',
    isAuthenticated,
    DietBookmarksController.remove)
  app.get('/produktbookmarks',
    isAuthenticated,
    ProduktBookmarksController.index)
  app.post('/produktbookmarks',
    isAuthenticated,
    ProduktBookmarksController.post)
  app.delete('/produktbookmarks/:produktbookmarkId',
    isAuthenticated,
    ProduktBookmarksController.remove)
  app.get('/diethistories',
    isAuthenticated,
    DietHistoriesController.index)
  app.post('/diethistories',
    isAuthenticated,
    DietHistoriesController.post)
  app.get('/addingprodukts',
    AddingProduktsController.index)
  app.get('/addingprodukts/:addingproduktId',
    AddingProduktsController.show)
  app.put('/addingprodukts/:addingproduktId',
    AddingProduktsController.put)
  app.post('/addingprodukts',
    AddingProduktsController.post)
  app.delete('/addingprodukts/:addingproduktId',
    AddingProduktsController.remove)
}
