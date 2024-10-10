const VisitRecord = require("../schemas/VisitRecord");

const trackVisit = async (req, res, next) => {
  try {
    const deviceId = req.headers["user-agent"]; // You can use user-agent or any other identifier logic

    if (!deviceId) {
      return res.status(400).json({ message: "Device ID not found" });
    }

    let visitRecord = await VisitRecord.findOne({ deviceId });

    if (visitRecord) {
      visitRecord.visits += 1;
      await visitRecord.save();
    } else {
      visitRecord = new VisitRecord({ deviceId });
      await visitRecord.save();
    }

    next(); // Pass control to the next handler
  } catch (err) {
    next(err); // Pass any error to the error middleware
  }
};

module.exports = trackVisit;
