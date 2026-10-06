'use client';

import { LegalDocument, type LegalDoc } from '@/components/LegalLayout';

const en: LegalDoc = {
  title: 'Terms of Service',
  lastUpdated: 'October 6, 2026',
  summaryLabel: 'In short',
  summary:
    'These Terms of Service ("Terms") govern your access to and use of the Talkys AI website and platform. By using our services, you agree to these Terms. Where you have signed a separate agreement or order form with Talkys, that agreement takes precedence if it conflicts with these Terms.',
  sections: [
    {
      title: '1. The Service',
      blocks: [
        'Talkys AI ("Talkys", "we", "us") provides AI agents that answer phone calls, video calls and chats for businesses, take orders and bookings, qualify leads, send confirmations and hand conversations over to a human, together with call and chat logs, transcripts and integrations with third-party tools (the "Service").',
        'Setup is done by our team. The scope, channels, languages and integrations for your agents are agreed with you before going live.',
      ],
    },
    {
      title: '2. Use of the Service',
      blocks: [
        'You may use Talkys only for lawful purposes and in line with these Terms. You agree not to misuse the Service, attempt to disrupt it, reverse engineer it, or access it through unauthorised means.',
      ],
    },
    {
      title: '3. Accounts',
      blocks: [
        'You are responsible for the activity that happens under your account and for keeping your credentials secure. Notify us promptly at hello@talkys.ai if you suspect unauthorised use. If you sign up on behalf of a business, you confirm that you are authorised to bind that business to these Terms.',
      ],
    },
    {
      title: '4. Your Customers and Their Conversations',
      blocks: [
        'Call recordings, transcripts, chats and other data from conversations handled by your Talkys agents ("Customer Data") remain yours. We process Customer Data only to provide the Service, under our agreement with you and our Privacy Policy.',
        'You are responsible for:',
        {
          list: [
            'Telling the people your agents speak with that they are interacting with an AI agent, where the law requires it.',
            'Obtaining any notices or consents required to record and transcribe calls and to process personal data through Talkys.',
            'Making sure the information you give your agents (menus, prices, policies, availability) is accurate and up to date.',
            'Reviewing any action that has legal, financial or medical significance for the people involved, rather than relying on the agent alone.',
          ],
        },
      ],
    },
    {
      title: '5. Acceptable Use',
      blocks: [
        'Do not use Talkys to:',
        {
          list: [
            'Break any law or regulation, including telemarketing, spam, consumer protection and privacy rules.',
            'Make unsolicited calls or send unsolicited messages to people who have not agreed to be contacted.',
            'Impersonate a real person without their permission, or mislead people about who they are speaking with.',
            'Infringe intellectual property, harass others, or generate content that is fraudulent, harmful or deceptive.',
          ],
        },
        'We may suspend or terminate accounts that violate this section.',
      ],
    },
    {
      title: '6. Third-Party Integrations',
      blocks: [
        'Talkys can connect to tools you choose, such as CRMs, POS systems, delivery platforms, e-commerce stores, calendars and helpdesks. Your use of those tools is governed by their own terms, and we are not responsible for their availability or practices. You authorise us to send and receive data through the integrations you enable.',
      ],
    },
    {
      title: '7. Free Trial, Fees and Payment',
      blocks: [
        'We may offer a free trial for a limited period without requiring a payment card. At the end of the trial, the Service continues only if you choose a paid plan.',
        'Paid plans consist of a one-time setup fee and a monthly plan based on usage, as set out in your quote or order form. Fees are payable as stated there and are exclusive of applicable taxes unless stated otherwise.',
      ],
    },
    {
      title: '8. Intellectual Property',
      blocks: [
        'The Talkys platform, including its software, agents, branding and content, is owned by Talkys AI or its licensors and is protected by intellectual property laws. You retain all rights to the content and Customer Data you provide, and grant us a limited licence to use it only as needed to provide and support the Service.',
      ],
    },
    {
      title: '9. AI Output',
      blocks: [
        'Talkys agents use artificial intelligence and, while we work hard to make them accurate, they can occasionally misunderstand a request or give an incorrect answer. Conversations are logged and transcribed so you can review them, and agents can hand over to a human when needed.',
      ],
    },
    {
      title: '10. Disclaimers',
      blocks: [
        'Except as expressly agreed in writing, the Service is provided "as is" without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose and non-infringement. We do not guarantee uninterrupted or error-free operation.',
      ],
    },
    {
      title: '11. Limitation of Liability',
      blocks: [
        'To the maximum extent permitted by law, Talkys AI will not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of data, profits or revenue arising from your use of the Service.',
      ],
    },
    {
      title: '12. Termination',
      blocks: [
        'You may stop using the Service at any time, subject to any commitment in your order form. We may suspend or terminate access to the Service, including for violation of these Terms. On termination, Customer Data is handled as set out in our agreement with you and our Privacy Policy.',
      ],
    },
    {
      title: '13. Governing Law',
      blocks: [
        { placeholder: '[Placeholder: governing law and jurisdiction to be confirmed.]' },
      ],
    },
    {
      title: '14. Changes to These Terms',
      blocks: [
        'We may update these Terms periodically and will revise the "Last updated" date above. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.',
      ],
    },
    {
      title: '15. Contact',
      blocks: [
        'Questions about these Terms? Reach us at hello@talkys.ai.',
        { placeholder: '[Placeholder: registered legal entity name and address to be added.]' },
      ],
    },
  ],
};

const ar: LegalDoc = {
  title: 'شروط الخدمة',
  lastUpdated: '6 أكتوبر 2026',
  summaryLabel: 'باختصار',
  summary:
    'تحكم شروط الخدمة هذه ("الشروط") وصولك إلى موقع ومنصة Talkys AI واستخدامك لهما. باستخدامك لخدماتنا، فإنك توافق على هذه الشروط. وإذا وقّعت اتفاقية أو أمر شراء منفصلاً مع Talkys، تكون الأولوية لتلك الاتفاقية في حال تعارضها مع هذه الشروط.',
  sections: [
    {
      title: '1. الخدمة',
      blocks: [
        'تقدّم Talkys AI ("Talkys" أو "نحن") وكلاء ذكاء اصطناعي يردّون على المكالمات الهاتفية ومكالمات الفيديو والمحادثات لصالح الشركات، ويستلمون الطلبات والحجوزات، ويؤهّلون العملاء المحتملين، ويرسلون التأكيدات، ويحوّلون المحادثات إلى موظف بشري، إلى جانب سجلات المكالمات والمحادثات ونصوصها المكتوبة والتكامل مع أدوات الأطراف الثالثة ("الخدمة").',
        'يتولّى فريقنا عملية الإعداد، ويُتّفق معك على نطاق عمل الوكلاء وقنواتهم ولغاتهم وتكاملاتهم قبل التشغيل الفعلي.',
      ],
    },
    {
      title: '2. استخدام الخدمة',
      blocks: [
        'يجوز لك استخدام Talkys للأغراض المشروعة فقط وبما يتوافق مع هذه الشروط. وتوافق على عدم إساءة استخدام الخدمة أو محاولة تعطيلها أو إجراء هندسة عكسية لها أو الوصول إليها بوسائل غير مصرّح بها.',
      ],
    },
    {
      title: '3. الحسابات',
      blocks: [
        'أنت مسؤول عن النشاط الذي يجري ضمن حسابك وعن الحفاظ على أمان بيانات الدخول الخاصة بك. أبلغنا فوراً على hello@talkys.ai إذا اشتبهت في أي استخدام غير مصرّح به. وإذا سجّلت نيابةً عن شركة، فإنك تؤكد أنك مخوَّل بإلزامها بهذه الشروط.',
      ],
    },
    {
      title: '4. عملاؤك ومحادثاتهم',
      blocks: [
        'تبقى تسجيلات المكالمات والنصوص والمحادثات وغيرها من البيانات الناتجة عن المحادثات التي يتولاها وكلاء Talkys الخاصون بك ("بيانات العميل") ملكاً لك. ولا نعالج بيانات العميل إلا لتقديم الخدمة، وفقاً للاتفاقية المبرمة معك وسياسة الخصوصية الخاصة بنا.',
        'تقع على عاتقك مسؤولية:',
        {
          list: [
            'إبلاغ الأشخاص الذين يتحدث معهم وكلاؤك بأنهم يتعاملون مع وكيل ذكاء اصطناعي، حيثما يقتضي القانون ذلك.',
            'الحصول على أي إشعارات أو موافقات لازمة لتسجيل المكالمات وتفريغها نصياً ولمعالجة البيانات الشخصية عبر Talkys.',
            'التأكد من دقة المعلومات التي تزوّد بها وكلاءك (القوائم والأسعار والسياسات والمواعيد المتاحة) وتحديثها باستمرار.',
            'مراجعة أي إجراء له أثر قانوني أو مالي أو طبي على الأشخاص المعنيين، وعدم الاعتماد على الوكيل وحده في ذلك.',
          ],
        },
      ],
    },
    {
      title: '5. الاستخدام المقبول',
      blocks: [
        'لا تستخدم Talkys من أجل:',
        {
          list: [
            'مخالفة أي قانون أو لائحة، بما في ذلك قواعد التسويق الهاتفي والرسائل المزعجة وحماية المستهلك والخصوصية.',
            'إجراء مكالمات أو إرسال رسائل غير مرغوب فيها إلى أشخاص لم يوافقوا على التواصل معهم.',
            'انتحال شخصية أي شخص حقيقي دون إذنه، أو تضليل الناس بشأن الجهة التي يتحدثون معها.',
            'التعدي على حقوق الملكية الفكرية، أو مضايقة الآخرين، أو إنشاء محتوى احتيالي أو ضار أو مضلِّل.',
          ],
        },
        'يحق لنا تعليق الحسابات التي تخالف هذا البند أو إنهاؤها.',
      ],
    },
    {
      title: '6. تكاملات الأطراف الثالثة',
      blocks: [
        'يمكن ربط Talkys بالأدوات التي تختارها، مثل أنظمة CRM ونقاط البيع ومنصات التوصيل والمتاجر الإلكترونية والتقويمات وأنظمة الدعم الفني. ويخضع استخدامك لتلك الأدوات لشروطها الخاصة، ولسنا مسؤولين عن توفرها أو ممارساتها. وأنت تخوّلنا بإرسال البيانات واستقبالها عبر التكاملات التي تفعّلها.',
      ],
    },
    {
      title: '7. الفترة التجريبية والرسوم والدفع',
      blocks: [
        'قد نقدّم فترة تجريبية مجانية لمدة محدودة دون الحاجة إلى بطاقة دفع. وعند انتهائها، لا تستمر الخدمة إلا إذا اخترت خطة مدفوعة.',
        'تتكوّن الخطط المدفوعة من رسوم إعداد تُدفع مرة واحدة وخطة شهرية مبنية على حجم الاستخدام، وفق ما هو محدد في عرض السعر أو أمر الشراء. وتُستحق الرسوم كما هو مذكور فيهما، ولا تشمل الضرائب المطبّقة ما لم يُذكر خلاف ذلك.',
      ],
    },
    {
      title: '8. الملكية الفكرية',
      blocks: [
        'منصة Talkys، بما في ذلك برمجياتها ووكلاؤها وعلامتها التجارية ومحتواها، مملوكة لـ Talkys AI أو للجهات المرخِّصة لها، ومحمية بموجب قوانين الملكية الفكرية. وتحتفظ بجميع حقوقك في المحتوى وبيانات العميل التي تقدّمها، وتمنحنا ترخيصاً محدوداً لاستخدامها فقط بالقدر اللازم لتقديم الخدمة ودعمها.',
      ],
    },
    {
      title: '9. مخرجات الذكاء الاصطناعي',
      blocks: [
        'يعتمد وكلاء Talkys على الذكاء الاصطناعي، ورغم حرصنا الشديد على دقتهم، فقد يسيئون فهم طلب ما أو يقدّمون إجابة غير صحيحة أحياناً. لذلك تُسجَّل المحادثات وتُفرَّغ نصياً لتتمكن من مراجعتها، ويمكن للوكلاء تحويل المحادثة إلى موظف بشري عند الحاجة.',
      ],
    },
    {
      title: '10. إخلاء المسؤولية',
      blocks: [
        'باستثناء ما يُتّفق عليه صراحةً وكتابياً، تُقدَّم الخدمة "كما هي" دون أي ضمانات من أي نوع، صريحة أو ضمنية، بما في ذلك ضمانات القابلية للتسويق والملاءمة لغرض معيّن وعدم الانتهاك. ولا نضمن تشغيلاً متواصلاً أو خالياً من الأخطاء.',
      ],
    },
    {
      title: '11. حدود المسؤولية',
      blocks: [
        'إلى أقصى حد يسمح به القانون، لن تكون Talkys AI مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، أو عن أي فقدان للبيانات أو الأرباح أو الإيرادات ناتج عن استخدامك للخدمة.',
      ],
    },
    {
      title: '12. الإنهاء',
      blocks: [
        'يمكنك التوقف عن استخدام الخدمة في أي وقت، مع مراعاة أي التزام وارد في أمر الشراء الخاص بك. ويحق لنا تعليق الوصول إلى الخدمة أو إنهاؤه، بما في ذلك في حال مخالفة هذه الشروط. وعند الإنهاء، تُعامَل بيانات العميل وفق الاتفاقية المبرمة معك وسياسة الخصوصية الخاصة بنا.',
      ],
    },
    {
      title: '13. القانون الحاكم',
      blocks: [
        { placeholder: '[نص مؤقت: يُحدَّد لاحقاً القانون الحاكم والجهة القضائية المختصة.]' },
      ],
    },
    {
      title: '14. التغييرات على هذه الشروط',
      blocks: [
        'قد نحدّث هذه الشروط بشكل دوري، وسنعدّل تاريخ "آخر تحديث" أعلاه. ويُعدّ استمرارك في استخدام الخدمة بعد سريان التغييرات قبولاً للشروط المعدّلة.',
      ],
    },
    {
      title: '15. تواصل معنا',
      blocks: [
        'لأي سؤال حول هذه الشروط، تواصل معنا على hello@talkys.ai.',
        { placeholder: '[نص مؤقت: يُضاف لاحقاً الاسم القانوني المسجّل للشركة وعنوانها.]' },
      ],
    },
  ],
};

export function TermsContent() {
  return <LegalDocument copy={{ en, ar }} />;
}
