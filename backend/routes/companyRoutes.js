
const express = require('express');
const { createCompany, getCompanies, searchCompanies, updateCompany, deleteCompany, approveCompany, findCompanyById } = require('../controllers/companyControllers');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
console.log("testing,,,,");

router.post('/', authMiddleware, createCompany);
router.get('/', authMiddleware, getCompanies);
router.get('/companies',authMiddleware, searchCompanies);           // Search companies
router.get('/user/:username',authMiddleware, getCompanies);       
router.get('/:id', authMiddleware, findCompanyById);
router.patch('/:companyId',authMiddleware, updateCompany);  // Update company details
router.delete('/:companyId',authMiddleware, deleteCompany); // Delete company
router.patch('/:companyId/approve',authMiddleware, approveCompany); // Approve company

module.exports = router;
