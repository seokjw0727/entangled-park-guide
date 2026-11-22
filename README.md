# Entangled Park 시청 가이드

Entangled Park의 공개 동영상 탭에 있는 양자정보 기초 17편을 정리한 비공식 안내 페이지입니다. 자막, 영상 본문, 강의 노트, 영상 파일은 포함하지 않습니다.

- 기본 정렬: 오래된 게시일순 (동일 날짜는 게시 시각순)
- 선택 정렬: 최신 게시일순, 강의 번호순
- 제목 검색, 주제 필터, 미시청 필터
- 시청 기록은 브라우저 localStorage에만 보관
- JavaScript가 없어도 전체 목록과 원본 링크 이용 가능

출처: https://www.youtube.com/@EntangledPark/videos

확인일: 2026-11-22. 동영상 탭의 추가 목록 응답까지 확인했습니다. Shorts·라이브 탭은 대상이 아닙니다. 게시일은 YouTube 공개 메타데이터의 publishDate를 한국 시간으로 표시합니다. 이 목록은 확인일의 스냅샷이며 자동 갱신되지 않습니다. 주제 분류는 영상 제목에 근거한 편집상의 안내입니다.

## GitHub Pages

정적 파일로 구성되어 빌드나 비밀 키가 필요 없습니다. 저장소 Settings → Pages → Deploy from a branch에서 `main` 브랜치의 `/ (root)`를 선택합니다.

로컬 확인: 이 폴더에서 `python -m http.server 4173` 실행 후 http://localhost:4173 접속.

`videos.json`에 확인한 제목·재생 시간·게시 시각·원본 링크를 보관합니다. 목록 수정 시 index.html의 목록과 JSON을 함께 갱신하세요. 외부 Google Fonts를 사용하며 불러오지 못하면 시스템 글꼴로 표시됩니다.
