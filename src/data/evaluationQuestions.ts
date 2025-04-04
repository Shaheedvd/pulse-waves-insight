
// Database of evaluation questions organized by business category and subcategory

export interface EvaluationQuestion {
  id: string;
  text: string;
  category: string;
  subcategory: string;
  type: 'audit' | 'evaluation' | 'both';
}

// Function to generate unique IDs for each question
const generateId = (category: string, index: number): string => {
  const prefix = category.substring(0, 3).toUpperCase();
  return `${prefix}-${index.toString().padStart(3, '0')}`;
};

// Shops (Retail) questions
const retailAuditQuestions: EvaluationQuestion[] = [
  // General Operations
  {
    id: generateId('retail', 1),
    text: 'Is the store layout logical and easy for customers to navigate?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 2),
    text: 'Are all areas of the shop clean and well-maintained?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 3),
    text: 'Is there adequate lighting throughout the store?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 4),
    text: 'Are shelves and displays stocked appropriately and tidily?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 5),
    text: 'Are expiry dates checked regularly and out-of-date products removed?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 6),
    text: 'Is there a clear process for receiving and checking deliveries?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 7),
    text: 'Are stockrooms organized and accessible?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 8),
    text: 'Is there a system for managing and minimizing stock loss (theft, damage)?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 9),
    text: 'Are pricing labels clear, accurate, and consistently applied?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 10),
    text: 'Is there a process for handling damaged or returned goods?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 11),
    text: 'Are point-of-sale (POS) systems functioning correctly?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 12),
    text: 'Is there a procedure for opening and closing the store securely?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 13),
    text: 'Are staff aware of emergency procedures (fire, evacuation)?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 14),
    text: 'Is there adequate signage for key areas (e.g., restrooms, fitting rooms)?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 15),
    text: 'Are customer complaints handled effectively and documented?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 16),
    text: 'Is there a system for gathering customer feedback?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 17),
    text: 'Are promotional materials displayed correctly and up-to-date?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 18),
    text: 'Is there a process for managing online orders and fulfillment (if applicable)?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 19),
    text: 'Are staff uniforms clean and presentable?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  {
    id: generateId('retail', 20),
    text: 'Is there a communication system for staff within the store?',
    category: 'Shops (Retail)',
    subcategory: 'General Operations',
    type: 'audit'
  },
  
  // Health and Safety
  {
    id: generateId('retail', 21),
    text: 'Are fire extinguishers readily accessible and regularly inspected?',
    category: 'Shops (Retail)',
    subcategory: 'Health and Safety',
    type: 'audit'
  },
  {
    id: generateId('retail', 22),
    text: 'Are smoke detectors installed and functioning?',
    category: 'Shops (Retail)',
    subcategory: 'Health and Safety',
    type: 'audit'
  },
  {
    id: generateId('retail', 23),
    text: 'Are emergency exits clearly marked and unobstructed?',
    category: 'Shops (Retail)',
    subcategory: 'Health and Safety',
    type: 'audit'
  },
  {
    id: generateId('retail', 24),
    text: 'Is there a first-aid kit available and are staff aware of its location?',
    category: 'Shops (Retail)',
    subcategory: 'Health and Safety',
    type: 'audit'
  },
  {
    id: generateId('retail', 25),
    text: 'Are spills cleaned up immediately to prevent slips and falls?',
    category: 'Shops (Retail)',
    subcategory: 'Health and Safety',
    type: 'audit'
  },
  {
    id: generateId('retail', 26),
    text: 'Are wet floor signs used when necessary?',
    category: 'Shops (Retail)',
    subcategory: 'Health and Safety',
    type: 'audit'
  },
  {
    id: generateId('retail', 27),
    text: 'Are ladders and other equipment used safely?',
    category: 'Shops (Retail)',
    subcategory: 'Health and Safety',
    type: 'audit'
  },
  {
    id: generateId('retail', 28),
    text: 'Is manual handling of goods performed correctly to prevent injuries?',
    category: 'Shops (Retail)',
    subcategory: 'Health and Safety',
    type: 'audit'
  },
  {
    id: generateId('retail', 29),
    text: 'Is electrical equipment regularly checked for safety?',
    category: 'Shops (Retail)',
    subcategory: 'Health and Safety',
    type: 'audit'
  },
  {
    id: generateId('retail', 30),
    text: 'Is ventilation adequate in all areas of the store?',
    category: 'Shops (Retail)',
    subcategory: 'Health and Safety',
    type: 'audit'
  },
  
  // Customer Service
  {
    id: generateId('retail', 31),
    text: 'Are staff friendly, approachable, and helpful?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('retail', 32),
    text: 'Do staff have sufficient product knowledge?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('retail', 33),
    text: 'Are there enough staff members on the floor during peak hours?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('retail', 34),
    text: 'Are queues at the checkout managed efficiently?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('retail', 35),
    text: 'Are customers greeted upon entering the store?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('retail', 36),
    text: 'Are staff trained in handling customer inquiries and complaints?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('retail', 37),
    text: 'Are payment methods clearly displayed?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('retail', 38),
    text: 'Is the returns policy clearly communicated to customers?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('retail', 39),
    text: 'Is customer data handled in accordance with privacy regulations?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('retail', 40),
    text: 'Are there facilities for customers with disabilities (e.g., ramps, accessible restrooms)?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service',
    type: 'audit'
  }
];

// Retail evaluation questions
const retailEvaluationQuestions: EvaluationQuestion[] = [
  // Store Performance & Appeal
  {
    id: generateId('retail_eval', 1),
    text: 'How effective is the current store layout in guiding customer flow?',
    category: 'Shops (Retail)',
    subcategory: 'Store Performance & Appeal',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 2),
    text: 'How appealing is the visual merchandising in attracting customer attention?',
    category: 'Shops (Retail)',
    subcategory: 'Store Performance & Appeal',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 3),
    text: 'How well does the store\'s ambiance align with its target market?',
    category: 'Shops (Retail)',
    subcategory: 'Store Performance & Appeal',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 4),
    text: 'To what extent does the store cleanliness contribute to a positive shopping experience?',
    category: 'Shops (Retail)',
    subcategory: 'Store Performance & Appeal',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 5),
    text: 'How efficient is the overall use of retail space?',
    category: 'Shops (Retail)',
    subcategory: 'Store Performance & Appeal',
    type: 'evaluation'
  },
  
  // Stock & Inventory Effectiveness
  {
    id: generateId('retail_eval', 6),
    text: 'How well does the current inventory management system meet customer demand?',
    category: 'Shops (Retail)',
    subcategory: 'Stock & Inventory Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 7),
    text: 'What is the rate of stockouts for key product lines?',
    category: 'Shops (Retail)',
    subcategory: 'Stock & Inventory Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 8),
    text: 'How effective are the strategies for minimizing stock loss?',
    category: 'Shops (Retail)',
    subcategory: 'Stock & Inventory Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 9),
    text: 'How responsive is the inventory to changing customer trends?',
    category: 'Shops (Retail)',
    subcategory: 'Stock & Inventory Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 10),
    text: 'What is the average shelf life of products before sale?',
    category: 'Shops (Retail)',
    subcategory: 'Stock & Inventory Effectiveness',
    type: 'evaluation'
  },
  
  // Customer Service Effectiveness
  {
    id: generateId('retail_eval', 11),
    text: 'How satisfied are customers with the helpfulness and approachability of staff (consider feedback)?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 12),
    text: 'How efficiently are customer inquiries and complaints resolved?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 13),
    text: 'What is the average customer wait time at checkout?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 14),
    text: 'How effectively are staff utilizing product knowledge to drive sales?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 15),
    text: 'How well do loyalty programs and special offers encourage repeat business?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 16),
    text: 'To what extent does customer feedback influence business decisions?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 17),
    text: 'How effectively are staff trained on customer service best practices?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 18),
    text: 'What is the rate of successful returns/exchanges and associated customer satisfaction?',
    category: 'Shops (Retail)',
    subcategory: 'Customer Service Effectiveness',
    type: 'evaluation'
  },
  
  // Health & Safety Performance
  {
    id: generateId('retail_eval', 19),
    text: 'How effective are current safety measures in preventing accidents?',
    category: 'Shops (Retail)',
    subcategory: 'Health & Safety Performance',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 20),
    text: 'Are staff consistently adhering to health and safety protocols?',
    category: 'Shops (Retail)',
    subcategory: 'Health & Safety Performance',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 21),
    text: 'How prepared are staff to respond to emergency situations?',
    category: 'Shops (Retail)',
    subcategory: 'Health & Safety Performance',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 22),
    text: 'What is the record of safety incidents within the store?',
    category: 'Shops (Retail)',
    subcategory: 'Health & Safety Performance',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 23),
    text: 'How effective is the maintenance schedule for safety equipment?',
    category: 'Shops (Retail)',
    subcategory: 'Health & Safety Performance',
    type: 'evaluation'
  },
  
  // Security Effectiveness
  {
    id: generateId('retail_eval', 24),
    text: 'How effective are current security measures in deterring theft?',
    category: 'Shops (Retail)',
    subcategory: 'Security Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 25),
    text: 'What is the estimated rate of shrinkage (inventory loss due to theft or damage)?',
    category: 'Shops (Retail)',
    subcategory: 'Security Effectiveness',
    type: 'evaluation'
  },
  {
    id: generateId('retail_eval', 26),
    text: 'How well do staff follow security protocols?',
    category: 'Shops (Retail)',
    subcategory: 'Security Effectiveness',
    type: 'evaluation'
  }
];

// Takeaways audit questions
const takeawaysAuditQuestions: EvaluationQuestion[] = [
  // Food Safety and Hygiene
  {
    id: generateId('takeaway', 1),
    text: 'Do staff wear appropriate personal protective equipment (PPE) such as gloves and hairnets?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 2),
    text: 'Are handwashing facilities readily accessible and used frequently?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 3),
    text: 'Are food preparation surfaces cleaned and sanitized regularly?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 4),
    text: 'Are separate chopping boards and utensils used for raw and cooked foods?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 5),
    text: 'Are refrigerators and freezers operating at the correct temperatures?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 6),
    text: 'Is food stored correctly to prevent cross-contamination?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 7),
    text: 'Are food temperatures checked and recorded regularly?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 8),
    text: 'Are cooked foods cooled down rapidly and stored correctly?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 9),
    text: 'Are reheating procedures adequate to ensure food safety?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 10),
    text: 'Are food delivery vehicles clean and temperature-controlled (if applicable)?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 11),
    text: 'Are pest control measures in place?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 12),
    text: 'Is waste disposed of hygienically?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 13),
    text: 'Are staff trained in basic food hygiene practices?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 14),
    text: 'Are food allergens clearly identified and managed?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 15),
    text: 'Is there a system for tracking food origins and batch numbers?',
    category: 'Takeaways',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  
  // Operations
  {
    id: generateId('takeaway', 16),
    text: 'Is the ordering process clear and efficient?',
    category: 'Takeaways',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 17),
    text: 'Are orders prepared accurately and in a timely manner?',
    category: 'Takeaways',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 18),
    text: 'Is packaging suitable for the type of food being served?',
    category: 'Takeaways',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 19),
    text: 'Are portion sizes consistent?',
    category: 'Takeaways',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 20),
    text: 'Are prices clearly displayed on the menu?',
    category: 'Takeaways',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 21),
    text: 'Is there a system for managing online and phone orders?',
    category: 'Takeaways',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 22),
    text: 'Is the takeaway area clean and tidy?',
    category: 'Takeaways',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 23),
    text: 'Are staff efficient in handling payments?',
    category: 'Takeaways',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 24),
    text: 'Is there adequate lighting in the preparation and serving areas?',
    category: 'Takeaways',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 25),
    text: 'Are cleaning schedules in place and followed?',
    category: 'Takeaways',
    subcategory: 'Operations',
    type: 'audit'
  },
  
  // Customer Service
  {
    id: generateId('takeaway', 26),
    text: 'Are staff polite and efficient when taking orders?',
    category: 'Takeaways',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 27),
    text: 'Are estimated waiting times communicated accurately?',
    category: 'Takeaways',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 28),
    text: 'Are customer complaints handled promptly and professionally?',
    category: 'Takeaways',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 29),
    text: 'Is feedback sought from customers?',
    category: 'Takeaways',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('takeaway', 30),
    text: 'Are special dietary requirements accommodated where possible?',
    category: 'Takeaways',
    subcategory: 'Customer Service',
    type: 'audit'
  }
];

// Takeaways evaluation questions
const takeawaysEvaluationQuestions: EvaluationQuestion[] = [
  // Food Quality & Preparation Evaluation
  {
    id: generateId('takeaway_eval', 1),
    text: 'How consistently is the food quality maintained?',
    category: 'Takeaways',
    subcategory: 'Food Quality & Preparation',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 2),
    text: 'What is the level of customer satisfaction with the taste and freshness of the food (consider reviews)?',
    category: 'Takeaways',
    subcategory: 'Food Quality & Preparation',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 3),
    text: 'How effectively are food preparation processes adhering to hygiene standards?',
    category: 'Takeaways',
    subcategory: 'Food Quality & Preparation',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 4),
    text: 'What is the rate of errors in order preparation?',
    category: 'Takeaways',
    subcategory: 'Food Quality & Preparation',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 5),
    text: 'How well does the packaging maintain food temperature and quality during transport?',
    category: 'Takeaways',
    subcategory: 'Food Quality & Preparation',
    type: 'evaluation'
  },
  
  // Hygiene & Cleanliness Evaluation
  {
    id: generateId('takeaway_eval', 6),
    text: 'How effectively are cleaning schedules being implemented and monitored?',
    category: 'Takeaways',
    subcategory: 'Hygiene & Cleanliness',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 7),
    text: 'What is the overall impression of cleanliness in food preparation and serving areas (customer and internal observations)?',
    category: 'Takeaways',
    subcategory: 'Hygiene & Cleanliness',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 8),
    text: 'How compliant are staff with PPE requirements?',
    category: 'Takeaways',
    subcategory: 'Hygiene & Cleanliness',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 9),
    text: 'How effective are pest control measures in preventing infestations?',
    category: 'Takeaways',
    subcategory: 'Hygiene & Cleanliness',
    type: 'evaluation'
  },
  
  // Ordering & Service Evaluation
  {
    id: generateId('takeaway_eval', 10),
    text: 'How efficient is the order taking process from the customer\'s perspective?',
    category: 'Takeaways',
    subcategory: 'Ordering & Service',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 11),
    text: 'What is the average order fulfillment time?',
    category: 'Takeaways',
    subcategory: 'Ordering & Service',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 12),
    text: 'How accurate are online and phone orders compared to in-person orders?',
    category: 'Takeaways',
    subcategory: 'Ordering & Service',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 13),
    text: 'How satisfied are customers with the politeness and efficiency of staff?',
    category: 'Takeaways',
    subcategory: 'Ordering & Service',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 14),
    text: 'What is the success rate of on-time deliveries (if applicable)?',
    category: 'Takeaways',
    subcategory: 'Ordering & Service',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 15),
    text: 'How effectively are online ordering platforms functioning and user-friendly?',
    category: 'Takeaways',
    subcategory: 'Ordering & Service',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 16),
    text: 'How well are customer complaints resolved and what is the impact on customer retention?',
    category: 'Takeaways',
    subcategory: 'Ordering & Service',
    type: 'evaluation'
  },
  
  // Premises Evaluation
  {
    id: generateId('takeaway_eval', 17),
    text: 'How inviting and functional is the customer waiting area?',
    category: 'Takeaways',
    subcategory: 'Premises',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 18),
    text: 'How well does the exterior appearance reflect the brand image?',
    category: 'Takeaways',
    subcategory: 'Premises',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 19),
    text: 'How effective is the lighting in creating a safe and welcoming environment?',
    category: 'Takeaways',
    subcategory: 'Premises',
    type: 'evaluation'
  },
  {
    id: generateId('takeaway_eval', 20),
    text: 'How clear and informative are the menus (physical and online)?',
    category: 'Takeaways',
    subcategory: 'Premises',
    type: 'evaluation'
  }
];

// Restaurants audit questions
const restaurantsAuditQuestions: EvaluationQuestion[] = [
  // Food Safety and Hygiene (Same as Takeaways, plus additional restaurant-specific questions)
  {
    id: generateId('restaurant', 1),
    text: 'Are dishwashing facilities operating correctly and at the correct temperatures?',
    category: 'Restaurants',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 2),
    text: 'Are tables cleaned and sanitized between customers?',
    category: 'Restaurants',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 3),
    text: 'Are menus clean and in good condition?',
    category: 'Restaurants',
    subcategory: 'Food Safety and Hygiene',
    type: 'audit'
  },
  
  // Operations
  {
    id: generateId('restaurant', 4),
    text: 'Is there an efficient system for taking and processing orders?',
    category: 'Restaurants',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 5),
    text: 'Is there good communication between kitchen and serving staff?',
    category: 'Restaurants',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 6),
    text: 'Are meals presented attractively?',
    category: 'Restaurants',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 7),
    text: 'Are table settings complete and clean?',
    category: 'Restaurants',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 8),
    text: 'Is the ambiance of the restaurant appropriate for its style?',
    category: 'Restaurants',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 9),
    text: 'Are restrooms clean, well-maintained, and adequately stocked?',
    category: 'Restaurants',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 10),
    text: 'Is there a system for managing reservations?',
    category: 'Restaurants',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 11),
    text: 'Is there a process for handling no-shows?',
    category: 'Restaurants',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 12),
    text: 'Is the bar area clean and well-stocked (if applicable)?',
    category: 'Restaurants',
    subcategory: 'Operations',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 13),
    text: 'Are alcoholic beverages served responsibly?',
    category: 'Restaurants',
    subcategory: 'Operations',
    type: 'audit'
  },
  
  // Customer Service
  {
    id: generateId('restaurant', 14),
    text: 'Are customers greeted warmly and seated promptly?',
    category: 'Restaurants',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 15),
    text: 'Are staff attentive to customers\' needs without being intrusive?',
    category: 'Restaurants',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 16),
    text: 'Are staff knowledgeable about the menu, including ingredients and allergens?',
    category: 'Restaurants',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 17),
    text: 'Are drink orders taken and served efficiently?',
    category: 'Restaurants',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 18),
    text: 'Are meals served at the correct temperature?',
    category: 'Restaurants',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 19),
    text: 'Are customer requests handled politely and efficiently?',
    category: 'Restaurants',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 20),
    text: 'Is the bill presented accurately and promptly?',
    category: 'Restaurants',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 21),
    text: 'Are different payment methods accepted?',
    category: 'Restaurants',
    subcategory: 'Customer Service',
    type: 'audit'
  },
  {
    id: generateId('restaurant', 22),
    text: 'Is feedback actively sought from diners?',
    category: 'Restaurants',
    subcategory: 'Customer Service',
    type: 'audit'
  }
];

// Restaurants evaluation questions
const restaurantsEvaluationQuestions: EvaluationQuestion[] = [
  // Food Quality & Presentation Evaluation
  {
    id: generateId('restaurant_eval', 1),
    text: 'How consistent is the food presentation across different chefs and service times?',
    category: 'Restaurants',
    subcategory: 'Food Quality & Presentation',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 2),
    text: 'What is the level of customer satisfaction with the overall dining experience related to food?',
    category: 'Restaurants',
    subcategory: 'Food Quality & Presentation',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 3),
    text: 'How well do menu items meet customer expectations based on their descriptions?',
    category: 'Restaurants',
    subcategory: 'Food Quality & Presentation',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 4),
    text: 'How effective is the kitchen in managing food waste?',
    category: 'Restaurants',
    subcategory: 'Food Quality & Presentation',
    type: 'evaluation'
  },
  
  // Service & Staff Evaluation
  {
    id: generateId('restaurant_eval', 5),
    text: 'How attentive and proactive are servers in anticipating customer needs?',
    category: 'Restaurants',
    subcategory: 'Service & Staff',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 6),
    text: 'What is the average time it takes for orders to be taken and served?',
    category: 'Restaurants',
    subcategory: 'Service & Staff',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 7),
    text: 'How knowledgeable are staff about menu details, allergens, and specials?',
    category: 'Restaurants',
    subcategory: 'Service & Staff',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 8),
    text: 'How effectively do staff handle customer requests and concerns?',
    category: 'Restaurants',
    subcategory: 'Service & Staff',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 9),
    text: 'What is the level of customer satisfaction with the overall service experience (consider tips, feedback)?',
    category: 'Restaurants',
    subcategory: 'Service & Staff',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 10),
    text: 'How well does the front-of-house staff manage seating and reservations?',
    category: 'Restaurants',
    subcategory: 'Service & Staff',
    type: 'evaluation'
  },
  
  // Ambiance & Atmosphere Evaluation
  {
    id: generateId('restaurant_eval', 11),
    text: 'How well does the restaurant\'s ambiance contribute to the overall dining experience?',
    category: 'Restaurants',
    subcategory: 'Ambiance & Atmosphere',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 12),
    text: 'Is the noise level consistently comfortable for conversation?',
    category: 'Restaurants',
    subcategory: 'Ambiance & Atmosphere',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 13),
    text: 'How effective is the lighting in creating the desired mood?',
    category: 'Restaurants',
    subcategory: 'Ambiance & Atmosphere',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 14),
    text: 'How comfortable and well-maintained is the furniture?',
    category: 'Restaurants',
    subcategory: 'Ambiance & Atmosphere',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 15),
    text: 'How clean and appealing are the restrooms to customers?',
    category: 'Restaurants',
    subcategory: 'Ambiance & Atmosphere',
    type: 'evaluation'
  },
  
  // Hygiene & Cleanliness Evaluation
  {
    id: generateId('restaurant_eval', 16),
    text: 'How effectively are table turnover and cleaning procedures implemented?',
    category: 'Restaurants',
    subcategory: 'Hygiene & Cleanliness',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 17),
    text: 'What is the perceived level of cleanliness by customers in the dining area?',
    category: 'Restaurants',
    subcategory: 'Hygiene & Cleanliness',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 18),
    text: 'How well are dishwashing processes ensuring proper sanitation?',
    category: 'Restaurants',
    subcategory: 'Hygiene & Cleanliness',
    type: 'evaluation'
  },
  
  // Reservations & Booking Evaluation
  {
    id: generateId('restaurant_eval', 19),
    text: 'How user-friendly and efficient is the reservation system?',
    category: 'Restaurants',
    subcategory: 'Reservations & Booking',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 20),
    text: 'What is the rate of no-shows and how effectively is it managed?',
    category: 'Restaurants',
    subcategory: 'Reservations & Booking',
    type: 'evaluation'
  },
  {
    id: generateId('restaurant_eval', 21),
    text: 'How satisfied are customers with the reservation experience?',
    category: 'Restaurants',
    subcategory: 'Reservations & Booking',
    type: 'evaluation'
  }
];

// Combine all questions into a single array
export const allEvaluationQuestions: EvaluationQuestion[] = [
  ...retailAuditQuestions,
  ...retailEvaluationQuestions,
  ...takeawaysAuditQuestions,
  ...takeawaysEvaluationQuestions,
  ...restaurantsAuditQuestions,
  ...restaurantsEvaluationQuestions,
  // Additional categories would be added here
];

// Function to get questions filtered by category, type, etc.
export const getQuestionsByCategory = (category: string): EvaluationQuestion[] => {
  return allEvaluationQuestions.filter(q => q.category === category);
};

export const getQuestionsByType = (type: 'audit' | 'evaluation' | 'both'): EvaluationQuestion[] => {
  return allEvaluationQuestions.filter(q => q.type === type || type === 'both');
};

export const getQuestionsBySubcategory = (subcategory: string): EvaluationQuestion[] => {
  return allEvaluationQuestions.filter(q => q.subcategory === subcategory);
};

// Function to get all unique categories
export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  allEvaluationQuestions.forEach(q => categories.add(q.category));
  return Array.from(categories);
};

// Function to get all subcategories for a given category
export const getSubcategoriesByCategory = (category: string): string[] => {
  const subcategories = new Set<string>();
  allEvaluationQuestions
    .filter(q => q.category === category)
    .forEach(q => subcategories.add(q.subcategory));
  return Array.from(subcategories);
};
