import { getLatestIssue } from "@/lib/issues";

export default async function HomePage() {
  const issue = await getLatestIssue();

  return (
    <main>
      <section className="hero">
        <span className="badge">평일 오전 9시 자동 업데이트</span>
        <h1>대한민국 상업용 부동산 데일리 이슈</h1>
        <p>
          {issue.dateLabel} 기준 최신 이슈를 요약했습니다. 월~금 오전 9시에
          업데이트됩니다.
        </p>
      </section>

      <section className="grid">
        <article className="card">
          <h3>오늘의 한 줄 요약</h3>
          <p>{issue.headline}</p>
        </article>
        <article className="card">
          <h3>핵심 체크포인트</h3>
          <ul>
            {issue.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h3>참고한 기사</h3>
          <ul>
            {issue.sources.map((source) => (
              <li key={source.link}>
                <a href={source.link} target="_blank" rel="noreferrer">
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="card" style={{ marginTop: "32px" }}>
        <h3>업데이트 규칙</h3>
        <ul>
          <li>월~금 오전 9시(Asia/Seoul) 자동 업데이트</li>
          <li>상업용 부동산 관련 주요 이슈 3~5개를 요약</li>
          <li>Vercel Cron + KV로 별도 서버 없이 운영</li>
        </ul>
      </section>

      <p className="footer">Powered by Next.js + Vercel</p>
    </main>
  );
}
