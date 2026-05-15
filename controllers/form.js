import Form from "../models/Form.js";
import sendWelcomeEmail from "../utils/nodeMail.js";

export const createForm = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const {
      supplierToken,
      platform,
      platformEmail,
      name,
      phone,
      email,
      product,
      place,
      priceRange,
      message,
    } = req.body;

    if (!platform || !name || !phone || !email || !place || !platformEmail) {
      return res.status(400).json({
        message: "Please fill all required fields",
        success: false,
      });
    }

    const newForm = new Form({
      supplierToken,
      platform,
      platformEmail,
      name,
      phone,
      email,
      product,
      place,
      priceRange,
      message,
    });

    await newForm.save();

    console.log("SAVED DATA:", newForm.toObject()); // 🔥 STEP 2

    // ✅ IMPORTANT: convert to plain object
    await sendWelcomeEmail(newForm.toObject());

    console.log("EMAIL DATA SENT:", newForm.toObject()); // 🔥 STEP 3

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: newForm,
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      message: "Error while creating the form",
      success: false,
    });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findByIdAndDelete(id);

    if (!form) {
      return res.status(404).json({
        message: "Form not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Form deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while deleting the form",
      success: false,
    });
  }
};

export const getLastForm = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 }).limit(30);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved the last 30 forms.",
      data: forms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while retrieving forms",
      success: false,
    });
  }
};

export const getFormBySupplierToken = async (req, res) => {
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

    // DATE FILTER
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

    const forms = await Form.find(query)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Successfully retrieved supplier forms.",
      count: forms.length,
      data: forms,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error while retrieving forms",
      success: false,
    });
  }
};