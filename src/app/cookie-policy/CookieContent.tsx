'use client';

import { LegalDocument, type LegalDoc } from '@/components/LegalLayout';

const en: LegalDoc = {
  title: 'Cookie Policy',
  lastUpdated: 'October 6, 2026',
  summaryLabel: 'In short',
  summary:
    'This Cookie Policy explains how Talkys AI uses cookies and similar technologies on our website. Today we use no analytics, advertising or tracking cookies: the site only stores your language choice in your browser and looks up your approximate country to pick a default language.',
  sections: [
    {
      title: '1. What Are Cookies',
      blocks: [
        'Cookies are small text files placed on your device when you visit a website. Similar technologies, such as your browser\'s local storage, let a site save small pieces of information on your device. They help a site function correctly and remember your preferences.',
      ],
    },
    {
      title: '2. What We Use',
      blocks: [
        {
          table: {
            head: ['Name', 'Type', 'Purpose', 'Duration'],
            rows: [
              ['locale', 'Local storage (preference)', 'Remembers whether you chose English or Arabic.', 'Until you clear your browser data'],
            ],
          },
        },
        'This preference is strictly functional, stays on your device and is not used to track you.',
      ],
    },
    {
      title: '3. Language Detection',
      blocks: [
        'If you have not chosen a language yet, the site asks Country.is (api.country.is) for the approximate country of your IP address and shows Arabic or English accordingly. This lookup does not set a cookie on your device. As soon as you pick a language yourself, your choice is used instead.',
      ],
    },
    {
      title: '4. Contact Form',
      blocks: [
        'When you submit the contact or demo form, your message is sent through Web3Forms so it reaches our inbox. The form does not set tracking cookies on our site. See our Privacy Policy for how we handle what you send.',
      ],
    },
    {
      title: '5. Analytics and Advertising',
      blocks: [
        'We do not currently use analytics, advertising or social media tracking cookies. If that changes, we will update this policy and, where required, ask for your consent before setting them.',
      ],
    },
    {
      title: '6. Managing Cookies and Storage',
      blocks: [
        'Most browsers let you block or delete cookies and site data through their settings. If you clear your site data, the website will simply ask for or detect your language again. Refer to your browser documentation for instructions.',
      ],
    },
    {
      title: '7. Updates',
      blocks: [
        'We may update this Cookie Policy as our use of cookies evolves. The "Last updated" date above reflects the latest revision.',
      ],
    },
    {
      title: '8. Contact Us',
      blocks: ['Questions about this policy? Reach us at hello@talkys.ai.'],
    },
  ],
};

const ar: LegalDoc = {
  title: 'سياسة ملفات تعريف الارتباط',
  lastUpdated: '6 أكتوبر 2026',
  summaryLabel: 'باختصار',
  summary:
    'توضح هذه السياسة كيف تستخدم Talkys AI ملفات تعريف الارتباط (الكوكيز) والتقنيات المماثلة على موقعنا. لا نستخدم حالياً أي ملفات تعريف ارتباط للتحليلات أو الإعلانات أو التتبّع، إذ يقتصر الأمر على حفظ اختيارك للغة في متصفحك وتحديد دولتك التقريبية لاختيار اللغة الافتراضية.',
  sections: [
    {
      title: '1. ما هي ملفات تعريف الارتباط',
      blocks: [
        'ملفات تعريف الارتباط هي ملفات نصية صغيرة تُحفظ على جهازك عند زيارة موقع إلكتروني. وتتيح تقنيات مماثلة، مثل التخزين المحلي في متصفحك، للموقع حفظ معلومات صغيرة على جهازك. وتساعد هذه التقنيات الموقع على العمل بشكل صحيح وتذكّر تفضيلاتك.',
      ],
    },
    {
      title: '2. ما نستخدمه',
      blocks: [
        {
          table: {
            head: ['الاسم', 'النوع', 'الغرض', 'المدة'],
            rows: [
              ['locale', 'تخزين محلي (تفضيلات)', 'يتذكّر ما إذا كنت قد اخترت العربية أو الإنجليزية.', 'إلى أن تمسح بيانات متصفحك'],
            ],
          },
        },
        'هذا التفضيل وظيفي بحت، ويبقى على جهازك، ولا يُستخدم لتتبّعك.',
      ],
    },
    {
      title: '3. تحديد اللغة',
      blocks: [
        'إذا لم تكن قد اخترت لغة بعد، يستعلم الموقع من Country.is (api.country.is) عن الدولة التقريبية لعنوان IP الخاص بك، ويعرض المحتوى بالعربية أو الإنجليزية بناءً على ذلك. ولا يضع هذا الاستعلام أي ملف تعريف ارتباط على جهازك. وبمجرد أن تختار اللغة بنفسك، يُعتمد اختيارك بدلاً من ذلك.',
      ],
    },
    {
      title: '4. نموذج التواصل',
      blocks: [
        'عند إرسال نموذج التواصل أو طلب العرض التوضيحي، تُرسَل رسالتك عبر Web3Forms لتصل إلى بريدنا الإلكتروني. ولا يضع النموذج أي ملفات تعريف ارتباط للتتبّع على موقعنا. راجع سياسة الخصوصية لمعرفة كيف نتعامل مع ما ترسله.',
      ],
    },
    {
      title: '5. التحليلات والإعلانات',
      blocks: [
        'لا نستخدم حالياً أي ملفات تعريف ارتباط للتحليلات أو الإعلانات أو التتبّع عبر وسائل التواصل الاجتماعي. وإذا تغيّر ذلك، فسنحدّث هذه السياسة ونطلب موافقتك قبل استخدامها حيثما يلزم.',
      ],
    },
    {
      title: '6. إدارة ملفات تعريف الارتباط والتخزين',
      blocks: [
        'تتيح لك معظم المتصفحات حظر ملفات تعريف الارتباط وبيانات المواقع أو حذفها من خلال إعداداتها. وإذا مسحت بيانات الموقع، فسيطلب منك الموقع اختيار اللغة من جديد أو يحدّدها تلقائياً. راجع إرشادات متصفحك لمعرفة الخطوات.',
      ],
    },
    {
      title: '7. التحديثات',
      blocks: [
        'قد نحدّث هذه السياسة مع تطوّر استخدامنا لملفات تعريف الارتباط. ويعكس تاريخ "آخر تحديث" أعلاه أحدث مراجعة.',
      ],
    },
    {
      title: '8. تواصل معنا',
      blocks: ['لأي سؤال حول هذه السياسة، تواصل معنا على hello@talkys.ai.'],
    },
  ],
};

export function CookieContent() {
  return <LegalDocument copy={{ en, ar }} />;
}
