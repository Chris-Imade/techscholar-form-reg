const Record = require("../schemas/Record");

const addRecord = async (req, res) => {
  try {
    const recordBody = req.body;

    const newRecord = new Record(recordBody);

    const savedRecord = await newRecord.save();

    res.status(201).json({
      message: "Record added successfully",
      data: savedRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding record",
      error: error.message,
    });
  }
};

module.exports = addRecord;
