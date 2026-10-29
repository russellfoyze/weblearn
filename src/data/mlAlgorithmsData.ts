export interface MLAlgorithmData {
  id: string;
  number: number;
  slug: string;
  name: string;
  nameBn: string;
  typeBadge: 'Supervised' | 'Unsupervised' | 'Ensemble';
  typeBadgeBn: string;
  taskType: 'Regression' | 'Classification' | 'Both' | 'Clustering';
  taskTypeBn: string;
  subtitle: string;
  subtitleBn: string;
  accentColor: string;
  bgBadgeColor: string;
  borderColor: string;
  pillColor: string;
  summary: string;
  summaryBn: string;

  // Section 1: What it is
  whatItIs: {
    points: string[];
    pointsBn: string[];
    diagramLabel: string;
    diagramLabelBn: string;
  };

  // Section 2: How it works
  howItWorks: {
    steps: {
      stepNum: number;
      text: string;
      textBn: string;
    }[];
    equation?: {
      formula: string;
      breakdown: {
        symbol: string;
        meaning: string;
        meaningBn: string;
      }[];
    };
  };

  // Section 3: When to use it
  whenToUse: {
    points: string[];
    pointsBn: string[];
  };

  // Section 4: Advantages & Limitations
  prosAndCons: {
    advantages: string[];
    advantagesBn: string[];
    limitations: string[];
    limitationsBn: string[];
  };

  // Section 5: Real-world example
  realWorldExample: {
    title: string;
    titleBn: string;
    scenario: string;
    scenarioBn: string;
    table?: {
      headers: string[];
      headersBn: string[];
      rows: (string | number)[][];
    };
    takeaway: string;
    takeawayBn: string;
  };
}

export const ML_ALGORITHMS: MLAlgorithmData[] = [
  // 1. LINEAR REGRESSION
  {
    id: 'linear-regression',
    number: 1,
    slug: 'linear-regression',
    name: 'Linear Regression',
    nameBn: 'লিনিয়ার রিগ্রেশন (রৈখিক নির্ভরণ)',
    typeBadge: 'Supervised',
    typeBadgeBn: 'তত্ত্বাবধানাধীন (Supervised)',
    taskType: 'Regression',
    taskTypeBn: 'রিগ্রেশন (সংখ্যা অনুমান)',
    subtitle: 'Predict a continuous value using a straight line',
    subtitleBn: 'একটি সরলরেখা ব্যবহার করে অবিচ্ছিন্ন (continuous) মান অনুমান করা',
    accentColor: 'from-rose-500 to-pink-600',
    bgBadgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    borderColor: 'border-rose-500/30',
    pillColor: '#F43F5E',
    summary:
      'Finds the best-fitting straight line through data points to predict continuous numbers like prices, sales, or temperatures.',
    summaryBn:
      'ডেটা পয়েন্টগুলোর মধ্য দিয়ে এমন একটি সর্বোত্তম সরলরেখা খুঁজে বের করে যা দিয়ে বাড়ি বা পণ্যের দাম, তাপমাত্রা বা বিক্রির পরিমাণ নিখুঁতভাবে অনুমান করা যায়।',
    whatItIs: {
      points: [
        'A supervised machine learning algorithm used to predict a continuous numerical value.',
        'It finds the best-fitting straight line (regression line) that shows the relationship between input features (X) and the target value (y).',
        'Models direct proportional trends: when X increases, how much does y increase or decrease?',
      ],
      pointsBn: [
        'একটি সুপারভাইজড মেশিন লার্নিং অ্যালগরিদম যা যেকোনো অবিচ্ছিন্ন সংখ্যামান (যেমন দাম, বেতন, তাপমাত্রা) অনুমান করতে ব্যবহৃত হয়।',
        'এটি ইনপুট বৈশিষ্ট্য (X) এবং লক্ষ্য মান (y)-এর মধ্যে সেরা ফিটিং সরলরেখা (Best fitting line) টেনে সম্পর্ক দেখায়।',
        'সরাসরি আনুপাতিক সম্পর্ক তৈরি করে: X পরিবর্তন হলে y কতটা পরিবর্তন হবে তা গণনা করে।',
      ],
      diagramLabel: 'Best Fitting Regression Line & Residuals',
      diagramLabelBn: 'সেরা ফিটিং রিগ্রেশন লাইন এবং ত্রুটি (Residuals)',
    },
    howItWorks: {
      steps: [
        {
          stepNum: 1,
          text: 'Learns the statistical relationship between input X and output y from training data.',
          textBn: 'ট্রেনিং ডেটা থেকে ইনপুট X এবং আউটপুট y এর গাণিতিক সম্পর্ক শেখে।',
        },
        {
          stepNum: 2,
          text: 'Finds the optimal straight line by minimizing the sum of squared errors (the vertical distance between actual and predicted points).',
          textBn: 'আসল মান এবং পূর্বাভাসকৃত মানের মধ্যবর্তী দূরত্বের বর্গ (MSE) সর্বনিম্ন করে সেরা লাইন নির্ধারণ করে।',
        },
        {
          stepNum: 3,
          text: 'The line is defined by the fundamental slope-intercept equation: y = mx + b.',
          textBn: 'লাইনটি ক্লাসিক সমীকরণ y = mx + b দ্বারা প্রকাশিত হয়।',
        },
      ],
      equation: {
        formula: 'y = mX + b',
        breakdown: [
          { symbol: 'y', meaning: 'Predicted Value (Target)', meaningBn: 'পূর্বাভাসকৃত মান (টার্গেট)' },
          { symbol: 'm', meaning: 'Slope (How much y changes with X)', meaningBn: 'ঢাল / Slope (X বাড়লে y কতটুকু পরিবর্তন হয়)' },
          { symbol: 'X', meaning: 'Input Feature (e.g. Size, Experience)', meaningBn: 'ইনপুট ফিচার (যেমন: আয়তন, কাজের অভিজ্ঞতা)' },
          { symbol: 'b', meaning: 'Y-Intercept (Value when X = 0)', meaningBn: 'ওয়াই-ছেদক / Intercept (যখন X = 0 তখন y এর মান)' },
        ],
      },
    },
    whenToUse: {
      points: [
        'When you want to predict a continuous numerical value (e.g., house price, salary, company revenue, temperature).',
        'When there is a visible linear relationship between input features and target.',
        'When the data is relatively clean and without extreme outliers.',
        'When you need a quick, explainable baseline model for regression tasks.',
      ],
      pointsBn: [
        'যখন কোনো অবিচ্ছিন্ন সংখ্যা বা পরিমাপ অনুমান করতে চান (যেমন: ফ্ল্যাটের দাম, মাসিক বেতন, প্রবৃদ্ধি, তাপমাত্রা)।',
        'যখন ইনপুট এবং আউটপুটের মধ্যে প্রত্যক্ষ রৈখিক বা আনুপাতিক সম্পর্ক থাকে।',
        'যখন ডেটাসেট তুলনামূলকভাবে পরিষ্কার এবং অস্বাভাবিক ভুল তথ্য (Outliers) কম থাকে।',
        'সহজে ব্যাখ্যাযোগ্য এবং দ্রুত ফলাফল প্রদানকারী মডেল হিসেবে।',
      ],
    },
    prosAndCons: {
      advantages: [
        'Simple, intuitive, and extremely easy to understand.',
        'Works exceptionally well with small to medium-sized datasets.',
        'Ultra-fast to train and compute instant predictions.',
        'Provides transparent, interpretable weights (you know exactly how much each feature affects output).',
      ],
      advantagesBn: [
        'অত্যন্ত সহজ, বোধগম্য এবং দ্রুত বাস্তবায়ন করা যায়।',
        'ছোট ও মাঝারি আকারের ডেটাসেটে দুর্দান্ত কাজ করে।',
        'ট্রেনিং এবং প্রেডিকশন করতে প্রায় শূন্য সময় নেয়।',
        'প্রতিটি ফিচারের গুরুত্ব পরিষ্কারভাবে সংখ্যায় প্রকাশ করে।',
      ],
      limitations: [
        'Strictly assumes a linear relationship; fails on non-linear patterns.',
        'Highly sensitive to outliers (one extreme data point can skew the line).',
        'Prone to underfitting when data has complex curves.',
        'May underperform when datasets have dozens of correlated, irrelevant features.',
      ],
      limitationsBn: [
        'শুধুমাত্র সরলরেখার মতো সোজা সম্পর্ক বুঝতে পারে; জটিল প্যাটার্নে কাজ করে না।',
        'আউটলায়ার বা অস্বাভাবিক মানের প্রতি খুব সংবেদনশীল (একটি ভুল পয়েন্ট পুরো লাইন বাঁকিয়ে দিতে পারে)।',
        'জটিল বক্ররেখার ক্ষেত্রে আন্ডারফিটিং (Underfitting) হতে পারে।',
        'প্রচুর অপ্রাসঙ্গিক ফিচার থাকলে নির্ভুলতা কমে যায়।',
      ],
    },
    realWorldExample: {
      title: 'House Price Prediction by Square Footage',
      titleBn: 'ফ্ল্যাটের আয়তন (Sq Ft) অনুযায়ী ফ্ল্যাটের দাম অনুমান',
      scenario:
        'Let’s predict house prices based on the floor size (square feet) using linear regression.',
      scenarioBn:
        'ফ্ল্যাটের সাইজ (বর্গফুট) বৃদ্ধি পেলে দাম কীভাবে বাড়ে তা লিনিয়ার রিগ্রেশনের মাধ্যমে প্রেডিক্ট করি।',
      table: {
        headers: ['House Size (sq ft)', 'Actual Price (Lakhs ৳)', 'Predicted (Line)'],
        headersBn: ['ফ্ল্যাটের আয়তন (বর্গফুট)', 'প্রকৃত মূল্য (লাখ ৳)', 'মডেলের অনুমান'],
        rows: [
          [800, '40 L', '40.2 L'],
          [1000, '50 L', '49.8 L'],
          [1200, '60 L', '59.5 L'],
          [1500, '75 L', '74.2 L'],
          [1800, '90 L', '89.1 L'],
        ],
      },
      takeaway:
        'As house size increases, the price increases linearly. Linear regression finds the exact formula to predict the price for any newly listed house size.',
      takeawayBn:
        'ফ্ল্যাটের সাইজ বাড়লে দামও আনুপাতিক হারে বাড়ে। রিগ্রেশন লাইনটি সমীকরণ বের করে যেকোনো নতুন সাইজের ফ্ল্যাটের দাম মুহূর্তে নির্ভুলভাবে বলে দিতে পারে।',
    },
  },

  // 2. LOGISTIC REGRESSION
  {
    id: 'logistic-regression',
    number: 2,
    slug: 'logistic-regression',
    name: 'Logistic Regression',
    nameBn: 'লজিস্টিক রিগ্রেশন (শ্রেণিবিভাগ)',
    typeBadge: 'Supervised',
    typeBadgeBn: 'তত্ত্বাবধানাধীন (Supervised)',
    taskType: 'Classification',
    taskTypeBn: 'ক্লাসিফিকেশন (শ্রেণিবিভাগ)',
    subtitle: 'Predict a category (class) using a probability',
    subtitleBn: 'সম্ভাব্যতা (probability) ব্যবহার করে ক্যাটাগরি বা শ্রেণি প্রেডিক্ট করা',
    accentColor: 'from-sky-500 to-blue-600',
    bgBadgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    borderColor: 'border-sky-500/30',
    pillColor: '#0EA5E9',
    summary:
      'Maps input features through an S-shaped Sigmoid curve to output a probability between 0 and 1, classifying inputs into distinct groups like Yes/No or Spam/Ham.',
    summaryBn:
      'ইনপুট ডেটাকে একটি মসৃণ S-আকৃতির সিগময়েড (Sigmoid) কার্ভের মধ্য দিয়ে পাঠিয়ে ০ থেকে ১ এর মধ্যে একটি সম্ভাব্যতা নির্ধারণ করে এবং ইমেইল স্প্যাম কি না তা নিশ্চিত করে।',
    whatItIs: {
      points: [
        'A supervised machine learning algorithm primarily used for binary classification tasks.',
        'Predicts the probability of an input belonging to a certain class (e.g. 0 or 1, No or Yes).',
        'Output is strictly squeezed between 0 and 1 using the mathematical Sigmoid function, then converted to a discrete class with a decision threshold (standard 0.5).',
      ],
      pointsBn: [
        'একটি সুপারভাইজড ক্লাসিফিকেশন অ্যালগরিদম যা মূলত বাইনারি (০ বা ১, হ্যাঁ বা না) সিদ্ধান্ত নিতে ব্যবহৃত হয়।',
        'এটি কোনো ঘটনা ঘটার সম্ভাবনা বা Probability (০% থেকে ১০০%) নির্ণয় করে।',
        'সিগময়েড ফাংশনের মাধ্যমে আউটপুটকে ০ এবং ১ এর ভেতর সীমাবদ্ধ রাখা হয় এবং সাধারণত ০.৫ থ্রেশহোল্ড ধরে সিদ্ধান্ত নেওয়া হয়।',
      ],
      diagramLabel: 'Sigmoid Function σ(z) = 1 / (1 + e^-z)',
      diagramLabelBn: 'সিগময়েড কার্ভ ফাংশন σ(z) = ১ / (১ + e^-z)',
    },
    howItWorks: {
      steps: [
        {
          stepNum: 1,
          text: 'Computes a linear weighted combination of features: z = w1*x1 + w2*x2 + ... + b.',
          textBn: 'ফিচারগুলোর সাথে ওয়েট গুণ করে লিনিয়ার যোগফল বের করে: z = w1*x1 + w2*x2 + ... + b।',
        },
        {
          stepNum: 2,
          text: 'Passes z through the Sigmoid activation function to transform it into a probability score between 0 and 1.',
          textBn: 'প্রাপ্ত মান z-কে সিগময়েড ফাংশনে দিয়ে ০ থেকে ১ এর মধ্যকার একটি সম্ভাব্যতা মানে রূপান্তর করে।',
        },
        {
          stepNum: 3,
          text: 'Applies threshold (usually 0.5): If probability ≥ 0.5 → Class 1 (Spam), else → Class 0 (Not Spam).',
          textBn: 'থ্রেশহোল্ড চেক করে: যদি মান ≥ ০.৫ হয় তবে ক্লাস ১ (স্প্যাম), আর কম হলে ক্লাস ০ (নরমাল)।',
        },
      ],
      equation: {
        formula: 'σ(z) = 1 / (1 + e^(-z))',
        breakdown: [
          { symbol: 'σ(z)', meaning: 'Output probability (between 0.0 and 1.0)', meaningBn: 'সম্ভাব্যতা মান (০.০ থেকে ১.০ এর মধ্যে)' },
          { symbol: 'z', meaning: 'Linear combination (w·X + b)', meaningBn: 'লিনিয়ার যোগফল (w·X + b)' },
          { symbol: 'e', meaning: 'Euler mathematical constant (~2.71828)', meaningBn: 'অয়লার ধ্রুবক (~২.৭১৮২৮)' },
          { symbol: 'Threshold', meaning: 'Decision cut-off point (default 0.5)', meaningBn: 'সিদ্ধান্ত নেওয়ার কাট-অফ পয়েন্ট (সাধারণত ০.৫)' },
        ],
      },
    },
    whenToUse: {
      points: [
        'When predicting a binary category or class (e.g. Yes/No, Pass/Fail, Spam/Not Spam, Churn/Retain).',
        'When target variable is binary (0 or 1).',
        'When the relationship between features and the log-odds is approximately linear.',
        'Commonly deployed for email spam filters, disease diagnosis, credit card fraud, and loan approval.',
      ],
      pointsBn: [
        'যখন ফলাফল বাইনারি ক্যাটাগরি হয় (যেমন: হ্যাঁ/না, স্প্যাম/নরমাল, পাশ/ফেল, লোন অনুমোদিত/বাতিল)।',
        'টার্গেট ভ্যারিয়েবল যখন শুধুমাত্র দুটি মানের (০ বা ১) মধ্যে সীমাবদ্ধ থাকে।',
        'যখন ফিচারগুলোর সাথে লগ-অডস (Log-Odds) এর রৈখিক সম্পর্ক থাকে।',
        'ইমেল স্প্যাম ফিল্টারিং, মেডিকেল ডায়াগনোসিস ও ফ্রড ডিটেকশনের জন্য সবচেয়ে জনপ্রিয়।',
      ],
    },
    prosAndCons: {
      advantages: [
        'Simple, fast, and easy to understand and implement in production.',
        'Provides well-calibrated probability scores rather than just binary labels.',
        'Computationally lightweight and works smoothly on low-spec servers.',
        'Less prone to overfitting in low-dimensional clean datasets.',
      ],
      advantagesBn: [
        'অত্যন্ত দ্রুত এবং লাইটওয়েট; প্রোডাকশনে বাস্তবায়ন করা সবচেয়ে সহজ।',
        'শুধু হ্যাঁ বা না না বলে শতকরা কতভাগ সম্ভাবনা তাও জানিয়ে দেয়।',
        'কম মেমোরি ও কম প্রসেসিং পাওয়ারেও দ্রুত কাজ করে।',
        'কম মাত্রার পরিষ্কার ডেটাসেটে ওভারফিটিং কম হয়।',
      ],
      limitations: [
        'Cannot solve non-linear classification problems without kernel transformations.',
        'Assumes linear decision boundary between the two classes.',
        'Sensitive to extreme outliers which can shift the sigmoid curve.',
        'May struggle when features have high multicollinearity.',
      ],
      limitationsBn: [
        'জটিল বা আঁকাবাঁকা নন-লিনিয়ার ডেটায় একা কাজ করতে পারে না।',
        'দুই ক্লাসের মাঝে কেবল সোজা বা সমতল বিভাজন রেখা আঁকতে পারে।',
        'ভুল বা অস্বাভাবিক ডেটা পয়েন্ট থাকলে সিদ্ধান্ত ভুল হতে পারে।',
        'ফিচারগুলোর মাঝে নিজেদের মধ্যে অতিমাত্রার সম্পর্ক থাকলে কার্যকারিতা কমে।',
      ],
    },
    realWorldExample: {
      title: 'Email Spam Detection Engine',
      titleBn: 'ইমেইল স্প্যাম শনাক্তকরণ ইঞ্জিন',
      scenario:
        'Let’s classify whether an email is "Spam" or "Not Spam" based on suspicious links and keywords.',
      scenarioBn:
        'ইমেইলে কয়টি বাহ্যিক লিংক আছে এবং "free" শব্দটি আছে কি না তার ওপর ভিত্তি করে স্প্যাম কি না তা নির্ধারণ করি।',
      table: {
        headers: ['Email ID', 'Number of Links', 'Contains "Free"?', 'Sigmoid Probability', 'Predicted Class'],
        headersBn: ['ইমেইল', 'লিংকের সংখ্যা', '"Free" আছে কি?', 'সিগময়েড সম্ভাবনা', 'ফলাফল'],
        rows: [
          ['Email 1', 0, 'No', '0.04 (4%)', 'Not Spam (0)'],
          ['Email 2', 2, 'Yes', '0.88 (88%)', 'Spam (1)'],
          ['Email 3', 1, 'No', '0.19 (19%)', 'Not Spam (0)'],
          ['Email 4', 3, 'Yes', '0.96 (96%)', 'Spam (1)'],
          ['Email 5', 0, 'No', '0.03 (3%)', 'Not Spam (0)'],
        ],
      },
      takeaway:
        'The model calculates the probability of being spam. If the calculated probability is ≥ 0.5, the inbox flags it as Spam, protecting users automatically.',
      takeawayBn:
        'মডেলটি প্রতিটি ইমেইলের জন্য স্প্যাম হওয়ার সম্ভাবনা বের করে। যদি তা ৫০% (০.৫) অতিক্রম করে, তবে সিস্টেম স্বয়ংক্রিয়ভাবে ইমেইলটিকে স্প্যাম ফোল্ডারে পাঠায়।',
    },
  },

  // 3. DECISION TREE
  {
    id: 'decision-tree',
    number: 3,
    slug: 'decision-tree',
    name: 'Decision Tree',
    nameBn: 'ডিসিশন ট্রি (সিদ্ধান্ত গাছ)',
    typeBadge: 'Supervised',
    typeBadgeBn: 'তত্ত্বাবধানাধীন (Supervised)',
    taskType: 'Both',
    taskTypeBn: 'উভয় (শ্রেণিবিভাগ ও রিগ্রেশন)',
    subtitle: 'Make decisions by splitting the data based on feature values',
    subtitleBn: 'ফিচারের মানের ওপর ভিত্তি করে ধাপে ধাপে ডেটা ভাগ করে সিদ্ধান্ত নেওয়া',
    accentColor: 'from-emerald-500 to-teal-600',
    bgBadgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    borderColor: 'border-emerald-500/30',
    pillColor: '#10B981',
    summary:
      'Mimics human decision-making by breaking complex questions down into a hierarchy of simple IF-THEN conditions until a final prediction is reached.',
    summaryBn:
      'মানুষ যেভাবে ধাপে ধাপে শর্ত মিলিয়ে (যেমন: যদি বৃষ্টি হয় তবে ছাতা নাও) সিদ্ধান্ত নেয়, ঠিক সেভাবেই ডেটা ভাগ করে পরিষ্কার চার্ট তৈরি করে।',
    whatItIs: {
      points: [
        'A supervised machine learning algorithm used for both classification and regression tasks.',
        'Makes decisions by splitting data recursively into smaller, purer subgroups based on feature values.',
        'Produces an intuitive tree structure: Root Node (all data) → Internal Decision Nodes (tests) → Branches (conditions) → Leaf Nodes (final answers).',
      ],
      pointsBn: [
        'একটি সুপারভাইজড লার্নিং অ্যালগরিদম যা ক্লাসিফিকেশন ও রিগ্রেশন উভয় কাজে ব্যবহার করা যায়।',
        'ডেটাকে বিভিন্ন ফিচারের শর্তের ওপর ভিত্তি করে ধাপে ধাপে বিভক্ত করে ক্ষুদ্র অংশে রূপান্তর করে।',
        'গাছের মতো চমৎকার কাঠামো: মূল নোড (Root) → অভ্যন্তরীণ সিদ্ধান্ত নোড → শাখা (Branches) → পাতার নোড (Leaf Node/ফলাফল)।',
      ],
      diagramLabel: 'Hierarchical Splitting Tree (Outlook → Humidity / Wind → Play/No)',
      diagramLabelBn: 'শাখাভিত্তিক সিদ্ধান্ত বৃক্ষ (আবহাওয়া → আর্দ্রতা/বাতাস → খেলা হবে কি না)',
    },
    howItWorks: {
      steps: [
        {
          stepNum: 1,
          text: 'Starts at the root node containing the entire unprocessed dataset.',
          textBn: 'সমস্ত ডেটাসেট নিয়ে মূল বা রুট নোড থেকে কাজ শুরু করে।',
        },
        {
          stepNum: 2,
          text: 'Evaluates all features and selects the best one to split data using metrics like Gini Impurity or Information Gain (Entropy).',
          textBn: 'জিনি ইমপিউরিটি (Gini Impurity) বা ইনফরমেশন গেইন পরিমাপ করে সবচেয়ে কার্যকরী প্রশ্নটি খুঁজে বের করে।',
        },
        {
          stepNum: 3,
          text: 'Splits data into child branches and repeats the process recursively on each branch.',
          textBn: 'শাখাগুলোতে ডেটা ভাগ করে এবং প্রতিটি অংশের ওপর একই পদ্ধতি পুনরাবৃত্তি করে।',
        },
        {
          stepNum: 4,
          text: 'Stops when a condition is met (e.g. maximum depth reached, minimum samples left) and outputs the leaf node prediction.',
          textBn: 'সর্বোচ্চ গভীরতা বা নির্দিষ্ট শর্ত পূরণ হলে থামা হয় এবং শেষ পাতার নোড থেকে চূড়ান্ত পূর্বাভাস পাওয়া যায়।',
        },
      ],
      equation: {
        formula: 'Gini = 1 - Σ (p_i)²',
        breakdown: [
          { symbol: 'Gini', meaning: 'Impurity metric (0 = pure node, all same class)', meaningBn: 'বিশুদ্ধতার পরিমাপ (০ মানে সম্পূর্ণ বিশুদ্ধ নোড)' },
          { symbol: 'p_i', meaning: 'Probability of item belonging to class i', meaningBn: 'ক্লাস i-তে অন্তর্ভুক্ত হওয়ার সম্ভাব্যতা' },
          { symbol: 'Split', meaning: 'Chooses the split with the lowest Gini Impurity', meaningBn: 'যে শর্তে জিনি ইমপিউরিটি সবচেয়ে কম হয় সেই শর্তটি নির্বাচন করে' },
        ],
      },
    },
    whenToUse: {
      points: [
        'When you need a model that can be easily explained to non-technical stakeholders (100% white-box).',
        'When dataset contains both numerical and categorical features mixed together.',
        'When you do not want to spend time normalizing or scaling feature values.',
        'Works well for small to medium-sized structured tabular datasets.',
      ],
      pointsBn: [
        'যখন মডেলের সিদ্ধান্ত সাধারণ মানুষ বা ব্যবসায়িক ক্লায়েন্টদের কাছে পানির মতো পরিষ্কারভাবে ব্যাখ্যা করা দরকার।',
        'যখন ডেটাতে সংখ্যা এবং ক্যাটাগরি (নাম, স্থান ইত্যাদি) একসাথে মেশানো থাকে।',
        'ফিচার স্কেলিং বা নরমালাইজেশন ছাড়াই যখন সরাসরি কাজ করতে চান।',
        'ছোট ও মাঝারি আকারের সারণীভিত্তিক (tabular) ডেটাসেটের জন্য দারুণ উপযোগী।',
      ],
    },
    prosAndCons: {
      advantages: [
        'Crystal clear, human-interpretable graphical structure (IF-THEN rules).',
        'Zero feature scaling required (unaffected by differing scales or units).',
        'Handles non-linear relationships effortlessly.',
        'Capable of multi-class classification out of the box.',
      ],
      advantagesBn: [
        'অত্যন্ত পরিষ্কার এবং মানুষের পক্ষে যেকোনো শর্ত সহজে পড়ে বোঝা সম্ভব।',
        'ডেটা নরমাল বা স্কেলিং করার কোনো প্রয়োজন পড়ে না।',
        'নন-লিনিয়ার বা জটিল সম্পর্ক সহজে ধরতে পারে।',
        'একসাথে একাধিক ক্যাটাগরিতে বিভক্ত করার কাজ দক্ষতার সাথে করে।',
      ],
      limitations: [
        'Can easily overfit the training data when trees grow too deep.',
        'High variance: small variations in training data can yield a totally different tree structure.',
        'Biased toward features with more categorical levels.',
        'Decision boundaries are axis-aligned (orthogonal steps rather than smooth diagonals).',
      ],
      limitationsBn: [
        'গাছ বেশি বড় বা গভীর হয়ে গেলে ট্রেনিং ডেটায় ওভারফিট (Overfitting) হওয়ার ঝুঁকি থাকে।',
        'ডেটাতে সামান্য পরিবর্তন আসলেই পুরো গাছের চেহারা পাল্টে যেতে পারে (উচ্চ অস্থিরতা)।',
        'যে ফিচারে বেশি ক্যাটাগরি থাকে সেগুলোর দিকে পক্ষপাতিত্ব হতে পারে।',
        'বাউন্ডারিগুলো ধাপে ধাপে চারকোনা হয়, মসৃণ বা কোণাকুণি হয় না।',
      ],
    },
    realWorldExample: {
      title: 'Bank Loan Approval Decision Pipeline',
      titleBn: 'ব্যাংক লোন অনুমোদন যাচাই পাইপলাইন',
      scenario:
        'Let’s predict whether a bank should approve a loan based on customer income and credit score.',
      scenarioBn:
        'গ্রাহকের মাসিক আয় এবং ক্রেডিট স্কোরের ওপর ভিত্তি করে লোন অনুমোদন হবে কি না তা ডিসিশন ট্রির মাধ্যমে যাচাই করা।',
      table: {
        headers: ['Customer', 'Income (Lakhs)', 'Credit Score', 'Decision Rule Path', 'Loan Approved?'],
        headersBn: ['গ্রাহক', 'আয় (লাখ ৳)', 'ক্রেডিট স্কোর', 'সিদ্ধান্তের ধাপ', 'অনুমোদন?'],
        rows: [
          ['P1', '2.5 L', 600, 'Income ≤ 4.5 → Credit ≤ 620', 'Rejected (No)'],
          ['P2', '5.0 L', 720, 'Income > 4.5 → Credit > 700', 'Approved (Yes)'],
          ['P3', '3.0 L', 650, 'Income ≤ 4.5 → Credit > 620', 'Approved (Yes)'],
          ['P4', '6.0 L', 800, 'Income > 4.5 → Credit > 700', 'Approved (Yes)'],
          ['P5', '4.0 L', 580, 'Income ≤ 4.5 → Credit ≤ 620', 'Rejected (No)'],
        ],
      },
      takeaway:
        'The tree first checks: "Is Income ≤ 4.5L?". If yes, it checks "Is Credit Score > 620?". Anyone can audit and verify this decision without needing a PhD in math.',
      takeawayBn:
        'গাছটি প্রথমে দেখে: "আয় কি ৪.৫ লাখের কম?". যদি হ্যাঁ হয়, তবে দেখে "ক্রেডিট স্কোর কি ৬২০ এর বেশি?". এই নিয়মটি যেকোনো ব্যাংকার বা সাধারণ গ্রাহক সহজেই বুঝতে ও মেনে নিতে পারেন।',
    },
  },

  // 4. RANDOM FOREST
  {
    id: 'random-forest',
    number: 4,
    slug: 'random-forest',
    name: 'Random Forest',
    nameBn: 'র‍্যান্ডম ফরেস্ট (একাধিক গাছের বন)',
    typeBadge: 'Ensemble',
    typeBadgeBn: 'একত্রিত পদ্ধতি (Ensemble)',
    taskType: 'Both',
    taskTypeBn: 'উভয় (শ্রেণিবিভাগ ও রিগ্রেশন)',
    subtitle: 'An ensemble learning algorithm that combines multiple decision trees',
    subtitleBn: 'একাধিক ডিসিশন ট্রি যুক্ত করে সম্মিলিত সেরা ফলাফল তৈরি করার অ্যালগরিদম',
    accentColor: 'from-amber-500 to-yellow-600',
    bgBadgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    borderColor: 'border-amber-500/30',
    pillColor: '#F59E0B',
    summary:
      'Builds a whole forest of independent decision trees trained on random subsets of data and combines their votes to eliminate single-tree bias and overfitting.',
    summaryBn:
      'একটি গাছের বদলে শত শত ভিন্ন ভিন্ন ডিসিশন ট্রি তৈরি করে এবং তাদের সবার ভোটের মাধ্যমে চূড়ান্ত সিদ্ধান্ত নেয়, ফলে কোনো একক গাছের ভুলের ঝুঁকি থাকে না।',
    whatItIs: {
      points: [
        'An ensemble learning algorithm that constructs dozens or hundreds of decision trees during training.',
        'Combines predictions of diverse trees built on random subsets of samples and random subsets of features.',
        'Final classification is decided by Majority Vote; final regression is the Average of all tree predictions.',
      ],
      pointsBn: [
        'একটি শক্তিশালী এনসেম্বল (Ensemble) অ্যালগরিদম যা ট্রেনিংয়ের সময় শত শত স্বাধীন ডিসিশন ট্রি তৈরি করে।',
        'প্রতিটি গাছকে ভিন্ন ভিন্ন র‍্যান্ডম সাবসেট ডেটা এবং র‍্যান্ডম ফিচার দিয়ে ট্রেইন করানো হয়।',
        'ক্লাসিফিকেশনের ক্ষেত্রে অধিকাংশ গাছের ভোট (Majority Vote) এবং রিগ্রেশনে সব গাছের গড় (Average) নিয়ে ফাইনাল রেজাল্ট দেওয়া হয়।',
      ],
      diagramLabel: 'Bootstrap Bagging Ensemble (Tree 1...N → Majority Vote)',
      diagramLabelBn: 'বুটস্ট্র্যাপ ব্যাগিং এনসেম্বল (গাছ ১...N → সংখ্যাগরিষ্ঠ ভোট)',
    },
    howItWorks: {
      steps: [
        {
          stepNum: 1,
          text: 'Creates multiple training subsets from original data using bootstrap sampling (random sampling with replacement).',
          textBn: 'মূল ডেটা থেকে র‍্যান্ডমভাবে একাধিক উপসেট ডেটা (Bootstrap Samples) তৈরি করে।',
        },
        {
          stepNum: 2,
          text: 'Trains an independent decision tree on each subset, picking a random sample of features at each split (feature randomness).',
          textBn: 'প্রতিটি গাছের প্রতিটি শাখায় র‍্যান্ডম কিছু ফিচার বাছাই করে স্বাধীনভাবে গাছ তৈরি করে।',
        },
        {
          stepNum: 3,
          text: 'Feeds the test input into every single tree, collecting an independent prediction from each.',
          textBn: 'নতুন কোনো ডেটা আসলে বনের প্রতিটি গাছ তার নিজস্ব পূর্বাভাস প্রদান করে।',
        },
        {
          stepNum: 4,
          text: 'Aggregates all votes: Majority vote wins for classification; average output is used for regression.',
          textBn: 'সকল গাছের ভোট গণনা করা হয়: সর্বাধিক ভোট পাওয়া ক্লাসটিই চূড়ান্ত বিজয়ী হয়।',
        },
      ],
      equation: {
        formula: 'ŷ = mode( Tree₁(X), Tree₂(X), ..., Tree_N(X) )',
        breakdown: [
          { symbol: 'ŷ', meaning: 'Ensemble final prediction', meaningBn: 'সম্মিলিত চূড়ান্ত পূর্বাভাস' },
          { symbol: 'Tree_i(X)', meaning: 'Prediction of individual tree i', meaningBn: 'একক গাছ i-এর দেওয়া রায় বা ভোট' },
          { symbol: 'mode', meaning: 'Majority vote (most frequent category)', meaningBn: 'সর্বোচ্চ ভোট (গরিষ্ঠমত)' },
        ],
      },
    },
    whenToUse: {
      points: [
        'When you want significantly higher accuracy and stability than a single decision tree.',
        'When your dataset has complex tabular features and is prone to overfitting.',
        'When you want a reliable algorithm with minimal hyperparameter fine-tuning.',
        'When you want built-in feature importance rankings for your business.',
      ],
      pointsBn: [
        'যখন একক ডিসিশন ট্রির চেয়ে অনেক বেশি নির্ভরযোগ্যতা ও নির্ভুল ফলাফল প্রয়োজন।',
        'যখন ডেটাসেট বড় এবং একটিমাত্র মডেল ব্যবহারে ওভারফিটিংয়ের ভয় থাকে।',
        'খুব বেশি জটিল সেটিংস বা টিউনিং ছাড়াই যখন শক্তিশালী মডেল দরকার।',
        'কোন ফিচারগুলো ব্যবসায় সবচেয়ে বেশি প্রভাব ফেলছে তা জানার জন্য।',
      ],
    },
    prosAndCons: {
      advantages: [
        'Virtually eliminates overfitting found in standalone decision trees.',
        'Remarkably high accuracy across varied tabular business challenges.',
        'Handles thousands of input variables without feature deletion.',
        'Computes relative feature importance automatically.',
      ],
      advantagesBn: [
        'ডিসিশন ট্রির ওভারফিটিং সমস্যা প্রায় সম্পূর্ণ নির্মূল করে।',
        'বাস্তব জীবনের বিভিন্ন জটিল ডেটায় অত্যন্ত নিখুঁত পারফরম্যান্স দেয়।',
        'হাজার হাজার ইনপুট ভ্যারিয়েবল থাকলেও মসৃণভাবে পরিচালনা করতে পারে।',
        'স্বয়ংক্রিয়ভাবে ফিচারগুলোর গুরুত্বের তালিকা তৈরি করে দেয়।',
      ],
      limitations: [
        'Loss of simple interpretability (hard to inspect 300 trees manually).',
        'Higher computational overhead and memory footprint than a single tree.',
        'Slower inference time for real-time edge devices.',
        'Cannot extrapolate values outside the training range in regression.',
      ],
      limitationsBn: [
        'সহজে চোখে দেখে বোঝা যায় না (একসাথে ৩০০ গাছের ভেতরের হিসাব ম্যানুয়ালি দেখা অসম্ভব)।',
        'সিঙ্গেল ট্রির চেয়ে বেশি মেমোরি ও প্রসেসিং শক্তি খরচ হয়।',
        'রিয়েল-টাইম মোবাইল বা কম শক্তির ডিভাইসে সামান্য ধীরগতির হতে পারে।',
        'রিগ্রেশনের ক্ষেত্রে জানা সীমার বাইরে গিয়ে এক্সট্রাপোলেট করতে পারে না।',
      ],
    },
    realWorldExample: {
      title: 'Customer Purchase Intention Voting',
      titleBn: 'গ্রাহকের ল্যাপটপ কেনার সম্ভাবনা নির্ণয়',
      scenario:
        'Let’s predict whether an online shopper will purchase a high-end laptop based on Age, Income, and Student status.',
      scenarioBn:
        'বয়স, আয় এবং ছাত্র কি না তার ওপর ভিত্তি করে শত শত গাছের সম্মিলিত ভোটে ল্যাপটপ কিনবে কি না তা প্রেডিক্ট করি।',
      table: {
        headers: ['Customer', 'Tree 1 Vote', 'Tree 2 Vote', 'Tree 3 Vote', 'Forest Majority Vote'],
        headersBn: ['গ্রাহক', 'গাছ ১ ভোট', 'গাছ ২ ভোট', 'গাছ ৩ ভোট', 'চূড়ান্ত সংখ্যাগরিষ্ঠ ভোট'],
        rows: [
          ['User A (Age 22, Student)', 'Yes (Buy)', 'Yes (Buy)', 'Yes (Buy)', 'BUY (100% agreement)'],
          ['User B (Age 45, Low Income)', 'No', 'No', 'Yes (Buy)', 'DO NOT BUY (67% No)'],
          ['User C (Age 28, High Income)', 'Yes (Buy)', 'Yes (Buy)', 'No', 'BUY (67% Yes)'],
        ],
      },
      takeaway:
        'Even if Tree 3 makes a mistaken guess, Trees 1 & 2 outvote it. The "Wisdom of Crowds" guarantees stable and robust predictions.',
      takeawayBn:
        'কোনো একটি গাছ ভুল অনুমান করলেও বাকি গাছগুলো তাকে ভোটে হারিয়ে দেয়। একাধিক বিজ্ঞ গাছের সম্মিলিত জ্ঞান পুরো সিস্টেমকে নিরাপদ ও নির্ভুল রাখে।',
    },
  },

  // 5. SUPPORT VECTOR MACHINE (SVM)
  {
    id: 'support-vector-machine',
    number: 5,
    slug: 'svm',
    name: 'Support Vector Machine (SVM)',
    nameBn: 'সাপোর্ট ভেক্টর মেশিন (SVM)',
    typeBadge: 'Supervised',
    typeBadgeBn: 'তত্ত্বাবধানাধীন (Supervised)',
    taskType: 'Classification',
    taskTypeBn: 'ক্লাসিফিকেশন (শ্রেণিবিভাগ)',
    subtitle: 'Finds the best boundary (hyperplane) to separate the data',
    subtitleBn: 'সর্বোচ্চ মার্জিন বজায় রেখে ক্লাসের মধ্যে সেরা বিভাজন রেখা (hyperplane) খুঁজে বের করা',
    accentColor: 'from-fuchsia-500 to-purple-600',
    bgBadgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    borderColor: 'border-fuchsia-500/30',
    pillColor: '#D946EF',
    summary:
      'Identifies the optimal decision boundary (hyperplane) that maximizes the clear margin distance between opposing classes, anchored by the closest critical points (Support Vectors).',
    summaryBn:
      'দুটি ভিন্ন শ্রেণির ডেটা পয়েন্টের মাঝে এমন একটি সর্বোচ্চ চওড়া সড়ক বা দেয়াল (Hyperplane) তৈরি করে যাতে দুই পক্ষের দূরত্ব সর্বোচ্চ থাকে।',
    whatItIs: {
      points: [
        'A supervised machine learning algorithm mainly used for classification (and regression via SVR).',
        'Finds the optimal hyperplane that separates classes with the maximum possible margin distance.',
        'The boundary is entirely anchored by only a few extreme points closest to the line, known as Support Vectors.',
        'Can project non-linear data into higher dimensional space using mathematical Kernel Tricks (e.g. RBF kernel).',
      ],
      pointsBn: [
        'একটি সুপারভাইজড লার্নিং অ্যালগরিদম যা মূলত ক্লাসিফিকেশনের সেরা বাউন্ডারি নির্ধারণে ব্যবহৃত হয়।',
        'দুই ক্লাসের সবচেয়ে কাছের ডেটা পয়েন্টগুলোর মধ্যে সর্বোচ্চ দূরত্ব বা মার্জিন (Maximum Margin) রেখে বিভাজন রেখা আঁকে।',
        'বাউন্ডারি রেখাটি শুধুমাত্র সীমান্তের সবচেয়ে কাছের কয়েকটি গুরুত্বপূর্ণ পয়েন্ট (Support Vectors)-এর ওপর দাঁড়িয়ে থাকে।',
        'কার্নেল ট্রিক (Kernel Trick) ব্যবহার করে জটিল বাঁকানো ডেটাকে উচ্চ মাত্রায় নিয়ে গিয়ে সোজাভাবে ভাগ করতে পারে।',
      ],
      diagramLabel: 'Max-Margin Hyperplane & Support Vectors',
      diagramLabelBn: 'সর্বোচ্চ মার্জিনের হাইপারপ্লেন এবং সাপোর্ট ভেক্টরসমূহ',
    },
    howItWorks: {
      steps: [
        {
          stepNum: 1,
          text: 'Examines all data points and identifies candidate hyperplanes that can separate the classes.',
          textBn: 'সমস্ত ডেটা পয়েন্ট বিশ্লেষণ করে সম্ভাব্য বিভাজন রেখাগুলো বিবেচনা করে।',
        },
        {
          stepNum: 2,
          text: 'Selects the unique hyperplane that leaves the widest possible street (maximum margin) between nearest points of both classes.',
          textBn: 'যে রেখাটি দুই দলের নিকটতম পয়েন্ট থেকে সবচেয়ে বেশি দূরত্ব বজায় রাখে, সেটিকেই সেরা হিসেবে নির্বাচিত করে।',
        },
        {
          stepNum: 3,
          text: 'Relies solely on the support vectors; moving or deleting any other point will not change the boundary at all.',
          textBn: 'শুধুমাত্র সাপোর্ট ভেক্টরগুলোর ওপর নির্ভর করে; দূরবর্তী অন্য কোনো পয়েন্ট পরিবর্তন করলে সীমানার কোনো পরিবর্তন হয় না।',
        },
        {
          stepNum: 4,
          text: 'For non-linearly separable data, applies kernel functions to elevate data into 3D or N-D space where linear separation is achievable.',
          textBn: 'প্যাঁচানো বা জটিল ডেটার জন্য কার্নেল ট্রিক দিয়ে উচ্চ মাত্রায় রূপান্তর করে সহজ বিভাজন তৈরি করে।',
        },
      ],
      equation: {
        formula: 'w · x + b = 0  (Margin = 2 / ||w||)',
        breakdown: [
          { symbol: 'w', meaning: 'Weight vector perpendicular to the hyperplane', meaningBn: 'হাইপারপ্লেনের সমকোণে থাকা ওয়েট ভেক্টর' },
          { symbol: 'x', meaning: 'Input feature coordinates', meaningBn: 'ইনপুট ফিচারের স্থানাঙ্ক' },
          { symbol: '2 / ||w||', meaning: 'Width of the margin street (to be maximized)', meaningBn: 'মার্জিনের প্রশস্ততা (যা সর্বোচ্চ করতে হবে)' },
        ],
      },
    },
    whenToUse: {
      points: [
        'When you have clear, distinct separation between classes in your data.',
        'When dealing with high-dimensional feature spaces (e.g. text classification, gene expression, image vectors).',
        'When the number of features is greater than or comparable to the number of samples.',
        'When you need a model resistant to outliers that lie far away from the decision boundary.',
      ],
      pointsBn: [
        'যখন দুই ক্লাসের মাঝে মোটামুটি পরিষ্কার দূরত্ব বা ব্যবধান বিদ্যমান থাকে।',
        'উচ্চ মাত্রার (High Dimensional) ডেটাসেটে (যেমন: টেক্সট ক্লাসিফিকেশন, ইমেজ প্রসেসিং, জিন বিশ্লেষণ)।',
        'যখন স্যাম্পল সংখ্যার চেয়ে ফিচারের সংখ্যা বেশি বা সমান থাকে।',
        'সীমানা থেকে অনেক দূরের ভুল পয়েন্টগুলো যাতে মডেলে কোনো বিভ্রান্তি না ছড়ায়।',
      ],
    },
    prosAndCons: {
      advantages: [
        'Highly effective in high-dimensional feature spaces.',
        'Memory efficient: uses only a subset of training points (support vectors) in the decision function.',
        'Versatile: customizable kernel functions (Linear, Poly, RBF, Sigmoid).',
        'Robust against overfitting, especially in high-dimensional scenarios.',
      ],
      advantagesBn: [
        'উচ্চ মাত্রার জটিল ডেটায় অসাধারণ নির্ভুলতা প্রদান করে।',
        'মেমোরি সেভার: পুরো ডেটাসেট মনে রাখার দরকার নেই, শুধু কয়েকটি সাপোর্ট ভেক্টর মনে রাখলেই চলে।',
        'বহুমুখী: লিনিয়ার, আরডিএফ (RBF) ইত্যাদি শক্তিশালী কার্নেল ব্যবহার করা যায়।',
        'দূরবর্তী ডেটার প্রভাবমুক্ত থাকায় সহজে বিভ্রান্ত হয় না।',
      ],
      limitations: [
        'Requires careful tuning of hyperparameters (Regularization C, Kernel Gamma).',
        'Computationally expensive and slow to train on datasets with > 100,000 samples.',
        'Poor performance on noisy datasets with overlapping classes.',
        'Does not natively provide probability estimates (requires expensive cross-validation).',
      ],
      limitationsBn: [
        'সি (C) এবং গামা (Gamma) হাইপারপ্যারামিটার খুব সাবধানে টিউন করতে হয়।',
        'বিশাল ডেটাসেটে (লক্ষাধিক ডেটা) ট্রেনিং করতে অনেক সময় ও প্রসেসিং শক্তি লাগে।',
        'যদি দুই ক্লাসের ডেটা পরস্পরের গায়ের ওপর চেপে থাকে তবে ভালো কাজ করে না।',
        'সরাসরি শতকরা সম্ভাব্যতা দেয় না, জটিল উপায়ে হিসাব করতে হয়।',
      ],
    },
    realWorldExample: {
      title: 'High-Dimensional Keyword Spam Classifier',
      titleBn: 'শব্দ ফ্রিকোয়েন্সির ওপর ভিত্তি করে স্প্যাম সনাক্তকরণ',
      scenario:
        'Let’s classify emails as spam or legitimate based on frequencies of terms like "free" and "offer".',
      scenarioBn:
        'ইমেইলে "free" এবং "offer" শব্দ দুটির ঘনত্বের ওপর ভিত্তি করে সর্বোচ্চ মার্জিনের বিভাজন রেখা আঁকা।',
      table: {
        headers: ['Email', '"free" frequency', '"offer" frequency', 'Position in Space', 'Classification'],
        headersBn: ['ইমেইল', '"free" এর সংখ্যা', '"offer" এর সংখ্যা', 'স্পেস পজিশন', 'ফলাফল'],
        rows: [
          ['E1', 5, 3, 'Spam Zone (Beyond Margin)', 'Spam'],
          ['E2', 0, 1, 'Legit Zone', 'Not Spam'],
          ['E3', 4, 2, 'Support Vector (On Margin)', 'Spam (Boundary)'],
          ['E4', 1, 0, 'Legit Zone', 'Not Spam'],
          ['E5', 2, 1, 'Support Vector (On Margin)', 'Not Spam (Boundary)'],
        ],
      },
      takeaway:
        'SVM draws the optimal street with the widest safety clearance between spam emails and safe emails, guaranteeing confident classification for new messages.',
      takeawayBn:
        'সাপোর্ট ভেক্টর মেশিন দুটি দলের মাঝে সর্বোচ্চ প্রশস্ত সীমানা প্রাচীর তৈরি করে, ফলে নতুন যেকোনো ইমেইল নিরাপদে সঠিক দলে ফেলা সম্ভব হয়।',
    },
  },

  // 6. K-NEAREST NEIGHBORS (KNN)
  {
    id: 'k-nearest-neighbors',
    number: 6,
    slug: 'knn',
    name: 'K-Nearest Neighbors (KNN)',
    nameBn: 'কে-নিকটতম প্রতিবেশী (KNN)',
    typeBadge: 'Supervised',
    typeBadgeBn: 'তত্ত্বাবধানাধীন (Supervised)',
    taskType: 'Both',
    taskTypeBn: 'উভয় (শ্রেণিবিভাগ ও রিগ্রেশন)',
    subtitle: 'A simple, instance-based algorithm that classifies a point based on the majority class of its nearest neighbors',
    subtitleBn: 'নতুন ডেটার সবচেয়ে কাছের প্রতিবেশীদের ভোটের ভিত্তিতে শ্রেণি নির্ধারণের সহজ অ্যালগরিদম',
    accentColor: 'from-violet-500 to-indigo-600',
    bgBadgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    borderColor: 'border-violet-500/30',
    pillColor: '#8B5CF6',
    summary:
      'A "lazy learning" algorithm that skips formal training: whenever an unknown query arrives, it finds the K closest neighbors in space and lets them vote.',
    summaryBn:
      '"তুমি কাদের সাথে চলো তা দেখেই তোমার পরিচয় বোঝা যায়"—ঠিক এই নীতিতে কাজ করে KNN। নতুন কোনো তথ্য আসলে তার সবচেয়ে কাছের K জন প্রতিবেশীর ভোট নিয়ে সিদ্ধান্ত নেয়।',
    whatItIs: {
      points: [
        'A simple and intuitive instance-based machine learning algorithm used for classification and regression.',
        'Known as "lazy learning" because it has zero training phase: it simply memorizes all existing data points.',
        'To make a prediction for a new point, it measures spatial distance to all existing points and assigns the majority class of the K closest neighbors.',
      ],
      pointsBn: [
        'একটি সহজ ও বাস্তবমুখী অ্যালগরিদম যা ক্লাসিফিকেশন এবং রিগ্রেশন উভয় কাজে ব্যবহার করা যায়।',
        'একে "অলস শিক্ষার্থী বা Lazy Learner" বলা হয় কারণ ট্রেনিংয়ের সময় কোনো জটিল মডেল বানায় না, শুধু ডেটা জমা রাখে।',
        'নতুন কোনো পয়েন্ট আসলে তা থেকে আশেপাশের সবার দূরত্ব মেপে সবচেয়ে কাছের K সংখ্যক প্রতিবেশীর মতামতের ভিত্তিতে ফল প্রকাশ করে।',
      ],
      diagramLabel: 'Euclidean Proximity Voting (K = 3 vs K = 5)',
      diagramLabelBn: 'ইউক্লিডীয় দূরত্বের ভিত্তিতে ভোট (K = ৩ বনাম K = ৫)',
    },
    howItWorks: {
      steps: [
        {
          stepNum: 1,
          text: 'Choose an integer value for K (the number of closest neighbors, commonly an odd number like 3, 5, or 7).',
          textBn: 'K-এর মান নির্ধারণ করুন (যেমন বিজোড় সংখ্যা ৩, ৫ বা ৭ যাতে ভোটে টাই না হয়)।',
        },
        {
          stepNum: 2,
          text: 'Compute the Euclidean distance between the new unlabelled point and every single point in the dataset.',
          textBn: 'নতুন পয়েন্ট থেকে ডেটাসেটের প্রতিটি পয়েন্টের ইউক্লিডিয়ান জ্যামিতিক দূরত্ব হিসাব করুন।',
        },
        {
          stepNum: 3,
          text: 'Sort distances and identify the K smallest distances (the K nearest neighbors).',
          textBn: 'দূরত্ব অনুযায়ী সাজিয়ে সবচেয়ে কাছের K জন প্রতিবেশীকে শনাক্ত করুন।',
        },
        {
          stepNum: 4,
          text: 'Tally the categories of these K neighbors: the class with the most votes wins the prediction.',
          textBn: 'এই K জন প্রতিবেশীর শ্রেণি গণনা করুন: যে শ্রেণির ভোট বেশি, নতুন পয়েন্টটি সেই শ্রেণির অন্তর্ভুক্ত হবে।',
        },
      ],
      equation: {
        formula: 'Distance = √[ (x₂ - x₁)² + (y₂ - y₁)² ]',
        breakdown: [
          { symbol: 'Distance', meaning: 'Straight-line Euclidean distance between two points', meaningBn: 'দুই বিন্দুর সরলরৈখিক ইউক্লিডীয় দূরত্ব' },
          { symbol: '(x₁, y₁)', meaning: 'Coordinates of the new unknown query point', meaningBn: 'নতুন অজানা পয়েন্টের স্থানাঙ্ক' },
          { symbol: '(x₂, y₂)', meaning: 'Coordinates of a known training data point', meaningBn: 'জানা ট্রেনিং ডেটা পয়েন্টের স্থানাঙ্ক' },
          { symbol: 'K', meaning: 'Number of neighbors allowed to vote', meaningBn: 'ভোট দেওয়ার জন্য নির্বাচিত নিকটবর্তী প্রতিবেশীর সংখ্যা' },
        ],
      },
    },
    whenToUse: {
      points: [
        'When you need a simple, fast-to-develop baseline classification model.',
        'When the dataset is small to medium-sized (under 10,000 samples).',
        'When spatial clustering is clear and meaningful.',
        'When you do not want to make rigid statistical assumptions about the underlying distribution (non-parametric).',
      ],
      pointsBn: [
        'খুব দ্রুত এবং ঝামেলাহীন একটি প্রাথমিক ক্লাসিফায়ার তৈরি করতে চাইলে।',
        'ছোট বা মাঝারি আকারের ডেটাসেটে (১০,০০০ স্যাম্পলের নিচে)।',
        'যখন অবস্থানের বা বৈশিষ্ট্যের নৈকট্য পরিষ্কার অর্থ বহন করে।',
        'ডেটার বন্টন সম্পর্কে আগে থেকে কোনো অনুমান করতে না চাইলে (নন-প্যারামেট্রিক)।',
      ],
    },
    prosAndCons: {
      advantages: [
        'Zero training time: new data can be added instantaneously to the database.',
        'Extremely intuitive and easy to explain to non-technical audiences.',
        'Naturally handles multi-class classification problems without modification.',
        'Can capture intricate, convoluted non-linear decision boundaries.',
      ],
      advantagesBn: [
        'ট্রেনিংয়ের জন্য কোনো সময় লাগে না: নতুন ডেটা সিস্টেমে আসার সাথে সাথেই কাজ করে।',
        'বোঝা এবং অন্যের কাছে ব্যাখ্যা করা সবচেয়ে সহজ।',
        'যেকোনো সংখ্যক ভিন্ন ভিন্ন ক্যাটাগরিতে কাজ করতে পারে।',
        'যেকোনো আঁকাবাঁকা ও জটিল বাউন্ডারি স্বাভাবিকভাবেই তৈরি করতে পারে।',
      ],
      limitations: [
        'Very slow at prediction time on large datasets (must measure distances to millions of points).',
        'High memory footprint (must keep entire training dataset in RAM).',
        'Severely sensitive to feature scale (requires strict min-max normalization).',
        'Suffers from the "curse of dimensionality" when features exceed 15-20.',
      ],
      limitationsBn: [
        'প্রেডিকশনের সময় অনেক ধীরগতির হয় (লাখ লাখ পয়েন্টের দূরত্ব মাপতে হয়)।',
        'প্রচুর র‍্যাম (RAM) প্রয়োজন হয় কারণ সমস্ত ডেটা মেমোরিতে রাখতে হয়।',
        'ফিচার স্কেলিং না করলে যে ফিচারের মান বড় তা অন্য সব ফিচারকে চেপে দেয়।',
        'ফিচারের সংখ্যা অনেক বেশি হয়ে গেলে দূরত্ব নির্ভুল থাকে না (Curse of Dimensionality)।',
      ],
    },
    realWorldExample: {
      title: 'Movie Recommendation by Genre Affinity',
      titleBn: 'সিনেমা দেখার অভ্যাসের ওপর ভিত্তি করে নতুন সিনেমা সুপারিশ',
      scenario:
        'Let’s recommend movies to a new user based on similarities to other viewers in Comedy and Drama ratings.',
      scenarioBn:
        'নতুন একজন ব্যবহারকারীর কমেডি ও ড্রামা দেখার পছন্দের সাথে অন্য ব্যবহারকারীদের দূরত্ব মেপে সিনেমা প্রস্তাব করা।',
      table: {
        headers: ['User ID', 'Comedy Rating (1-5)', 'Drama Rating (1-5)', 'Distance to New User', 'Neighbor Status (K=2)'],
        headersBn: ['ইউজার', 'কমেডি রেটিং (১-৫)', 'ড্রামা রেটিং (১-৫)', 'নতুন ইউজারের দূরত্ব', 'প্রতিবেশী স্ট্যাটাস (K=২)'],
        rows: [
          ['U1', 1, 2, '4.24 units', 'Distant'],
          ['U2', 1, 1, '5.00 units', 'Distant'],
          ['U3', 5, 4, '0.42 units', 'Top Neighbor #1 (Nearest)'],
          ['U4', 4, 5, '1.41 units', 'Distant'],
          ['U5', 5, 4, '0.42 units', 'Top Neighbor #2 (Nearest)'],
        ],
      },
      takeaway:
        'The new user is closest to U3 and U5. Since both U3 and U5 love lighthearted comedy movies, the system confidently recommends trending comedies to the new user.',
      takeawayBn:
        'নতুন ইউজারের রুচি U3 ও U5-এর সবচেয়ে কাছাকাছি। তারা যেসব সিনেমা পছন্দ করেছে, নতুন ব্যবহারকারীকেও সিস্টেম ঠিক সেই সিনেমাগুলোই দেখার পরামর্শ দেয়।',
    },
  },

  // 7. K-MEANS CLUSTERING
  {
    id: 'k-means-clustering',
    number: 7,
    slug: 'k-means',
    name: 'K-Means Clustering',
    nameBn: 'কে-মিন্স ক্লাস্টারিং (স্বয়ংক্রিয় দল গঠন)',
    typeBadge: 'Unsupervised',
    typeBadgeBn: 'তত্ত্বাবধানহীন (Unsupervised)',
    taskType: 'Clustering',
    taskTypeBn: 'ক্লাস্টারিং (দল গঠন)',
    subtitle: 'A popular unsupervised learning algorithm used to group similar data points into K clusters',
    subtitleBn: 'লেবেল ছাড়া ডেটাকে তাদের সাদৃশ্যের ওপর ভিত্তি করে K সংখ্যক ক্লাস্টারে ভাগ করার অ্যালগরিদম',
    accentColor: 'from-cyan-500 to-teal-600',
    bgBadgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    borderColor: 'border-cyan-500/30',
    pillColor: '#06B6D4',
    summary:
      'Discovers natural clusters in unlabeled data by iteratively moving K centroid centers until each point belongs to its nearest group with minimum variance.',
    summaryBn:
      'আগে থেকে কোনো উত্তর বা লেবেল দেওয়া ছাড়াই ডেটার নিজস্ব মিল দেখে K সংখ্যক দল খুঁজে বের করে এবং প্রতিটি দলের মধ্যবিন্দু (Centroid) সামঞ্জস্য করে।',
    whatItIs: {
      points: [
        'A widely used unsupervised machine learning algorithm designed to partition unlabeled data into K distinct clusters.',
        'Requires no targets or labels; it automatically discovers hidden organic patterns within the feature space.',
        'Iteratively updates cluster centers (centroids) by calculating the mathematical mean of all assigned members.',
      ],
      pointsBn: [
        'একটি জনপ্রিয় আনসুপারভাইজড অ্যালগরিদম যা কোনো লেবেল ছাড়া ডেটাকে K সংখ্যক নিজস্ব দলে বিভক্ত করে।',
        'এর জন্য কোনো আগে থেকে শেখানো উত্তরের প্রয়োজন নেই; ডেটার ভেতরে লুকিয়ে থাকা স্বাভাবিক প্যাটার্ন নিজেই খুঁজে বের করে।',
        'দলের অন্তর্ভুক্ত সব সদস্যের কেন্দ্রবিন্দু বা গড় (Mean) হিসাব করে ধাপে ধাপে সেন্ট্রয়েড (Centroid) নিখুঁত স্থানে সরিয়ে নেয়।',
      ],
      diagramLabel: '4-Step Iterative Centroid Convergence Loop',
      diagramLabelBn: '৪-ধাপের সেন্ট্রয়েড রূপান্তর ও ক্লাস্টারিং লুপ',
    },
    howItWorks: {
      steps: [
        {
          stepNum: 1,
          text: 'Choose the number of clusters K (e.g. K = 3) and initialize K random centroid locations.',
          textBn: 'ক্লাস্টার সংখ্যা K নির্ধারণ করুন (যেমন K = ৩) এবং ৩টি সেন্ট্রয়েড র‍্যান্ডম স্থানে বসান।',
        },
        {
          stepNum: 2,
          text: 'Assign each data point to its nearest centroid based on Euclidean distance.',
          textBn: 'প্রতিটি ডেটা পয়েন্টকে তার সবচেয়ে কাছের সেন্ট্রয়েডের ক্লাস্টারে যুক্ত করুন।',
        },
        {
          stepNum: 3,
          text: 'Recalculate the position of each centroid by taking the arithmetic mean of all points assigned to it.',
          textBn: 'প্রতিটি ক্লাস্টারের ডেটাগুলোর গড় স্থানাঙ্ক বের করে সেন্ট্রয়েডকে সেই নতুন কেন্দ্রে সরিয়ে নিন।',
        },
        {
          stepNum: 4,
          text: 'Repeat steps 2 and 3 until centroids stabilize and points no longer switch clusters (convergence).',
          textBn: 'যতক্ষণ না সেন্ট্রয়েডগুলো স্থির হয় এবং ক্লাস্টার আর পরিবর্তিত না হয় ততক্ষণ ধাপ ২ ও ৩ পুনরাবৃত্তি করুন।',
        },
      ],
      equation: {
        formula: 'J = Σ Σ || x_i - μ_k ||²',
        breakdown: [
          { symbol: 'J', meaning: 'Inertia / Within-Cluster Sum of Squares (WCSS)', meaningBn: 'ক্লাস্টারের ভেতরের দূরত্বের বর্গের সমষ্টি (যা সর্বনিম্ন করতে হবে)' },
          { symbol: 'x_i', meaning: 'Data point vector', meaningBn: 'নির্দিষ্ট ডেটা পয়েন্ট' },
          { symbol: 'μ_k', meaning: 'Centroid mean of cluster k', meaningBn: 'ক্লাস্টার k-এর কেন্দ্রবিন্দু (সেন্ট্রয়েড)' },
        ],
      },
    },
    whenToUse: {
      points: [
        'When you have raw, unlabeled exploratory data and want to discover organic customer or user groups.',
        'When you know roughly how many groups (K) you want to segment your audience into.',
        'Used extensively for market customer segmentation, image compression, document topic grouping, and anomaly detection.',
        'When you need a fast, scalable clustering algorithm for large datasets.',
      ],
      pointsBn: [
        'যখন কোনো লেবেলবিহীন কাঁচা ডেটা থাকে এবং তার মধ্যকার দলগুলোকে আলাদা করতে চান।',
        'যখন ব্যবসায়িক প্রয়োজনে গ্রাহকদের কয়েকটি সুনির্দিষ্ট গ্রুপে (যেমন: বাজেট, প্রিমিয়াম, মাঝারি) ভাগ করতে চান।',
        'মার্কেটিং কাস্টমার সেগমেন্টেশন, ইমেজ সাইজ কমানো ও অস্বাভাবিক লেনদেন ধরতে ব্যাপকভাবে ব্যবহৃত হয়।',
        'বিশাল ডেটাসেটে খুব দ্রুত কাজ করার মতো ক্লাস্টারিং প্রয়োজন হলে।',
      ],
    },
    prosAndCons: {
      advantages: [
        'Simple to understand, fast to compute, and scales easily to massive datasets.',
        'Guaranteed mathematical convergence to a local optimum.',
        'Generates distinct, actionable cluster boundaries for business strategy.',
        'Versatile across commerce, biology, audio processing, and security.',
      ],
      advantagesBn: [
        'সহজ হিসাব এবং কোটি কোটি ডেটাতেও খুব দ্রুত কাজ করতে পারে।',
        'গাণিতিকভাবে সেন্ট্রয়েডগুলো একটি সুনির্দিষ্ট লক্ষ্যে স্থির হবেই।',
        'মার্কেটিং ক্যাম্পেইনের জন্য পরিষ্কার ও সুনির্দিষ্ট গ্রুপ তৈরি করে।',
        'ই-কমার্স, ব্যাংকিং এবং সাইবার সিকিউরিটিতে বহুবিধ প্রয়োগ রয়েছে।',
      ],
      limitations: [
        'User must manually specify K ahead of time (requires the Elbow Method to guess K).',
        'Assumes clusters are spherical and roughly equal in size.',
        'Sensitive to initial random centroid placement (can get stuck in local minima).',
        'Sensitive to outliers which can drag centroid centers away.',
      ],
      limitationsBn: [
        'K-এর মান আগে থেকেই বলে দিতে হয় (Elbow Method দিয়ে আদর্শ মান খুঁজতে হয়)।',
        'ধরে নেয় সব দল গোলগাল বা বল আকৃতির; আঁকাবাঁকা ক্লাস্টারে ব্যর্থ হয়।',
        'শুরুতে সেন্ট্রয়েডগুলো কোথায় বসানো হলো তার ওপর চূড়ান্ত ফলাফল কিছুটা নির্ভর করে।',
        'আউটলায়ার বা ছিটকে পড়া ডেটা পয়েন্ট সেন্ট্রয়েডকে নিজের দিকে টেনে নষ্ট করতে পারে।',
      ],
    },
    realWorldExample: {
      title: 'Customer Segmentation by Income vs Spending Score',
      titleBn: 'বার্ষিক আয় বনাম খরচের অভ্যাসের ওপর ভিত্তি করে কাস্টমার সেগমেন্টেশন',
      scenario:
        'Let’s group store customers into 3 targeted marketing clusters based on their Annual Income and Spending Score.',
      scenarioBn:
        'দোকানের ক্রেতাদের বার্ষিক আয় এবং শপিং করার প্রবণতা বিশ্লেষণ করে ৩টি ক্লাস্টারে ভাগ করে স্পেশাল অফার প্রদান।',
      table: {
        headers: ['Cluster Name', 'Annual Income Profile', 'Spending Score (1-100)', 'Marketing Action Strategy'],
        headersBn: ['ক্লাস্টার নাম', 'বার্ষিক আয়ের ধরন', 'খরচ করার স্কোর', 'মার্কেটিং ও বিজনেস স্ট্র্যাটেজি'],
        rows: [
          ['Cluster 1 (Red)', 'Low to Medium Income', 'High (60 - 90)', 'Price-sensitive but eager; send discount coupons & flash sales'],
          ['Cluster 2 (Blue)', 'High Income ($80k+)', 'High (70 - 95)', 'Premium VIP shoppers; offer luxury previews & exclusive perks'],
          ['Cluster 3 (Green)', 'Medium to High Income', 'Low (10 - 35)', 'Cautious savers; target with re-engagement & essential bundles'],
        ],
      },
      takeaway:
        'Without any manual tagging, K-Means divided 10,000 customers into 3 clear business profiles. The business can now send targeted emails instead of generic spam.',
      takeawayBn:
        'কোনো কাস্টমারকে ম্যানুয়ালি ট্যাগ না করেই K-Means স্বয়ংক্রিয়ভাবে ৩টি চমৎকার দল তৈরি করে দিল। এখন দোকানটি প্রতিটি দলের রুচি অনুযায়ী নিখুঁত অফার পাঠাতে পারবে।',
    },
  },
];
