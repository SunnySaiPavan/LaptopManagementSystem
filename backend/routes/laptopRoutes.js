const express = require('express');
const { addLaptop, getLaptops, updateLaptop, deleteLaptop } = require('../controllers/laptopController');

const router = express.Router();

router.post('/laptops', addLaptop);
router.get('/laptops', getLaptops);
router.put('/laptops/:id', updateLaptop);
router.delete('/laptops/:id', deleteLaptop);

module.exports = router;
