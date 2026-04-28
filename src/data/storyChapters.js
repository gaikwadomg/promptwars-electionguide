export const storyChapters = [
  {
    id: 1,
    title: { en: 'Your Democratic Identity', hi: 'आपकी लोकतांत्रिक पहचान' },
    subtitle: { en: 'Becoming a registered voter', hi: 'एक पंजीकृत मतदाता बनना' },
    icon: '🪪',
    xpReward: 20,
    badge: null,
    color: '#FF9933',
    content: {
      en: [
        {
          heading: 'Why Register?',
          text: 'Every Indian citizen aged 18+ has the right to vote. But first, you need to register! Your name must be on the Electoral Roll of your constituency. Without registration, you cannot cast your vote on election day.',
        },
        {
          heading: 'How to Register — Form 6',
          text: 'Visit voters.eci.gov.in or download the "Voter Helpline" app. Fill out Form 6 for new voter registration. You\'ll need: proof of age (birth certificate, 10th marksheet), proof of address (Aadhaar, utility bill), and a passport-size photo.',
        },
        {
          heading: 'What is an EPIC Card?',
          text: 'EPIC stands for Electors Photo Identity Card — your Voter ID! After registration, a Booth Level Officer (BLO) visits to verify your details within 30 days. Once approved, you get your EPIC card or can download the e-EPIC from the ECI portal.',
        },
        {
          heading: 'Your e-EPIC',
          text: 'Can\'t wait for the physical card? Download your e-EPIC instantly from voters.eci.gov.in after your registration is approved. It\'s a valid digital voter ID stored on your phone!',
        },
      ],
      hi: [
        {
          heading: 'पंजीकरण क्यों करें?',
          text: 'हर 18+ भारतीय नागरिक को मतदान का अधिकार है। लेकिन पहले, आपको पंजीकरण करवाना होगा! आपका नाम आपके निर्वाचन क्षेत्र की मतदाता सूची में होना चाहिए। बिना पंजीकरण के, आप चुनाव के दिन वोट नहीं डाल सकते।',
        },
        {
          heading: 'पंजीकरण कैसे करें — फॉर्म 6',
          text: 'voters.eci.gov.in पर जाएं या "Voter Helpline" ऐप डाउनलोड करें। नए मतदाता पंजीकरण के लिए फॉर्म 6 भरें। आपको चाहिए: आयु प्रमाण (जन्म प्रमाण पत्र, 10वीं मार्कशीट), पता प्रमाण (आधार, बिजली बिल), और पासपोर्ट साइज फोटो।',
        },
        {
          heading: 'EPIC कार्ड क्या है?',
          text: 'EPIC का मतलब है इलेक्टर्स फोटो आइडेंटिटी कार्ड — आपका मतदाता पहचान पत्र! पंजीकरण के बाद, एक बूथ स्तर अधिकारी (BLO) 30 दिनों के भीतर सत्यापन के लिए आता है। स्वीकृति के बाद, आपको EPIC कार्ड मिलता है।',
        },
        {
          heading: 'आपका e-EPIC',
          text: 'भौतिक कार्ड का इंतजार नहीं कर सकते? अपने पंजीकरण की स्वीकृति के बाद voters.eci.gov.in से अपना e-EPIC तुरंत डाउनलोड करें। यह आपके फोन पर संग्रहीत एक वैध डिजिटल मतदाता पहचान पत्र है!',
        },
      ],
    },
    quiz: [
      {
        question: { en: 'What is the minimum age to register as a voter in India?', hi: 'भारत में मतदाता के रूप में पंजीकरण की न्यूनतम आयु क्या है?' },
        options: {
          en: ['16 years', '18 years', '21 years', '25 years'],
          hi: ['16 वर्ष', '18 वर्ष', '21 वर्ष', '25 वर्ष'],
        },
        correctIndex: 1,
      },
      {
        question: { en: 'Which form is used for new voter registration?', hi: 'नए मतदाता पंजीकरण के लिए कौन सा फॉर्म उपयोग होता है?' },
        options: {
          en: ['Form 1', 'Form 6', 'Form 8', 'Form 10'],
          hi: ['फॉर्म 1', 'फॉर्म 6', 'फॉर्म 8', 'फॉर्म 10'],
        },
        correctIndex: 1,
      },
    ],
  },
  {
    id: 2,
    title: { en: 'Know Your Arena', hi: 'अपना मैदान जानो' },
    subtitle: { en: 'Understanding Indian elections', hi: 'भारतीय चुनाव समझना' },
    icon: '🏛️',
    xpReward: 20,
    badge: { name: { en: 'Democracy Scholar', hi: 'लोकतंत्र विद्वान' }, emoji: '🏅' },
    color: '#138808',
    content: {
      en: [
        {
          heading: 'Two Types of Elections',
          text: 'India has two main types of elections: Lok Sabha (Parliament) elections for the central government, and Vidhan Sabha (State Assembly) elections for state governments. Both are equally important for our democracy!',
        },
        {
          heading: 'Lok Sabha — The People\'s House',
          text: 'Lok Sabha has 543 elected members (MPs). Each MP represents a parliamentary constituency. The party or alliance with the majority forms the central government. The leader becomes the Prime Minister. Elections happen every 5 years.',
        },
        {
          heading: 'Vidhan Sabha — State Assembly',
          text: 'Each state has its own assembly with MLAs. The number of seats varies by state (UP has 403, Goa has 40!). The majority party\'s leader becomes the Chief Minister. State elections also happen every 5 years, but not simultaneously with Lok Sabha.',
        },
        {
          heading: 'Your Constituency',
          text: 'You belong to both a parliamentary constituency (for Lok Sabha) and an assembly constituency (for Vidhan Sabha). Find yours on the Voter Helpline app or by calling 1950!',
        },
      ],
      hi: [
        {
          heading: 'दो प्रकार के चुनाव',
          text: 'भारत में दो मुख्य प्रकार के चुनाव होते हैं: केंद्र सरकार के लिए लोकसभा (संसद) चुनाव, और राज्य सरकारों के लिए विधानसभा चुनाव। दोनों हमारे लोकतंत्र के लिए समान रूप से महत्वपूर्ण हैं!',
        },
        {
          heading: 'लोकसभा — जनता का सदन',
          text: 'लोकसभा में 543 निर्वाचित सदस्य (सांसद) होते हैं। प्रत्येक सांसद एक संसदीय क्षेत्र का प्रतिनिधित्व करता है। बहुमत वाली पार्टी या गठबंधन केंद्र सरकार बनाता है। नेता प्रधानमंत्री बनता है।',
        },
        {
          heading: 'विधानसभा — राज्य सभा',
          text: 'प्रत्येक राज्य की अपनी विधानसभा होती है जिसमें विधायक होते हैं। सीटों की संख्या राज्य के अनुसार भिन्न होती है (UP में 403, गोवा में 40!)। बहुमत दल का नेता मुख्यमंत्री बनता है।',
        },
        {
          heading: 'आपका निर्वाचन क्षेत्र',
          text: 'आप संसदीय क्षेत्र (लोकसभा) और विधानसभा क्षेत्र दोनों से संबंधित हैं। Voter Helpline ऐप पर या 1950 पर कॉल करके अपना क्षेत्र ढूंढें!',
        },
      ],
    },
    quiz: [
      {
        question: { en: 'How many elected members are in Lok Sabha?', hi: 'लोकसभा में कितने निर्वाचित सदस्य हैं?' },
        options: {
          en: ['245', '543', '403', '700'],
          hi: ['245', '543', '403', '700'],
        },
        correctIndex: 1,
      },
      {
        question: { en: 'Who becomes the head of a state government?', hi: 'राज्य सरकार का प्रमुख कौन बनता है?' },
        options: {
          en: ['Prime Minister', 'President', 'Chief Minister', 'Governor'],
          hi: ['प्रधानमंत्री', 'राष्ट्रपति', 'मुख्यमंत्री', 'राज्यपाल'],
        },
        correctIndex: 2,
      },
    ],
  },
  {
    id: 3,
    title: { en: 'Machines of Democracy', hi: 'लोकतंत्र की मशीनें' },
    subtitle: { en: 'Understanding EVM & VVPAT', hi: 'EVM और VVPAT समझना' },
    icon: '⚙️',
    xpReward: 20,
    badge: null,
    color: '#000080',
    content: {
      en: [
        {
          heading: 'What is an EVM?',
          text: 'EVM (Electronic Voting Machine) is the device you use to cast your vote. It has two units: the Control Unit (with the polling officer) and the Ballot Unit (in the voting compartment). Press the button next to your chosen candidate — that\'s it!',
        },
        {
          heading: 'Why EVMs?',
          text: 'India switched from paper ballots to EVMs in 2004. Benefits: no invalid votes (like torn ballots), faster counting, tamper-resistant design, and they work without electricity (battery-powered). Each EVM can record up to 2,000 votes.',
        },
        {
          heading: 'The VVPAT — Your Receipt',
          text: 'VVPAT (Voter Verifiable Paper Audit Trail) is attached to the EVM. After you press the button, a small paper slip shows your candidate\'s name and symbol for 7 seconds. This confirms your vote was cast correctly!',
        },
        {
          heading: 'NOTA — None of the Above',
          text: 'Don\'t like any candidate? You have the right to press NOTA (None of the Above) — the last button on the EVM. Your vote is still counted, and it sends a message about voter dissatisfaction. This option has existed since 2013!',
        },
      ],
      hi: [
        {
          heading: 'EVM क्या है?',
          text: 'EVM (इलेक्ट्रॉनिक वोटिंग मशीन) वह उपकरण है जिससे आप वोट डालते हैं। इसमें दो यूनिट हैं: कंट्रोल यूनिट (पोलिंग अधिकारी के पास) और बैलट यूनिट (मतदान कक्ष में)। अपने चुने हुए उम्मीदवार के बगल में बटन दबाएं — बस!',
        },
        {
          heading: 'EVM क्यों?',
          text: 'भारत ने 2004 में कागजी मतपत्रों से EVM पर स्विच किया। फायदे: कोई अमान्य वोट नहीं, तेज मतगणना, छेड़छाड़-रोधी डिज़ाइन, और बिजली के बिना काम करते हैं। प्रत्येक EVM 2,000 वोट तक रिकॉर्ड कर सकता है।',
        },
        {
          heading: 'VVPAT — आपकी रसीद',
          text: 'VVPAT EVM से जुड़ा होता है। बटन दबाने के बाद, एक छोटी कागजी पर्ची 7 सेकंड के लिए आपके उम्मीदवार का नाम और चिन्ह दिखाती है। यह पुष्टि करता है कि आपका वोट सही डाला गया!',
        },
        {
          heading: 'NOTA — इनमें से कोई नहीं',
          text: 'कोई भी उम्मीदवार पसंद नहीं? EVM पर अंतिम बटन NOTA (None of the Above) दबाने का अधिकार है। आपका वोट फिर भी गिना जाता है। 2013 से यह विकल्प मौजूद है!',
        },
      ],
    },
    quiz: [
      {
        question: { en: 'How long does the VVPAT slip display your vote?', hi: 'VVPAT पर्ची कितने सेकंड तक आपका वोट दिखाती है?' },
        options: {
          en: ['3 seconds', '5 seconds', '7 seconds', '10 seconds'],
          hi: ['3 सेकंड', '5 सेकंड', '7 सेकंड', '10 सेकंड'],
        },
        correctIndex: 2,
      },
      {
        question: { en: 'Since when has the NOTA option been available?', hi: 'NOTA विकल्प कब से उपलब्ध है?' },
        options: {
          en: ['2004', '2009', '2013', '2019'],
          hi: ['2004', '2009', '2013', '2019'],
        },
        correctIndex: 2,
      },
    ],
  },
  {
    id: 4,
    title: { en: 'Mission Polling Day', hi: 'मिशन मतदान दिवस' },
    subtitle: { en: 'Your election day checklist', hi: 'आपकी चुनाव दिवस चेकलिस्ट' },
    icon: '🗳️',
    xpReward: 20,
    badge: { name: { en: 'Voter Ready', hi: 'मतदाता तैयार' }, emoji: '🎖️' },
    color: '#FF9933',
    content: {
      en: [
        {
          heading: 'Before You Go',
          text: 'Check your name on the voter list at voters.eci.gov.in or the Voter Helpline app. Find your polling booth location — it\'s usually a school or community center near your home. Voting hours are typically 7 AM to 6 PM.',
        },
        {
          heading: 'What to Carry',
          text: 'Carry your EPIC (Voter ID) card. If you don\'t have it, any of these 12 alternatives work: Aadhaar, PAN, Driving License, Passport, Bank Passbook with photo, or any government photo ID. No ID? You can still vote if a polling officer identifies you.',
        },
        {
          heading: 'At the Polling Booth',
          text: 'Step 1: Queue up and show your ID. Step 2: Officer checks your name, applies indelible ink on your left index finger. Step 3: Enter the voting compartment. Step 4: Press the button next to your candidate on the EVM. Step 5: Check the VVPAT slip. Done!',
        },
        {
          heading: 'Do\'s and Don\'ts',
          text: 'DO: Vote in your assigned booth only. DON\'T: Carry mobile phones into the voting compartment. DON\'T: Show your vote to anyone (it\'s secret!). DON\'T: Wear party symbols/colors. DO: Ensure the indelible ink mark is on your finger before leaving.',
        },
      ],
      hi: [
        {
          heading: 'जाने से पहले',
          text: 'voters.eci.gov.in या Voter Helpline ऐप पर अपना नाम जांचें। अपने मतदान केंद्र का पता लगाएं — यह आमतौर पर आपके घर के पास एक स्कूल या सामुदायिक केंद्र होता है। मतदान का समय सुबह 7 बजे से शाम 6 बजे तक होता है।',
        },
        {
          heading: 'क्या ले जाएं',
          text: 'अपना EPIC (मतदाता पहचान पत्र) ले जाएं। अगर नहीं है, तो ये 12 विकल्प काम करते हैं: आधार, PAN, ड्राइविंग लाइसेंस, पासपोर्ट, फोटो वाला बैंक पासबुक, या कोई सरकारी फोटो ID।',
        },
        {
          heading: 'मतदान केंद्र पर',
          text: 'चरण 1: लाइन में लगें और ID दिखाएं। चरण 2: अधिकारी नाम जांचता है, बाएं तर्जनी पर अमिट स्याही लगाता है। चरण 3: मतदान कक्ष में जाएं। चरण 4: EVM पर अपने उम्मीदवार के बगल का बटन दबाएं। चरण 5: VVPAT पर्ची जांचें।',
        },
        {
          heading: 'क्या करें और क्या न करें',
          text: 'करें: केवल अपने निर्धारित बूथ पर वोट दें। न करें: मतदान कक्ष में मोबाइल ले जाएं। न करें: किसी को अपना वोट दिखाएं (यह गोपनीय है!)। करें: जाने से पहले सुनिश्चित करें कि अमिट स्याही आपकी उंगली पर है।',
        },
      ],
    },
    quiz: [
      {
        question: { en: 'On which finger is the indelible ink applied?', hi: 'किस उंगली पर अमिट स्याही लगाई जाती है?' },
        options: {
          en: ['Right thumb', 'Left index finger', 'Right index finger', 'Left thumb'],
          hi: ['दायां अंगूठा', 'बाईं तर्जनी', 'दाईं तर्जनी', 'बायां अंगूठा'],
        },
        correctIndex: 1,
      },
      {
        question: { en: 'Can you carry a mobile phone into the voting compartment?', hi: 'क्या आप मतदान कक्ष में मोबाइल फोन ले जा सकते हैं?' },
        options: {
          en: ['Yes', 'No', 'Only for photos', 'Only if switched off'],
          hi: ['हां', 'नहीं', 'सिर्फ फोटो के लिए', 'सिर्फ बंद होने पर'],
        },
        correctIndex: 1,
      },
    ],
  },
  {
    id: 5,
    title: { en: 'Beyond the Vote', hi: 'वोट के बाद' },
    subtitle: { en: 'Your civic journey continues', hi: 'आपकी नागरिक यात्रा जारी है' },
    icon: '🌟',
    xpReward: 20,
    badge: { name: { en: 'Election Expert', hi: 'चुनाव विशेषज्ञ' }, emoji: '🏆' },
    color: '#138808',
    content: {
      en: [
        {
          heading: 'Counting Day',
          text: 'After all phases of voting end, counting happens on a designated day. EVMs from all booths are brought to counting centers. Results come in constituency by constituency — you can watch live on ECI\'s website!',
        },
        {
          heading: 'Government Formation',
          text: 'The party or alliance with 272+ seats (majority) in Lok Sabha forms the government. The leader is invited by the President to be Prime Minister. For state assemblies, the Governor invites the majority leader to be Chief Minister.',
        },
        {
          heading: 'Your Rights Don\'t End Here',
          text: 'Voting is just the beginning! You can: file RTI (Right to Information) requests, attend gram sabha/ward meetings, track your MP/MLA\'s performance on sites like MyNeta.info, and participate in public consultations.',
        },
        {
          heading: 'Be a Democracy Champion',
          text: 'Share your voting knowledge with friends and family. Help first-time voters register. Volunteer as a polling agent or BLO. Every voice matters — "Chunav ka Parv, Desh ka Garv" (Election is a festival, Nation\'s pride)!',
        },
      ],
      hi: [
        {
          heading: 'मतगणना दिवस',
          text: 'सभी चरणों के मतदान के बाद, एक निर्धारित दिन मतगणना होती है। सभी बूथों से EVM मतगणना केंद्रों में लाए जाते हैं। परिणाम निर्वाचन क्षेत्र-वार आते हैं — आप ECI की वेबसाइट पर लाइव देख सकते हैं!',
        },
        {
          heading: 'सरकार गठन',
          text: 'लोकसभा में 272+ सीट (बहुमत) वाली पार्टी या गठबंधन सरकार बनाता है। राष्ट्रपति नेता को प्रधानमंत्री बनने के लिए आमंत्रित करता है। राज्य विधानसभाओं के लिए, राज्यपाल बहुमत नेता को मुख्यमंत्री बनने के लिए आमंत्रित करता है।',
        },
        {
          heading: 'आपके अधिकार यहीं नहीं रुकते',
          text: 'मतदान तो बस शुरुआत है! आप: RTI (सूचना का अधिकार) दायर कर सकते हैं, ग्राम सभा/वार्ड बैठकों में भाग ले सकते हैं, MyNeta.info पर अपने सांसद/विधायक का प्रदर्शन ट्रैक कर सकते हैं।',
        },
        {
          heading: 'लोकतंत्र चैंपियन बनें',
          text: 'अपना मतदान ज्ञान दोस्तों और परिवार के साथ साझा करें। पहली बार मतदान करने वालों को पंजीकरण में मदद करें। "चुनाव का पर्व, देश का गर्व"!',
        },
      ],
    },
    quiz: [
      {
        question: { en: 'How many Lok Sabha seats are needed for a majority?', hi: 'लोकसभा में बहुमत के लिए कितनी सीटें चाहिए?' },
        options: {
          en: ['200', '250', '272', '300'],
          hi: ['200', '250', '272', '300'],
        },
        correctIndex: 2,
      },
      {
        question: { en: 'What is RTI?', hi: 'RTI क्या है?' },
        options: {
          en: ['Right to Internet', 'Right to Information', 'Right to Identity', 'Right to Investment'],
          hi: ['इंटरनेट का अधिकार', 'सूचना का अधिकार', 'पहचान का अधिकार', 'निवेश का अधिकार'],
        },
        correctIndex: 1,
      },
    ],
  },
];

export const badges = [
  { id: 'voter_ready', name: { en: 'Voter Ready', hi: 'मतदाता तैयार' }, emoji: '🎖️', description: { en: 'Completed Mission Polling Day', hi: 'मिशन मतदान दिवस पूरा किया' }, requiredChapter: 4 },
  { id: 'democracy_scholar', name: { en: 'Democracy Scholar', hi: 'लोकतंत्र विद्वान' }, emoji: '🏅', description: { en: 'Completed Know Your Arena', hi: 'अपना मैदान जानो पूरा किया' }, requiredChapter: 2 },
  { id: 'election_expert', name: { en: 'Election Expert', hi: 'चुनाव विशेषज्ञ' }, emoji: '🏆', description: { en: 'Completed all chapters', hi: 'सभी अध्याय पूरे किए' }, requiredChapter: 5 },
];

export const guideSteps = [
  {
    id: 1,
    icon: '📝',
    title: { en: 'Register as a Voter', hi: 'मतदाता के रूप में पंजीकरण करें' },
    subtitle: { en: 'पंजीकरण करें', hi: 'Register' },
    description: {
      en: 'Visit voters.eci.gov.in or Voter Helpline App. Fill Form 6 with your details, age proof, and address proof.',
      hi: 'voters.eci.gov.in या Voter Helpline ऐप पर जाएं। अपने विवरण, आयु प्रमाण और पता प्रमाण के साथ फॉर्म 6 भरें।'
    },
    action: { en: 'Go to voters.eci.gov.in', hi: 'voters.eci.gov.in पर जाएं' },
    link: 'https://voters.eci.gov.in',
  },
  {
    id: 2,
    icon: '✅',
    title: { en: 'Verify Your Registration', hi: 'अपना पंजीकरण सत्यापित करें' },
    subtitle: { en: 'सत्यापित करें', hi: 'Verify' },
    description: {
      en: 'After submitting Form 6, a BLO (Booth Level Officer) will verify your details within 30 days. Track status on the ECI portal.',
      hi: 'फॉर्म 6 जमा करने के बाद, BLO (बूथ स्तर अधिकारी) 30 दिनों के भीतर आपके विवरण सत्यापित करेगा। ECI पोर्टल पर स्थिति ट्रैक करें।'
    },
    action: { en: 'Check Registration Status', hi: 'पंजीकरण स्थिति जांचें' },
    link: 'https://voters.eci.gov.in',
  },
  {
    id: 3,
    icon: '📍',
    title: { en: 'Find Your Polling Booth', hi: 'अपना मतदान केंद्र खोजें' },
    subtitle: { en: 'बूथ खोजें', hi: 'Find Booth' },
    description: {
      en: 'Use the Voter Helpline app or call 1950 to find your assigned booth. It\'s usually a nearby school or community center.',
      hi: 'अपना निर्धारित बूथ खोजने के लिए Voter Helpline ऐप या 1950 पर कॉल करें। यह आमतौर पर पास का स्कूल या सामुदायिक केंद्र होता है।'
    },
    action: { en: 'Call 1950', hi: '1950 पर कॉल करें' },
    link: 'tel:1950',
  },
  {
    id: 4,
    icon: '🪪',
    title: { en: 'Carry Your Documents', hi: 'अपने दस्तावेज़ साथ ले जाएं' },
    subtitle: { en: 'दस्तावेज़ तैयार करें', hi: 'Prepare Documents' },
    description: {
      en: 'Carry your EPIC card (Voter ID). Alternatives: Aadhaar, PAN, Passport, Driving License, or any govt photo ID.',
      hi: 'अपना EPIC कार्ड (मतदाता पहचान पत्र) ले जाएं। विकल्प: आधार, PAN, पासपोर्ट, ड्राइविंग लाइसेंस, या कोई सरकारी फोटो ID।'
    },
    action: { en: 'Download e-EPIC', hi: 'e-EPIC डाउनलोड करें' },
    link: 'https://voters.eci.gov.in',
  },
  {
    id: 5,
    icon: '🗳️',
    title: { en: 'Cast Your Vote!', hi: 'अपना वोट डालें!' },
    subtitle: { en: 'वोट दें', hi: 'Vote' },
    description: {
      en: 'Show ID → Get ink mark → Enter booth → Press EVM button → Check VVPAT slip → Exit proudly! 🇮🇳',
      hi: 'ID दिखाएं → स्याही का निशान लगवाएं → बूथ में जाएं → EVM बटन दबाएं → VVPAT पर्ची जांचें → गर्व से बाहर आएं! 🇮🇳'
    },
    action: { en: 'I\'m Ready to Vote!', hi: 'मैं वोट देने के लिए तैयार हूं!' },
    link: null,
  },
];

export const suggestedQuestions = {
  en: [
    'How do I get a Voter ID?',
    'Where is my polling booth?',
    'What is an EVM?',
    'What should I carry to vote?',
    'Lok Sabha vs Vidhan Sabha?',
    'What is NOTA?',
  ],
  hi: [
    'Voter ID कैसे बनवाएं?',
    'मेरा मतदान केंद्र कहां है?',
    'EVM क्या होता है?',
    'वोट डालने क्या ले जाएं?',
    'लोकसभा vs विधानसभा?',
    'NOTA क्या है?',
  ],
};

export const demoResponses = {
  'how do i get a voter id': 'To get a Voter ID (EPIC card):\n\n1. **Visit** voters.eci.gov.in or download the "Voter Helpline" app\n2. **Fill Form 6** — for new voter registration\n3. **Upload documents** — age proof (birth certificate/10th marksheet) + address proof (Aadhaar/utility bill) + passport photo\n4. **Submit** — A BLO (Booth Level Officer) will visit within 30 days to verify\n5. **Receive EPIC** — get physical card or download e-EPIC instantly!\n\n📱 **Next Step:** Download the Voter Helpline app from Play Store right now and start your Form 6!',
  'voter id कैसे बनवाएं': 'वोटर ID (EPIC कार्ड) बनवाने के लिए:\n\n1. **जाएं** voters.eci.gov.in पर या "Voter Helpline" ऐप डाउनलोड करें\n2. **फॉर्म 6 भरें** — नए मतदाता पंजीकरण के लिए\n3. **दस्तावेज अपलोड करें** — आयु प्रमाण + पता प्रमाण + फोटो\n4. **जमा करें** — BLO 30 दिनों में सत्यापन के लिए आएगा\n5. **EPIC प्राप्त करें** — कार्ड मिलेगा या e-EPIC डाउनलोड करें!\n\n📱 **अगला कदम:** अभी Play Store से Voter Helpline ऐप डाउनलोड करें!',
  'where is my polling booth': 'To find your polling booth:\n\n1. **Voter Helpline App** — Download from Play Store/App Store, enter your EPIC number\n2. **Call 1950** — National Voter Helpline, available 24/7\n3. **SMS** — Send "EPIC <your_voter_id_number>" to 1950\n4. **Online** — Visit electoralsearch.eci.gov.in\n\nYour booth is usually a school, community center, or government building near your registered address.\n\n📍 **Next Step:** Open the Voter Helpline app and search with your name or EPIC number!',
  'मेरा मतदान केंद्र कहां है': 'अपना मतदान केंद्र खोजने के लिए:\n\n1. **Voter Helpline ऐप** — Play Store से डाउनलोड करें, EPIC नंबर डालें\n2. **1950 पर कॉल करें** — राष्ट्रीय मतदाता हेल्पलाइन, 24/7 उपलब्ध\n3. **SMS** — 1950 पर "EPIC <आपका_नंबर>" भेजें\n4. **ऑनलाइन** — electoralsearch.eci.gov.in पर जाएं\n\n📍 **अगला कदम:** Voter Helpline ऐप खोलें और अपने नाम से खोजें!',
  'what is an evm': 'An **EVM (Electronic Voting Machine)** is India\'s voting device since 2004.\n\n**How it works:**\n- Has 2 parts: Control Unit (with officer) + Ballot Unit (in your booth)\n- Shows candidate names, photos & party symbols\n- Press the blue button next to your choice\n- A **VVPAT** slip shows your vote for 7 seconds to confirm\n\n**Why EVMs are great:**\n- ✅ No invalid votes\n- ✅ Battery-powered (no electricity needed)\n- ✅ Tamper-proof with multiple security layers\n- ✅ Fast counting (hours vs days with paper)\n\n🗳️ **Next Step:** Watch ECI\'s official EVM demo video on YouTube to see it in action!',
  'evm क्या होता है': '**EVM (इलेक्ट्रॉनिक वोटिंग मशीन)** 2004 से भारत की मतदान मशीन है।\n\n**कैसे काम करती है:**\n- 2 भाग: कंट्रोल यूनिट + बैलट यूनिट\n- उम्मीदवारों के नाम, फोटो और पार्टी चिन्ह दिखाती है\n- अपनी पसंद के बगल का बटन दबाएं\n- **VVPAT** पर्ची 7 सेकंड के लिए वोट दिखाती है\n\n**EVM क्यों बेहतर:**\n- ✅ कोई अमान्य वोट नहीं\n- ✅ बैटरी चालित\n- ✅ छेड़छाड़-रोधी\n- ✅ तेज मतगणना\n\n🗳️ **अगला कदम:** YouTube पर ECI का EVM डेमो वीडियो देखें!',
  'what should i carry to vote': 'Documents for Election Day:\n\n**Primary:** EPIC (Voter ID Card) or e-EPIC on phone\n\n**12 Alternatives (any one):**\n1. Aadhaar Card\n2. PAN Card\n3. Driving License\n4. Passport\n5. Bank Passbook with photo\n6. Govt employee ID\n7. Student ID (govt institution)\n8. Property ownership document with photo\n9. MNREGA Job Card\n10. Health Insurance Smart Card\n11. Pension document with photo\n12. MP/MLA/MLC ID\n\n⚠️ **Don\'t carry:** Mobile phone into voting compartment, cameras, party material\n\n✅ **Next Step:** Keep your Voter ID ready and locate your polling booth today!',
  'वोट डालने क्या ले जाएं': 'चुनाव दिवस के दस्तावेज:\n\n**प्राथमिक:** EPIC (मतदाता पहचान पत्र) या फोन पर e-EPIC\n\n**12 विकल्प (कोई एक):**\n- आधार कार्ड\n- PAN कार्ड\n- ड्राइविंग लाइसेंस\n- पासपोर्ट\n- फोटो वाला बैंक पासबुक\n- सरकारी कर्मचारी ID\n- छात्र ID\n- MNREGA कार्ड\n\n⚠️ **न ले जाएं:** मतदान कक्ष में मोबाइल, कैमरा, पार्टी सामग्री\n\n✅ **अगला कदम:** अपना Voter ID तैयार रखें और आज ही मतदान केंद्र पता करें!',
  'lok sabha vs vidhan sabha': '**Lok Sabha (लोकसभा) vs Vidhan Sabha (विधानसभा):**\n\n| | Lok Sabha | Vidhan Sabha |\n|---|---|---|\n| Level | Central/National | State |\n| Members | 543 MPs | Varies (e.g., UP: 403, Delhi: 70) |\n| Leader | Prime Minister | Chief Minister |\n| Term | 5 years | 5 years |\n| Elected by | All India voters | State voters only |\n\n**Key difference:** Lok Sabha makes national laws & policies. Vidhan Sabha handles state subjects like police, health, agriculture.\n\nYou vote in BOTH elections using the same Voter ID! 🗳️\n\n📖 **Next Step:** Check which Lok Sabha & Vidhan Sabha constituency you belong to on the Voter Helpline app!',
  'लोकसभा vs विधानसभा': '**लोकसभा vs विधानसभा:**\n\n| | लोकसभा | विधानसभा |\n|---|---|---|\n| स्तर | केंद्रीय/राष्ट्रीय | राज्य |\n| सदस्य | 543 सांसद | भिन्न (UP: 403, दिल्ली: 70) |\n| नेता | प्रधानमंत्री | मुख्यमंत्री |\n| कार्यकाल | 5 वर्ष | 5 वर्ष |\n\n**मुख्य अंतर:** लोकसभा राष्ट्रीय कानून बनाती है। विधानसभा पुलिस, स्वास्थ्य, कृषि जैसे राज्य विषय संभालती है।\n\nदोनों चुनावों में एक ही Voter ID से वोट करें! 🗳️\n\n📖 **अगला कदम:** Voter Helpline ऐप पर अपना निर्वाचन क्षेत्र जांचें!',
  'what is nota': '**NOTA — None Of The Above**\n\nSince 2013, every Indian voter has the right to reject all candidates.\n\n**How to use NOTA:**\n- It\'s the LAST button on the EVM ballot unit\n- Press it if you don\'t want to vote for any listed candidate\n- Your vote is still counted in the total turnout\n\n**Does NOTA matter?**\n- NOTA votes are counted and reported\n- Even if NOTA gets the most votes, the candidate with the highest votes among parties still wins\n- But high NOTA numbers send a strong message about voter dissatisfaction\n\n**Fun fact:** In 2019 Lok Sabha elections, NOTA got 1.06% of total votes (over 65 lakh votes)!\n\n🗳️ **Next Step:** Remember, voting — even NOTA — is always better than not voting at all!',
  'nota क्या है': '**NOTA — इनमें से कोई नहीं**\n\n2013 से, हर भारतीय मतदाता को सभी उम्मीदवारों को अस्वीकार करने का अधिकार है।\n\n**NOTA कैसे करें:**\n- EVM पर आखिरी बटन है\n- दबाएं अगर कोई उम्मीदवार पसंद नहीं\n- वोट कुल मतदान में गिना जाता है\n\n**क्या NOTA मायने रखता है?**\n- NOTA वोट गिने और रिपोर्ट किए जाते हैं\n- ज्यादा NOTA वोट मतदाता असंतोष का मजबूत संदेश भेजते हैं\n\n**रोचक तथ्य:** 2019 लोकसभा में NOTA को 65 लाख+ वोट मिले!\n\n🗳️ **अगला कदम:** याद रखें, NOTA भी वोट न देने से बेहतर है!',
};
