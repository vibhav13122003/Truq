const express = require('express');
const router = express.Router();
const hazardController = require('../controller/hazardController');

// Middleware (example: check authentication & admin)
const { protect, isAdmin } = require('../middleware/authMiddleware');


router.post('/', protect, hazardController.createHazard);


router.get('/', protect, hazardController.getHazards);

router.get('/:id', protect, hazardController.getHazardById);

router.put('/:id', protect, hazardController.updateHazard);

router.delete('/:id', protect, hazardController.deleteHazard);

// Approve hazard (admin only)
router.put('/:id/approve', protect, hazardController.approveHazard);

module.exports = router;
