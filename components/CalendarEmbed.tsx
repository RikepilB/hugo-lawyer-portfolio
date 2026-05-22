"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

type Props = {
  username: string;
  eventSlug: string;
};

export function CalendarEmbed({ username, eventSlug }: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "consulta" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#1a2844",
          },
          dark: {
            "cal-brand": "#d4af37",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-navy-100)] bg-white">
      <Cal
        namespace="consulta"
        calLink={`${username}/${eventSlug}`}
        style={{ width: "100%", height: "700px", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
