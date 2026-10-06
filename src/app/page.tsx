import { StoryBackdrop } from '@/components/StoryBackdrop';
import { HeroSection } from '@/sections/HeroSection';
import { TrustStrip } from '@/sections/TrustStrip';
import { DemoSection } from '@/sections/DemoSection';
import { CorePositioning } from '@/sections/CorePositioning';
import { HowItWorksSection } from '@/sections/HowItWorksSection';
import { PlatformArchitecture } from '@/sections/PlatformArchitecture';
import { FeaturesSection } from '@/sections/FeaturesSection';
import { ChannelsSectionB } from '@/sections/ChannelsSectionB';
import { IntegrationsSection } from '@/sections/IntegrationsSection';
import { IndustriesSection } from '@/sections/IndustriesSection';
import { AnalyticsSection } from '@/sections/AnalyticsSection';
import { PricingSection } from '@/sections/PricingSection';
import { ContactSection } from '@/sections/ContactSection';

export default function HomePage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-white text-[var(--text-primary)]">
      <StoryBackdrop />
      <HeroSection />
      <TrustStrip />
      <DemoSection />
      <CorePositioning />
      <HowItWorksSection />
      <PlatformArchitecture />
      <FeaturesSection />
      <ChannelsSectionB />
      <IntegrationsSection />
      <IndustriesSection />
      <AnalyticsSection />
      <PricingSection />
      <ContactSection />
    </main>
  );
}
