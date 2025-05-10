const csvToDbModel = require('../models/csvToDB');


exports.renderBackendHome = (req, res) => {
    res.send("Kelp CSV Reader Backend !!");
}


exports.loadCsvController = async (req, res) => {
    try {
        const csvdata = await csvToDbModel.loadCsvDataTODB();
        // console.log("CSVdata: ", csvdata);
        
        res.status(200).json({message: 'CSV Data loaded to DB', csvdata});
    }
    catch(error) {
        res.status(500).json({ error: 'Error loading data!', details: error.message});
    }
}