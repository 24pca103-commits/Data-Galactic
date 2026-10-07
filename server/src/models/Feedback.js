const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    clientType: {
      type: String,
      trim: true,
      default: 'Corporate Client',
      maxlength: [120, 'Client type cannot exceed 120 characters']
    },
    region: {
      type: String,
      trim: true,
      default: 'Global',
      maxlength: [80, 'Region cannot exceed 80 characters']
    },
    serviceType: {
      type: String,
      trim: true,
      default: 'B2B Data Services',
      maxlength: [120, 'Service type cannot exceed 120 characters']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    quote: {
      type: String,
      required: [true, 'Feedback quote is required'],
      trim: true,
      maxlength: [2000, 'Feedback cannot exceed 2000 characters']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [120, 'Email cannot exceed 120 characters']
    },
    company: {
      type: String,
      trim: true,
      maxlength: [120, 'Company cannot exceed 120 characters']
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['pending', 'published', 'rejected'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

// Fallback in-memory store initialized with default published testimonials
const feedbackMemoryStore = [
  {
    _id: 'fb-seed-1',
    name: 'Sarah Jenkins',
    clientType: 'International E-commerce Brand',
    region: 'United States',
    serviceType: 'Catalog Management & SKU Data Entry',
    rating: 5,
    quote: 'DataGalactic simplified our monthly catalog updating cycle. The turnaround was prompt, and the double-key verification caught discrepancies our internal team previously missed.',
    isPublished: true,
    status: 'published',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    _id: 'fb-seed-2',
    name: 'David Reynolds',
    clientType: 'Logistics & Supply Chain Firm',
    region: 'United Kingdom',
    serviceType: 'Invoice Processing & Document Conversion',
    rating: 5,
    quote: 'Handling thousands of monthly invoice extractions became seamless once we outsourced to DataGalactic. Clean spreadsheets delivered on schedule without supervision overhead.',
    isPublished: true,
    status: 'published',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    _id: 'fb-seed-3',
    name: 'Elena Rostova',
    clientType: 'Commercial Real Estate Agency',
    region: 'Europe',
    serviceType: 'Property Records & Lead Research',
    rating: 5,
    quote: 'The team adhered strictly to our data security SOPs and confidentiality guidelines. A reliable and responsive back-office partner for ongoing data maintenance.',
    isPublished: true,
    status: 'published',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    _id: 'fb-seed-4',
    name: 'Marcus Chen',
    clientType: 'Healthcare Technology Company',
    region: 'Canada',
    serviceType: 'Healthcare Data Entry & Compliance',
    rating: 5,
    quote: 'Exceptional accuracy and speed. DataGalactic handled our entire patient data migration with zero errors and maintained all compliance protocols throughout the project.',
    isPublished: true,
    status: 'published',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    _id: 'fb-seed-5',
    name: 'Olivia Martin',
    clientType: 'Retail & Consumer Goods Brand',
    region: 'Australia',
    serviceType: 'E-commerce Catalog & Data Entry',
    rating: 5,
    quote: "We scaled from 5,000 to 50,000 product listings in just two months. DataGalactic's team was professional, accurate, and incredibly responsive to our changing requirements.",
    isPublished: true,
    status: 'published',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
];

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

module.exports = {
  Feedback,
  feedbackMemoryStore
};
