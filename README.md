# 대한민국 상업용 부동산 데일리 이슈

평일 오전 9시에 대한민국 상업용 부동산 관련 이슈를 자동으로 요약해 보여주는 Next.js + Vercel 웹사이트입니다.

## 구성

- **Next.js App Router** 기반 UI
- **Vercel Cron**으로 평일 오전 9시(Asia/Seoul) 자동 업데이트
- **Vercel KV**를 사용해 일별 요약 저장

## Vercel 배포 방법 (터미널 없이)

1. 이 리포지토리를 GitHub에 push 합니다.
2. Vercel 대시보드에서 **New Project** → 해당 GitHub 리포지토리를 선택합니다.
3. **Storage** → **KV**를 생성한 뒤 프로젝트에 연결합니다.
4. 연결되면 자동으로 `KV_REST_API_URL`, `KV_REST_API_TOKEN` 등이 환경변수로 설정됩니다.
5. 배포 후 Vercel Cron이 평일 오전 9시(Asia/Seoul)에 `/api/cron`을 호출합니다.

> KV가 연결되지 않아도 기본 샘플 요약이 노출되도록 구성되어 있습니다.

## 로컬 실행 (선택)

```bash
npm install
npm run dev
```

## 커스터마이징

- `app/page.tsx`: 메인 UI
- `app/api/cron/route.ts`: 뉴스 수집 및 요약 로직
- `lib/issues.ts`: KV에서 최신 요약 읽기
