# Yongho Ko Academic Profile

Yongho Ko의 개인 학술 프로필과 연구 이력, 프로젝트, Wine Notes를 제공하는 웹사이트입니다.

## Website

[https://yonghoko.github.io/yongho-ko-profile/](https://yonghoko.github.io/yongho-ko-profile/)

## Pages

- `/` — Home
- `/cv` — Academic CV
- `/publications` — Conference Papers & Presentations
- `/projects` — Projects
- `/wine` — Wine Notes
- `/wine/beyond` — Beyond Wine

## Development

Node.js 22 이상이 필요합니다.

```bash
npm ci
npm run dev
```

## Validation

```bash
npm run build
npm test
npm run lint
```

## Deployment

`main` 브랜치에 변경사항을 올리면 GitHub Actions가 정적 사이트를 빌드하고 GitHub Pages에 배포합니다.

일반 로컬 실행은 `npm run dev`, 프로덕션 실행 확인은 `npm run build` 후 `npm start`를 사용합니다.
GitHub Pages 빌드는 CI에서 `GITHUB_PAGES=true`와 `NEXT_PUBLIC_BASE_PATH=/yongho-ko-profile`을 설정해 `npm run build:pages`로 생성하며, 결과물은 `out/`입니다. 정적 배포 결과물에는 `npm start`를 사용하지 않습니다.
