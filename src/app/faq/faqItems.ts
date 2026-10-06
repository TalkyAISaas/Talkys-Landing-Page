// Bilingual FAQ copy. Shared by the page (English FAQPage JSON-LD) and FaqContent (rendered list).
export type FaqItem = { q: string; a: string };

export const faqCopy: {
  en: { eyebrow: string; title: string; description: string; ctaTitle: string; ctaText: string; cta: string; items: FaqItem[] };
  ar: { eyebrow: string; title: string; description: string; ctaTitle: string; ctaText: string; cta: string; items: FaqItem[] };
} = {
  en: {
    eyebrow: 'FAQ',
    title: 'Everything you wanted to ask',
    description: 'Straight answers about how Talkys handles your calls, video calls and chats, and what it takes to get started.',
    ctaTitle: 'Still have a question?',
    ctaText: 'Book a demo and ask us directly, or hear a Talkys agent handle a call for your business.',
    cta: 'Book a demo',
    items: [
      {
        q: 'What is Talkys?',
        a: 'Talkys gives your business AI agents that answer phone calls, video calls and chats (WhatsApp, Instagram, Messenger, web chat, SMS and email) 24/7. They answer questions, take orders and bookings, qualify leads, send confirmations and update your systems, then hand off to your team when a human is needed.',
      },
      {
        q: 'Is Talkys just another chatbot?',
        a: 'It is more than a chatbot: it answers, acts and connects. A chatbot replies to messages. A Talkys agent talks to customers on the phone, on video and in chat, then does the work behind the conversation, like pushing an order to your POS, booking a slot in your calendar or logging a lead in your CRM.',
      },
      {
        q: 'Can it handle both inbound and outbound calls?',
        a: 'Yes. Talkys picks up every inbound call with no busy signal and no limit on parallel calls. It can also place outbound calls for confirmations, reminders, lead follow-ups and feedback, with every call logged, transcribed and searchable.',
      },
      {
        q: 'What are AI video agents?',
        a: 'A video agent is a lifelike avatar that talks to your customers face to face on a video call. It can show products, units or menus on screen while it talks, which works well for showrooms, real estate, hotels and clinics. It uses the same knowledge and integrations as your voice and chat agents.',
      },
      {
        q: 'Which languages and dialects does Talkys speak?',
        a: 'Arabic (Gulf, Levantine including Lebanese, Egyptian and Modern Standard Arabic), English and French. It switches naturally between them mid-sentence, the way your customers actually talk.',
      },
      {
        q: 'Does it work with the tools we already use?',
        a: 'Yes, Talkys connects to any stack. That includes CRMs like Salesforce, HubSpot, Zoho and Odoo; POS systems like Foodics, Omega POS and Squirrel POS; delivery apps like Talabat and Toters; Shopify, Salla and Stripe; Google Calendar, Calendly and Cal.com; and helpdesks. For anything custom, we connect through webhooks and REST APIs.',
      },
      {
        q: 'What happens when Talkys can’t answer something?',
        a: 'It hands off to your team with a summary and the full transcript, so nobody has to ask the customer to repeat themselves. The handoff lands wherever you want: WhatsApp, email, your helpdesk or a live transfer to the person on duty.',
      },
      {
        q: 'How long does setup take?',
        a: 'Most businesses are live within 7 to 10 days. Setup is done for you: we handle the integrations, training on your menu, catalogue or services, and the voice setup. No tech team needed on your side.',
      },
      {
        q: 'Is my customer data safe?',
        a: 'Yes. Conversations are encrypted, stored in line with local data laws, and never shared or used to train other systems. Your customer data stays yours, and you control who on your team can access transcripts.',
      },
      {
        q: 'What does it cost?',
        a: 'After your demo, you pay a one-time setup fee, then a monthly plan based on your usage that includes updates and ongoing support. We’ll size the plan to your call and chat volume.',
      },
      {
        q: 'Is there a free trial?',
        a: 'Yes. You get a 15-day free trial with no credit card. If Talkys isn’t earning its keep in the first two weeks, we part ways with no hard feelings.',
      },
    ],
  },
  ar: {
    eyebrow: 'الأسئلة الشائعة',
    title: 'كل ما أردت أن تسأل عنه',
    description: 'إجابات واضحة عن طريقة تعامل Talkys مع مكالماتك ومكالمات الفيديو والمحادثات، وما يلزم للبدء.',
    ctaTitle: 'لديك سؤال آخر؟',
    ctaText: 'احجز عرضاً تجريبياً واسألنا مباشرة، أو استمع إلى وكيل Talkys وهو يتولّى مكالمة لنشاطك.',
    cta: 'احجز عرضاً تجريبياً',
    items: [
      {
        q: 'ما هو Talkys؟',
        a: 'يمنح Talkys نشاطك وكلاء ذكاء اصطناعي يردّون على المكالمات الهاتفية ومكالمات الفيديو والمحادثات (WhatsApp وInstagram وMessenger ودردشة الموقع والرسائل النصية والبريد الإلكتروني) على مدار الساعة. يجيبون عن الأسئلة، يستقبلون الطلبات والحجوزات، يؤهّلون العملاء المحتملين، يرسلون التأكيدات ويحدّثون أنظمتك، ثم يحوّلون المحادثة إلى فريقك عندما يلزم تدخّل بشري.',
      },
      {
        q: 'هل Talkys مجرد روبوت محادثة آخر؟',
        a: 'إنه أكثر من روبوت محادثة: يجيب وينفّذ ويربط. روبوت المحادثة يردّ على الرسائل فقط، أما وكيل Talkys فيتحدّث مع العملاء عبر الهاتف والفيديو والدردشة، ثم ينجز العمل الذي يلي المحادثة، مثل إرسال الطلب إلى نظام نقاط البيع، أو حجز موعد في تقويمك، أو تسجيل عميل محتمل في نظام CRM.',
      },
      {
        q: 'هل يتولّى المكالمات الواردة والصادرة معاً؟',
        a: 'نعم. يردّ Talkys على كل مكالمة واردة من دون خط مشغول ومن دون حدّ لعدد المكالمات المتزامنة. ويمكنه أيضاً إجراء مكالمات صادرة للتأكيدات والتذكيرات ومتابعة العملاء المحتملين وجمع الآراء، مع تسجيل كل مكالمة وتفريغها نصياً وإتاحة البحث فيها.',
      },
      {
        q: 'ما هم وكلاء الفيديو بالذكاء الاصطناعي؟',
        a: 'وكيل الفيديو شخصية رقمية واقعية تتحدّث مع عملائك وجهاً لوجه عبر مكالمة فيديو. يمكنه عرض المنتجات أو الوحدات أو القوائم على الشاشة أثناء الحديث، وهو مناسب لمعارض السيارات والعقارات والفنادق والعيادات. ويستخدم المعرفة والتكاملات نفسها التي يستخدمها وكلاء الصوت والدردشة.',
      },
      {
        q: 'ما اللغات واللهجات التي يتحدّثها Talkys؟',
        a: 'العربية (الخليجية، والشامية بما فيها اللبنانية، والمصرية، والفصحى) والإنجليزية والفرنسية. وينتقل بينها بسلاسة في منتصف الجملة، تماماً كما يتحدّث عملاؤك.',
      },
      {
        q: 'هل يعمل مع الأدوات التي نستخدمها حالياً؟',
        a: 'نعم، يتّصل Talkys بأي منظومة أدوات: أنظمة CRM مثل Salesforce وHubSpot وZoho وOdoo، وأنظمة نقاط البيع مثل Foodics وOmega POS وSquirrel POS، وتطبيقات التوصيل مثل Talabat وToters، إضافة إلى Shopify وSalla وStripe، وGoogle Calendar وCalendly وCal.com، وأنظمة الدعم الفني. ولأي نظام خاص، نربطه عبر webhooks وواجهات REST API.',
      },
      {
        q: 'ماذا يحدث عندما لا يعرف Talkys الإجابة؟',
        a: 'يحوّل المحادثة إلى فريقك مع ملخّص ونصّ المحادثة كاملاً، فلا يضطر العميل إلى تكرار كلامه. ويصل التحويل إلى المكان الذي تختاره: WhatsApp أو البريد الإلكتروني أو نظام الدعم، أو تحويل مباشر إلى الموظف المناوب.',
      },
      {
        q: 'كم يستغرق الإعداد؟',
        a: 'تبدأ معظم الشركات العمل خلال 7 إلى 10 أيام. نتولّى الإعداد بالكامل: التكاملات، والتدريب على قائمتك أو منتجاتك أو خدماتك، وإعداد الصوت. لا حاجة إلى فريق تقني من جهتك.',
      },
      {
        q: 'هل بيانات عملائي آمنة؟',
        a: 'نعم. المحادثات مشفّرة، وتُخزَّن وفق قوانين حماية البيانات المحلية، ولا تُشارَك أو تُستخدم لتدريب أنظمة أخرى. بيانات عملائك تبقى ملكك، وأنت تحدّد من في فريقك يمكنه الاطّلاع على المحادثات.',
      },
      {
        q: 'كم تبلغ التكلفة؟',
        a: 'بعد العرض التجريبي، تدفع رسوم إعداد لمرة واحدة، ثم اشتراكاً شهرياً بحسب استخدامك يشمل التحديثات والدعم المستمر. نحدّد الخطة وفق حجم مكالماتك ومحادثاتك.',
      },
      {
        q: 'هل توجد فترة تجريبية مجانية؟',
        a: 'نعم. تحصل على تجربة مجانية لمدة 15 يوماً من دون بطاقة ائتمان. وإذا لم يُثبت Talkys قيمته خلال الأسبوعين الأولين، نفترق بكل ودّ.',
      },
    ],
  },
};
