import React from "react";
import { getPrimaryService } from "@/lib/services-storage";
import ServicePageRenderer from "@/components/sections/ServicePageRenderer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ServicesPage() {
  const service = await getPrimaryService();
  return <ServicePageRenderer initialConfig={service} />;
}
