'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { COUNTRIES, POPULAR_CODES, countryByCode, countryName } from '@/lib/countries';
import { useCopy, useLocale } from '@/i18n/LocaleContext';
import { cn } from '@/lib/utils';

const copy = {
  en: {
    trigger: 'Country code',
    search: 'Search countries…',
    empty: 'No country found.',
    popular: 'Popular',
    all: 'All countries',
  },
  ar: {
    trigger: 'رمز الدولة',
    search: 'ابحث عن دولة…',
    empty: 'لم نجد هذه الدولة.',
    popular: 'الأكثر طلباً',
    all: 'كل الدول',
  },
};

/** Searchable country-code picker for the phone field: popular markets first, then every country A to Z. */
export function CountryCombobox({
  value,
  onChange,
  id,
  className,
}: {
  value: string;
  onChange: (code: string) => void;
  id?: string;
  className?: string;
}) {
  const t = useCopy(copy);
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const selected = value ? countryByCode[value] : undefined;

  const { popular, others } = useMemo(() => {
    const named = COUNTRIES.map((c) => ({ ...c, name: countryName(c.code, locale), enName: countryName(c.code, 'en') }));
    const byCode = Object.fromEntries(named.map((c) => [c.code, c]));
    return {
      popular: POPULAR_CODES.map((code) => byCode[code]),
      others: named.filter((c) => !POPULAR_CODES.includes(c.code)).sort((a, b) => a.name.localeCompare(b.name, locale)),
    };
  }, [locale]);

  const pick = (code: string) => {
    onChange(code);
    setOpen(false);
  };

  const item = (c: (typeof others)[number]) => (
    <CommandItem
      key={c.code}
      // Searchable by localised name, English name, ISO code and dialling code.
      value={`${c.name} ${c.enName} ${c.code} +${c.dial}`}
      onSelect={() => pick(c.code)}
      className="cursor-pointer"
    >
      <Check className={cn('h-4 w-4 text-[var(--indigo-500)]', value === c.code ? 'opacity-100' : 'opacity-0')} />
      <span className="flex-1 truncate">{c.name}</span>
      <span dir="ltr" className="text-xs tabular-nums text-[var(--text-muted)]">
        +{c.dial}
      </span>
    </CommandItem>
  );

  const selectedName = selected ? countryName(selected.code, locale) : '';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={selected ? `${t.trigger}: ${selectedName} (+${selected.dial})` : t.trigger}
          title={selectedName || undefined}
          className={cn(
            'flex h-11 w-full items-center justify-between gap-1.5 rounded-[10px] border border-[var(--border-color)] bg-white px-3 text-start text-[15px] text-[var(--text-primary)] shadow-xs outline-none transition-[border-color,box-shadow] duration-150 hover:border-[var(--border-strong)] focus-visible:border-[var(--indigo-400)] focus-visible:ring-[3px] focus-visible:ring-[var(--indigo-100)]',
            className
          )}
        >
          <span dir="ltr" className={cn('truncate tabular-nums', !selected && 'text-[var(--text-muted)]')}>
            {selected ? (
              <>
                <span className="text-xs font-semibold text-[var(--text-muted)]">{selected.code}</span> +{selected.dial}
              </>
            ) : (
              '+'
            )}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-[var(--indigo-500)]" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[280px] p-0">
        {/* Plain "contains" matching (cmdk's default fuzzy match returns surprising results, e.g. "germ" → Montenegro) */}
        <Command filter={(itemValue, search) => (itemValue.toLowerCase().includes(search.trim().toLowerCase()) ? 1 : 0)}>
          <CommandInput placeholder={t.search} />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>{t.empty}</CommandEmpty>
            <CommandGroup heading={t.popular}>{popular.map(item)}</CommandGroup>
            <CommandGroup heading={t.all}>{others.map(item)}</CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
