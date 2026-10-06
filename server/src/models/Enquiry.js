const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [120, 'Company name cannot exceed 120 characters']
    },
    email: {
      type: String,
      required: [true, 'Business email is required'],
      trim: true,
      lowercase: true,
      maxlength: [120, 'Email cannot exceed 120 characters']
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
      maxlength: [80, 'Country cannot exceed 80 characters']
    },
    service: {
      type: String,
      required: [true, 'Service required must be selected'],
      trim: true,
      maxlength: [100, 'Service name too long']
    },
    projectType: {
      type: String,
      required: [true, 'Project type is required'],
      enum: ['One-time Project', 'Ongoing / Dedicated Team', 'Trial / Pilot Project', 'Custom Consultation'],
      default: 'One-time Project'
    },
    estimatedVolume: {
      type: String,
      trim: true,
      default: 'Not specified'
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [3000, 'Description cannot exceed 3000 characters']
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [30, 'Phone cannot exceed 30 characters']
    },
    file: {
      originalName: String,
      storedName: String,
      mimeType: String,
      size: Number,
      path: String
    },
    status: {
      type: String,
      enum: ['New Lead', 'Under Review', 'Quote Sent', 'In Discussion', 'Closed'],
      default: 'New Lead'
    }
  },
  {
    timestamps: true
  }
);

// Fallback in-memory store if MongoDB is offline
const memoryStore = [];

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

module.exports = {
  Enquiry,
  memoryStore
};
