import { kv } from "@vercel/kv";
import Parser from "rss-parser";
import type { IssueSummary } from "@/lib/issues";

export const runtime = "nodejs";

const parser = new Parser();

function getSeoulDateLabel(date = new Date()): string {
  return date.toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

function buildHeadline(items: { title: string }[]): string {
  const topTitles = items.slice(0, 3).map((item) => item.title);
  if (!topTitles.length) {
    return "상업용 부동산 관련 주요 이슈를 수집하는 중입니다.";
  }
  return `${topTitles.join(" · ")} 등의 이슈가 시장에 영향을 주고 있습니다.`;
}

export async function GET() {
  try {
    const feed = await parser.parseURL(
      "https://news.google.com/rss/search?q=%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD+%EC%83%81%EC%97%85%EC%9A%A9+%EB%B6%80%EB%8F%99%EC%82%B0&hl=ko&gl=KR&ceid=KR:ko"
    );

    const sources = (feed.items ?? [])
      .filter((item) => item.title && item.link)
      .slice(0, 5)
      .map((item) => ({
        title: item.title as string,
        link: item.link as string,
      }));

    const summary: IssueSummary = {
      dateLabel: getSeoulDateLabel(),
      headline: buildHeadline(sources),
      highlights: sources.slice(0, 3).map((source) => source.title),
      sources,
    };

    const dateKey = new Date().toLocaleDateString("sv-SE", {
      timeZone: "Asia/Seoul",
    });

    await kv.set(`issue:${dateKey}`, summary);

    return Response.json({ ok: true, stored: summary });
  } catch (error) {
    console.error("Cron failed", error);
    return Response.json({ ok: false, error: "Cron failed" }, { status: 500 });
  }
}
