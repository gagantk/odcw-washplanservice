const express = require('express');
const router = express.Router();
const auth = require('../middleware/check-auth');

const washPlanController = require('../controllers/washplan');

router.use(auth);

router.post('/add', washPlanController.addWashPlan);

router.get('/', washPlanController.getWashPlans);

router.get('/:wid', washPlanController.getWashPlanById);

router.patch('/:wid', washPlanController.updateWashPlan);

router.delete('/:wid', washPlanController.deleteWashPlan);

module.exports = router;
