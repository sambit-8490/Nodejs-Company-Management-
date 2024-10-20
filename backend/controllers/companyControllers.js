const Company = require('../models/Company');
const Counter = require('../models/Counter'); // For auto-increment logic

const getNextCompanyId = async () => {
    try {
        // Find the company with the highest companyID
        const lastCompany = await Company.findOne().sort({ companyID: -1 }).exec();

        // If lastCompany exists and has a valid number for companyID, return the next ID
        if (lastCompany && !isNaN(lastCompany.companyID)) {
            return Number(lastCompany.companyID) + 1;
        }

        // If no company found or invalid companyID, start from 1
        return 1;
    } catch (error) {
        console.error('Error fetching last company:', error);
        throw new Error('Failed to generate next company ID');
    }
};


exports.createCompany = async (req, res) => {
    console.log("Company creating.....");
    console.log("Request Body:"+req.body);
    
    try {
        const { companyName, address,created_by, status } = req.body;
        // console.log(req.body);
        // console.log(companyName, address);
        
        const companyID = await getNextCompanyId(); // Auto-increment logic
        console.log("Company ID: ",companyID);
        
        const company = await new Company({
            companyID,
            companyName,
            address,
            created_by, 
            status
        });

        await company.save();
        await  res.status(201).json(company);
    } catch (error) {
        console.log(error); // Log the error to debug
        res.status(500).json({ message: 'Server error' });
    }
};

// Search companies by companyID, companyName, or created_by
exports.searchCompanies = async (req, res) => {
    // console.log("inside searchCompanies");
    
    // console.log("Request Search : ",req.query);
    const { search, page = 1, limit = 10 } = req.query;
    let query = {};

    // Check if searchQuery is a number (companyID) or a string (companyName/created_by)
    if (search) {
        const isNumber = /^\d+$/.test(search);
        if (isNumber) {
            query.companyID = parseInt(search, 10);
        } else {
            query.$or = [
                { companyName: { $regex: search, $options: 'i' } },  // Case-insensitive search
                { created_by: { $regex: search, $options: 'i' } }
            ];
        }
    }

    try {
        const companies = await Company.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalCompanies = await Company.countDocuments(query);

        res.status(200).json({
            companies,
            totalPages: Math.ceil(totalCompanies / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCompanies = async (req, res) => {
    console.log("inside get companies",req.params.username);

    try {
        let query = await { created_by: req.params.username}; // Default filter for normal user
       await console.log(query);
        
        if (req.user.role === 'admin') {
            query = {}; // Admin can see all companies
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const totalCompanies = await Company.countDocuments(query); // Count total companies
        const companies = await Company.find(query)
        await console.log(companies);
        
        return res.status(200).json({companies});
    } catch (error) {
        return res.status(500).json({ message: "Error fetching companies", error });
    }
};



exports.updateCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        if (req.user.role === 'admin' || company.created_by.toString() === req.user.id) {
            company.companyName = req.body.companyName || company.companyName;
            company.address = req.body.address || company.address;
            await company.save();
            return res.status(200).json({ message: "Company updated", company });
        }

        return res.status(403).json({ message: "Unauthorized to edit this company" });
    } catch (error) {
        return res.status(500).json({ message: "Error updating company", error });
    }
};

exports.approveCompany = async (req, res) => {
    console.log("inside approves");
    
    console.log("Approve data ",req.params.companyId);
    
    try {
        const company = await Company.findById(req.params.companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        company.status = 'approved';
        await company.save();
        return res.status(200).json({ message: "Company approved", company });
    } catch (error) {
        return res.status(500).json({ message: "Error approving company", error });
    }
};

exports.deleteCompany = async (req, res) => {
    console.log("inside Delete");
    
    // Access companyId directly from req.params
    const companyId = req.params.companyId; 
    try {
        // Attempt to find and delete the company by ID
        const deletedCompany = await Company.findByIdAndDelete(companyId);
        
        // Check if the company was found and deleted
        if (!deletedCompany) {
            return res.status(404).json({ message: 'Company not found.' });
        }
        
        console.log("Deleted company:", deletedCompany); // Log the deleted company for verification
        res.status(200).json({ message: 'Company deleted successfully.' });
    } catch (error) {
        console.error("Error deleting company:", error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting company.' });
    }
};

exports.findCompanyById = async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };