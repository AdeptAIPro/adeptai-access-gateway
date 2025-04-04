
export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  affiliateUrl: string;
  discount?: string;
  featured?: boolean;
  commission?: string;
}
