import { PageHero } from "./PageHero";
import type { ReactNode } from "react";

export function InnerHero({ eyebrow, title, subtitle, poster, alt }: {
  eyebrow: string; title: ReactNode; subtitle?: string; poster: string; alt: string;
}) {
  return <PageHero height="short" eyebrow={eyebrow} title={title} subtitle={subtitle} poster={poster} alt={alt} />;
}
