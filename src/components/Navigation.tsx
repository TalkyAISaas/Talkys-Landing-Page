'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { BarChart3, Bot, ChevronDown, Menu, MessagesSquare, Plug, X, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TalkysLogo } from '@/components/TalkysLogo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useCopy } from '@/i18n/LocaleContext';
import { cn } from '@/lib/utils';

type NavLink = { label: string; href: string; description?: string; icon?: LucideIcon };
type NavItem = NavLink | { label: string; children: NavLink[] };

const copy = {
  en: {
    items: [
      {
        label: 'Platform',
        children: [
          { label: 'AI agents', href: '/#platform', description: 'Persona, knowledge, voice and tools', icon: Bot },
          { label: 'Channels', href: '/#channels', description: 'Calls, video, WhatsApp, web and social', icon: MessagesSquare },
          { label: 'Analytics', href: '/#analytics', description: 'Every call, chat and outcome', icon: BarChart3 },
          { label: 'Integrations', href: '/#integrations', description: 'CRM, POS, booking and custom APIs', icon: Plug },
        ],
      },
      { label: 'Use cases', href: '/use-cases' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'FAQ', href: '/faq' },
      { label: 'About us', href: '/about' },
    ] as NavItem[],
    cta: 'Book a demo',
    home: 'Go to homepage',
    main: 'Main',
    mobile: 'Mobile',
    open: 'Open menu',
    close: 'Close menu',
  },
  ar: {
    items: [
      {
        label: 'المنصّة',
        children: [
          { label: 'وكلاء الذكاء الاصطناعي', href: '/#platform', description: 'الشخصية، المعرفة، الصوت والأدوات', icon: Bot },
          { label: 'القنوات', href: '/#channels', description: 'مكالمات، فيديو، واتساب، الموقع ووسائل التواصل', icon: MessagesSquare },
          { label: 'التحليلات', href: '/#analytics', description: 'كل مكالمة ومحادثة ونتيجة', icon: BarChart3 },
          { label: 'التكاملات', href: '/#integrations', description: 'CRM، نقاط البيع، الحجوزات وواجهات API', icon: Plug },
        ],
      },
      { label: 'حالات الاستخدام', href: '/use-cases' },
      { label: 'الأسعار', href: '/#pricing' },
      { label: 'الأسئلة الشائعة', href: '/faq' },
      { label: 'من نحن', href: '/about' },
    ] as NavItem[],
    cta: 'احجز عرضاً تجريبياً',
    home: 'الصفحة الرئيسية',
    main: 'القائمة الرئيسية',
    mobile: 'قائمة الجوال',
    open: 'فتح القائمة',
    close: 'إغلاق القائمة',
  },
};

const hasChildren = (item: NavItem): item is { label: string; children: NavLink[] } => 'children' in item;

export function Navigation() {
  const t = useCopy(copy);
  const navItems = t.items;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  // Dropdowns opened from the keyboard appear instantly (no animation).
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);
  const lastInput = useRef<'pointer' | 'keyboard'>('pointer');

  // Close the mobile menu whenever the route changes.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth-scroll in-page anchors only once the page has settled, so a deep link
  // (e.g. /#contact) lands instantly instead of animating from the top.
  useEffect(() => {
    const enable = () => window.setTimeout(() => document.documentElement.classList.add('smooth-scroll'), 300);
    if (document.readyState === 'complete') {
      const id = enable();
      return () => window.clearTimeout(id);
    }
    window.addEventListener('load', enable, { once: true });
    return () => window.removeEventListener('load', enable);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const isActive = (href: string) => !href.startsWith('/#') && pathname.startsWith(href);
  const groupActive = (links: NavLink[]) => links.some((link) => isActive(link.href));

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-[72px] transition-[background-color,box-shadow] duration-200',
          isScrolled || isMenuOpen ? 'bg-white/95 shadow-[0_1px_0_var(--border-color)] backdrop-blur-md' : 'bg-[var(--bg-primary)]/80 backdrop-blur-sm'
        )}
      >
        <div className="flex h-full w-full items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <Link href="/" aria-label={t.home} className="shrink-0 text-[var(--text-primary)]">
            <TalkysLogo className="text-[26px]" />
          </Link>

          <NavigationMenu.Root
            aria-label={t.main}
            delayDuration={120}
            skipDelayDuration={400}
            onValueChange={(value) => setOpenedByKeyboard(Boolean(value) && lastInput.current === 'keyboard')}
            className="relative hidden lg:block"
          >
            <NavigationMenu.List className="flex items-center gap-1">
              {navItems.map((item) =>
                hasChildren(item) ? (
                  <NavigationMenu.Item key={item.label} value={item.label} className="relative">
                    <NavigationMenu.Trigger
                      onPointerDown={() => (lastInput.current = 'pointer')}
                      onPointerEnter={() => (lastInput.current = 'pointer')}
                      onKeyDown={() => (lastInput.current = 'keyboard')}
                      className={cn(
                        'group inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--indigo-200)] data-[state=open]:text-[var(--text-primary)]',
                        groupActive(item.children) ? 'font-semibold text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      )}
                    >
                      {item.label}
                      <ChevronDown aria-hidden className="h-3.5 w-3.5 transition-transform duration-200 ease-out-strong group-data-[state=open]:rotate-180" />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content
                      data-instant={openedByKeyboard || undefined}
                      className="nav-dropdown absolute start-0 top-full mt-2 w-[340px] rounded-2xl border border-[var(--border-color)] bg-white p-2 shadow-lift"
                    >
                      <ul>
                        {item.children.map((link) => {
                          const Icon = link.icon;
                          return (
                            <li key={link.href}>
                              <NavigationMenu.Link asChild active={isActive(link.href)}>
                                <Link
                                  href={link.href}
                                  className="flex items-start gap-3 rounded-xl p-3 outline-none transition-colors duration-150 hover:bg-[var(--indigo-50)] focus-visible:bg-[var(--indigo-50)]"
                                >
                                  {Icon && (
                                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[var(--indigo-50)] text-[var(--indigo-500)]">
                                      <Icon className="h-[18px] w-[18px]" />
                                    </span>
                                  )}
                                  <span>
                                    <span className="block text-sm font-semibold text-[var(--text-primary)]">{link.label}</span>
                                    {link.description && <span className="mt-0.5 block text-[13px] leading-snug text-[var(--text-muted)]">{link.description}</span>}
                                  </span>
                                </Link>
                              </NavigationMenu.Link>
                            </li>
                          );
                        })}
                      </ul>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                ) : (
                  <NavigationMenu.Item key={item.href}>
                    <NavigationMenu.Link asChild active={isActive(item.href)}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                        className={cn(
                          'rounded-lg px-3 py-2 text-[15px] outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--indigo-200)]',
                          isActive(item.href) ? 'font-semibold text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                )
              )}
            </NavigationMenu.List>
          </NavigationMenu.Root>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button asChild variant="brand" size="lg" className="hidden sm:inline-flex">
              <Link href="/#contact">{t.cta}</Link>
            </Button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t.close : t.open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] text-[var(--text-primary)] transition-[background-color,transform] duration-150 ease-out-strong hover:bg-[var(--indigo-50)] active:scale-[0.97] lg:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {isScrolled && <div className="brand-rule absolute inset-x-0 bottom-0 opacity-60" />}
      </header>

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        aria-label={t.mobile}
        data-open={isMenuOpen}
        inert={!isMenuOpen}
        className="group fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-white opacity-0 transition-opacity duration-200 ease-out-strong data-[open=true]:opacity-100 data-[open=false]:pointer-events-none lg:hidden"
      >
        <ul className="flex flex-col gap-1 px-4 pb-6 pt-4">
          {navItems.map((item, index) => (
            <li
              key={item.label}
              style={{ transitionDelay: isMenuOpen ? `${index * 30}ms` : '0ms' }}
              className="-translate-y-2 opacity-0 transition-[opacity,transform] duration-200 ease-out-strong group-data-[open=true]:translate-y-0 group-data-[open=true]:opacity-100 motion-reduce:translate-y-0"
            >
              {hasChildren(item) ? (
                <div className="py-2">
                  <p className="section-label px-3 pb-1">{item.label}</p>
                  <ul>
                    {item.children.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block rounded-xl px-3 py-2.5 font-display text-lg font-semibold text-[var(--text-primary)] active:bg-[var(--indigo-50)]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 font-display text-xl font-semibold text-[var(--text-primary)] active:bg-[var(--indigo-50)]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="px-7 pb-10">
          <Button asChild variant="brand" size="xl" className="w-full">
            <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
              {t.cta}
            </Link>
          </Button>
        </div>
      </nav>
    </>
  );
}
