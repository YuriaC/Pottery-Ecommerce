function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 9; // Default to 9 items per page
        const startIdx = (page - 1) * limit;
        const endIdx = page * limit;

        const results = {};

        if (endIdx < await model.countDocuments().exec()) {
            results.next = {
                page: page +  1,
                limit: limit
            };
        }

        if (startIdx > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }

        try {
            results.results = await model.find().limit(limit).skip(startIdx).exec();            
            res.paginatedResults = results;
            // res.status(200).json({ data: results});
            next();
        } catch (e) {
            return res.status(500).json({message: `ERROR: ${e}.`});
        }        
    }
};

export default paginatedResults;