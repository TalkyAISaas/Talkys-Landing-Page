export interface Industry {
  id: string;
  name: string;
  icon: string;
  preview: {
    message: string;
    pills: string[];
  };
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface TimelineStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface Channel {
  icon: string;
  name: string;
}

export interface Integration {
  name: string;
  description: string;
  color: string;
}

export interface PricingTier {
  name: string;
  badge: string;
  subtitle: string;
  price: string;
  minutes: string;
  features: string[];
  featured?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
