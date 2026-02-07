import { kv } from "@vercel/kv";

export type IssueSummary = {
  dateLabel: string;
  headline: string;
  highlights: string[];
  sources: { title: string; link: string }[];
};

const fallbackSummary: IssueSummary = {
  dateLabel: "최신 이슈",
  headline: "금리 변동과 오피스 공실률 변화에 따라 핵심 상권의 투자 심리가 신중 모드로 전환되고 있습니다.",
  highlights: [
    "서울 주요 권역 오피스 거래는 우량 자산 중심으로 선별적 매수세가 유지됩니다.",
    "리테일은 체험형·F&B 중심의 임대 수요가 견조하며, 공실 축소가 이어집니다.",
    "물류센터는 공급 증가로 임대료 협상이 확대되고 있습니다.",
  ],
  sources: [
    { title: "상업용 부동산 시장 동향 브리핑", link: "https://news.google.com" },
  ],
};

export async function getLatestIssue(): Promise<IssueSummary> {
  try {
    const keys = await kv.keys("issue:*");
    if (!keys?.length) {
      return fallbackSummary;
    }

    const latestKey = keys.sort().reverse()[0];
    const payload = await kv.get<IssueSummary>(latestKey);
    return payload ?? fallbackSummary;
  } catch (error) {
    console.warn("KV unavailable, using fallback", error);
    return fallbackSummary;
  }
}
