import mongoose from "mongoose";

const trackingEventSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
    },

    supplierToken: {
      type: String,
      required: true,
    },

    eventType: {
      type: String,
      required: true,
      enum: [
        "whatsapp_click",
        "inquiry_open",
        "inquiry_submit",
        "product_view",
        "call_click",
      ],
    },

    buyerId: {
      type: String,
      default: null,
    },

    buyerInfo: {
      name: String,
      phone: String,
      email: String,
    },

    ipAddress: {
      type: String,
    },

    userAgent: {
      type: String,
    },

    source: {
      type: String,
      default: "dir",
    },
  },
  { timestamps: true }
);

const TrackingEvent = mongoose.model(
  "TrackingEvent",
  trackingEventSchema
);

export default TrackingEvent;