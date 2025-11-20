import { Scheme } from '../types';

export const schemes: Scheme[] = [
  // Agriculture Schemes
  {
    id: 'PM-KISAN',
    name: {
      en: 'Pradhan Mantri Kisan Samman Nidhi',
      hi: 'प्रधानमंत्री किसान सम्मान निधि',
      te: 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి'
    },
    description: {
      en: 'Income support of ₹6,000/year for small and marginal farmers',
      hi: 'छोटे और सीमांत किसानों के लिए ₹6,000/वर्ष की आय सहायता',
      te: 'చిన్న మరియు సన్నకారు రైతులకు సంవత్సరానికి ₹6,000 ఆదాయ మద్దతు'
    },
    category: 'agriculture',
    eligibility: {
      age: [18, 75],
      occupation: ['Farmer'],
      landOwnership: true,
      income: 200000,
    },
    benefits: {
      en: '₹6,000 per year in 3 installments of ₹2,000 each',
      hi: '₹2,000 की 3 किस्तों में प्रति वर्ष ₹6,000',
      te: 'సంవత్సరానికి ₹6,000, ₹2,000 చొప్పున 3 వాయిదాలలో'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Land Records', hi: 'भूमि रिकॉर्ड', te: 'భూమి రికార్డులు' },
      { en: 'Bank Account Details', hi: 'बैंक खाता विवरण', te: 'బ్యాంక్ ఖాతా వివరాలు' }
    ],
    applicationLink: 'https://pmkisan.gov.in',
    deadline: '2024-12-31',
    difficulty: 'Easy',
    rating: 4.5,
    successRate: 89,
    processingTime: {
      en: '30-45 days',
      hi: '30-45 दिन',
      te: '30-45 రోజులు'
    },
  },
  {
    id: 'PM-FASAL-BIMA',
    name: {
      en: 'Pradhan Mantri Fasal Bima Yojana',
      hi: 'प्रधानमंत्री फसल बीमा योजना',
      te: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన'
    },
    description: {
      en: 'Crop insurance scheme for farmers against crop losses',
      hi: 'फसल नुकसान के खिलाफ किसानों के लिए फसल बीमा योजना',
      te: 'పంట నష్టాలకు వ్యతిరేకంగా రైతులకు పంటల బీమా పథకం'
    },
    category: 'agriculture',
    eligibility: {
      age: [18, 80],
      occupation: ['Farmer'],
      landOwnership: true,
    },
    benefits: {
      en: 'Crop insurance coverage up to ₹2 lakh per hectare',
      hi: 'प्रति हेक्टेयर ₹2 लाख तक का फसल बीमा कवर',
      te: 'హెక్టారుకు ₹2 లక్షల వరకు పంటల బీమా కవరేజీ'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Land Records', hi: 'भूमि रिकॉर्ड', te: 'భూమి రికార్డులు' },
      { en: 'Crop Details', hi: 'फसल विवरण', te: 'పంట వివరాలు' },
      { en: 'Bank Account', hi: 'बैंक खाता', te: 'బ్యాంక్ ఖాతా' }
    ],
    applicationLink: 'https://pmfby.gov.in',
    difficulty: 'Medium',
    rating: 4.2,
    successRate: 76,
    processingTime: {
      en: '60-90 days',
      hi: '60-90 दिन',
      te: '60-90 రోజులు'
    },
  },
  {
    id: 'KCC',
    name: {
      en: 'Kisan Credit Card',
      hi: 'किसान क्रेडिट कार्ड',
      te: 'కిసాన్ క్రెడిట్ కార్డ్'
    },
    description: {
      en: 'Credit facility for farmers to meet agricultural expenses',
      hi: 'कृषि खर्चों को पूरा करने के लिए किसानों के लिए क्रेडिट सुविधा',
      te: 'వ్యవసాయ ఖర్చులను తీర్చడానికి రైతులకు క్రెడిట్ సౌకర్యం'
    },
    category: 'agriculture',
    eligibility: {
      age: [18, 75],
      occupation: ['Farmer'],
      landOwnership: true,
    },
    benefits: {
      en: 'Credit limit up to ₹3 lakh at 7% interest rate',
      hi: '7% ब्याज दर पर ₹3 लाख तक की क्रेडिट सीमा',
      te: '7% వడ్డీ రేటుతో ₹3 లక్షల వరకు క్రెడిట్ పరిమితి'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Land Records', hi: 'भूमि रिकॉर्ड', te: 'భూమి రికార్డులు' },
      { en: 'Income Certificate', hi: 'आय प्रमाण पत्र', te: 'ఆదాయ ధృవీకరణ పత్రం' }
    ],
    applicationLink: 'https://kcc.gov.in',
    difficulty: 'Medium',
    rating: 4.3,
    successRate: 82,
    processingTime: {
      en: '15-30 days',
      hi: '15-30 दिन',
      te: '15-30 రోజులు'
    },
  },

  // Education Schemes
  {
    id: 'NSP',
    name: {
      en: 'National Scholarship Portal',
      hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल',
      te: 'జాతీయ స్కాలర్‌షిప్ పోర్టల్'
    },
    description: {
      en: 'Scholarships for students from economically weaker sections',
      hi: 'आर्थिक रूप से कमजोर वर्गों के छात्रों के लिए छात्रवृत्ति',
      te: 'ఆర్థికంగా వెనుకబడిన వర్గాల విద్యార్థులకు స్కాలర్‌షిప్‌లు'
    },
    category: 'education',
    eligibility: {
      age: [16, 25],
      income: 250000,
      educationLevel: ['12th', 'Graduate', 'Post-Graduate'],
    },
    benefits: {
      en: 'Scholarships from ₹10,000 to ₹80,000 per year',
      hi: 'प्रति वर्ष ₹10,000 से ₹80,000 तक की छात्रवृत्ति',
      te: 'సంవత్సరానికి ₹10,000 నుండి ₹80,000 వరకు స్కాలర్‌షిప్‌లు'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Income Certificate', hi: 'आय प्रमाण पत्र', te: 'ఆదాయ ధృవీకరణ పత్రం' },
      { en: 'Academic Records', hi: 'शैक्षणिक रिकॉर्ड', te: 'విద్యా రికార్డులు' }
    ],
    applicationLink: 'https://scholarships.gov.in',
    deadline: '2024-10-31',
    difficulty: 'Easy',
    rating: 4.4,
    successRate: 65,
    processingTime: {
      en: '90-120 days',
      hi: '90-120 दिन',
      te: '90-120 రోజులు'
    },
  },
  {
    id: 'PMSS',
    name: {
      en: 'Prime Minister Scholarship Scheme',
      hi: 'प्रधानमंत्री छात्रवृत्ति योजना',
      te: 'ప్రధాన మంత్రి స్కాలర్‌షిప్ పథకం'
    },
    description: {
      en: 'Scholarships for children of ex-servicemen and serving personnel',
      hi: 'पूर्व सैनिकों और सेवारत कर्मियों के बच्चों के लिए छात्रवृत्ति',
      te: 'మాజీ సైనికులు మరియు సైనిక సిబ్బంది పిల్లలకు స్కాలర్‌షిప్‌లు'
    },
    category: 'education',
    eligibility: {
      age: [18, 25],
      educationLevel: ['Graduate', 'Post-Graduate'],
      category: ['Ex-servicemen children'],
    },
    benefits: {
      en: '₹2,500 per month for boys, ₹3,000 per month for girls',
      hi: 'लड़कों के लिए ₹2,500 प्रति माह, लड़कियों के लिए ₹3,000 प्रति माह',
      te: 'బాలురకు నెలకు ₹2,500, బాలికలకు నెలకు ₹3,000'
    },
    docsRequired: [
      { en: 'Service Certificate', hi: 'सेवा प्रमाण पत्र', te: 'సేవా ధృవీకరణ పత్రం' },
      { en: 'Academic Records', hi: 'शैक्षणिक रिकॉर्ड', te: 'విద్యా రికార్డులు' },
      { en: 'Income Certificate', hi: 'आय प्रमाण पत्र', te: 'ఆదాయ ధృవీకరణ పత్రం' }
    ],
    applicationLink: 'https://ksb.gov.in',
    difficulty: 'Medium',
    rating: 4.6,
    successRate: 78,
    processingTime: {
      en: '60-90 days',
      hi: '60-90 दिन',
      te: '60-90 రోజులు'
    },
  },
  {
    id: 'BEGUM-HAZRAT',
    name: {
      en: 'Begum Hazrat Mahal National Scholarship',
      hi: 'बेगम हज़रत महल राष्ट्रीय छात्रवृत्ति',
      te: 'బేగం హజ్రత్ మహల్ జాతీయ స్కాలర్‌షిప్'
    },
    description: {
      en: 'Scholarships for meritorious girl students from minority communities',
      hi: 'अल्पसंख्यक समुदायों की मेधावी छात्राओं के लिए छात्रवृत्ति',
      te: 'మైనారిటీ వర్గాల ప్రతిభావంతులైన బాలికలకు స్కాలర్‌షిప్‌లు'
    },
    category: 'education',
    eligibility: {
      age: [18, 25],
      income: 200000,
      educationLevel: ['Graduate', 'Post-Graduate'],
    },
    benefits: {
      en: '₹5,000 to ₹6,000 per year',
      hi: '₹5,000 से ₹6,000 प्रति वर्ष',
      te: 'సంవత్సరానికి ₹5,000 నుండి ₹6,000'
    },
    docsRequired: [
      { en: 'Minority Certificate', hi: 'अल्पसंख्यक प्रमाण पत्र', te: 'మైనారిటీ ధృవీకరణ పత్రం' },
      { en: 'Income Certificate', hi: 'आय प्रमाण पत्र', te: 'ఆదాయ ధృవీకరణ పత్రం' },
      { en: 'Academic Records', hi: 'शैक्षणिक रिकॉर्ड', te: 'విద్యా రికార్డులు' }
    ],
    applicationLink: 'https://scholarships.gov.in',
    difficulty: 'Easy',
    rating: 4.1,
    successRate: 71,
    processingTime: {
      en: '120-150 days',
      hi: '120-150 दिन',
      te: '120-150 రోజులు'
    },
  },

  // Healthcare Schemes
  {
    id: 'PMJAY',
    name: {
      en: 'Pradhan Mantri Jan Arogya Yojana',
      hi: 'प्रधानमंत्री जन आरोग्य योजना',
      te: 'ప్రధాన మంత్రి జన్ ఆరోగ్య యోజన'
    },
    description: {
      en: 'Health insurance scheme providing coverage up to ₹5 lakh',
      hi: '₹5 लाख तक का कवरेज प्रदान करने वाली स्वास्थ्य बीमा योजना',
      te: '₹5 లక్షల వరకు కవరేజీని అందించే ఆరోగ్య బీమా పథకం'
    },
    category: 'healthcare',
    eligibility: {
      income: 120000,
      category: ['BPL', 'SC', 'ST'],
    },
    benefits: {
      en: 'Health insurance coverage up to ₹5 lakh per family per year',
      hi: 'प्रति परिवार प्रति वर्ष ₹5 लाख तक का स्वास्थ्य बीमा कवर',
      te: 'కుటుంబానికి సంవత్సరానికి ₹5 లక్షల వరకు ఆరోగ్య బీమా కవరేజీ'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Ration Card', hi: 'राशन कार्ड', te: 'రేషన్ కార్డు' },
      { en: 'Income Certificate', hi: 'आय प्रमाण पत्र', te: 'ఆదాయ ధృవీకరణ పత్రం' }
    ],
    applicationLink: 'https://pmjay.gov.in',
    difficulty: 'Easy',
    rating: 4.7,
    successRate: 94,
    processingTime: {
      en: '7-15 days',
      hi: '7-15 दिन',
      te: '7-15 రోజులు'
    },
  },
  {
    id: 'PMSS-HEALTHCARE',
    name: {
      en: 'Pradhan Mantri Swasthya Suraksha Yojana',
      hi: 'प्रधानमंत्री स्वास्थ्य सुरक्षा योजना',
      te: 'ప్రధాన మంత్రి స్వాస్థ్య సురక్ష యోజన'
    },
    description: {
      en: 'Healthcare infrastructure development and medical education',
      hi: 'स्वास्थ्य देखभाल बुनियादी ढांचा विकास और चिकित्सा शिक्षा',
      te: 'ఆరోగ్య సంరక్షణ మౌలిక సదుపాయాల అభివృద్ధి మరియు వైద్య విద్య'
    },
    category: 'healthcare',
    eligibility: {
      age: [18, 65],
      income: 300000,
    },
    benefits: {
      en: 'Free medical treatment at government hospitals',
      hi: 'सरकारी अस्पतालों में मुफ्त चिकित्सा उपचार',
      te: 'ప్రభుత్వ ఆసుపత్రుల్లో ఉచిత వైద్య చికిత్స'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Income Certificate', hi: 'आय प्रमाण पत्र', te: 'ఆదాయ ధృవీకరణ పత్రం' },
      { en: 'Medical Records', hi: 'चिकित्सा रिकॉर्ड', te: 'వైద్య రికార్డులు' }
    ],
    applicationLink: 'https://mohfw.gov.in',
    difficulty: 'Medium',
    rating: 4.0,
    successRate: 68,
    processingTime: {
      en: '30-60 days',
      hi: '30-60 दिन',
      te: '30-60 రోజులు'
    },
  },

  // Housing Schemes
  {
    id: 'PMAY-G',
    name: {
      en: 'Pradhan Mantri Awas Yojana - Gramin',
      hi: 'प्रधानमंत्री आवास योजना - ग्रामीण',
      te: 'ప్రధాన మంత్రి ఆవాస్ యోజన - గ్రామీణ'
    },
    description: {
      en: 'Housing scheme for rural poor families',
      hi: 'ग्रामीण गरीब परिवारों के लिए आवास योजना',
      te: 'గ్రామీణ పేద కుటుంబాలకు గృహనిర్మాణ పథకం'
    },
    category: 'housing',
    eligibility: {
      age: [18, 70],
      income: 120000,
      location: ['Rural'],
    },
    benefits: {
      en: '₹1.30 lakh assistance for house construction',
      hi: 'घर के निर्माण के लिए ₹1.30 लाख की सहायता',
      te: 'ఇంటి నిర్మాణానికి ₹1.30 లక్షల సహాయం'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Income Certificate', hi: 'आय प्रमाण पत्र', te: 'ఆదాయ ధృవీకరణ పత్రం' },
      { en: 'Land Papers', hi: 'भूमि के कागजात', te: 'భూమి పత్రాలు' }
    ],
    applicationLink: 'https://pmayg.nic.in',
    difficulty: 'Medium',
    rating: 4.3,
    successRate: 73,
    processingTime: {
      en: '180-365 days',
      hi: '180-365 दिन',
      te: '180-365 రోజులు'
    },
  },
  {
    id: 'PMAY-U',
    name: {
      en: 'Pradhan Mantri Awas Yojana - Urban',
      hi: 'प्रधानमंत्री आवास योजना - शहरी',
      te: 'ప్రధాన మంత్రి ఆవాస్ యోజన - పట్టణ'
    },
    description: {
      en: 'Housing scheme for urban poor families',
      hi: 'शहरी गरीब परिवारों के लिए आवास योजना',
      te: 'పట్టణ పేద కుటుంబాలకు గృహనిర్మాణ పథకం'
    },
    category: 'housing',
    eligibility: {
      age: [21, 70],
      income: 300000,
      location: ['Urban'],
    },
    benefits: {
      en: 'Interest subsidy up to ₹2.67 lakh on home loans',
      hi: 'होम लोन पर ₹2.67 लाख तक की ब्याज सब्सिडी',
      te: 'గృహ రుణాలపై ₹2.67 లక్షల వరకు వడ్డీ రాయితీ'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Income Certificate', hi: 'आय प्रमाण पत्र', te: 'ఆదాయ ధృవీకరణ పత్రం' },
      { en: 'Property Documents', hi: 'संपत्ति के दस्तावेज', te: 'ఆస్తి పత్రాలు' }
    ],
    applicationLink: 'https://pmaymis.gov.in',
    difficulty: 'Hard',
    rating: 4.1,
    successRate: 62,
    processingTime: {
      en: '90-180 days',
      hi: '90-180 दिन',
      te: '90-180 రోజులు'
    },
  },

  // Employment Schemes
  {
    id: 'MGNREGA',
    name: {
      en: 'Mahatma Gandhi National Rural Employment Guarantee Act',
      hi: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम',
      te: 'మహాత్మా గాంధీ జాతీయ గ్రామీణ ఉపాధి హామీ చట్టం'
    },
    description: {
      en: 'Employment guarantee scheme for rural households',
      hi: 'ग्रामीण परिवारों के लिए रोजगार गारंटी योजना',
      te: 'గ్రామీణ కుటుంబాలకు ఉపాధి హామీ పథకం'
    },
    category: 'employment',
    eligibility: {
      age: [18, 65],
      location: ['Rural'],
    },
    benefits: {
      en: 'Guaranteed 100 days of employment per year',
      hi: 'प्रति वर्ष 100 दिनों के रोजगार की गारंटी',
      te: 'సంవత్సరానికి 100 రోజుల ఉపాధి హామీ'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Job Card', hi: 'जॉब कार्ड', te: 'జాబ్ కార్డ్' },
      { en: 'Bank Account Details', hi: 'बैंक खाता विवरण', te: 'బ్యాంక్ ఖాతా వివరాలు' }
    ],
    applicationLink: 'https://nrega.nic.in',
    difficulty: 'Easy',
    rating: 4.4,
    successRate: 88,
    processingTime: {
      en: '7-14 days',
      hi: '7-14 दिन',
      te: '7-14 రోజులు'
    },
  },
  {
    id: 'PMKVY',
    name: {
      en: 'Pradhan Mantri Kaushal Vikas Yojana',
      hi: 'प्रधानमंत्री कौशल विकास योजना',
      te: 'ప్రధాన మంత్రి కౌశల్ వికాస్ యోజన'
    },
    description: {
      en: 'Skill development program for youth',
      hi: 'युवाओं के लिए कौशल विकास कार्यक्रम',
      te: 'యువతకు నైపుణ్యాభివృద్ధి కార్యక్రమం'
    },
    category: 'employment',
    eligibility: {
      age: [18, 35],
      educationLevel: ['10th', '12th', 'Graduate'],
    },
    benefits: {
      en: 'Free skill training and certification',
      hi: 'मुफ्त कौशल प्रशिक्षण और प्रमाणन',
      te: 'ఉచిత నైపుణ్య శిక్షణ మరియు ధృవీకరణ'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Educational Certificate', hi: 'शैक्षिक प्रमाण पत्र', te: 'విద్యా ధృవీకరణ పత్రం' },
      { en: 'Bank Account', hi: 'बैंक खाता', te: 'బ్యాంక్ ఖాతా' }
    ],
    applicationLink: 'https://pmkvyofficial.org',
    difficulty: 'Easy',
    rating: 4.2,
    successRate: 79,
    processingTime: {
      en: '30-90 days',
      hi: '30-90 दिन',
      te: '30-90 రోజులు'
    },
  },

  // Women Welfare Schemes
  {
    id: 'PMJDY',
    name: {
      en: 'Pradhan Mantri Jan Dhan Yojana',
      hi: 'प्रधानमंत्री जन धन योजना',
      te: 'ప్రధాన మంత్రి జన్ ధన్ యోజన'
    },
    description: {
      en: 'Financial inclusion program with zero balance accounts',
      hi: 'शून्य शेष खातों के साथ वित्तीय समावेशन कार्यक्रम',
      te: 'జీరో బ్యాలెన్స్ ఖాతాలతో ఆర్థిక చేరిక కార్యక్రమం'
    },
    category: 'finance',
    eligibility: {
      age: [18, 100],
    },
    benefits: {
      en: 'Zero balance bank account with ₹2 lakh insurance',
      hi: '₹2 लाख बीमा के साथ शून्य शेष बैंक खाता',
      te: '₹2 లక్షల బీమాతో జీరో బ్యాలెన్స్ బ్యాంక్ ఖాతా'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Address Proof', hi: 'पता प्रमाण', te: 'చిరునామా రుజువు' }
    ],
    applicationLink: 'https://pmjdy.gov.in',
    difficulty: 'Easy',
    rating: 4.8,
    successRate: 96,
    processingTime: {
      en: '1-7 days',
      hi: '1-7 दिन',
      te: '1-7 రోజులు'
    },
  },
  {
    id: 'SUKANYA',
    name: {
      en: 'Sukanya Samriddhi Yojana',
      hi: 'सुकन्या समृद्धि योजना',
      te: 'సుకన్య సమృద్ధి యోజన'
    },
    description: {
      en: 'Savings scheme for girl child education and marriage',
      hi: 'बालिका शिक्षा और विवाह के लिए बचत योजना',
      te: 'ఆడపిల్లల చదువు మరియు వివాహం కోసం పొదుపు పథకం'
    },
    category: 'finance',
    eligibility: {
      age: [0, 10],
    },
    benefits: {
      en: 'High interest savings account with tax benefits',
      hi: 'कर लाभ के साथ उच्च ब्याज बचत खाता',
      te: 'పన్ను ప్రయోజనాలతో అధిక వడ్డీ పొదుపు ఖాతా'
    },
    docsRequired: [
      { en: 'Birth Certificate', hi: 'जन्म प्रमाण पत्र', te: 'జనన ధృవీకరణ పత్రం' },
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Bank Account', hi: 'बैंक खाता', te: 'బ్యాంక్ ఖాతా' }
    ],
    applicationLink: 'https://nsiindia.gov.in',
    difficulty: 'Easy',
    rating: 4.6,
    successRate: 92,
    processingTime: {
      en: '1-3 days',
      hi: '1-3 दिन',
      te: '1-3 రోజులు'
    },
  },

  // Senior Citizens Schemes
  {
    id: 'PMVVY',
    name: {
      en: 'Pradhan Mantri Vaya Vandana Yojana',
      hi: 'प्रधानमंत्री वय वंदना योजना',
      te: 'ప్రధాన మంత్రి వయ వందన యోజన'
    },
    description: {
      en: 'Pension scheme for senior citizens',
      hi: 'वरिष्ठ नागरिकों के लिए पेंशन योजना',
      te: 'సీనియర్ సిటిజన్లకు పెన్షన్ పథకం'
    },
    category: 'pension',
    eligibility: {
      age: [60, 100],
    },
    benefits: {
      en: 'Guaranteed pension of 8% per annum',
      hi: 'प्रति वर्ष 8% की गारंटीकृत पेंशन',
      te: 'సంవత్సరానికి 8% గ్యారెంటీ పెన్షన్'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Age Proof', hi: 'आयु प्रमाण', te: 'వయస్సు రుజువు' },
      { en: 'Bank Account', hi: 'बैंक खाता', te: 'బ్యాంక్ ఖాతా' }
    ],
    applicationLink: 'https://licindia.in',
    difficulty: 'Medium',
    rating: 4.5,
    successRate: 85,
    processingTime: {
      en: '15-30 days',
      hi: '15-30 दिन',
      te: '15-30 రోజులు'
    },
  },
  {
    id: 'IGNOAPS',
    name: {
      en: 'Indira Gandhi National Old Age Pension Scheme',
      hi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना',
      te: 'ఇందిరా గాంధీ జాతీయ వృద్ధాప్య పెన్షన్ పథకం'
    },
    description: {
      en: 'Pension for elderly people below poverty line',
      hi: 'गरीबी रेखा से नीचे के बुजुर्गों के लिए पेंशन',
      te: 'దారిద్య్ర రేఖకు దిగువన ఉన్న వృద్ధులకు పెన్షన్'
    },
    category: 'pension',
    eligibility: {
      age: [60, 100],
      income: 100000,
      category: ['BPL'],
    },
    benefits: {
      en: '₹200-500 per month pension',
      hi: '₹200-500 प्रति माह पेंशन',
      te: 'నెలకు ₹200-500 పెన్షన్'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Age Certificate', hi: 'आयु प्रमाण पत्र', te: 'వయస్సు ధృవీకరణ పత్రం' },
      { en: 'BPL Card', hi: 'बीपीएल कार्ड', te: 'బిపిఎల్ కార్డ్' }
    ],
    applicationLink: 'https://nsap.nic.in',
    difficulty: 'Medium',
    rating: 4.0,
    successRate: 77,
    processingTime: {
      en: '60-90 days',
      hi: '60-90 दिन',
      te: '60-90 రోజులు'
    },
  },

  // Additional schemes
  {
    id: 'PMUY',
    name: {
      en: 'Pradhan Mantri Ujjwala Yojana',
      hi: 'प्रधानमंत्री उज्ज्वला योजना',
      te: 'ప్రధాన మంత్రి ఉజ్వల యోజన'
    },
    description: {
      en: 'Free LPG connections for women from BPL families',
      hi: 'बीपीएल परिवारों की महिलाओं के लिए मुफ्त एलपीजी कनेक्शन',
      te: 'బిపిఎల్ కుటుంబాల మహిళలకు ఉచిత ఎల్‌పిజి కనెక్షన్లు'
    },
    category: 'energy',
    eligibility: {
      age: [18, 100],
      income: 120000,
      category: ['BPL'],
    },
    benefits: {
      en: 'Free LPG connection and subsidy on refills',
      hi: 'मुफ्त एलपीजी कनेक्शन और रिफिल पर सब्सिडी',
      te: 'ఉచిత ఎల్‌పిజి కనెక్షన్ మరియు రీఫిల్స్‌పై రాయితీ'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'BPL Card', hi: 'बीपीएल कार्ड', te: 'బిపిఎల్ కార్డ్' },
      { en: 'Bank Account', hi: 'बैंक खाता', te: 'బ్యాంక్ ఖాతా' }
    ],
    applicationLink: 'https://pmuy.gov.in',
    difficulty: 'Easy',
    rating: 4.7,
    successRate: 91,
    processingTime: {
      en: '15-30 days',
      hi: '15-30 दिन',
      te: '15-30 రోజులు'
    },
  },
  {
    id: 'PMGSY',
    name: {
      en: 'Pradhan Mantri Gram Sadak Yojana',
      hi: 'प्रधानमंत्री ग्राम सड़क योजना',
      te: 'ప్రధాన మంత్రి గ్రామ్ సడక్ యోజన'
    },
    description: {
      en: 'Rural road connectivity program',
      hi: 'ग्रामीण सड़क संपर्क कार्यक्रम',
      te: 'గ్రామీణ రహదారి అనుసంధాన కార్యక్రమం'
    },
    category: 'infrastructure',
    eligibility: {
      location: ['Rural'],
    },
    benefits: {
      en: 'All-weather road connectivity to villages',
      hi: 'गांवों के लिए हर मौसम में सड़क संपर्क',
      te: 'గ్రామాలకు అన్ని వాతావరణ రహదారి అనుసంధానం'
    },
    docsRequired: [
      { en: 'Village Certificate', hi: 'ग्राम प्रमाण पत्र', te: 'గ్రామ ధృవీకరణ పత్రం' },
      { en: 'Population Certificate', hi: 'जनसंख्या प्रमाण पत्र', te: 'జనాభా ధృవీకరణ పత్రం' }
    ],
    applicationLink: 'https://pmgsy.nic.in',
    difficulty: 'Hard',
    rating: 4.1,
    successRate: 68,
    processingTime: {
      en: '365+ days',
      hi: '365+ दिन',
      te: '365+ రోజులు'
    },
  },
  {
    id: 'PMGKAY',
    name: {
      en: 'Pradhan Mantri Garib Kalyan Anna Yojana',
      hi: 'प्रधानमंत्री गरीब कल्याण अन्न योजना',
      te: 'ప్రధాన మంత్రి గరీబ్ కళ్యాణ్ అన్న యోజన'
    },
    description: {
      en: 'Free food grains for poor families',
      hi: 'गरीब परिवारों के लिए मुफ्त अनाज',
      te: 'పేద కుటుంబాలకు ఉచిత ఆహార ధాన్యాలు'
    },
    category: 'food',
    eligibility: {
      income: 120000,
      category: ['BPL'],
    },
    benefits: {
      en: 'Free rice/wheat and dal',
      hi: 'मुफ्त चावल/गेहूं और दाल',
      te: 'ఉచిత బియ్యం/గోధుమలు మరియు పప్పు'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Ration Card', hi: 'राशन कार्ड', te: 'రేషన్ కార్డు' }
    ],
    applicationLink: 'https://dfpd.gov.in',
    difficulty: 'Easy',
    rating: 4.6,
    successRate: 95,
    processingTime: {
      en: '1-7 days',
      hi: '1-7 दिन',
      te: '1-7 రోజులు'
    },
  },
  {
    id: 'PMJJBY',
    name: {
      en: 'Pradhan Mantri Jeevan Jyoti Bima Yojana',
      hi: 'प्रधानमंत्री जीवन ज्योति बीमा योजना',
      te: 'ప్రధాన మంత్రి జీవన్ జ్యోతి బీమా యోజన'
    },
    description: {
      en: 'Life insurance scheme for all',
      hi: 'सभी के लिए जीवन बीमा योजना',
      te: 'అందరికీ జీవిత బీమా పథకం'
    },
    category: 'insurance',
    eligibility: {
      age: [18, 50],
    },
    benefits: {
      en: '₹2 lakh life insurance coverage',
      hi: '₹2 लाख का जीवन बीमा कवर',
      te: '₹2 లక్షల జీవిత బీమా కవరేజీ'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Bank Account', hi: 'बैंक खाता', te: 'బ్యాంక్ ఖాతా' },
      { en: 'Nominee Details', hi: 'नॉमिनी विवरण', te: 'నామినీ వివరాలు' }
    ],
    applicationLink: 'https://jansuraksha.gov.in',
    difficulty: 'Easy',
    rating: 4.3,
    successRate: 87,
    processingTime: {
      en: '1-3 days',
      hi: '1-3 दिन',
      te: '1-3 రోజులు'
    },
  },
  {
    id: 'PMSBY',
    name: {
      en: 'Pradhan Mantri Suraksha Bima Yojana',
      hi: 'प्रधानमंत्री सुरक्षा बीमा योजना',
      te: 'ప్రధాన మంత్రి సురక్ష బీమా యోజన'
    },
    description: {
      en: 'Accident insurance for all',
      hi: 'सभी के लिए दुर्घटना बीमा',
      te: 'అందరికీ ప్రమాద బీమా'
    },
    category: 'insurance',
    eligibility: {
      age: [18, 70],
    },
    benefits: {
      en: '₹2 lakh accident insurance coverage',
      hi: '₹2 लाख का दुर्घटना बीमा कवर',
      te: '₹2 లక్షల ప్రమాద బీమా కవరేజీ'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Bank Account', hi: 'बैंक खाता', te: 'బ్యాంక్ ఖాతా' },
      { en: 'Nominee Details', hi: 'नॉमिनी विवरण', te: 'నామినీ వివరాలు' }
    ],
    applicationLink: 'https://jansuraksha.gov.in',
    difficulty: 'Easy',
    rating: 4.2,
    successRate: 89,
    processingTime: {
      en: '1-3 days',
      hi: '1-3 दिन',
      te: '1-3 రోజులు'
    },
  },
  {
    id: 'PM-KUSUM',
    name: {
      en: 'Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan',
      hi: 'प्रधानमंत्री किसान ऊर्जा सुरक्षा एवं उत्थान महाभियान',
      te: 'ప్రధాన మంత్రి కిసాన్ ఊర్జా సురక్షా ఏవం ఉత్థాన్ మహాభియాన్'
    },
    description: {
      en: 'Solar power scheme for farmers',
      hi: 'किसानों के लिए सौर ऊर्जा योजना',
      te: 'రైతులకు సౌర విద్యుత్ పథకం'
    },
    category: 'agriculture',
    eligibility: {
      age: [18, 75],
      occupation: ['Farmer'],
      landOwnership: true,
    },
    benefits: {
      en: 'Subsidized solar pumps and grid-connected solar power plants',
      hi: 'सब्सिडी वाले सोलर पंप और ग्रिड से जुड़े सोलर पावर प्लांट',
      te: 'సబ్సిడీ సోలార్ పంపులు మరియు గ్రిడ్-కనెక్ట్ చేయబడిన సోలార్ పవర్ ప్లాంట్లు'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Land Records', hi: 'भूमि रिकॉर्ड', te: 'భూమి రికార్డులు' },
      { en: 'Electricity Connection', hi: 'बिजली कनेक्शन', te: 'విద్యుత్ కనెక్షన్' },
      { en: 'Bank Account', hi: 'बैंक खाता', te: 'బ్యాంక్ ఖాతా' }
    ],
    applicationLink: 'https://pmkusum.gov.in',
    deadline: '2024-12-31',
    difficulty: 'Medium',
    rating: 4.1,
    successRate: 73,
    processingTime: {
      en: '90-120 days',
      hi: '90-120 दिन',
      te: '90-120 రోజులు'
    },
  },
  {
    id: 'SOIL-HEALTH',
    name: {
      en: 'Soil Health Card Scheme',
      hi: 'मृदा स्वास्थ्य कार्ड योजना',
      te: 'నేల ఆరోగ్య కార్డు పథకం'
    },
    description: {
      en: 'Free soil testing and health cards for farmers',
      hi: 'किसानों के लिए मुफ्त मिट्टी परीक्षण और स्वास्थ्य कार्ड',
      te: 'రైతులకు ఉచిత నేల పరీక్ష మరియు ఆరోగ్య కార్డులు'
    },
    category: 'agriculture',
    eligibility: {
      age: [18, 80],
      occupation: ['Farmer'],
      landOwnership: true,
    },
    benefits: {
      en: 'Free soil testing and customized fertilizer recommendations',
      hi: 'मुफ्त मिट्टी परीक्षण और अनुकूलित उर्वरक सिफारिशें',
      te: 'ఉచిత నేల పరీక్ష మరియు అనుకూలీకరించిన ఎరువుల సిఫార్సులు'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Land Records', hi: 'भूमि रिकॉर्ड', te: 'భూమి రికార్డులు' }
    ],
    applicationLink: 'https://soilhealth.dac.gov.in',
    difficulty: 'Easy',
    rating: 4.4,
    successRate: 88,
    processingTime: {
      en: '15-30 days',
      hi: '15-30 दिन',
      te: '15-30 రోజులు'
    },
  },
  {
    id: 'INSPIRE',
    name: {
      en: 'Innovation in Science Pursuit for Inspired Research',
      hi: 'इंस्पायर स्कॉलरशिप',
      te: 'ఇన్‌స్పైర్ స్కాలర్‌షిప్'
    },
    description: {
      en: 'Scholarships for students pursuing science education',
      hi: 'विज्ञान शिक्षा प्राप्त करने वाले छात्रों के लिए छात्रवृत्ति',
      te: 'సైన్స్ విద్యను అభ్యసిస్తున్న విద్యార్థులకు స్కాలర్‌షిప్‌లు'
    },
    category: 'education',
    eligibility: {
      age: [17, 27],
      educationLevel: ['12th', 'Graduate', 'Post-Graduate'],
    },
    benefits: {
      en: '₹80,000 per year for higher studies in science',
      hi: 'विज्ञान में उच्च अध्ययन के लिए प्रति वर्ष ₹80,000',
      te: 'సైన్స్‌లో ఉన్నత చదువుల కోసం సంవత్సరానికి ₹80,000'
    },
    docsRequired: [
      { en: 'Academic Records', hi: 'शैक्षणिक रिकॉर्ड', te: 'విద్యా రికార్డులు' },
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Income Certificate', hi: 'आय प्रमाण पत्र', te: 'ఆదాయ ధృవీకరణ పత్రం' }
    ],
    applicationLink: 'https://online-inspire.gov.in',
    deadline: '2024-11-30',
    difficulty: 'Medium',
    rating: 4.5,
    successRate: 67,
    processingTime: {
      en: '120-180 days',
      hi: '120-180 दिन',
      te: '120-180 రోజులు'
    },
  },
  {
    id: 'KISHORE-VAIGYANIK',
    name: {
      en: 'Kishore Vaigyanik Protsahan Yojana',
      hi: 'किशोर वैज्ञानिक प्रोत्साहन योजना',
      te: 'కిషోర్ వైజ్ఞానిక్ ప్రోత్సాహన్ యోజన'
    },
    description: {
      en: 'Fellowship program for students pursuing research in science',
      hi: 'विज्ञान में शोध करने वाले छात्रों के लिए फेलोशिप कार्यक्रम',
      te: 'సైన్స్‌లో పరిశోధన చేస్తున్న విద్యార్థులకు ఫెలోషిప్ ప్రోగ్రామ్'
    },
    category: 'education',
    eligibility: {
      age: [16, 28],
      educationLevel: ['12th', 'Graduate'],
    },
    benefits: {
      en: 'Monthly fellowship and research grants',
      hi: 'मासिक फेलोशिप और अनुसंधान अनुदान',
      te: 'నెలవారీ ఫెలోషిప్ మరియు పరిశోధన గ్రాంట్లు'
    },
    docsRequired: [
      { en: 'Academic Records', hi: 'शैक्षणिक रिकॉर्ड', te: 'విద్యా రికార్డులు' },
      { en: 'Research Proposal', hi: 'अनुसंधान प्रस्ताव', te: 'పరిశోధన ప్రతిపాదన' },
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' }
    ],
    applicationLink: 'https://kvpy.iisc.ernet.in',
    deadline: '2024-09-30',
    difficulty: 'Hard',
    rating: 4.7,
    successRate: 45,
    processingTime: {
      en: '180-240 days',
      hi: '180-240 दिन',
      te: '180-240 రోజులు'
    },
  },
  {
    id: 'JANANI-SURAKSHA',
    name: {
      en: 'Janani Suraksha Yojana',
      hi: 'जननी सुरक्षा योजना',
      te: 'జనని సురక్ష యోజన'
    },
    description: {
      en: 'Cash assistance for institutional delivery',
      hi: 'संस्थागत प्रसव के लिए नकद सहायता',
      te: 'సంస్థాగత ప్రసవానికి నగదు సహాయం'
    },
    category: 'healthcare',
    eligibility: {
      age: [18, 45],
      income: 120000,
      category: ['BPL', 'SC', 'ST'],
    },
    benefits: {
      en: '₹1,400 for rural and ₹1,000 for urban deliveries',
      hi: 'ग्रामीण के लिए ₹1,400 और शहरी प्रसव के लिए ₹1,000',
      te: 'గ్రామీణ ప్రాంతాలకు ₹1,400 మరియు పట్టణ ప్రసవాలకు ₹1,000'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'BPL Card', hi: 'बीपीएल कार्ड', te: 'బిపిఎల్ కార్డ్' },
      { en: 'Medical Records', hi: 'चिकित्सा रिकॉर्ड', te: 'వైద్య రికార్డులు' }
    ],
    applicationLink: 'https://nhm.gov.in',
    difficulty: 'Easy',
    rating: 4.3,
    successRate: 82,
    processingTime: {
      en: '30-45 days',
      hi: '30-45 दिन',
      te: '30-45 రోజులు'
    },
  },
  {
    id: 'RASHTRIYA-BAL',
    name: {
      en: 'Rashtriya Bal Swasthya Karyakram',
      hi: 'राष्ट्रीय बाल स्वास्थ्य कार्यक्रम',
      te: 'రాష్ట్రీయ బాల స్వాస్థ్య కార్యక్రమం'
    },
    description: {
      en: 'Child health screening and treatment program',
      hi: 'बाल स्वास्थ्य जांच और उपचार कार्यक्रम',
      te: 'పిల్లల ఆరోగ్య పరీక్ష మరియు చికిత్స కార్యక్రమం'
    },
    category: 'healthcare',
    eligibility: {
      age: [0, 18],
    },
    benefits: {
      en: 'Free health screening and treatment for children',
      hi: 'बच्चों के लिए मुफ्त स्वास्थ्य जांच और उपचार',
      te: 'పిల్లలకు ఉచిత ఆరోగ్య పరీక్ష మరియు చికిత్స'
    },
    docsRequired: [
      { en: 'Birth Certificate', hi: 'जन्म प्रमाण पत्र', te: 'జనన ధృవీకరణ పత్రం' },
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'School Certificate', hi: 'स्कूल प्रमाण पत्र', te: 'పాఠశాల ధృవీకరణ పత్రం' }
    ],
    applicationLink: 'https://nhm.gov.in',
    difficulty: 'Easy',
    rating: 4.2,
    successRate: 79,
    processingTime: {
      en: '1-7 days',
      hi: '1-7 दिन',
      te: '1-7 రోజులు'
    },
  },
  {
    id: 'PMEGP',
    name: {
      en: 'Prime Minister Employment Generation Programme',
      hi: 'प्रधानमंत्री रोजगार सृजन कार्यक्रम',
      te: 'ప్రధాన మంత్రి ఉపాధి కల్పన కార్యక్రమం'
    },
    description: {
      en: 'Credit-linked subsidy for setting up micro enterprises',
      hi: 'सूक्ष्म उद्यम स्थापित करने के लिए क्रेडिट-लिंक्ड सब्सिडी',
      te: 'సూక్ష్మ పరిశ్రమల స్థాపనకు క్రెడిట్-లింక్డ్ సబ్సిడీ'
    },
    category: 'employment',
    eligibility: {
      age: [18, 65],
      educationLevel: ['8th', '10th', '12th', 'Graduate'],
    },
    benefits: {
      en: 'Subsidy up to 35% of project cost, maximum ₹25 lakh',
      hi: 'परियोजना लागत का 35% तक सब्सिडी, अधिकतम ₹25 लाख',
      te: 'ప్రాజెక్ట్ వ్యయంలో 35% వరకు సబ్సిడీ, గరిష్టంగా ₹25 లక్షలు'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Educational Certificate', hi: 'शैक्षिक प्रमाण पत्र', te: 'విద్యా ధృవీకరణ పత్రం' },
      { en: 'Project Report', hi: 'परियोजना रिपोर्ट', te: 'ప్రాజెక్ట్ నివేదిక' }
    ],
    applicationLink: 'https://kviconline.gov.in',
    difficulty: 'Hard',
    rating: 4.0,
    successRate: 58,
    processingTime: {
      en: '120-180 days',
      hi: '120-180 दिन',
      te: '120-180 రోజులు'
    },
  },
  {
    id: 'STARTUP-INDIA',
    name: {
      en: 'Startup India Initiative',
      hi: 'स्टार्टअप इंडिया पहल',
      te: 'స్టార్టప్ ఇండియా ఇనిషియేటివ్'
    },
    description: {
      en: 'Support for startups with funding and tax benefits',
      hi: 'फंडिंग और कर लाभ के साथ स्टार्टअप के लिए समर्थन',
      te: 'నిధులు మరియు పన్ను ప్రయోజనాలతో స్టార్టప్‌లకు మద్దతు'
    },
    category: 'employment',
    eligibility: {
      age: [21, 50],
      educationLevel: ['Graduate', 'Post-Graduate'],
    },
    benefits: {
      en: 'Tax exemptions, funding support, and mentorship',
      hi: 'कर छूट, फंडिंग सहायता और मेंटरशिप',
      te: 'పన్ను మినహాయింపులు, నిధుల మద్దతు మరియు మెంటర్‌షిప్'
    },
    docsRequired: [
      { en: 'Business Plan', hi: 'व्यापार योजना', te: 'వ్యాపార ప్రణాళిక' },
      { en: 'Incorporation Certificate', hi: 'निगमन प्रमाण पत्र', te: 'ఇన్కార్పొరేషన్ సర్టిఫికేట్' },
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' }
    ],
    applicationLink: 'https://startupindia.gov.in',
    difficulty: 'Hard',
    rating: 4.4,
    successRate: 42,
    processingTime: {
      en: '90-180 days',
      hi: '90-180 दिन',
      te: '90-180 రోజులు'
    },
  },
  {
    id: 'BETI-BACHAO',
    name: {
      en: 'Beti Bachao Beti Padhao',
      hi: 'बेटी बचाओ बेटी पढ़ाओ',
      te: 'బేటీ బచావో బేటీ పఢావో'
    },
    description: {
      en: 'Scheme to improve child sex ratio and promote girl education',
      hi: 'बाल लिंग अनुपात में सुधार और बालिका शिक्षा को बढ़ावा देने की योजना',
      te: 'పిల్లల లింగ నిష్పత్తిని మెరుగుపరచడానికి మరియు బాలికల విద్యను ప్రోత్సహించడానికి పథకం'
    },
    category: 'education',
    eligibility: {
      age: [0, 21],
    },
    benefits: {
      en: 'Educational support and awareness programs',
      hi: 'शैक्षिक सहायता और जागरूकता कार्यक्रम',
      te: 'విద్యా మద్దతు మరియు అవగాహన కార్యక్రమాలు'
    },
    docsRequired: [
      { en: 'Birth Certificate', hi: 'जन्म प्रमाण पत्र', te: 'జనన ధృవీకరణ పత్రం' },
      { en: 'School Certificate', hi: 'स्कूल प्रमाण पत्र', te: 'పాఠశాల ధృవీకరణ పత్రం' },
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' }
    ],
    applicationLink: 'https://wcd.nic.in',
    difficulty: 'Easy',
    rating: 4.3,
    successRate: 75,
    processingTime: {
      en: '30-60 days',
      hi: '30-60 दिन',
      te: '30-60 రోజులు'
    },
  },
  {
    id: 'MAHILA-SHAKTI',
    name: {
      en: 'Mahila Shakti Kendra',
      hi: 'महिला शक्ति केंद्र',
      te: 'మహిళా శక్తి కేంద్రం'
    },
    description: {
      en: 'Women empowerment program in rural areas',
      hi: 'ग्रामीण क्षेत्रों में महिला सशक्तिकरण कार्यक्रम',
      te: 'గ్రామీణ ప్రాంతాల్లో మహిళా సాధికారత కార్యక్రమం'
    },
    category: 'employment',
    eligibility: {
      age: [18, 60],
      location: ['Rural'],
    },
    benefits: {
      en: 'Skill development and employment opportunities',
      hi: 'कौशल विकास और रोजगार के अवसर',
      te: 'నైపుణ్యాభివృద్ధి మరియు ఉపాధి అవకాశాలు'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Residence Certificate', hi: 'निवास प्रमाण पत्र', te: 'నివాస ధృవీకరణ పత్రం' }
    ],
    applicationLink: 'https://wcd.nic.in',
    difficulty: 'Medium',
    rating: 4.1,
    successRate: 69,
    processingTime: {
      en: '60-90 days',
      hi: '60-90 दिन',
      te: '60-90 రోజులు'
    },
  },
  {
    id: 'MUDRA-YOJANA',
    name: {
      en: 'Pradhan Mantri MUDRA Yojana',
      hi: 'प्रधानमंत्री मुद्रा योजना',
      te: 'ప్రధాన మంత్రి ముద్రా యోజన'
    },
    description: {
      en: 'Micro-finance scheme for small businesses',
      hi: 'छोटे व्यवसायों के लिए माइक्रो-फाइनेंस योजना',
      te: 'చిన్న వ్యాపారాలకు మైక్రో-ఫైనాన్స్ పథకం'
    },
    category: 'finance',
    eligibility: {
      age: [18, 65],
    },
    benefits: {
      en: 'Loans up to ₹10 lakh for micro enterprises',
      hi: 'सूक्ष्म उद्यमों के लिए ₹10 लाख तक का ऋण',
      te: 'సూక్ష్మ పరిశ్రమలకు ₹10 లక్షల వరకు రుణాలు'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Business Plan', hi: 'व्यापार योजना', te: 'వ్యాపార ప్రణాళిక' },
      { en: 'Bank Account', hi: 'बैंक खाता', te: 'బ్యాంక్ ఖాతా' }
    ],
    applicationLink: 'https://mudra.org.in',
    difficulty: 'Medium',
    rating: 4.2,
    successRate: 76,
    processingTime: {
      en: '30-60 days',
      hi: '30-60 दिन',
      te: '30-60 రోజులు'
    },
  },
  {
    id: 'STAND-UP-INDIA',
    name: {
      en: 'Stand Up India Scheme',
      hi: 'स्टैंड अप इंडिया योजना',
      te: 'స్టాండ్ అప్ ఇండియా పథకం'
    },
    description: {
      en: 'Bank loans for SC/ST and women entrepreneurs',
      hi: 'एससी/एसटी और महिला उद्यमियों के लिए बैंक ऋण',
      te: 'SC/ST మరియు మహిళా పారిశ్రామికవేత్తలకు బ్యాంక్ రుణాలు'
    },
    category: 'finance',
    eligibility: {
      age: [18, 65],
      category: ['SC', 'ST', 'Women'],
    },
    benefits: {
      en: 'Loans between ₹10 lakh to ₹1 crore',
      hi: '₹10 लाख से ₹1 करोड़ के बीच ऋण',
      te: '₹10 లక్షల నుండి ₹1 కోటి మధ్య రుణాలు'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Category Certificate', hi: 'जाति प्रमाण पत्र', te: 'కుల ధృవీకరణ పత్రం' },
      { en: 'Business Plan', hi: 'व्यापार योजना', te: 'వ్యాపార ప్రణాళిక' }
    ],
    applicationLink: 'https://standupmitra.in',
    difficulty: 'Hard',
    rating: 4.0,
    successRate: 54,
    processingTime: {
      en: '90-120 days',
      hi: '90-120 दिन',
      te: '90-120 రోజులు'
    },
  },
  {
    id: 'DIGITAL-INDIA',
    name: {
      en: 'Digital India Initiative',
      hi: 'डिजिटल इंडिया पहल',
      te: 'డిజిటల్ ఇండియా ఇనిషియేటివ్'
    },
    description: {
      en: 'Digital literacy and infrastructure development',
      hi: 'डिजिटल साक्षरता और बुनियादी ढांचा विकास',
      te: 'డిజిటల్ అక్షరాస్యత మరియు మౌలిక సదుపాయాల అభివృద్ధి'
    },
    category: 'education',
    eligibility: {
      age: [14, 70],
    },
    benefits: {
      en: 'Free digital literacy training and certificates',
      hi: 'मुफ्त डिजिटल साक्षरता प्रशिक्षण और प्रमाण पत्र',
      te: 'ఉచిత డిజిటల్ అక్షరాస్యత శిక్షణ మరియు ధృవీకరణ పత్రాలు'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Educational Certificate', hi: 'शैक्षिक प्रमाण पत्र', te: 'విద్యా ధృవీకరణ పత్రం' }
    ],
    applicationLink: 'https://digitalindia.gov.in',
    difficulty: 'Easy',
    rating: 4.4,
    successRate: 83,
    processingTime: {
      en: '30-90 days',
      hi: '30-90 दिन',
      te: '30-90 రోజులు'
    },
  },
  {
    id: 'PM-WANI',
    name: {
      en: 'Prime Minister Wi-Fi Access Network Interface',
      hi: 'प्रधानमंत्री वाई-फाई एक्सेस नेटवर्क इंटरफेस',
      te: 'ప్రధాన మంత్రి వై-ఫై యాక్సెస్ నెట్‌వర్క్ ఇంటర్‌ఫేస్'
    },
    description: {
      en: 'Public Wi-Fi hotspot scheme',
      hi: 'सार्वजनिक वाई-फाई हॉटस्पॉट योजना',
      te: 'పబ్లిక్ వై-ఫై హాట్‌స్పాట్ పథకం'
    },
    category: 'infrastructure',
    eligibility: {
      age: [18, 65],
    },
    benefits: {
      en: 'Setup public Wi-Fi hotspots with minimal investment',
      hi: 'न्यूनतम निवेश के साथ सार्वजनिक वाई-फाई हॉटस्पॉट स्थापित करें',
      te: 'కనీస పెట్టుబడితో పబ్లిక్ వై-ఫై హాట్‌స్పాట్‌లను ఏర్పాటు చేయండి'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Business Registration', hi: 'व्यापार पंजीकरण', te: 'వ్యాపార నమోదు' },
      { en: 'Location Certificate', hi: 'स्थान प्रमाण पत्र', te: 'స్థాన ధృవీకరణ పత్రం' }
    ],
    applicationLink: 'https://dot.gov.in',
    difficulty: 'Medium',
    rating: 4.1,
    successRate: 71,
    processingTime: {
      en: '60-90 days',
      hi: '60-90 दिन',
      te: '60-90 రోజులు'
    },
  },
  {
    id: 'POSHAN-ABHIYAAN',
    name: {
      en: 'POSHAN Abhiyaan',
      hi: 'पोषण अभियान',
      te: 'పోషణ్ అభియాన్'
    },
    description: {
      en: 'National nutrition mission for children and mothers',
      hi: 'बच्चों और माताओं के लिए राष्ट्रीय पोषण मिशन',
      te: 'పిల్లలు మరియు తల్లుల కోసం జాతీయ పోషకాహార మిషన్'
    },
    category: 'food',
    eligibility: {
      age: [0, 45],
    },
    benefits: {
      en: 'Nutritional support and health monitoring',
      hi: 'पोषण संबंधी सहायता और स्वास्थ्य निगरानी',
      te: 'పోషకాహార మద్దతు మరియు ఆరోగ్య పర్యవేక్షణ'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Medical Records', hi: 'चिकित्सा रिकॉर्ड', te: 'వైద్య రికార్డులు' },
      { en: 'Income Certificate', hi: 'आय प्रमाण पत्र', te: 'ఆదాయ ధృవీకరణ పత్రం' }
    ],
    applicationLink: 'https://poshanabhiyaan.gov.in',
    difficulty: 'Easy',
    rating: 4.5,
    successRate: 87,
    processingTime: {
      en: '15-30 days',
      hi: '15-30 दिन',
      te: '15-30 రోజులు'
    },
  },
  {
    id: 'ANNAPURNA',
    name: {
      en: 'Annapurna Scheme',
      hi: 'अन्नपूर्णा योजना',
      te: 'అన్నపూర్ణ పథకం'
    },
    description: {
      en: 'Food security for senior citizens',
      hi: 'वरिष्ठ नागरिकों के लिए खाद्य सुरक्षा',
      te: 'సీనియర్ సిటిజన్లకు ఆహార భద్రత'
    },
    category: 'food',
    eligibility: {
      age: [65, 100],
      income: 100000,
    },
    benefits: {
      en: '10 kg food grains per month',
      hi: 'प्रति माह 10 किलो अनाज',
      te: 'నెలకు 10 కిలోల ఆహార ధాన్యాలు'
    },
    docsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', te: 'ఆధార్ కార్డు' },
      { en: 'Age Certificate', hi: 'आयु प्रमाण पत्र', te: 'వయస్సు ధృవీకరణ పత్రం' },
      { en: 'Income Certificate', hi: 'आय प्रमाण पत्र', te: 'ఆదాయ ధృవీకరణ పత్రం' }
    ],
    applicationLink: 'https://dfpd.gov.in',
    difficulty: 'Easy',
    rating: 4.3,
    successRate: 91,
    processingTime: {
      en: '15-30 days',
      hi: '15-30 दिन',
      te: '15-30 రోజులు'
    },
  },
];