export type ZeffyCampaignType = "donation_form" | "ticketing";

export type ZeffyCampaign = {
  id: string;
  object: "campaign";
  created: number;
  updated: number;
  deleted_at: number | null;
  type: ZeffyCampaignType;
  category: string;
  status: string;
  title: string;
  description: string;
  locale: string;
  url: string | null;
  banner_url: string | null;
  logo_url: string | null;
  target: number | null;
  goal_amount: number | null;
  currency: string;
  volume: number;
  is_archived: boolean;
  start_date: number | null;
  end_date: number | null;
  metadata: Record<string, string>;
};

export type ZeffyCampaignList = {
  object: "list";
  data: ZeffyCampaign[];
  has_more: boolean;
  next_cursor: string | null;
};
