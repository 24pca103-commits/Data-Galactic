export const servicesData = {
  'data-entry': {
    id: 'data-entry',
    title: 'Data Entry Services',
    subtitle: 'High-speed, dual-verified data capture for online and offline records.',
    badge: '99.9% Accuracy SLA',
    iconName: 'FileSpreadsheet',
    overview: 'DataGalactic delivers enterprise-grade data entry outsourcing tailored for high-volume, mission-critical operations. We eliminate data backlogs with a dual-key verification protocol that guarantees 99.9% precision across complex forms, portals, and tabular files.',
    turnaround: '24-48 Hours SLA',
    accuracy: '99.9% Double-Key QA Verified',
    pricingHint: 'Starting from $5/hour or per-record custom batching',
    subServices: [
      {
        name: 'Online Data Entry',
        desc: 'Direct portal updates, CRM records, cloud database indexing, and ERP systems synchronization with zero lag.'
      },
      {
        name: 'Offline Data Entry',
        desc: 'Secure high-volume ingestion from physical forms, paper files, scanned sheets, and local spreadsheets without cloud exposure.'
      },
      {
        name: 'Excel & Tabular Data Entry',
        desc: 'Advanced spreadsheet population, mathematical audit formulas, complex cell alignment, and pivot table preparation.'
      },
      {
        name: 'Form & Survey Digitization',
        desc: 'Accurate digitizing of customer intake forms, warranty registrations, insurance claims, handwritten receipts, and survey tallies.'
      },
      {
        name: 'Directory & Database Indexing',
        desc: 'Structuring business directories, catalog registries, membership logs, and multi-tier categorized listings.'
      },
      {
        name: 'Invoice & Receipt Entry',
        desc: 'Extracting line-item quantities, SKU codes, tax rates, vendor credentials, and payment reconciliation amounts.'
      }
    ],
    workflow: [
      { step: '01', title: 'Data Ingestion & Schema Mapping', desc: 'We receive sample batches or templates and establish explicit validation rules and formatting standard.' },
      { step: '02', title: 'Dual-Key Independent Entry', desc: 'Two distinct operators enter data independently to catch typographical errors in real time.' },
      { step: '03', title: 'Automated Algorithmic Audit', desc: 'Our proprietary verification engine highlights discrepancies, missing mandatory values, or invalid formats.' },
      { step: '04', title: 'Senior Lead Review & Delivery', desc: 'QA leads review 100% of flags before delivering structured files via encrypted channels.' }
    ],
    faqs: [
      { q: 'How do you guarantee 99.9% accuracy?', a: 'We employ a dual-key entry protocol where two operators enter the same data, followed by programmatic checksums and manual QA inspection.' },
      { q: 'Can you work directly inside our CRM or portal?', a: 'Yes. Our trained operators can access your Salesforce, HubSpot, Zoho, SAP, or custom web portals via secure VPN/credentials.' },
      { q: 'Do you offer a free sample or pilot test?', a: 'Yes! We process a trial batch of 50-100 records free of charge so you can verify our precision before signing.' }
    ]
  },
  'data-processing': {
    id: 'data-processing',
    title: 'Data Processing & Cleansing',
    subtitle: 'Transform messy unorganized datasets into structured, analytics-ready formats.',
    badge: 'Same-Day Batch Turnaround',
    iconName: 'Filter',
    overview: 'Raw business data is often fragmented, duplicated, and riddled with formatting inconsistencies. DataGalactic cleanses, standardizes, enriches, and structures your datasets so your BI dashboards and machine learning pipelines run on pristine inputs.',
    turnaround: 'Same-Day / 24 Hours Batch Delivery',
    accuracy: '100% Quality Audited & Deduplicated',
    pricingHint: 'Volume-based tiered pricing with custom batch discounts',
    subServices: [
      {
        name: 'Data Cleansing & Deduplication',
        desc: 'Detecting and removing duplicate records, syntax anomalies, corrupted values, and obsolete entries across large databases.'
      },
      {
        name: 'Data Verification & Enrichment',
        desc: 'Cross-checking contact, postal, and company information against authoritative registries and public corporate databases.'
      },
      {
        name: 'Format Normalization',
        desc: 'Standardizing international phone formats (E.164), date conventions (ISO 8601), currencies, and metric/imperial units.'
      },
      {
        name: 'Hierarchical Sorting & Tagging',
        desc: 'Classifying unstructured data into logical categories, nested tags, priority tiers, and searchable taxonomy.'
      },
      {
        name: 'Missing Value Imputation',
        desc: 'Systematically resolving null or missing records through rule-based cross-referencing and contextual research.'
      },
      {
        name: 'Data Aggregation & Merging',
        desc: 'Combining siloed spreadsheets and disparate exports into unified master records ready for SQL/NoSQL ingestion.'
      }
    ],
    workflow: [
      { step: '01', title: 'Dataset Diagnostics', desc: 'We inspect null rates, outlier frequencies, syntax errors, and duplicate clusters across your file.' },
      { step: '02', title: 'Custom Cleansing Rules', desc: 'Writing custom transformation regexes and normalization scripts tailored to your schema.' },
      { step: '03', title: 'Human-in-the-Loop Verification', desc: 'Manual review of ambiguous edge cases to prevent false deduplication or data destruction.' },
      { step: '04', title: 'Pristine Export & Audit Trail', desc: 'Delivery of clean master datasets alongside change logs detailing every alteration.' }
    ],
    faqs: [
      { q: 'What file formats can you process?', a: 'CSV, Excel (XLS/XLSX), JSON, XML, SQL dumps, Parquet, and proprietary database formats.' },
      { q: 'Will my original dataset be preserved?', a: 'Always. We never modify original files; we provide clean deliverables and full change logs.' },
      { q: 'Can you handle datasets with millions of rows?', a: 'Yes, our processing pipeline handles high-throughput datasets with automated chunking.' }
    ]
  },
  'data-conversion': {
    id: 'data-conversion',
    title: 'Data Conversion (PDF / OCR / Excel)',
    subtitle: 'Seamlessly convert complex documents between legacy formats and structured databases.',
    badge: 'Pixel-to-Text Precision',
    iconName: 'FileCode',
    overview: 'Unlock unstructured data trapped inside scanned PDFs, contracts, invoices, and image files. DataGalactic pairs advanced Optical Character Recognition (OCR) with human proofreading to output clean, formula-intact Excel, JSON, and Word documents.',
    turnaround: 'Rapid 12-24 Hours Delivery',
    accuracy: '100% Typography & Formula Preserved',
    pricingHint: 'Per-page or per-document cost models',
    subServices: [
      {
        name: 'Scanned PDF to Excel',
        desc: 'Extracting financial statements, tables, and ledgers into clean spreadsheets with reconstructed formulas.'
      },
      {
        name: 'PDF to Word Conversion',
        desc: 'Full typography preservation, margin alignment, header/footer recreation, and fully editable styling.'
      },
      {
        name: 'AI-OCR + Human Proofreading',
        desc: 'High-speed optical character recognition with manual review of faint stamps, handwriting, and degraded documents.'
      },
      {
        name: 'Image to Text Extraction',
        desc: 'Converting JPG, PNG, TIFF, and camera captures into searchable TXT, Word, or structured CSV records.'
      },
      {
        name: 'XML / JSON / Database Bridging',
        desc: 'Converting static documents into structured schemas formatted for direct API or database importation.'
      },
      {
        name: 'Book & E-Publication Conversion',
        desc: 'Reflowing physical book scans into EPUB, MOBI, Kindle, and accessible digital archives.'
      }
    ],
    workflow: [
      { step: '01', title: 'Document Pre-Processing', desc: 'De-skewing, binarization, noise removal, and contrast enhancement of raw scanned images.' },
      { step: '02', title: 'Deep OCR Extraction', desc: 'Running multi-engine neural OCR to identify text regions, tables, and bounding boxes.' },
      { step: '03', title: 'Human Proofreader Review', desc: 'Domain specialists verify complex numbers, currency symbols, and technical jargon.' },
      { step: '04', title: 'Format Delivery', desc: 'Structured outputs delivered in your required spreadsheet, document, or code format.' }
    ],
    faqs: [
      { q: 'Can you convert handwritten documents?', a: 'Yes, our human-assisted OCR team specializes in transcribing handwritten notes, forms, and historical documents.' },
      { q: 'Are Excel formulas preserved when converting tables?', a: 'Yes, our data analysts reconstruct mathematical sum formulas and totals so the spreadsheet remains dynamic.' }
    ]
  },
  'web-research': {
    id: 'web-research',
    title: 'Web Research & Intelligence',
    subtitle: 'Targeted market intelligence, verified lead generation, and competitive data aggregation.',
    badge: '100% Verified Contacts',
    iconName: 'Search',
    overview: 'Empower your sales, marketing, and strategy teams with fresh, human-verified web intelligence. We research industry competitors, extract decision-maker contacts, track pricing, and compile high-intent prospect databases.',
    turnaround: 'Tailored Daily or Weekly Feeds',
    accuracy: '100% Validated Leads & Direct Emails',
    pricingHint: 'Per-lead or dedicated researcher monthly retainers',
    subServices: [
      {
        name: 'Verified Lead Generation & Prospecting',
        desc: 'Mining LinkedIn Sales Navigator, corporate registers, and industry portals for verified C-level and director contacts.'
      },
      {
        name: 'Competitor Price & SKU Tracking',
        desc: 'Systematic monitoring of rival pricing, discount cycles, promotional catalogs, and inventory availability.'
      },
      {
        name: 'Market Landscape & Industry Research',
        desc: 'Aggregating market trends, regulatory filings, investment funding rounds, and emerging vendor profiles.'
      },
      {
        name: 'Contact & Email Verification',
        desc: 'SMTP pinging, domain verification, and direct check to guarantee zero bounce rates on outbound campaigns.'
      },
      {
        name: 'Real Estate & Property Research',
        desc: 'Extracting zoning regulations, deed histories, parcel IDs, and public registry ownership details.'
      },
      {
        name: 'Supplier & Vendor Sourcing',
        desc: 'Identifying global manufacturing partners, MOQ terms, compliance certificates, and procurement points.'
      }
    ],
    workflow: [
      { step: '01', title: 'Ideal Customer Profile (ICP) Alignment', desc: 'Defining exact geography, industry verticals, company size, and executive titles.' },
      { step: '02', title: 'Manual Web Deep Dive', desc: 'Experienced researchers comb official websites, registries, and professional networks.' },
      { step: '03', title: 'Live Verification Protocol', desc: 'Every email and phone is validated with live pinging and validation tools.' },
      { step: '04', title: 'CRM-Ready Delivery', desc: 'Data formatted for direct import into HubSpot, Salesforce, Outreach, or Apollo.' }
    ],
    faqs: [
      { q: 'What is your email bounce rate guarantee?', a: 'We guarantee a bounce rate under 3% because every single email address is manually and programmatically verified.' },
      { q: 'Do you comply with GDPR and CAN-SPAM regulations?', a: 'Yes. We only gather publicly accessible professional business contact information in full compliance with legal standards.' }
    ]
  },
  'ecommerce-data': {
    id: 'ecommerce-data',
    title: 'E-commerce Data Services',
    subtitle: 'End-to-end catalog population, product listings, and SKU inventory management.',
    badge: '99.8% Catalog Precision',
    iconName: 'ShoppingCart',
    overview: 'Scale your online store effortlessly without operational bottlenecks. DataGalactic manages multi-channel catalog creation, product descriptions, SKU attributes, image tagging, and inventory updates across Amazon, Shopify, eBay, and Walmart.',
    turnaround: 'High-Volume Rapid SKU Updates',
    accuracy: '99.8% Taxonomy & Attribute Precision',
    pricingHint: 'Per-SKU or dedicated catalog specialist retainers',
    subServices: [
      {
        name: 'Multi-Channel Product Listings',
        desc: 'Uploading and formatting listings across Shopify, Amazon Seller Central, eBay, Walmart, and Magento.'
      },
      {
        name: 'Catalog Management & Taxonomy',
        desc: 'Accurate category mapping, parent-child variation hierarchy, and marketplace compliance tagging.'
      },
      {
        name: 'Variant Attribute Mapping',
        desc: 'Meticulously entering sizes, colors, materials, weights, UPC/EAN barcodes, and manufacturer part numbers.'
      },
      {
        name: 'SEO Product Descriptions',
        desc: 'Crafting keyword-optimized bullet points, compelling feature descriptions, and rich product specifications.'
      },
      {
        name: 'Inventory & Price Synchronization',
        desc: 'Real-time stock level updates from supplier feeds, preventing out-of-stock cancellations.'
      },
      {
        name: 'Image Resizing & Asset Tagging',
        desc: 'Cropping product photography to marketplace specifications, background cleanup, and alt-tagging.'
      }
    ],
    workflow: [
      { step: '01', title: 'Feed & Asset Intake', desc: 'Receiving manufacturer spec sheets, distributor catalogs, and high-res imagery.' },
      { step: '02', title: 'Attribute Standardisation', desc: 'Formatting weights, dimensions, and descriptions to match platform taxonomy.' },
      { step: '03', title: 'Bulk Listing Upload', desc: 'Deploying optimized listings via flat files or direct store administration access.' },
      { step: '04', title: 'Live Store Audit', desc: 'Checking product pages live to ensure images, variants, and pricing display flawlessly.' }
    ],
    faqs: [
      { q: 'Which e-commerce platforms do you support?', a: 'Shopify, Amazon, WooCommerce, Magento (Adobe Commerce), BigCommerce, eBay, Etsy, and custom portals.' },
      { q: 'Can you write unique product descriptions?', a: 'Yes, our team can write unique, SEO-friendly descriptions based on manufacturer specs to avoid duplicate content penalties.' }
    ]
  },
  'back-office-support': {
    id: 'back-office-support',
    title: 'Back Office Support',
    subtitle: 'Reliable administrative, record maintenance, and operational back-office backbone.',
    badge: 'Enterprise SLA Guaranteed',
    iconName: 'Briefcase',
    overview: 'Focus on strategic business growth while DataGalactic handles your recurring operational, administrative, and data maintenance workloads. From email ticket triage to invoice reconciliation, our dedicated teams keep your business running smoothly.',
    turnaround: 'Daily Dedicated Operations',
    accuracy: 'Enterprise SLA & Complete Confidentiality',
    pricingHint: 'Dedicated full-time or part-time operations specialists',
    subServices: [
      {
        name: 'CRM & Database Hygiene',
        desc: 'Continuous contact refreshing, deal stage updates, duplicate merging, and stale record archival.'
      },
      {
        name: 'Digital Document & Archival Filing',
        desc: 'Indexing contracts, deeds, employee records, and invoices into searchable cloud folders.'
      },
      {
        name: 'Invoice & Billing Reconciliation',
        desc: 'Matching purchase orders with supplier invoices, cross-checking line items, and logging accounts payable.'
      },
      {
        name: 'Administrative Email & Ticket Triage',
        desc: 'Categorizing customer service inquiries, routing tickets to internal departments, and boilerplate responses.'
      },
      {
        name: 'HR & Employee Onboarding Data',
        desc: 'Digitizing employee applications, timesheet calculations, background verification logs, and compliance records.'
      },
      {
        name: 'Routine Operations Reporting',
        desc: 'Generating daily and weekly executive summaries, sales performance spreadsheets, and KPI dashboards.'
      }
    ],
    workflow: [
      { step: '01', title: 'Standard Operating Procedure (SOP) Setup', desc: 'We document your exact workflows, communication protocols, and escalation rules.' },
      { step: '02', title: 'Dedicated Team Onboarding', desc: 'Vetted specialists are assigned and trained specifically on your company software.' },
      { step: '03', title: 'Daily Execution & Shift Reporting', desc: 'Seamless task handling with daily productivity reports and milestone tracking.' },
      { step: '04', title: 'Continuous Process Optimization', desc: 'Periodic audits to speed up turnaround and reduce recurring overhead.' }
    ],
    faqs: [
      { q: 'Can we hire a full-time dedicated specialist?', a: 'Yes, we provide dedicated team members who work exclusively for your company during your preferred time zone.' },
      { q: 'How is data security managed for administrative work?', a: 'All staff work on restricted-access machines with 2FA, biometric facility security, and signed NDAs.' }
    ]
  }
};

export const industriesData = {
  'ecommerce': {
    id: 'ecommerce',
    name: 'E-commerce & Marketplaces',
    badge: 'Retail & Multi-channel',
    iconName: 'ShoppingBag',
    tagline: 'High-speed SKU population, inventory feeds, and multi-channel catalog syncing.',
    overview: 'In fast-paced e-commerce environments, delayed product listings mean lost revenue. DataGalactic helps retailers, direct-to-consumer brands, and marketplace aggregators maintain thousands of active SKUs with complete attribute precision and real-time inventory synchronization.',
    tasks: [
      'Shopify, Amazon & WooCommerce product uploads and catalog maintenance',
      'Variant attribute mapping (size, color, weight, MPN, UPC/EAN)',
      'Competitor price monitoring, scraper validation, and repricing feeds',
      'High-resolution image categorization, cropping, and alt-tag optimization',
      'Customer review moderation and feedback sentiment categorization'
    ],
    impact: 'Up to 3,000+ SKUs updated weekly with 99.9% catalog accuracy, reducing returns and boosting search visibility.',
    standards: ['Marketplace Compliance', 'ISO 9001 Quality', 'Strict Asset Confidentiality']
  },
  'healthcare': {
    id: 'healthcare',
    name: 'Healthcare & Medical Support',
    badge: 'Life Sciences & Clinics',
    iconName: 'HeartPulse',
    tagline: 'Accurate digitization of patient intake records, insurance claims, and clinical charts.',
    overview: 'Healthcare providers and medical billing companies rely on DataGalactic for error-free patient chart digitization, claims entry, and physician credentialing. We enforce stringent confidentiality to safeguard protected health information.',
    tasks: [
      'Medical insurance claim data entry, ICD-10 coding alignment, and verification',
      'Patient intake records digitization and manual OCR error correction',
      'Physician credentials and licensing registry maintenance',
      'Billing ledger formatting, hospital invoice reconciliation, and audit logs',
      'Clinical trial records aggregation and anonymized data entry'
    ],
    impact: '99.9% claim entry accuracy, minimizing insurance denials and accelerating hospital revenue cycle times.',
    standards: ['HIPAA-Compliant Mindset', 'Strict Non-Disclosure Agreements', 'Role-Based Access Control']
  },
  'real-estate': {
    id: 'real-estate',
    name: 'Real Estate & Property Portals',
    badge: 'Brokers & Portals',
    iconName: 'Building2',
    tagline: 'MLS listing management, property records extraction, and deeds data indexing.',
    overview: 'Keep your property listings fresh and your title archives organized. DataGalactic assists real estate agencies, mortgage lenders, and property platforms with high-volume MLS management and county deed extraction.',
    tasks: [
      'MLS, Zillow, and property portal listing creation with floorplans and photos',
      'Tax assessment records, mortgage deeds, and county lien document extraction',
      'Tenant lease application parsing, credit check data logging, and reference checks',
      'Broker contact prospecting, property owner research, and CRM data hygiene',
      'Commercial property appraisal data entry and rent roll standardization'
    ],
    impact: '50% faster listing turnarounds and comprehensive digital title indexing for swift property closings.',
    standards: ['Title Data Confidentiality', 'Dual-Check Deed QA', 'Secure Encrypted Transfer']
  },
  'finance': {
    id: 'finance',
    name: 'Banking & Financial Services',
    badge: 'FinTech & Accounting',
    iconName: 'BadgeDollarSign',
    tagline: 'Ledger reconciliation, KYC validation, loan application parsing, and statements digitizing.',
    overview: 'Financial institutions, FinTech startups, and accounting firms outsource repetitive ledger entry and compliance documentation to DataGalactic for guaranteed mathematical precision and confidentiality.',
    tasks: [
      'Bank statement PDF to Excel conversion with dynamic balance validation',
      'KYC (Know Your Customer) identity verification and document indexing',
      'Loan and mortgage application data extraction and income verification',
      'Accounts payable and receivable invoice reconciliation',
      'Expense receipt audit, tax ledger compilation, and fraud anomaly tagging'
    ],
    impact: 'Zero mathematical tolerance protocols ensuring 100% balanced books and compliant KYC audit logs.',
    standards: ['Bank-Grade Confidentiality', 'Zero Data Retention Option', 'End-to-End Encryption']
  },
  'logistics': {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    badge: 'Freight & Warehousing',
    iconName: 'Truck',
    tagline: 'Bill of Lading processing, freight invoice audits, customs filings, and inventory logs.',
    overview: 'Smooth international commerce depends on accurate transport documentation. DataGalactic processes shipping manifests, delivery receipts, and customs forms 24/7 to keep cargo moving without paperwork bottlenecks.',
    tasks: [
      'Bill of Lading (BoL) and airway bill digitization and entry',
      'Freight invoice auditing against agreed contracted carrier rate tables',
      'Proof of Delivery (PoD) indexing and barcode confirmation',
      'Customs declarations documentation, HS code categorization, and tariff checks',
      'Warehouse SKU inventory ledger syncing and shipment tracking updates'
    ],
    impact: 'Over 80% reduction in billing disputes and rapid 12-hour turnaround on international shipping manifests.',
    standards: ['Continuous Shift Coverage', 'Dual-Key Discrepancy Audits', 'Tier-1 Security']
  },
  'education': {
    id: 'education',
    name: 'Education & EdTech',
    badge: 'Universities & Learning',
    iconName: 'GraduationCap',
    tagline: 'Student admissions digitization, exam scoring logs, and academic transcript conversion.',
    overview: 'Educational institutions and EdTech platforms partner with DataGalactic to digitize physical academic archives, student records, accreditation documents, and online course question banks.',
    tasks: [
      'Student admission applications and enrollment form digitization',
      'Academic transcript conversion, grading scale harmonization, and credit logs',
      'Examination response sheet scoring entry and statistical tallying',
      'Alumni database updating, contact verification, and donor campaign logging',
      'Course catalog creation, syllabus structuring, and digital library indexing'
    ],
    impact: 'Flawless student record archival and instant digital searchability across decades of student histories.',
    standards: ['FERPA-Aligned Confidentiality', 'Clean Schema Formatting', 'Encrypted Archival']
  }
};
