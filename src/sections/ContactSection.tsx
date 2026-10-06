'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, Check, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionHeader } from '@/components/SectionHeader';
import { CountryCombobox } from '@/components/CountryCombobox';
import { useReveal } from '@/hooks/useReveal';
import { useCopy } from '@/i18n/LocaleContext';
import { CONTACT_PREFILL_EVENT } from '@/lib/contactPrefill';
import { DEFAULT_COUNTRY, countryByCode, countryName, isCountryCode } from '@/lib/countries';
import { cn } from '@/lib/utils';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const CC_RECIPIENTS = 'ali.fakih@rentallsoftware.com, ali.alfakih@ssupworld.com';
// Web3Forms access keys are public by design (they ship in the browser bundle); the env var can override it.
const DEFAULT_WEB3FORMS_KEY = '8dfe5049-c5e5-4b24-8d3e-12d6862268fa';
const CONTACT_EMAIL = 'hello@talkys.ai';
const GEO_ENDPOINT = 'https://api.country.is';

// Values are sent to the inbox in English, whatever language the visitor uses.
const INDUSTRY_VALUES = ['Restaurants & cafés', 'Hotels & hospitality', 'Car dealerships', 'Retail & e-commerce', 'Clinics & healthcare', 'Real estate', 'Salons & beauty', 'Logistics & delivery', 'Other'] as const;

const copy = {
  en: {
    eyebrow: 'Book a demo',
    titleLead: 'Hear Talkys answer',
    titleAccent: 'your customers.',
    description:
      'Tell us how your customers reach you today — calls, WhatsApp, Instagram, walk-ins asking for a booking. We’ll set up a demo agent around your business and show you how it handles them, in Arabic, English or French.',
    fullName: 'Full name',
    fullNamePlaceholder: 'Your name',
    email: 'Work email',
    emailPlaceholder: 'you@company.com',
    company: 'Company',
    companyPlaceholder: 'Company name',
    industry: 'Industry',
    industryPlaceholder: 'Select your industry',
    industries: ['Restaurants & cafés', 'Hotels & hospitality', 'Car dealerships', 'Retail & e-commerce', 'Clinics & healthcare', 'Real estate', 'Salons & beauty', 'Logistics & delivery', 'Other'],
    phone: 'Phone number',
    phonePlaceholder: '70 123 456',
    message: 'What should Talkys handle for you?',
    messagePlaceholder: 'E.g. delivery orders on WhatsApp, table bookings by phone, test-drive requests after hours',
    consentLead: 'I agree to the',
    consentLink: 'privacy policy',
    consentTail: 'and to being contacted by Talkys about my demo.',
    submit: 'Book my demo',
    submitting: 'Sending…',
    meta: 'No credit card · 15-day free trial · We reply within 24 hours',
    errors: {
      fullName: 'Please enter your name',
      email: 'Please enter your work email',
      emailInvalid: 'Enter a valid email address',
      company: 'Please enter your company name',
      industry: 'Please select an industry',
      phone: 'Please enter a valid phone number',
      consent: 'Please agree to the privacy policy to continue',
      submit: `We couldn’t send your request. Please try again or email ${CONTACT_EMAIL}.`,
      notConfigured: 'The demo form isn’t configured yet: set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local and restart the dev server.',
    },
    successTitle: 'Demo requested',
    successBody: 'Thanks! We’ll be in touch within 24 hours to set up your demo.',
    sendAnother: 'Send another request',
    expectTitle: 'What happens in your demo',
    expectations: [
      'A live call with a Talkys agent, in the language and dialect your customers speak',
      'A walkthrough built around your business: orders, bookings, test drives or appointments',
      'A look at the dashboard: recordings, transcripts and handoffs to your team',
      'A plan to connect your CRM, POS, calendar or delivery apps',
    ],
    emailLead: 'Prefer email?',
  },
  ar: {
    eyebrow: 'احجز عرضاً تجريبياً',
    titleLead: 'اسمع Talkys وهو يردّ',
    titleAccent: 'على عملائك.',
    description:
      'أخبرنا كيف يتواصل معك عملاؤك اليوم: مكالمات، واتساب، إنستغرام، أو طلبات حجز. سنجهّز وكيلاً تجريبياً مبنياً على نشاطك ونريك كيف يتعامل معهم، بالعربية أو الإنجليزية أو الفرنسية.',
    fullName: 'الاسم الكامل',
    fullNamePlaceholder: 'اسمك',
    email: 'البريد الإلكتروني للعمل',
    emailPlaceholder: 'you@company.com',
    company: 'الشركة',
    companyPlaceholder: 'اسم الشركة',
    industry: 'القطاع',
    industryPlaceholder: 'اختر قطاعك',
    industries: ['المطاعم والمقاهي', 'الفنادق والضيافة', 'وكالات السيارات', 'التجزئة والتجارة الإلكترونية', 'العيادات والرعاية الصحية', 'العقارات', 'صالونات التجميل', 'الخدمات اللوجستية والتوصيل', 'قطاع آخر'],
    phone: 'رقم الهاتف',
    phonePlaceholder: '70 123 456',
    message: 'ما الذي تريد أن يتولّاه Talkys عنك؟',
    messagePlaceholder: 'مثلاً: طلبات التوصيل عبر واتساب، حجز الطاولات بالهاتف، طلبات تجربة القيادة خارج ساعات العمل',
    consentLead: 'أوافق على',
    consentLink: 'سياسة الخصوصية',
    consentTail: 'وعلى أن يتواصل معي فريق Talkys بخصوص العرض التجريبي.',
    submit: 'احجز عرضي التجريبي',
    submitting: 'جارٍ الإرسال…',
    meta: 'بدون بطاقة ائتمان · تجربة مجانية لمدة ١٥ يوماً · نردّ خلال ٢٤ ساعة',
    errors: {
      fullName: 'يرجى إدخال اسمك',
      email: 'يرجى إدخال بريدك الإلكتروني للعمل',
      emailInvalid: 'أدخل بريداً إلكترونياً صحيحاً',
      company: 'يرجى إدخال اسم شركتك',
      industry: 'يرجى اختيار القطاع',
      phone: 'يرجى إدخال رقم هاتف صحيح',
      consent: 'يرجى الموافقة على سياسة الخصوصية للمتابعة',
      submit: `تعذّر إرسال طلبك. حاول مرة أخرى أو راسلنا على ${CONTACT_EMAIL}.`,
      notConfigured: 'نموذج العرض التجريبي غير مُعدّ بعد: أضف NEXT_PUBLIC_WEB3FORMS_KEY إلى ‎.env.local ثم أعد تشغيل خادم التطوير.',
    },
    successTitle: 'تم استلام طلبك',
    successBody: 'شكراً لك! سنتواصل معك خلال ٢٤ ساعة لتحديد موعد العرض.',
    sendAnother: 'إرسال طلب آخر',
    expectTitle: 'ماذا يتضمّن العرض التجريبي',
    expectations: [
      'مكالمة حيّة مع وكيل Talkys باللغة واللهجة التي يتحدث بها عملاؤك',
      'جولة مبنية على نشاطك: الطلبات أو الحجوزات أو تجارب القيادة أو المواعيد',
      'نظرة على لوحة التحكم: التسجيلات والنصوص المكتوبة والتحويل إلى فريقك',
      'خطة لربط نظام CRM أو نقطة البيع أو التقويم أو تطبيقات التوصيل لديك',
    ],
    emailLead: 'تفضّل البريد الإلكتروني؟',
  },
};

type FormState = {
  fullName: string;
  email: string;
  company: string;
  industry: string;
  country: string;
  phone: string;
  message: string;
  consent: boolean;
  botcheck: boolean;
};

const EMPTY_FORM: FormState = {
  fullName: '',
  email: '',
  company: '',
  industry: '',
  country: DEFAULT_COUNTRY,
  phone: '',
  message: '',
  consent: false,
  botcheck: false,
};

const fieldClass =
  'h-11 rounded-[10px] border-[var(--border-color)] bg-white text-base text-[var(--text-primary)] shadow-xs placeholder:text-[var(--text-muted)]/70 focus-visible:border-[var(--indigo-400)] focus-visible:ring-[var(--indigo-100)]';

function Field({ id, label, error, required, children }: { id: string; label: string; error?: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
        {label}
        {required && <span className="text-[var(--text-muted)]"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[var(--plum-700)]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactSection() {
  const t = useCopy(copy);
  const sectionRef = useReveal<HTMLElement>();
  const countryTouchedRef = useRef(false);

  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default the dialling code to the visitor's country; Lebanon if the lookup fails.
  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 2500);
    fetch(GEO_ENDPOINT, { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<{ country?: string }>) : null))
      .then((data) => {
        const code = data?.country?.toUpperCase();
        if (isCountryCode(code) && !countryTouchedRef.current) {
          setFormData((prev) => ({ ...prev, country: code }));
        }
      })
      .catch(() => {})
      .finally(() => window.clearTimeout(timer));
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);

  // Other sections can pre-fill the message, without overwriting anything typed.
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const text = (event as CustomEvent<string>).detail;
      setFormData((prev) => (prev.message.trim() ? prev : { ...prev, message: text }));
    };
    window.addEventListener(CONTACT_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(CONTACT_PREFILL_EVENT, onPrefill);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = t.errors.fullName;

    if (!formData.email.trim()) {
      newErrors.email = t.errors.email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t.errors.emailInvalid;
    }

    if (!formData.company.trim()) newErrors.company = t.errors.company;
    if (!formData.industry) newErrors.industry = t.errors.industry;
    if (formData.phone.replace(/\D/g, '').length < 6) newErrors.phone = t.errors.phone;
    if (!formData.consent) newErrors.consent = t.errors.consent;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Honeypot ticked: quietly pretend it worked.
    if (formData.botcheck) {
      setIsSubmitted(true);
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || DEFAULT_WEB3FORMS_KEY;
    if (!accessKey) {
      console.error('[contact] NEXT_PUBLIC_WEB3FORMS_KEY is not set; the demo form cannot submit.');
      setErrors({ submit: process.env.NODE_ENV === 'development' ? t.errors.notConfigured : t.errors.submit });
      return;
    }

    setIsSubmitting(true);

    const country = countryByCode[formData.country];
    const phone = `${country ? `+${country.dial} ` : ''}${formData.phone.trim()}`;

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Talkys demo request — ${formData.company.trim() || formData.fullName.trim()}`,
          from_name: formData.fullName.trim() || 'Talkys website',
          replyto: formData.email.trim(),
          cc: CC_RECIPIENTS,
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          industry: formData.industry,
          country: country ? countryName(country.code, 'en') : formData.country,
          phone,
          use_case: formData.message.trim(),
          consent: formData.consent ? 'Yes' : 'No',
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) throw new Error(data.message || `Web3Forms ${res.status}`);

      setIsSubmitted(true);
      setFormData((prev) => ({ ...EMPTY_FORM, country: prev.country }));
    } catch (err) {
      console.error('[contact] demo request failed', err);
      setErrors({ submit: t.errors.submit });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] || errors.submit) {
      setErrors((prev) => ({ ...prev, [field]: '', submit: '' }));
    }
  };

  const invalid = (field: string) =>
    errors[field] ? { 'aria-invalid': true as const, 'aria-describedby': `${field}-error` } : {};

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-20 lg:py-28">
      <div className="hero-glow" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleLead} <span className="gradient-text">{t.titleAccent}</span>
            </>
          }
          description={t.description}
        />

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div data-reveal className="glass-panel-premium p-6 shadow-lift sm:p-8">
            {isSubmitted ? (
              <div className="panel-swap flex flex-col items-center justify-center py-16 text-center" role="status">
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--viz-green-soft)] text-[color-mix(in_srgb,var(--viz-green)_70%,black)]">
                  <Check className="h-7 w-7" />
                </span>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">{t.successTitle}</h3>
                <p className="mt-2 max-w-sm text-[var(--text-secondary)]">{t.successBody}</p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  {t.sendAnother}
                  <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot for bots: hidden from people and assistive tech */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                  checked={formData.botcheck}
                  onChange={(e) => handleInputChange('botcheck', e.target.checked)}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="fullName" label={t.fullName} error={errors.fullName} required>
                    <Input
                      id="fullName"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder={t.fullNamePlaceholder}
                      className={fieldClass}
                      {...invalid('fullName')}
                    />
                  </Field>
                  <Field id="email" label={t.email} error={errors.email} required>
                    <Input
                      id="email"
                      type="email"
                      dir="ltr"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className={cn(fieldClass, 'rtl:text-right')}
                      {...invalid('email')}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="company" label={t.company} error={errors.company} required>
                    <Input
                      id="company"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder={t.companyPlaceholder}
                      className={fieldClass}
                      {...invalid('company')}
                    />
                  </Field>
                  <Field id="industry" label={t.industry} error={errors.industry} required>
                    <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                      <SelectTrigger id="industry" className={cn(fieldClass, 'w-full data-[size=default]:h-11')} {...invalid('industry')}>
                        <SelectValue placeholder={t.industryPlaceholder} />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-[var(--border-color)] bg-white shadow-lift">
                        {INDUSTRY_VALUES.map((value, index) => (
                          <SelectItem key={value} value={value} className="rounded-lg text-[var(--text-primary)] focus:bg-[var(--indigo-50)]">
                            {t.industries[index]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <Field id="phone" label={t.phone} error={errors.phone} required>
                  {/* Dialling code first in both directions, like a written international number */}
                  <div dir="ltr" className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-2">
                    <CountryCombobox
                      id="phone-country"
                      value={formData.country}
                      onChange={(code) => {
                        countryTouchedRef.current = true;
                        handleInputChange('country', code);
                      }}
                    />
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className={fieldClass}
                      {...invalid('phone')}
                    />
                  </div>
                </Field>

                <Field id="message" label={t.message}>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder={t.messagePlaceholder}
                    rows={4}
                    className={cn(fieldClass, 'h-auto resize-none py-2.5')}
                  />
                </Field>

                <div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleInputChange('consent', checked === true)}
                      className="mt-0.5"
                      {...invalid('consent')}
                    />
                    <label htmlFor="consent" className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {t.consentLead}{' '}
                      <Link href="/privacy-policy" className="font-medium text-[var(--accent)] underline-offset-4 hover:underline">
                        {t.consentLink}
                      </Link>{' '}
                      {t.consentTail}
                    </label>
                  </div>
                  {errors.consent && (
                    <p id="consent-error" className="ms-7 mt-1.5 flex items-center gap-1 text-xs font-medium text-[var(--plum-700)]">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {errors.consent}
                    </p>
                  )}
                </div>

                {errors.submit && (
                  <p role="alert" className="flex items-center gap-2 rounded-[10px] border border-[var(--plum-200)] bg-[var(--plum-50)] px-3 py-2.5 text-sm text-[var(--plum-800)]">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errors.submit}
                  </p>
                )}

                <Button type="submit" variant="brand" size="xl" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? t.submitting : t.submit}
                </Button>
                <p className="text-center text-[13px] text-[var(--text-muted)]">{t.meta}</p>
              </form>
            )}
          </div>

          <div data-reveal-group className="space-y-5">
            <div className="glass-panel-premium p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{t.expectTitle}</h3>
              <ul className="mt-4 space-y-3">
                {t.expectations.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--indigo-50)] text-[var(--indigo-500)]">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel-premium flex items-center gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--indigo-50)] text-[var(--indigo-500)]">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-[var(--text-muted)]">{t.emailLead}</p>
                <a href={`mailto:${CONTACT_EMAIL}`} dir="ltr" className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
