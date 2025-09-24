const express = require('express');
const router = express.Router();
const hazardController = require('../controller/hazardController');
const upload = require('../middleware/uploadtoSpace');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect,upload.array('photos', 2), hazardController.createHazard);

router.get('/', hazardController.getHazards);
router.get('/:id', hazardController.getHazardById);


router.put('/:id', hazardController.updateHazard);
router.put('/:id/approve', hazardController.approveHazard);
router.put('/:id/reject', hazardController.rejectHazard);
router.delete('/:id', hazardController.deleteHazard);

router.get('/user/:userId', hazardController.getHazardsByUser);

module.exports = router;