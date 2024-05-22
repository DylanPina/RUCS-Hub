import { PUBLIC_BASE_URL } from "@/lib/constants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: PUBLIC_BASE_URL,
    },
    {
      url: `${PUBLIC_BASE_URL}/courses`,
    },
    {
      url: `${PUBLIC_BASE_URL}/professors`,
    },
  ];
}
