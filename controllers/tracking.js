import TrackingEvent from "../models/TrackingEvent.js";

export const createTrackingEvent = async (req, res) => {
  try {
    const {
      productId,
      supplierToken,
      eventType,
      buyerId,
      buyerInfo,
      source,
    } = req.body;

    if (!productId || !supplierToken || !eventType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    




    // Get IP Address
    const ipAddress =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress;

    // Get User Agent
    const userAgent = req.headers["user-agent"];

    // Save Event
    const trackingEvent = new TrackingEvent({
      productId,
      supplierToken,
      eventType,
      buyerId: buyerId || null,
      buyerInfo: buyerInfo || {},

      ipAddress,
      userAgent,

      source: source || "dir",
    });

    await trackingEvent.save();

    return res.status(201).json({
      success: true,
      message: "Tracking event saved",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getTrackingBySupplier = async (req, res) => {
  try {
    const { supplierToken } = req.params;
    const { filter } = req.query;

    let startDate = new Date();

    // FILTER LOGIC
    switch (filter) {
      case "today":
        startDate.setHours(0, 0, 0, 0);
        break;

      case "yesterday":
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);

        var endDate = new Date();
        endDate.setHours(0, 0, 0, 0);
        break;

      case "7days":
        startDate.setDate(startDate.getDate() - 7);
        break;

      case "30days":
        startDate.setDate(startDate.getDate() - 30);
        break;

      case "all":
      default:
        startDate = null;
        break;
    }

    let query = {
      supplierToken,
    };

    // Date filtering
    if (filter === "yesterday") {
      query.createdAt = {
        $gte: startDate,
        $lt: endDate,
      };
    } else if (startDate) {
      query.createdAt = {
        $gte: startDate,
      };
    }

    const events = await TrackingEvent.find(query)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};