'use client';

import { LegalDocument, type LegalDoc } from '@/components/LegalLayout';

const en: LegalDoc = {
  title: 'Privacy Policy',
  lastUpdated: 'October 6, 2026',
  summaryLabel: 'In short',
  summary:
    'This Privacy Policy explains how Talkys AI ("Talkys", "we", "us", "our") collects, uses and protects information when you visit our website or use our AI agents for phone calls, video calls and chats. We do not sell personal data. Questions? Write to hello@talkys.ai.',
  sections: [
    {
      title: '1. Who We Are',
      blocks: [
        'Talkys AI builds and runs AI agents that answer phone calls, video calls and chats (such as WhatsApp, Instagram DMs, Messenger, web chat, SMS and email) on behalf of businesses (our "Customers").',
        'For information collected through our website and when you contact us, Talkys acts as the data controller. For conversations our agents handle on behalf of a Customer, Talkys acts as a data processor and follows that Customer\'s instructions.',
        { placeholder: '[Placeholder: registered legal entity name and address to be added.]' },
      ],
    },
    {
      title: '2. Information We Collect',
      blocks: [
        { sub: '2.1 Information you give us' },
        'When you fill in the demo request or contact form, or email us, we collect what you share: typically your name, email address, phone number, company name and the details of your message.',
        { sub: '2.2 Information collected automatically on our website' },
        {
          list: [
            'Approximate country, derived from your IP address, used only to pick the default language of the site (see section 4).',
            'Your language choice (English or Arabic), saved in your browser\'s local storage so the site remembers it on your next visit.',
            'Standard technical data that any web server or hosting provider receives, such as IP address, browser type and request logs.',
          ],
        },
        'We do not currently use analytics, advertising or tracking cookies on our website.',
        { sub: '2.3 Information processed when Customers use Talkys' },
        'When a Customer deploys a Talkys agent, we process the conversations it handles for them: call recordings, video call recordings, transcripts, chat messages, summaries, and related details such as phone numbers, names, orders, bookings and contact information shared during the conversation. We also keep account and usage logs needed to run the service.',
      ],
    },
    {
      title: '3. Customer Conversations',
      blocks: [
        'Call recordings, transcripts, chats and other conversation data processed by Talkys agents belong to the Customer that deployed the agent. We process them only to provide the service, under the agreement with that Customer (including any data processing terms), and according to the Customer\'s instructions and account configuration.',
        'Customers are responsible for telling their own customers that they are speaking with an AI agent where required, for obtaining any consent needed to record calls, and for having a lawful basis to share data with Talkys.',
        'If you spoke or chatted with a business that uses Talkys and want to access or delete your data, please contact that business first. We will help them handle your request.',
      ],
    },
    {
      title: '4. How We Use Information',
      blocks: [
        {
          list: [
            'To respond to demo requests and enquiries and to set up your trial or account.',
            'To operate the service: answer calls and chats, take orders and bookings, send confirmations, hand conversations over to a human, and log and transcribe them for the Customer.',
            'To provide support, keep the service secure and prevent misuse.',
            'To show the website in the right language for you.',
            'To send service-related messages and meet legal obligations.',
          ],
        },
        'We do not sell personal data, and we do not use Customer conversation data for advertising.',
      ],
    },
    {
      title: '5. Service Providers',
      blocks: [
        'We share information with trusted providers that process it on our behalf, under confidentiality and data protection obligations. These include:',
        {
          table: {
            head: ['Provider', 'Purpose'],
            rows: [
              ['Web3Forms', 'Delivers the contact and demo form on our website to our inbox.'],
              ['Country.is (api.country.is)', 'Looks up the approximate country of your IP address to choose the default site language. No account or profile is created.'],
              ['Hosting provider', 'Serves the website and receives standard request logs.'],
              ['Telephony, messaging and AI providers', 'Carry calls and messages and power speech recognition, voice and language models used by Talkys agents.'],
              ['Customer-connected tools', 'Systems a Customer chooses to connect (for example a CRM, POS, calendar or helpdesk) receive data according to that Customer\'s configuration.'],
            ],
          },
        },
        'We may also disclose information when required by law, or to protect our rights, our users and the public. If Talkys is involved in a merger or acquisition, information may transfer to the successor under equivalent protections.',
      ],
    },
    {
      title: '6. International Transfers',
      blocks: [
        'Our providers may process data in countries other than yours. Where that happens, we rely on contractual and technical safeguards designed to protect the data. Customers with data residency requirements can raise them with us during setup.',
      ],
    },
    {
      title: '7. Data Retention',
      blocks: [
        'We keep personal data only as long as needed for the purposes above, to comply with legal obligations and to resolve disputes.',
        {
          list: [
            'Contact and demo form submissions: for as long as needed to follow up on your request and manage our relationship with you.',
            'Call recordings, transcripts and chats: according to the Customer\'s account configuration and agreement, and deleted or returned when that agreement ends.',
            'Language preference: stored in your browser until you clear it.',
          ],
        },
      ],
    },
    {
      title: '8. Your Rights',
      blocks: [
        'Subject to applicable law, you may request access to, correction, deletion or portability of your personal data, or object to or restrict certain processing. You may also withdraw consent where processing is based on it. To exercise these rights, contact us at hello@talkys.ai.',
      ],
    },
    {
      title: '9. Security',
      blocks: [
        'We apply administrative, technical and organisational safeguards designed to protect data, including encryption in transit and restricted access. No method of transmission or storage is 100% secure, but we work to maintain reasonable protections and will notify affected Customers of a data breach as required by law.',
      ],
    },
    {
      title: '10. Children',
      blocks: [
        'Our website and service are intended for businesses and are not directed at children. We do not knowingly collect personal data from children through our website.',
      ],
    },
    {
      title: '11. Changes to This Policy',
      blocks: [
        'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date above and, where appropriate, notify Customers directly.',
      ],
    },
    {
      title: '12. Contact Us',
      blocks: ['For any privacy question or request, reach us at hello@talkys.ai.'],
    },
  ],
};

const ar: LegalDoc = {
  title: 'سياسة الخصوصية',
  lastUpdated: '6 أكتوبر 2026',
  summaryLabel: 'باختصار',
  summary:
    'توضح سياسة الخصوصية هذه كيف تجمع Talkys AI ("Talkys" أو "نحن") المعلومات وتستخدمها وتحميها عند زيارتك لموقعنا أو استخدامك لوكلاء الذكاء الاصطناعي الذين يتولّون المكالمات الهاتفية ومكالمات الفيديو والمحادثات. نحن لا نبيع البيانات الشخصية. لأي سؤال، راسلنا على hello@talkys.ai.',
  sections: [
    {
      title: '1. من نحن',
      blocks: [
        'تطوّر Talkys AI وتشغّل وكلاء ذكاء اصطناعي يردّون على المكالمات الهاتفية ومكالمات الفيديو والمحادثات (مثل WhatsApp ورسائل Instagram وMessenger ودردشة الموقع والرسائل النصية والبريد الإلكتروني) نيابةً عن الشركات (المشار إليها بـ"العملاء").',
        'بالنسبة إلى المعلومات التي نجمعها عبر موقعنا وعند تواصلك معنا، تعمل Talkys بصفتها المتحكّم في البيانات. أما المحادثات التي يتولاها وكلاؤنا نيابةً عن أحد العملاء، فتعمل Talkys بصفتها معالِجاً للبيانات وتتبع تعليمات ذلك العميل.',
        { placeholder: '[نص مؤقت: يُضاف لاحقاً الاسم القانوني المسجّل للشركة وعنوانها.]' },
      ],
    },
    {
      title: '2. المعلومات التي نجمعها',
      blocks: [
        { sub: '2.1 المعلومات التي تقدّمها لنا' },
        'عند تعبئة نموذج طلب العرض التوضيحي أو نموذج التواصل، أو عند مراسلتنا بالبريد الإلكتروني، نجمع ما تشاركه معنا، وعادةً ما يشمل اسمك وبريدك الإلكتروني ورقم هاتفك واسم شركتك وتفاصيل رسالتك.',
        { sub: '2.2 المعلومات التي تُجمع تلقائياً على موقعنا' },
        {
          list: [
            'الدولة التقريبية المستنتجة من عنوان IP الخاص بك، ونستخدمها فقط لاختيار اللغة الافتراضية للموقع (راجع البند 4).',
            'اختيارك للغة (العربية أو الإنجليزية)، ويُحفظ في التخزين المحلي لمتصفحك ليتذكّره الموقع في زيارتك التالية.',
            'البيانات التقنية المعتادة التي يتلقاها أي خادم ويب أو مزوّد استضافة، مثل عنوان IP ونوع المتصفح وسجلات الطلبات.',
          ],
        },
        'لا نستخدم حالياً على موقعنا أي ملفات تعريف ارتباط للتحليلات أو الإعلانات أو التتبّع.',
        { sub: '2.3 المعلومات التي نعالجها عند استخدام العملاء لـ Talkys' },
        'عندما يشغّل أحد العملاء وكيلاً من Talkys، نعالج المحادثات التي يتولاها لصالحه: تسجيلات المكالمات، وتسجيلات مكالمات الفيديو، والنصوص المكتوبة للمكالمات، ورسائل الدردشة، والملخّصات، والتفاصيل المرتبطة بها مثل أرقام الهواتف والأسماء والطلبات والحجوزات وبيانات التواصل التي تُذكر خلال المحادثة. كما نحتفظ بسجلات الحساب والاستخدام اللازمة لتشغيل الخدمة.',
      ],
    },
    {
      title: '3. محادثات العملاء',
      blocks: [
        'تعود ملكية تسجيلات المكالمات والنصوص والمحادثات وغيرها من بيانات المحادثات التي يعالجها وكلاء Talkys إلى العميل الذي شغّل الوكيل. ولا نعالجها إلا لتقديم الخدمة، وفقاً للاتفاقية المبرمة مع ذلك العميل (بما في ذلك أي شروط لمعالجة البيانات)، وبحسب تعليماته وإعدادات حسابه.',
        'يتحمّل العملاء مسؤولية إبلاغ عملائهم بأنهم يتحدثون مع وكيل ذكاء اصطناعي حيثما يلزم ذلك، والحصول على أي موافقة مطلوبة لتسجيل المكالمات، وامتلاك أساس قانوني لمشاركة البيانات مع Talkys.',
        'إذا تحدّثت أو تراسلت مع شركة تستخدم Talkys وترغب في الاطلاع على بياناتك أو حذفها، فيُرجى التواصل مع تلك الشركة أولاً، وسنساعدها في تلبية طلبك.',
      ],
    },
    {
      title: '4. كيف نستخدم المعلومات',
      blocks: [
        {
          list: [
            'للردّ على طلبات العروض التوضيحية والاستفسارات، وتجهيز فترتك التجريبية أو حسابك.',
            'لتشغيل الخدمة: الردّ على المكالمات والمحادثات، واستلام الطلبات والحجوزات، وإرسال التأكيدات، وتحويل المحادثات إلى موظف بشري، وتسجيلها وتفريغها نصياً لصالح العميل.',
            'لتقديم الدعم، والحفاظ على أمان الخدمة، ومنع إساءة استخدامها.',
            'لعرض الموقع باللغة المناسبة لك.',
            'لإرسال الرسائل المتعلقة بالخدمة والوفاء بالالتزامات القانونية.',
          ],
        },
        'نحن لا نبيع البيانات الشخصية، ولا نستخدم بيانات محادثات العملاء لأغراض إعلانية.',
      ],
    },
    {
      title: '5. مزوّدو الخدمات',
      blocks: [
        'نشارك المعلومات مع مزوّدين موثوقين يعالجونها نيابةً عنا، بموجب التزامات بالسرية وحماية البيانات. ومن بينهم:',
        {
          table: {
            head: ['المزوّد', 'الغرض'],
            rows: [
              ['Web3Forms', 'إيصال نموذج التواصل وطلب العرض التوضيحي على موقعنا إلى بريدنا الإلكتروني.'],
              ['Country.is (api.country.is)', 'تحديد الدولة التقريبية لعنوان IP الخاص بك لاختيار لغة الموقع الافتراضية، دون إنشاء أي حساب أو ملف تعريفي.'],
              ['مزوّد الاستضافة', 'تشغيل الموقع واستلام سجلات الطلبات المعتادة.'],
              ['مزوّدو الاتصالات والمراسلة والذكاء الاصطناعي', 'نقل المكالمات والرسائل، وتشغيل تقنيات التعرّف على الكلام والصوت والنماذج اللغوية التي يستخدمها وكلاء Talkys.'],
              ['الأدوات التي يربطها العميل', 'الأنظمة التي يختار العميل ربطها (مثل أنظمة CRM أو نقاط البيع أو التقويم أو الدعم الفني) تتلقى البيانات وفق إعدادات ذلك العميل.'],
            ],
          },
        },
        'وقد نفصح عن المعلومات عندما يقتضي القانون ذلك، أو لحماية حقوقنا وحقوق مستخدمينا والجمهور. وفي حال اندماج Talkys أو الاستحواذ عليها، قد تنتقل المعلومات إلى الجهة الخلَف مع توفير حماية مماثلة.',
      ],
    },
    {
      title: '6. نقل البيانات دولياً',
      blocks: [
        'قد يعالج مزوّدونا البيانات في دول غير دولتك. وفي هذه الحالة نعتمد على ضمانات تعاقدية وتقنية مصمَّمة لحماية البيانات. ويمكن للعملاء الذين لديهم متطلبات بشأن موقع تخزين البيانات مناقشتها معنا أثناء الإعداد.',
      ],
    },
    {
      title: '7. الاحتفاظ بالبيانات',
      blocks: [
        'نحتفظ بالبيانات الشخصية فقط للمدة اللازمة لتحقيق الأغراض المذكورة أعلاه، والامتثال للالتزامات القانونية، وتسوية النزاعات.',
        {
          list: [
            'طلبات نموذج التواصل والعرض التوضيحي: للمدة اللازمة لمتابعة طلبك وإدارة علاقتنا معك.',
            'تسجيلات المكالمات والنصوص والمحادثات: وفق إعدادات حساب العميل والاتفاقية المبرمة معه، وتُحذف أو تُعاد إليه عند انتهاء تلك الاتفاقية.',
            'تفضيل اللغة: يبقى محفوظاً في متصفحك إلى أن تقوم بمسحه.',
          ],
        },
      ],
    },
    {
      title: '8. حقوقك',
      blocks: [
        'وفقاً للقانون المعمول به، يحق لك طلب الاطلاع على بياناتك الشخصية أو تصحيحها أو حذفها أو نقلها، أو الاعتراض على بعض أنواع المعالجة أو تقييدها. كما يحق لك سحب موافقتك حين تكون المعالجة قائمة عليها. لممارسة هذه الحقوق، تواصل معنا على hello@talkys.ai.',
      ],
    },
    {
      title: '9. الأمان',
      blocks: [
        'نطبّق ضمانات إدارية وتقنية وتنظيمية مصمَّمة لحماية البيانات، منها التشفير أثناء النقل وتقييد صلاحيات الوصول. لا توجد وسيلة نقل أو تخزين آمنة بنسبة 100%، لكننا نعمل على الحفاظ على مستوى حماية معقول، وسنُخطر العملاء المتأثرين بأي اختراق للبيانات وفق ما يقتضيه القانون.',
      ],
    },
    {
      title: '10. الأطفال',
      blocks: [
        'موقعنا وخدمتنا موجّهان إلى الشركات وليسا موجّهين إلى الأطفال. ولا نجمع عن علم أي بيانات شخصية من الأطفال عبر موقعنا.',
      ],
    },
    {
      title: '11. التغييرات على هذه السياسة',
      blocks: [
        'قد نحدّث سياسة الخصوصية هذه من وقت لآخر. وعند ذلك سنعدّل تاريخ "آخر تحديث" أعلاه، وسنُخطر العملاء مباشرةً عند الاقتضاء.',
      ],
    },
    {
      title: '12. تواصل معنا',
      blocks: ['لأي سؤال أو طلب يتعلق بالخصوصية، تواصل معنا على hello@talkys.ai.'],
    },
  ],
};

export function PrivacyContent() {
  return <LegalDocument copy={{ en, ar }} />;
}
