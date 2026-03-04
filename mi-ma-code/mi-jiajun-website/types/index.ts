export interface Agent {
  id: string;
  name: string;
  position: string;
  function: string;
  team: string;
  avatar?: string;
  color?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  members: string[];
}

export interface SiteConfig {
  title: string;
  description: string;
  tagline: string;
}
