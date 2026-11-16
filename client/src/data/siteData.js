// DataGalactic - Master Data Repository
// Positioned as: Data Management, Business Research & Back-Office Outsourcing Partner

// ==========================================
// 1. SERVICES DATA (10 Services in 3 Categories)
// ==========================================
export const serviceCategories = [
  {
    id: 'data-management',
    name: 'Data Management & Processing',
    description: 'High-accuracy data entry, cleansing, verification, and database architecture for enterprise operations.',
    serviceIds: ['data-entry', 'data-cleaning', 'data-extraction', 'database-building', 'data-validation']
  },
  {
    id: 'business-research',
    name: 'Business Research & Lead Generation',
    description: 'Actionable B2B prospect intelligence, comprehensive web research, and structured market analytics.',
    serviceIds: ['b2b-lead-generation', 'web-research', 'market-research']
  },
  {
    id: 'operations-support',
    name: 'Business Operations Support',
    description: 'Scalable CRM maintenance, legacy document digitization, and dependable ongoing back-office staffing.',
    serviceIds: ['crm-product-data', 'document-digitization', 'back-office-support']
  }
];

export const servicesData = {
  // --- Category 1: Data Management & Processing ---
  'data-entry': {
    id: 'data-entry',
    categoryId: 'data-management',
    categoryName: 'Data Management & Processing',
    title: 'Data Entry Services',
    subtitle: 'High-accuracy online and offline data entry with multi-stage verification protocols.',
    badge: 'Accuracy-Focused Entry',
    iconName: 'FileSpreadsheet',
    turnaround: '24-48 Hours Batch Turnaround',
    accuracy: 'Multi-Stage Human Verification',
    overview: 'DataGalactic provides dependable data entry outsourcing designed for growing businesses, accounting departments, and high-volume operations. We eliminate data backlogs by capturing records from scanned forms, spreadsheets, PDFs, and internal software into your target systems with strict adherence to formatting standards.',
    businessProblems: [
      'Costly in-house administrative hours wasted on repetitive manual typing',
      'Mounting operational backlogs delaying customer onboarding and billing cycles',
      'Frequent typographical errors in business databases causing downstream reporting issues',
      'Inflexible internal staffing during seasonal workload surges and audits'
    ],
    keyTasks: [
      'Online database indexing, portal entry, and cloud ERP record creation',
      'Offline data capture from physical documents, survey tallies, and scanned records',
      'Tabular Excel data entry with structured formula audits and pivot-ready alignment',
      'Customer intake form processing, warranty registrations, and survey transcription',
      'Invoice, purchase order, and receipt ledger entry with line-item reconciliation',
      'Directory transcription, catalog population, and member registry updates'
    ],
    suitableIndustries: [
      'E-commerce & Retail',
      'Logistics & Supply Chain',
      'Healthcare Organisations',
      'Financial Services',
      'Real Estate Companies',
      'Recruitment Agencies'
    ],
    workflow: [
      { step: '01', title: 'Data Ingestion & Mapping', desc: 'We review sample files, define validation rules, and establish standard operating formatting rules.' },
      { step: '02', title: 'Specialist Entry', desc: 'Trained data associates enter records according to approved guidelines and custom taxonomies.' },
      { step: '03', title: 'Multi-Stage Verification', desc: 'Lead operators verify entries character-by-character to eliminate typographical mistakes.' },
      { step: '04', title: 'Secure Delivery', desc: 'Pristine datasets are delivered in your requested format via encrypted transfer channels.' }
    ],
    faqs: [
      { q: 'Can you work directly inside our internal web portal or CRM?', a: 'Yes. Our operators can access your Salesforce, HubSpot, Zoho, SAP, or proprietary software through secure credentials and VPN connections.' },
      { q: 'Do you offer a small pilot or sample test before committing?', a: 'Yes. We encourage a trial batch (typically 50-100 records) so you can evaluate our accuracy and communication before signing a wider agreement.' },
      { q: 'What measures protect our data during entry?', a: 'All staff work under strict non-disclosure agreements with restricted workstation access and encrypted transfer protocols.' }
    ]
  },

  'data-cleaning': {
    id: 'data-cleaning',
    categoryId: 'data-management',
    categoryName: 'Data Management & Processing',
    title: 'Data Cleaning & Formatting',
    subtitle: 'Standardize messy, duplicate, and fragmented datasets into pristine, analytics-ready formats.',
    badge: 'Standardized Hygiene',
    iconName: 'Filter',
    turnaround: 'Same-Day / 24-48h Delivery',
    accuracy: '100% Quality Audited & Deduplicated',
    overview: 'Raw business data is frequently inconsistent, obsolete, and filled with duplicates. DataGalactic cleanses, deduplicates, standardizes, and enriches your spreadsheets and customer databases so your reporting tools, analytics dashboards, and CRM systems operate on clean, dependable information.',
    businessProblems: [
      'Duplicate customer and product records causing bloated software costs and outreach blunders',
      'Inconsistent formatting across international phone numbers, addresses, and currencies',
      'Orphaned records, missing mandatory fields, and broken syntax disrupting business pipelines',
      'Unstructured spreadsheets that cannot be loaded cleanly into modern BI software'
    ],
    keyTasks: [
      'Rule-based deduplication, fuzzy matching, and duplicate cluster consolidation',
      'Standardization of global telephone formats (E.164), mailing addresses, and dates (ISO 8601)',
      'Syntax validation, whitespace trimming, casing corrections, and special character sanitization',
      'Missing field identification, logical imputation, and postal code cross-referencing',
      'Classification, category tagging, and hierarchical grouping of product records',
      'Consolidation of disparate exports from multiple sources into a master schema'
    ],
    suitableIndustries: [
      'Digital Marketing Agencies',
      'IT & Software Companies',
      'B2B Lead Generation Agencies',
      'E-commerce Companies',
      'Small & Medium-Sized Businesses'
    ],
    workflow: [
      { step: '01', title: 'Dataset Audit', desc: 'We inspect null rates, outlier frequencies, syntax errors, and duplicate clusters across your file.' },
      { step: '02', title: 'Cleansing Framework', desc: 'We define custom transformation logic, regex rules, and schema normalization scripts.' },
      { step: '03', title: 'Human Verification', desc: 'Specialists manually inspect ambiguous edge cases to prevent false merges or data loss.' },
      { step: '04', title: 'Export & Change Log', desc: 'You receive the cleaned master file along with a detailed log of all modifications made.' }
    ],
    faqs: [
      { q: 'Will my original dataset remain intact?', a: 'Always. We preserve your raw source files and work on copies, delivering clean files alongside change documentation.' },
      { q: 'What file formats can you accept?', a: 'CSV, Excel (XLS/XLSX), JSON, XML, Google Sheets, and SQL database exports.' },
      { q: 'Can you handle datasets with hundreds of thousands of rows?', a: 'Yes. We utilize structured batch processing tools combined with manual sampling checks to handle high-volume datasets efficiently.' }
    ]
  },

  'data-extraction': {
    id: 'data-extraction',
    categoryId: 'data-management',
    categoryName: 'Data Management & Processing',
    title: 'Data Extraction',
    subtitle: 'Extract structured information from websites, digital directories, PDFs, and multi-source repositories.',
    badge: 'Structured Extraction',
    iconName: 'DatabaseZap',
    turnaround: 'Tailored to Dataset Scope',
    accuracy: 'Human-Checked Extractions',
    overview: 'Valuable commercial information is often locked inside public web portals, vendor directories, industry registries, and unstructured documents. DataGalactic combines intelligent tools with human verification to systematically extract, organize, and format vital business records into ready-to-use tabular formats.',
    businessProblems: [
      'Manual copy-pasting from web portals that drains staff hours and causes omissions',
      'Inaccessible data locked across disparate websites and government databases',
      'Scraped data that comes back messy, unstructured, and unusable without extensive cleaning',
      'Need for regular, recurring extraction of market prices, distributor lists, or public tenders'
    ],
    keyTasks: [
      'Targeted web portal extraction of business listings, vendors, and branch registries',
      'Government and public records mining for business licensing, deeds, and filings',
      'Tabular data extraction from complex multi-page PDF documents and annual reports',
      'E-commerce competitor catalog, price point, and product specification extraction',
      'Event attendee lists, member directories, and association registry transcription',
      'Structuring extracted data into standardized Excel, CSV, or database formats'
    ],
    suitableIndustries: [
      'Market Research & Consulting',
      'Real Estate Companies',
      'Recruitment & Staffing',
      'Export & Import Companies',
      'Manufacturing Companies'
    ],
    workflow: [
      { step: '01', title: 'Source & Field Definition', desc: 'We identify target URLs, documents, and specific data attributes to be captured.' },
      { step: '02', title: 'Extraction Protocol', desc: 'Specialists utilize dedicated extraction utilities tailored to the source format.' },
      { step: '03', title: 'Quality Verification', desc: 'Manual audit checks ensure every field aligns with target column specifications.' },
      { step: '04', title: 'Organized Delivery', desc: 'Clean, normalized spreadsheets are delivered according to your exact timetable.' }
    ],
    faqs: [
      { q: 'Do you follow ethical web extraction guidelines?', a: 'Yes. We only extract publicly accessible business information in full compliance with robots.txt protocols and terms of service.' },
      { q: 'Can you run recurring weekly or monthly extractions?', a: 'Yes. We establish scheduled extraction pipelines so your team receives fresh data feeds consistently.' }
    ]
  },

  'database-building': {
    id: 'database-building',
    categoryId: 'data-management',
    categoryName: 'Data Management & Processing',
    title: 'Database Building',
    subtitle: 'Build custom, structured business databases from the ground up for sales, operations, and analysis.',
    badge: 'Custom Architecture',
    iconName: 'FolderKanban',
    turnaround: 'Project-Specific Milestones',
    accuracy: 'Thoroughly Researched Records',
    overview: 'Whether launching a targeted outbound sales campaign or building an internal catalog of approved vendors, generic off-the-shelf lists fail. DataGalactic constructs tailored, high-integrity databases built precisely to your criteria, verified by research specialists for maximum relevance.',
    businessProblems: [
      'Purchased database lists filled with obsolete contacts, generic emails, and high bounce rates',
      'Lack of centralized, organized vendor or supplier information across business departments',
      'Difficulty finding niche prospective accounts not covered by standard commercial aggregators',
      'Wasted sales representative time spent researching contact details rather than closing deals'
    ],
    keyTasks: [
      'Custom account prospecting matching your Ideal Customer Profile (ICP)',
      'Verified key decision-maker contact discovery (executive title, email, phone, location)',
      'Industry-specific supplier, manufacturer, and distributor database construction',
      'Real estate parcel, owner history, and municipal registry database compilation',
      'Database schema structuring, deduplication, and standardized data taxonomy',
      'Periodic database refreshing and stale contact archival'
    ],
    suitableIndustries: [
      'B2B Lead Generation Agencies',
      'Consulting & Professional Services',
      'IT & Software Companies',
      'Recruitment & Staffing Agencies',
      'Export & Import Companies'
    ],
    workflow: [
      { step: '01', title: 'ICP & Criteria Definition', desc: 'We align on your target geographies, industries, company revenue brackets, and decision-maker roles.' },
      { step: '02', title: 'Multi-Source Discovery', desc: 'Researchers cross-reference corporate registers, business directories, and verified web sources.' },
      { step: '03', title: 'Record Verification', desc: 'Every data point is confirmed to ensure valid contact and corporate information.' },
      { step: '04', title: 'CRM-Ready Handover', desc: 'Structured database delivered ready for direct import into your CRM or outbound software.' }
    ],
    faqs: [
      { q: 'How is a custom-built database better than a bought list?', a: 'Bought lists are static, shared among competitors, and frequently outdated. Our databases are built to order, fresh, and exclusive to your business.' },
      { q: 'Can you populate custom fields specific to our industry?', a: 'Yes. We can capture industry-specific attributes such as technology stack, fleet size, or licensing status.' }
    ]
  },

  'data-validation': {
    id: 'data-validation',
    categoryId: 'data-management',
    categoryName: 'Data Management & Processing',
    title: 'Data Validation & Verification',
    subtitle: 'Verify the authenticity, accuracy, and completeness of critical business records.',
    badge: 'Multi-Check Verification',
    iconName: 'CheckCheck',
    turnaround: 'Rapid Batch Audits',
    accuracy: 'Multi-Layer Quality Verification',
    overview: 'Decisions based on inaccurate data lead to failed marketing campaigns, compliance liabilities, and damaged client trust. DataGalactic conducts meticulous validation audits across customer databases, vendor submissions, and transaction records to guarantee integrity before implementation.',
    businessProblems: [
      'High email bounce rates threatening your company domain sender reputation',
      'Inaccurate supplier information resulting in payment delays and invoice disputes',
      'Unverified user submissions compromising customer onboarding and fraud compliance',
      'Lack of internal resources to audit high-volume records against authoritative sources'
    ],
    keyTasks: [
      'Email address syntax checks, domain MX verification, and bounce-rate minimization audits',
      'Company name, registration number, and corporate identity cross-referencing',
      'Phone number validation, international dial code checks, and carrier format audits',
      'Physical address verification against national postal registers and mapping services',
      'Transaction and ledger numerical verification with mathematical checksum validation',
      'Multi-source discrepancy identification and resolution documentation'
    ],
    suitableIndustries: [
      'Financial Services Companies',
      'Digital Marketing Agencies',
      'B2B Lead Generation Agencies',
      'Healthcare Organisations',
      'Large Enterprises & Corporations'
    ],
    workflow: [
      { step: '01', title: 'Audit Scope & Ingestion', desc: 'We receive records and establish benchmark verification rules and error tolerances.' },
      { step: '02', title: 'Automated Rule Checks', desc: 'Running programmatic pattern matching, syntax tests, and registry verification.' },
      { step: '03', title: 'Manual Inspection', desc: 'Specialists review flagged anomalies, edge cases, and unverified records individually.' },
      { step: '04', title: 'Validation Report', desc: 'Clean deliverable accompanied by verification status tags (Valid, Invalid, Updated).' }
    ],
    faqs: [
      { q: 'What email verification methods do you use?', a: 'We perform syntax checks, domain health audits, MX record queries, and non-intrusive SMTP handshake tests.' },
      { q: 'Can you verify customer addresses internationally?', a: 'Yes. We support postal validation protocols across the US, UK, Canada, Australia, and worldwide.' }
    ]
  },

  // --- Category 2: Business Research & Lead Generation ---
  'b2b-lead-generation': {
    id: 'b2b-lead-generation',
    categoryId: 'business-research',
    categoryName: 'Business Research & Lead Generation',
    title: 'B2B Lead Generation',
    subtitle: 'Targeted, human-researched prospect lists tailored to your ideal client profile.',
    badge: 'High-Intent Prospecting',
    iconName: 'Target',
    turnaround: 'Weekly or Batch Delivery',
    accuracy: 'Direct Human Verification',
    overview: 'Accelerate your outbound sales pipeline with fresh, hyper-targeted B2B prospect lists. DataGalactic researches verified decision-makers across your target industries, capturing accurate email addresses, phone contacts, executive titles, and company profiles so your sales team can focus on closing deals.',
    businessProblems: [
      'Sales reps spending 40% of their workday searching for contacts instead of selling',
      'High email bounce rates resulting from stale, automated prospect directories',
      'Generic contact lists targeting wrong departments or gatekeeper emails (info@, sales@)',
      'Difficulty finding verified leads in niche industrial, local, or specialized B2B markets'
    ],
    keyTasks: [
      'Ideal Customer Profile (ICP) definition and account-based prospect mapping',
      'Identification of key decision-makers (CEOs, VPs, Directors, Department Heads)',
      'Direct business email and professional telephone number discovery and validation',
      'Company background data collection (employee headcount, revenue tier, tech stack)',
      'Custom qualification checks (confirming recent funding, hiring surges, or certifications)',
      'CRM-formatted CSV delivery ready for Apollo, HubSpot, Outreach, or Salesforce import'
    ],
    suitableIndustries: [
      'IT & Software Companies',
      'Digital Marketing Agencies',
      'Consulting & Professional Services',
      'Recruitment & Staffing Agencies',
      'B2B Lead Generation Agencies'
    ],
    workflow: [
      { step: '01', title: 'Target Criteria Alignment', desc: 'We define exact company geography, industry vertical, revenue, and buyer job titles.' },
      { step: '02', title: 'Human Prospecting', desc: 'Researchers identify target accounts across corporate registers and professional platforms.' },
      { step: '03', title: 'Validation Audit', desc: 'Emails and phone contacts are cross-checked to ensure direct reachability.' },
      { step: '04', title: 'Pipeline Delivery', desc: 'Prospect lists are formatted and delivered in spreadsheet or CRM-ready formats.' }
    ],
    faqs: [
      { q: 'Do you use automated scrapers or human researchers?', a: 'We rely on human researchers backed by modern research tools to ensure context accuracy, relevance, and zero generic gatekeeper emails.' },
      { q: 'Are your prospect lists compliant with privacy regulations?', a: 'Yes. We gather only publicly available professional B2B contact details in alignment with applicable regulations.' }
    ]
  },

  'web-research': {
    id: 'web-research',
    categoryId: 'business-research',
    categoryName: 'Business Research & Lead Generation',
    title: 'Web Research Services',
    subtitle: 'Comprehensive online data aggregation, vendor sourcing, and factual intelligence.',
    badge: 'Deep Web Intelligence',
    iconName: 'Search',
    turnaround: 'Daily Feeds or Project Sprints',
    accuracy: 'Fact-Checked Information',
    overview: 'Make sound commercial decisions backed by thorough online research. DataGalactic assists business leaders, consultants, and procurement managers by collecting, synthesizing, and formatting information from corporate websites, trade portals, and public archives into organized intelligence reports.',
    businessProblems: [
      'Internal staff overwhelmed by lengthy web research tasks pulling them away from core duties',
      'Scattered, conflicting online data that needs consolidation into a single clear spreadsheet',
      'Need to identify and evaluate multiple prospective global suppliers or partners rapidly',
      'Lack of capacity to monitor competitor pricing and product launches consistently'
    ],
    keyTasks: [
      'Supplier and vendor discovery, contact collection, and capability comparison',
      'Product research, technical specification gathering, and SKU pricing benchmarking',
      'Event, conference, attendee, and speaker profile data compilation',
      'Public records research, corporate executive bios, and regulatory filing reviews',
      'Geographical location mapping, branch registry auditing, and distributor logs',
      'Curated link aggregation, document archival, and factual data summarization'
    ],
    suitableIndustries: [
      'Consulting & Professional Services',
      'Export & Import Companies',
      'Manufacturing Companies',
      'Real Estate Companies',
      'Small & Medium-Sized Businesses'
    ],
    workflow: [
      { step: '01', title: 'Objective Definition', desc: 'We clarify research goals, priority data points, and acceptable source types.' },
      { step: '02', title: 'Deep Web Search', desc: 'Specialists thoroughly investigate target portals, official publications, and registries.' },
      { step: '03', title: 'Synthesis & Fact-Checking', desc: 'Data is organized logically with reference links and verification notes.' },
      { step: '04', title: 'Structured Report Handover', desc: 'Clear spreadsheet and executive summary delivered per your schedule.' }
    ],
    faqs: [
      { q: 'Can you source international suppliers in specific countries?', a: 'Yes. We regularly help businesses identify verified manufacturers and suppliers across Asia, North America, and Europe.' },
      { q: 'How do you ensure information accuracy?', a: 'We mandate multi-source cross-checking and cite source links for every key factual claim.' }
    ]
  },

  'market-research': {
    id: 'market-research',
    categoryId: 'business-research',
    categoryName: 'Business Research & Lead Generation',
    title: 'Market Research',
    subtitle: 'Competitor benchmarking, industry landscape analysis, and market pricing intelligence.',
    badge: 'Market Analytics',
    iconName: 'TrendingUp',
    turnaround: 'Custom Sprint Timelines',
    accuracy: 'Structured & Verified Data',
    overview: 'Gain actionable market clarity without hiring expensive agency retainers. DataGalactic conducts targeted market and competitive research to help you track rival pricing, uncover emerging product trends, understand customer sentiment, and benchmark key industry players.',
    businessProblems: [
      'Lack of visibility into competitor product offerings, price changes, and discount structures',
      'Entering a new geographic territory or product category without clear market landscape data',
      'Difficulty aggregating industry customer reviews and sentiment across multiple portals',
      'High consultancy fees for straightforward market intelligence and competitor tracking'
    ],
    keyTasks: [
      'Competitor feature matrix compilation, price tracking, and service tier comparison',
      'Industry trend data collection, whitepaper aggregation, and growth metric logging',
      'Marketplace review harvesting and customer sentiment categorization',
      'Geographical market sizing data gathering from public commercial reports',
      'Emerging vendor tracking, startup funding milestones, and acquisition logging',
      'Structured presentation of findings into clear tabular models and summary slides'
    ],
    suitableIndustries: [
      'IT & Software Companies',
      'Digital Marketing Agencies',
      'E-commerce Companies',
      'Consulting & Professional Services',
      'Large Enterprises & Corporations'
    ],
    workflow: [
      { step: '01', title: 'Research Framework', desc: 'Defining competitor groups, target segments, and priority comparison variables.' },
      { step: '02', title: 'Data Gathering', desc: 'Extracting data across competitor websites, financial reports, review portals, and news releases.' },
      { step: '03', title: 'Standardization', desc: 'Harmonizing currencies, measurement units, and features into uniform comparison grids.' },
      { step: '04', title: 'Deliverable Handover', desc: 'Comprehensive workbook delivered with clean data and executive summary notes.' }
    ],
    faqs: [
      { q: 'Can you monitor competitor prices on an ongoing weekly basis?', a: 'Yes. We provide scheduled recurring competitor tracking feeds so your team stays updated on market shifts.' },
      { q: 'Do you deliver raw data or analyzed summaries?', a: 'We provide both: clean, organized raw data workbooks along with executive summary overviews.' }
    ]
  },

  // --- Category 3: Business Operations Support ---
  'crm-product-data': {
    id: 'crm-product-data',
    categoryId: 'operations-support',
    categoryName: 'Business Operations Support',
    title: 'CRM & Product Data Management',
    subtitle: 'End-to-end catalog population, product listings, and continuous CRM data maintenance.',
    badge: 'Catalog & CRM Hygiene',
    iconName: 'ShoppingCart',
    turnaround: 'Daily or Shift Support',
    accuracy: 'Thorough Attribute Accuracy',
    overview: 'Keep your sales CRM healthy and your online store catalogs optimized. DataGalactic manages multi-channel product uploads, variant attributes, inventory updates, and CRM contact hygiene across platforms like Shopify, Amazon, Salesforce, HubSpot, and WooCommerce.',
    businessProblems: [
      'Delayed product launches caused by slow manual SKU creation and attribute tagging',
      'Inconsistent product descriptions and missing variant options leading to customer returns',
      'Sales pipelines clogged by duplicate leads, obsolete phone numbers, and outdated records',
      'Inventory count discrepancies across multiple selling channels causing order cancellations'
    ],
    keyTasks: [
      'Product listing creation across Shopify, Amazon Seller Central, eBay, and WooCommerce',
      'Variant attribute mapping (size, color, material, weight, MPN, UPC/EAN barcodes)',
      'SEO-friendly product descriptions, bullet points, and specification table formatting',
      'Continuous CRM data cleaning, lead record deduplication, and deal stage updating',
      'Supplier product sheet ingestion, price change updates, and catalog categorization',
      'Product image cropping, naming, folder organization, and alt-tag alignment'
    ],
    suitableIndustries: [
      'E-commerce Companies',
      'Manufacturing Companies',
      'Retail & Multi-Branch Networks',
      'Digital Marketing Agencies',
      'Small & Medium-Sized Businesses'
    ],
    workflow: [
      { step: '01', title: 'Feed & Asset Intake', desc: 'Receiving manufacturer spec sheets, distributor catalogs, and high-res imagery.' },
      { step: '02', title: 'Attribute Standardization', desc: 'Formatting weights, dimensions, and specifications to match platform taxonomy.' },
      { step: '03', title: 'Bulk Listing Upload', desc: 'Deploying optimized listings via flat files or direct store administration access.' },
      { step: '04', title: 'Live Store Audit', desc: 'Checking product pages live to ensure images, variants, and pricing display flawlessly.' }
    ],
    faqs: [
      { q: 'Which e-commerce platforms do you support?', a: 'Shopify, Amazon, WooCommerce, Magento (Adobe Commerce), BigCommerce, eBay, and custom portals.' },
      { q: 'Can you work directly in our Salesforce or HubSpot CRM?', a: 'Yes. Our staff can update contact records, log activity, and merge duplicates directly within your CRM environment.' }
    ]
  },

  'document-digitization': {
    id: 'document-digitization',
    categoryId: 'operations-support',
    categoryName: 'Business Operations Support',
    title: 'Document Digitization & Conversion',
    subtitle: 'Seamlessly convert paper archives, scanned PDFs, and forms into searchable, structured digital files.',
    badge: 'Archive Digitization',
    iconName: 'FileCode',
    turnaround: '12-24 Hours for Batches',
    accuracy: 'OCR + Human Proofreading',
    overview: 'Unlock vital business data trapped in paper filings, scanned PDFs, receipts, and legacy records. DataGalactic combines advanced OCR processing with meticulous human proofreading to convert unstructured documents into formula-intact Excel spreadsheets, Word files, and digital databases.',
    businessProblems: [
      'Valuable corporate records trapped in physical file cabinets and static scanned images',
      'Automated OCR tools producing garbled text, misplaced decimals, and broken tables',
      'Staff spending hours re-typing financial statements, invoices, and contracts into software',
      'Inability to search, analyze, or back up critical legacy operational documents'
    ],
    keyTasks: [
      'Scanned PDF to Excel conversion with reconstructed table structures and formulas',
      'PDF to editable Word conversion preserving typography, margins, and layout',
      'OCR text extraction followed by manual proofreading of faint receipts and forms',
      'Bank statement and financial ledger conversion into structured spreadsheets',
      'Medical charts, patient intake forms, and academic record digitization',
      'Document indexing, metadata tagging, and cloud archival folder organization'
    ],
    suitableIndustries: [
      'Financial Services Companies',
      'Hospitals & Healthcare Organisations',
      'Schools & Colleges',
      'Logistics & Transportation',
      'Real Estate Companies'
    ],
    workflow: [
      { step: '01', title: 'Document Pre-Processing', desc: 'De-skewing, noise removal, and contrast enhancement of raw scanned images.' },
      { step: '02', title: 'OCR Extraction', desc: 'Running multi-engine OCR to identify text regions, tables, and bounding boxes.' },
      { step: '03', title: 'Human Proofreading', desc: 'Specialists verify complex numbers, currency symbols, and technical terms.' },
      { step: '04', title: 'Structured Output', desc: 'Files delivered in your required spreadsheet, document, or database format.' }
    ],
    faqs: [
      { q: 'Can you convert handwritten documents?', a: 'Yes. Our human proofreading team transcribes legible handwritten notes, surveys, and intake forms.' },
      { q: 'Are Excel formulas preserved when converting tables?', a: 'Yes. Our analysts reconstruct mathematical totals and sum formulas so spreadsheets remain dynamic.' }
    ]
  },

  'back-office-support': {
    id: 'back-office-support',
    categoryId: 'operations-support',
    categoryName: 'Business Operations Support',
    title: 'Back-Office & Administrative Support',
    subtitle: 'Dedicated administrative assistants and operations specialists to manage recurring workflows.',
    badge: 'Reliable Operations Backbone',
    iconName: 'Briefcase',
    turnaround: 'Daily Dedicated Shifts',
    accuracy: 'Dedicated Coordination',
    overview: 'Free your core executive team to focus on strategic growth while DataGalactic manages your recurring back-office administrative tasks. From invoice reconciliation to customer record maintenance, our trained teams provide steady, reliable operational continuity.',
    businessProblems: [
      'Executive and management staff burdened by repetitive operational and administrative chores',
      'High internal overhead costs for hiring and managing domestic clerical staff',
      'Operational delays during staff vacations, turnover, or unpredictable workload spikes',
      'Lack of documented standard operating procedures (SOPs) for routine administrative tasks'
    ],
    keyTasks: [
      'Accounts payable and receivable invoice logging, reconciliation, and filing',
      'Email ticket triage, customer inquiry categorization, and boilerplate replies',
      'HR records management, timesheet calculations, and employee onboarding data logging',
      'Digital document filing, cloud folder indexing, and permission management',
      'Daily operational reporting, sales performance compilation, and KPI updates',
      'General data maintenance across internal business management tools'
    ],
    suitableIndustries: [
      'Small & Medium-Sized Businesses',
      'Logistics & Transportation Companies',
      'Real Estate Companies',
      'Consulting & Professional Services',
      'Large Enterprises & Corporations'
    ],
    workflow: [
      { step: '01', title: 'SOP Documentation', desc: 'We document your exact workflows, communication protocols, and escalation rules.' },
      { step: '02', title: 'Specialist Onboarding', desc: 'Vetted team members are trained specifically on your company software and workflows.' },
      { step: '03', title: 'Daily Execution', desc: 'Consistent task handling with shift activity reports and supervisory oversight.' },
      { step: '04', title: 'Continuous Alignment', desc: 'Regular check-ins and process refinements to optimize turnaround speed.' }
    ],
    faqs: [
      { q: 'Can we hire a full-time dedicated specialist?', a: 'Yes. We provide dedicated operations associates who work exclusively on your tasks during your required working hours.' },
      { q: 'How do you train your staff on our proprietary software?', a: 'We create customized Standard Operating Procedures (SOPs) and screen recordings, training backups to ensure zero disruption.' }
    ]
  }
};

// ==========================================
// 2. INDUSTRIES DATA (15 Industries)
// ==========================================
export const industriesData = {
  'it-software': {
    id: 'it-software',
    name: 'IT & Software Companies',
    iconName: 'Cpu',
    tagline: 'Database cleansing, software lead prospecting, and documentation support.',
    overview: 'Fast-moving technology firms require clean user databases, verified sales prospecting data, and administrative support to support continuous sprint cycles.',
    supportDetails: 'DataGalactic helps IT and SaaS companies cleanse CRM databases, research decision-maker leads, verify user registries, and format technical customer documentation.',
    keyTasks: [
      'B2B tech prospect list building with verified technical leader titles (CTO, VP Eng, CISO)',
      'CRM database hygiene, duplicate user merging, and stale record archival',
      'Software release notes and technical document conversion',
      'Competitive feature matrix compilation and pricing plan tracking'
    ],
    benefits: 'Freed developer and sales time, clean pipeline data, and zero overhead on routine administrative research.'
  },

  'marketing-agencies': {
    id: 'marketing-agencies',
    name: 'Digital Marketing Agencies',
    iconName: 'Megaphone',
    tagline: 'Prospect list building, campaign data audits, and reporting compilation.',
    overview: 'Agencies managing campaigns for multiple clients need reliable data sourcing and reporting support to maintain client satisfaction without expanding in-house headcount.',
    supportDetails: 'We support digital agencies with hyper-targeted outbound prospect lists, influencer contact extraction, competitive benchmarking, and weekly client KPI reporting.',
    keyTasks: [
      'Verified outbound prospect list building tailored to specific client buyer personas',
      'Competitor marketing intelligence and promotional campaign monitoring',
      'Weekly marketing performance spreadsheet compilation and metric aggregation',
      'Influencer and partner contact discovery with verified engagement data'
    ],
    benefits: 'Scalable agency operations, improved client campaign ROI, and reliable turnaround on client deliverables.'
  },

  'leadgen-agencies': {
    id: 'leadgen-agencies',
    name: 'B2B Lead Generation Agencies',
    iconName: 'Target',
    tagline: 'High-volume contact research, email validation, and ICP list building.',
    overview: 'Specialized lead gen companies require high-volume, bounce-free prospect data to power cold email, LinkedIn, and calling campaigns for diverse clients.',
    supportDetails: 'DataGalactic acts as your dedicated research backbone, building custom prospect databases, verifying emails, and enriching account details per client campaign.',
    keyTasks: [
      'Custom B2B list building matching exact client niche filters and executive roles',
      'Comprehensive email verification to safeguard outbound sending domain health',
      'Account enrichment with verified company revenue, employee count, and tech stack',
      'Continuous list updating and invalid contact replacement'
    ],
    benefits: 'Minimized email bounce rates, reduced client acquisition costs, and increased booked sales meetings.'
  },

  'ecommerce': {
    id: 'ecommerce',
    name: 'E-commerce Companies',
    iconName: 'ShoppingBag',
    tagline: 'Catalog population, variant attribute entry, and multi-channel inventory feeds.',
    overview: 'Retail brands and online marketplaces must constantly update product listings, manage thousands of SKUs, and maintain inventory alignment across channels.',
    supportDetails: 'We handle high-volume product uploads, variant mapping, SEO product descriptions, price tracking, and supplier inventory feed updates.',
    keyTasks: [
      'Shopify, Amazon, eBay, and WooCommerce product catalog uploads',
      'Variant attribute mapping (size, color, weight, MPN, UPC/EAN)',
      'Supplier price-list normalization and stock level synchronization',
      'Image categorization, background cleanup, and alt-tag optimization'
    ],
    benefits: 'Faster time-to-market for new collections, minimized catalog errors, and reduced customer returns.'
  },

  'education': {
    id: 'education',
    name: 'Schools & Colleges',
    iconName: 'GraduationCap',
    tagline: 'Student admissions digitization, academic transcript conversion, and alumni records.',
    overview: 'Educational institutions manage extensive historical paper files, student application records, and accreditation archives requiring accurate digital preservation.',
    supportDetails: 'DataGalactic assists universities, schools, and EdTech platforms in transcribing admissions forms, digitizing historical student records, and maintaining alumni databases.',
    keyTasks: [
      'Student admission applications and enrollment form digitization',
      'Historical academic transcript and certificate digitization into searchable formats',
      'Alumni database updating, contact verification, and donor outreach logs',
      'Course catalog creation, syllabus structuring, and digital archive indexing'
    ],
    benefits: 'Instant searchability across historical student archives, reduced administrative burden, and secure document handling.'
  },

  'healthcare': {
    id: 'healthcare',
    name: 'Hospitals & Healthcare Organisations',
    iconName: 'HeartPulse',
    tagline: 'Patient intake digitization, medical claims entry, and provider registry maintenance.',
    overview: 'Healthcare clinics, medical billing teams, and dental practices handle extensive paper intake forms, insurance claims, and provider credentialing records.',
    supportDetails: 'We provide strict, confidential data entry support for patient intake records, medical billing invoices, physician registries, and insurance claim digitization.',
    keyTasks: [
      'Medical insurance claim data entry, ICD-10 coding alignment, and verification',
      'Patient intake form digitization and OCR transcription error correction',
      'Physician credentials and medical licensing registry maintenance',
      'Billing ledger formatting, hospital invoice reconciliation, and audit logs'
    ],
    benefits: 'Accelerated claims processing cycles, reduced billing discrepancies, and strict confidentiality adherence.'
  },

  'real-estate': {
    id: 'real-estate',
    name: 'Real Estate Companies',
    iconName: 'Building2',
    tagline: 'MLS listing management, property deeds extraction, and broker research.',
    overview: 'Brokers, appraisal firms, and property portals need accurate property listings, public deeds data, and ownership records to support transactions.',
    supportDetails: 'DataGalactic manages MLS listings, extracts property tax records and county deeds, parses tenant applications, and researches property investor contacts.',
    keyTasks: [
      'MLS, Zillow, and property portal listing creation with features and floorplans',
      'County deeds, tax records, and municipal lien document data extraction',
      'Tenant lease application parsing and background check record logging',
      'Commercial property rent roll transcription and appraisal data entry'
    ],
    benefits: 'Prompt listing turnarounds, organized digital title archives, and up-to-date broker prospect pipelines.'
  },

  'manufacturing': {
    id: 'manufacturing',
    name: 'Manufacturing Companies',
    iconName: 'Factory',
    tagline: 'Inventory part digitization, BOM ledger updates, and supplier records.',
    overview: 'Industrial manufacturers handle complex parts catalogs, Bills of Materials (BOM), supplier invoices, and equipment maintenance archives.',
    supportDetails: 'We assist manufacturing firms in standardizing parts catalogs, reconciling purchase orders with supplier invoices, and digitizing paper maintenance logs.',
    keyTasks: [
      'Bill of Materials (BOM) tabular data entry and component specification logging',
      'Supplier price-list normalization and parts catalog SKU structuring',
      'Work order and machine maintenance log digitization',
      'Vendor compliance certificate tracking and procurement logs'
    ],
    benefits: 'Organized parts inventory, reduced procurement discrepancies, and seamless transition from paper to ERP software.'
  },

  'export-import': {
    id: 'export-import',
    name: 'Export & Import Companies',
    iconName: 'Ship',
    tagline: 'Shipping manifests, customs forms digitization, and trade documentation.',
    overview: 'Cross-border trading firms operate against strict shipping schedules where paperwork errors cause costly port customs holds and clearance delays.',
    supportDetails: 'DataGalactic processes shipping manifests, bills of lading, customs declarations, and commercial invoices with precision and rapid turnaround.',
    keyTasks: [
      'Bill of Lading (BoL) and air waybill digitization and data verification',
      'Customs declaration paperwork indexing, HS code categorization, and tariff checks',
      'Commercial invoice and packing list reconciliation against purchase orders',
      'Global freight carrier quotation comparison and logistics rate tables'
    ],
    benefits: 'Minimized customs delays, accurate tariff coding records, and streamlined global trade operations.'
  },

  'recruitment-staffing': {
    id: 'recruitment-staffing',
    name: 'Recruitment & Staffing Agencies',
    iconName: 'UserCheck',
    tagline: 'Resume parsing, candidate database maintenance, and client outreach lists.',
    overview: 'Staffing firms rely on fresh candidate databases and up-to-date hiring manager contact details to win search assignments and place talent quickly.',
    supportDetails: 'We extract structured candidate data from resumes, standardize applicant profiles, and research corporate HR decision-makers for business development.',
    keyTasks: [
      'Candidate resume parsing into structured ATS fields (skills, certifications, experience)',
      'Hiring manager and talent acquisition leader prospecting across target industries',
      'Candidate reference check transcription and credential verification logging',
      'Applicant tracking system (ATS) deduplication and stale record cleanup'
    ],
    benefits: 'Clean candidate databases, immediate pipeline discovery, and reduced administrative time for recruiters.'
  },

  'financial-services': {
    id: 'financial-services',
    name: 'Financial Services Companies',
    iconName: 'BadgeDollarSign',
    tagline: 'Bank statement conversion, invoice reconciliation, and KYC document indexing.',
    overview: 'Accounting firms, fintech platforms, and investment groups require numeric accuracy and confidentiality when processing financial documents.',
    supportDetails: 'DataGalactic converts bank statements into dynamic Excel spreadsheets, reconciles accounts payable invoices, and indexes customer KYC identity documents.',
    keyTasks: [
      'Bank statement PDF to Excel conversion with balance validation formulas',
      'Accounts payable and receivable invoice logging and expense reconciliation',
      'KYC (Know Your Customer) identity verification document indexing',
      'Loan and mortgage application data extraction and income document logging'
    ],
    benefits: 'Eliminated numerical discrepancies, accelerated monthly bookkeeping, and secure document handling.'
  },

  'logistics-transportation': {
    id: 'logistics-transportation',
    name: 'Logistics & Transportation Companies',
    iconName: 'Truck',
    tagline: 'Freight invoices audit, proof of delivery indexing, and dispatch logs.',
    overview: 'Freight forwarders and fleet operators manage massive volumes of waybills, fuel receipts, and delivery confirmations across multiple daily routes.',
    supportDetails: 'We digitize proof of delivery slips, audit carrier freight invoices against agreed rates, and update shipment tracking ledgers.',
    keyTasks: [
      'Proof of Delivery (PoD) indexing, barcode matching, and confirmation entry',
      'Freight invoice auditing against agreed contracted rate tables',
      'Driver timesheet and trip log transcription and mileage tallying',
      'Carrier compliance documentation and insurance certificate monitoring'
    ],
    benefits: 'Faster billing cycles, resolved freight invoice disputes, and structured transport archives.'
  },

  'consulting-services': {
    id: 'consulting-services',
    name: 'Consulting & Professional Services Firms',
    iconName: 'Briefcase',
    tagline: 'Market intelligence, survey analysis datasets, and report preparation.',
    overview: 'Strategy consultants and advisory firms need clean secondary research data, competitor benchmarking, and survey tallying to deliver client presentations.',
    supportDetails: 'DataGalactic acts as your flexible back-office research desk, compiling market data, cleaning survey response sets, and formatting executive data slides.',
    keyTasks: [
      'Secondary market data collection, industry statistics aggregation, and reference logs',
      'Survey response dataset cleansing, open-ended question coding, and pivot table preparation',
      'Competitor service benchmarking and pricing structure comparison grids',
      'Executive contact research for expert interview panels and survey distribution'
    ],
    benefits: 'High-quality research deliverables, reduced billable hour waste, and responsive support on urgent client projects.'
  },

  'smes': {
    id: 'smes',
    name: 'Small & Medium-Sized Businesses',
    iconName: 'Store',
    tagline: 'Cost-effective administrative support, spreadsheet cleanup, and record management.',
    overview: 'Growing businesses often lack the budget to hire dedicated domestic data clerks, forcing founders and core staff to handle manual operations.',
    supportDetails: 'We provide affordable, flexible outsourced data entry, bookkeeping transcription, customer list hygiene, and web research tailored to SME budgets.',
    keyTasks: [
      'General data entry across orders, inventory logs, and customer spreadsheets',
      'Customer contact list deduplication and email verification',
      'Paper receipts and invoice organization for tax preparation',
      'Ongoing administrative support without local full-time hiring commitments'
    ],
    benefits: 'Significant operational cost savings, professional data organization, and freedom to focus on core sales.'
  },

  'enterprises': {
    id: 'enterprises',
    name: 'Large Enterprises & Corporations',
    iconName: 'Building',
    tagline: 'Dedicated offshore operations teams, high-throughput batching, and custom SLAs.',
    overview: 'Multinational corporations require scalable outsourcing partners capable of handling high-volume operational workloads with predictable SLAs and strict security.',
    supportDetails: 'DataGalactic deploys dedicated operational teams with supervisory leads, established SOPs, multi-stage QA audits, and encrypted file pipelines.',
    keyTasks: [
      'High-throughput daily document conversion and data entry shifts',
      'Enterprise database migration, master record deduplication, and schema audits',
      'Dedicated offshore back-office operations teams aligned to client time zones',
      'Custom standard operating procedure (SOP) development and shift productivity reporting'
    ],
    benefits: 'Predictable operational SLAs, elastic capacity scaling, and comprehensive enterprise data protection.'
  }
};

// ==========================================
// 3. SAMPLE PROJECTS / PORTFOLIO DATA (6 Demonstration Projects)
// ==========================================
export const portfolioData = [
  {
    id: 'data-cleaning-spreadsheet',
    title: 'Data Cleaning & Spreadsheet Organisation',
    category: 'Data Management & Processing',
    badge: 'Demonstration Project',
    tagline: 'Cleaned, deduplicated, and standardized 45,000+ customer records from fragmented legacy spreadsheets.',
    clientScenario: 'A growing B2B distributor possessed multiple fragmented customer lists exported from legacy accounting and CRM software. The files contained thousands of duplicate accounts, inconsistent international phone formats, and missing state/zip fields.',
    input: {
      format: 'Raw CSV & Excel (3 disparate files, 45,820 rows)',
      issues: '12% duplicate accounts, inconsistent phone numbering (+1 / bare / dashes), missing postal codes, unstandardized company naming ("Inc" vs "Inc." vs "Incorporated").',
      sampleSnippet: 'Acme Corp Inc | 555-0199 | NY\nACME CORPORATION | (555) 0199 | New York | 10001\nAcme Corp | 5550199 | NY'
    },
    process: [
      'Fuzzy matching and algorithmic deduplication to identify matching entity clusters',
      'Standardized international telephone format to E.164 (+1-XXX-XXX-XXXX)',
      'Postal address standardization and state code normalization using official postal registers',
      'Manual inspection by senior QA specialist on 600 ambiguous match clusters to avoid false merges',
      'Creation of an automated change log detailing every merged record and corrected field'
    ],
    output: {
      format: 'Single Clean Master Excel & CSV (39,140 unique verified records)',
      deliverable: '100% normalized schema, zero duplicate entities, complete postal codes, audit change log.',
      turnaround: 'Completed in 3 business days with full verification sign-off.'
    }
  },
  {
    id: 'b2b-lead-generation-database',
    title: 'B2B Lead Generation Database',
    category: 'Business Research & Lead Generation',
    badge: 'Demonstration Project',
    tagline: 'Custom-built prospect database of 2,500 verified marketing directors across US mid-market software companies.',
    clientScenario: 'A SaaS sales development agency needed a high-intent outbound prospect database targeting Marketing Directors, VPs of Growth, and CMOs at software companies with 50-500 employees located in the United States.',
    input: {
      format: 'Target Criteria Specification (ICP Brief)',
      issues: 'Generic bought lists produced high bounce rates (>18%) and contained obsolete contacts who had left their positions.',
      sampleSnippet: 'Target: Head of Marketing / CMO | US SaaS Companies (50-500 FTE) | Min $10M Revenue'
    },
    process: [
      'Manual research across corporate registries, official company team pages, and professional platforms',
      'Direct decision-maker email identification through multi-tier verification tools',
      'Live SMTP handshake and domain MX record testing to guarantee direct deliverability',
      'Captured key company attributes: headquarters city, company headcount, primary product category, and verified LinkedIn URL',
      'Supervisory sample audit of 200 random leads before final delivery batching'
    ],
    output: {
      format: 'CRM-Ready Excel & Google Sheets (2,500 verified prospect records)',
      deliverable: 'First name, last name, verified business email, direct phone/switchboard, job title, company name, website, employee count, LinkedIn profile.',
      turnaround: 'Batched weekly deliveries over 2 weeks; bounce rate maintained below 2%.'
    }
  },
  {
    id: 'ecommerce-product-data-management',
    title: 'E-commerce Product Data Management',
    category: 'Business Operations Support',
    badge: 'Demonstration Project',
    tagline: 'Catalog migration and attribute mapping for 8,500 fashion & apparel SKUs across Shopify and Amazon.',
    clientScenario: 'An apparel brand was expanding from a single Shopify store to Amazon Seller Central. They needed 8,500 SKUs uploaded with standardized parent-child variations, size/color attributes, bulleted features, and marketplace-compliant tags.',
    input: {
      format: 'Raw Manufacturer PDF Catalogs & Unformatted Warehouse Spreadsheets',
      issues: 'Missing barcode UPC numbers, inconsistent color naming across vendors, unformatted size charts, and raw image filenames.',
      sampleSnippet: 'Item# 4022 | Cotton Crewneck Tee | Vendor Color: Navy-04 | S/M/L/XL | Unmapped UPC'
    },
    process: [
      'Extracted product data from vendor specification sheets into a master inventory matrix',
      'Mapped parent-child variation hierarchy according to Amazon and Shopify category taxonomy',
      'Standardized color names and apparel sizing charts to match marketplace filters',
      'Crafted SEO-optimized feature bullet points highlighting fabric composition and fit guidelines',
      'Assigned and validated unique UPC/EAN barcodes across all size and color variants',
      'Renamed and organized product photography assets matching SKU naming conventions'
    ],
    output: {
      format: 'Platform-Ready Flat File Uploads + Live Store Verification',
      deliverable: '8,500 SKU records structured into 1,200 parent listings with complete variation matrices, optimized images, and zero listing errors.',
      turnaround: 'Completed in 10 business days with live storefront verification.'
    }
  },
  {
    id: 'pdf-to-excel-conversion',
    title: 'PDF to Excel Conversion & Financial Reconciliation',
    category: 'Data Management & Processing',
    badge: 'Demonstration Project',
    tagline: 'Converted 1,200 scanned invoices and bank statements into dynamically calculated financial spreadsheets.',
    clientScenario: 'An accounting and tax advisory firm was conducting an annual financial audit for an international trading client. They had 1,200 scanned PDF receipts, vendor invoices, and monthly bank statements that required structured digitization into Excel.',
    input: {
      format: '1,200 Scanned PDF documents (faint stamps, multi-currency values, complex line-item tables)',
      issues: 'Automated OCR software failed on degraded scans, merged columns, and misread decimal points.',
      sampleSnippet: 'Scanned Invoice #90214 | Date: 14/03/2023 | 8 line items with VAT rates & sub-totals | Faint scan'
    },
    process: [
      'Document pre-processing (noise filtering, contrast sharpening, de-skewing)',
      'Multi-engine OCR processing to extract raw table layouts and text regions',
      'Dual-associate manual proofreading of all numerical values, invoice numbers, and vendor names',
      'Reconstruction of dynamic Excel formulas for sub-totals, VAT percentages, and currency totals',
      'Cross-reconciliation of calculated totals against stated invoice grand totals to ensure zero discrepancy'
    ],
    output: {
      format: 'Structured Multi-Tab Excel Workbook (.xlsx)',
      deliverable: 'Categorized financial ledger by vendor, date, and expense category with active sum formulas and verified reconciliation totals.',
      turnaround: 'Delivered in 4 business days ahead of client tax filing deadline.'
    }
  },
  {
    id: 'company-research-market-data',
    title: 'Company Research & Market Data',
    category: 'Business Research & Lead Generation',
    badge: 'Demonstration Project',
    tagline: 'Comprehensive competitor benchmarking and pricing landscape study across 150 European logistics providers.',
    clientScenario: 'A freight logistics company expanding operations into Western Europe needed structured market data on 150 regional competitors, comparing their service portfolios, pricing models, fleet capacities, and warehouse locations.',
    input: {
      format: 'Research Brief & Target Country List (Germany, France, Netherlands, UK)',
      issues: 'Information was fragmented across multilingual corporate websites, industry trade registers, and transport portals.',
      sampleSnippet: 'Analyze 150 European logistics carriers: Fleet size, warehousing sq ft, temperature control capabilities, customs services, public pricing.'
    },
    process: [
      'Multi-lingual web research across regional transport registries and official carrier portals',
      'Systematic extraction of fleet specifications, cross-docking locations, and specialized service offerings',
      'Collection and normalization of sample freight rate tables into uniform EUR per km benchmarks',
      'Executive contact research capturing managing directors and head of logistics operations',
      'Fact-checking and referencing with direct source URLs for every recorded data point'
    ],
    output: {
      format: 'Master Market Intelligence Workbook & Executive Comparison Grid',
      deliverable: '150 comprehensive carrier profiles with categorized services, fleet metrics, geographic heatmaps, and executive summary notes.',
      turnaround: 'Completed in 5 business days.'
    }
  },
  {
    id: 'crm-data-management',
    title: 'CRM Data Management & Pipeline Hygiene',
    category: 'Business Operations Support',
    badge: 'Demonstration Project',
    tagline: 'Restructured and cleansed 28,000 stale CRM contact records for a commercial real estate agency.',
    clientScenario: 'A commercial property brokerage had 28,000 legacy contacts in HubSpot accumulated over five years. The database had over 3,000 obsolete emails, duplicate investor accounts, unassigned contact owners, and incomplete property preference notes.',
    input: {
      format: 'Direct CRM Export / Secure API Workspace (28,400 contact records)',
      issues: 'High bounce rate on newsletter distributions, multiple sales reps contacting the same investor, and unpopulated custom industry fields.',
      sampleSnippet: 'Lead #14029 | John Doe | john.d@oldcompany.com (Bounced) | Unassigned Deal Stage'
    },
    process: [
      'Comprehensive contact deduplication matching by email, phone, and entity name',
      'Email deliverability audit identifying and flagging invalid or deactivated mailboxes',
      'Web research updating investor company names, current corporate titles, and new corporate emails',
      'Standardization of deal stages, contact source tags, and geographic property interests',
      'Re-import of cleaned records back into HubSpot with zero data disruption to active deals'
    ],
    output: {
      format: 'Pristine, Fully-Mapped CRM Database (25,120 active, validated investor contacts)',
      deliverable: 'Email bounce rate reduced to under 1.5%, zero duplicate investor profiles, and standardized property interest tags.',
      turnaround: 'Completed across 2 scheduled sprint cycles.'
    }
  }
];

// ==========================================
// 4. WHY CHOOSE US (6 Verified Value Propositions)
// ==========================================
export const whyChooseUsData = [
  {
    id: 'accuracy',
    title: 'Accuracy-Focused Data Processing',
    badge: 'Multi-Stage Review',
    iconName: 'ShieldCheck',
    description: 'We implement disciplined multi-stage verification workflows. Every dataset undergoes initial capture followed by independent supervisory checks to identify and eliminate errors before delivery.'
  },
  {
    id: 'reliability',
    title: 'Reliable Project Delivery',
    badge: 'Predictable Schedules',
    iconName: 'Clock',
    description: 'We respect your operational deadlines. Our structured batch schedules and shift-based operational workflows ensure consistent, predictable turnaround times for routine and one-time tasks.'
  },
  {
    id: 'flexible',
    title: 'Flexible Outsourcing Solutions',
    badge: 'Customized Retainers',
    iconName: 'Sliders',
    description: 'From a one-time trial batch to monthly ongoing operational support, our service arrangements adapt directly to your business scope without restrictive long-term commitments.'
  },
  {
    id: 'scalable',
    title: 'Scalable Business Support',
    badge: 'On-Demand Capacity',
    iconName: 'TrendingUp',
    description: 'Ramp operational capacity up or down according to seasonal surges, business expansion, or unexpected backlogs without domestic recruitment delays or overhead costs.'
  },
  {
    id: 'confidential',
    title: 'Confidential Data Handling',
    badge: 'Strict NDA Protocols',
    iconName: 'Lock',
    description: 'Client confidentiality is central to our business. We enforce non-disclosure agreements, restricted workstation access, encrypted transfers, and prompt data deletion upon project completion.'
  },
  {
    id: 'coordination',
    title: 'Dedicated Project Coordination',
    badge: 'Single Point of Contact',
    iconName: 'UserCheck',
    description: 'Work with a responsive project coordinator who understands your requirements, provides clear status updates, and ensures your instructions are executed accurately across every batch.'
  }
];

// ==========================================
// 5. HOW IT WORKS (5-Step Workflow)
// ==========================================
export const howItWorksSteps = [
  {
    step: '01',
    title: 'Share Your Requirements',
    badge: 'Step 1',
    iconName: 'Send',
    description: 'Send us your raw files, spreadsheet templates, data schemas, or document scans along with your specific requirements and expected timeline.',
    highlight: 'Initial Consultation'
  },
  {
    step: '02',
    title: 'Receive a Project Proposal',
    badge: 'Step 2',
    iconName: 'FileText',
    description: 'We review your scope, process a sample test batch if required, establish standard operating procedures (SOPs), and provide a transparent, fixed quote.',
    highlight: 'Sample Test Available'
  },
  {
    step: '03',
    title: 'Approve Scope and Start the Project',
    badge: 'Step 3',
    iconName: 'CheckCircle2',
    description: 'Once you review and approve the proposal and confidentiality terms, we onboard assigned specialists and initiate processing according to your schedule.',
    highlight: 'NDA & Scope Sign-off'
  },
  {
    step: '04',
    title: 'Quality Check and Delivery',
    badge: 'Step 4',
    iconName: 'ShieldCheck',
    description: 'Completed files undergo independent supervisory verification to ensure accuracy before secure handover in your preferred file format.',
    highlight: 'Supervisory Verification'
  },
  {
    step: '05',
    title: 'Ongoing Business Partnership',
    badge: 'Step 5',
    iconName: 'Handshake',
    description: 'For ongoing requirements, we establish dedicated recurring shifts, weekly reporting, and continuous process refinements to support your business long-term.',
    highlight: 'Dedicated Operational Shifts'
  }
];

// ==========================================
// 6. FREQUENTLY ASKED QUESTIONS (8+ Essential Questions)
// ==========================================
export const faqsData = [
  {
    id: 'services-overview',
    category: 'Services',
    question: 'What data management services does DataGalactic provide?',
    answer: 'DataGalactic provides comprehensive data management, business research, and back-office outsourcing services. Our core offerings include Data Entry (online & offline), Data Cleaning & Formatting, Data Extraction, Database Building, Data Validation & Verification, B2B Lead Generation, Web Research, Market Research, CRM & Product Data Management, Document Digitization & Conversion, and Ongoing Back-Office Support.'
  },
  {
    id: 'international-clients',
    category: 'Operations',
    question: 'Do you work with international clients?',
    answer: 'Yes. The majority of our clients are businesses, agencies, and enterprises located in the United States, United Kingdom, Canada, Australia, and the United Arab Emirates. Our teams schedule operational shifts to align with international time zones and maintain clear, prompt communication via email, phone, and secure portals.'
  },
  {
    id: 'recurring-tasks',
    category: 'Engagement',
    question: 'Can I outsource recurring data entry and back-office tasks?',
    answer: 'Absolutely. We support both one-time batch projects and recurring operational retainers. For recurring projects, we assign dedicated operations associates, document your Standard Operating Procedures (SOPs), and provide daily or weekly status reports to ensure consistent delivery.'
  },
  {
    id: 'customized-solutions',
    category: 'Services',
    question: 'Do you provide customized solutions for unique project requirements?',
    answer: 'Yes. Every business has unique schemas, workflows, and software environments. We do not force rigid templates. Instead, we adapt our workflows, validation rules, and deliverables directly to your internal software, CRM, or file requirements.'
  },
  {
    id: 'data-accuracy',
    category: 'Quality',
    question: 'How do you ensure data accuracy?',
    answer: 'We employ a disciplined multi-stage quality protocol. First, trained specialists capture or process records adhering strictly to your guidelines. Next, an independent supervisor or senior QA associate audits records against source files to catch discrepancies. Only verified records are approved for final delivery.'
  },
  {
    id: 'pilot-test',
    category: 'Getting Started',
    question: 'Can I start with a small pilot or sample project?',
    answer: 'Yes, we encourage it! For most structured data tasks, we are pleased to process a sample test batch (typically 50 to 100 records) at no cost or obligation. This allows you to evaluate our accuracy, turnaround time, and communication before committing to a larger scope.'
  },
  {
    id: 'confidentiality-security',
    category: 'Security',
    question: 'How do you protect confidential business information?',
    answer: 'We enforce stringent confidentiality practices: comprehensive Non-Disclosure Agreements (NDAs) signed prior to project commencement, restricted-access workstations with principle-of-least-privilege permissions, encrypted file transfers, and permanent deletion of working files following client acceptance.'
  },
  {
    id: 'request-quote',
    category: 'Getting Started',
    question: 'How can I request a quotation for my project?',
    answer: 'You can request a free quotation by submitting our online quote form with your project details, required service, and estimated data volume. Alternatively, you can email your requirements directly to hello@datagalactic.in. Our team typically reviews requirements and responds with a scope breakdown within 12 to 24 hours.'
  }
];

// ==========================================
// 7. DATA SECURITY PILLARS
// ==========================================
export const securityPillarsData = [
  {
    id: 'nda',
    title: 'Confidentiality Agreements (NDA)',
    badge: 'Contractual Protection',
    iconName: 'FileCheck2',
    description: 'We sign comprehensive Non-Disclosure Agreements prior to accessing any client data. All client information, files, and proprietary procedures remain strictly confidential.'
  },
  {
    id: 'restricted-access',
    title: 'Restricted Data Access',
    badge: 'Least Privilege',
    iconName: 'Lock',
    description: 'We enforce role-based access control. Only specialists and supervisors explicitly assigned to your project are granted access to your project files and systems.'
  },
  {
    id: 'secure-sharing',
    title: 'Secure File-Sharing Practices',
    badge: 'Encrypted Transfers',
    iconName: 'FolderLock',
    description: 'All files are transferred via encrypted channels (TLS/SSL). We support your preferred enterprise sharing platforms including Google Workspace, OneDrive, SharePoint, or SFTP.'
  },
  {
    id: 'handling-procedures',
    title: 'Strict Data Handling Procedures',
    badge: 'Supervised Workstations',
    iconName: 'ShieldCheck',
    description: 'Operators work in controlled environments with external media restrictions and continuous supervisory oversight to eliminate unauthorized data copying or sharing.'
  },
  {
    id: 'retention-deletion',
    title: 'Data Retention & Deletion Policies',
    badge: 'Permanent Purge',
    iconName: 'Trash2',
    description: 'We retain working files only for the agreed project duration. Upon client sign-off and project acceptance, all client datasets are permanently purged from working machines.'
  },
  {
    id: 'dpa',
    title: 'Data Processing Agreements',
    badge: 'Transparent Terms',
    iconName: 'Scale',
    description: 'We establish clear Data Processing Agreements outlining exact processing limits, data security commitments, and accountability protocols for your peace of mind.'
  }
];
