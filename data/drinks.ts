export type DrinkNote = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
};

const image = (slug: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/drinks/${slug}.webp`;

const drink = (
  slug: string,
  name: string,
  category: string,
  description: string,
): DrinkNote => ({ slug, name, category, description, image: image(slug) });

export const drinks: DrinkNote[] = [
  drink(
    "ballantines-30",
    "Ballantine’s 30 Year Old",
    "위스키",
    "오래된 기록에서 가장 분명한 결론을 남긴 병. 17년과 비교해도 취향은 단호했다. ‘30년 최고.’",
  ),
  drink(
    "ballantines-21",
    "Ballantine’s 21 Year Old",
    "위스키",
    "21년 숙성 블렌디드 스카치. 17년과 30년 사이에서 균형을 비교해 보는 재미가 있었던 병이다.",
  ),
  drink(
    "ballantines-17",
    "Ballantine’s 17 Year Old",
    "위스키",
    "17년을 마시고도 결론은 30년으로 향했다. 같은 브랜드의 숙성 연수를 나란히 비교하는 재미를 남긴 기록.",
  ),
  drink(
    "kavalan-solist-vinho-barrique",
    "Kavalan Solist Vinho Barrique",
    "위스키",
    "와인 배럴에서 숙성한 캐스크 스트렝스 싱글몰트. 55.6% 도수와 한정된 캐스크 번호까지, 병 자체가 하나의 사건처럼 남았다.",
  ),
  drink(
    "nikka-yoichi-sherry-sweet",
    "Nikka Yoichi Sherry & Sweet",
    "위스키",
    "요이치 증류소 한정 미니어처. 셰리와 단맛을 전면에 내세운 구성이 작지만 확실한 기념품처럼 남았다.",
  ),
  drink(
    "balvenie-doublewood-12",
    "The Balvenie DoubleWood 12",
    "위스키",
    "서로 다른 오크통 숙성을 거친 12년 싱글몰트. 위스키를 편하게 마시기 시작할 때 기준점처럼 남겨 둔 병이다.",
  ),
  drink(
    "black-nikka-special",
    "Black Nikka Special",
    "위스키",
    "검은 사각병과 모자이크 라벨이 강하게 남는 일본 블렌디드 위스키. 부담 없이 꺼내기 좋은 일상 쪽의 기록.",
  ),
  drink(
    "suntory-kakubin",
    "Suntory Whisky Kakubin",
    "위스키",
    "가쿠빈은 결국 하이볼 재료로 기억된다. 얼음과 탄산수, 레몬을 더했을 때 역할이 가장 분명해지는 위스키.",
  ),
  drink(
    "niseko-tokubetsu-junmai",
    "Niseko Tokubetsu Junmai",
    "사케",
    "현지 오마카세에서 만난 홋카이도 특별순미주. 음식의 흐름을 끊지 않는 깔끔한 인상이 좋아 식사 장면과 함께 남겨 둔 한 병이다.",
  ),
  drink(
    "ezo-no-kuma",
    "Ezo no Kuma",
    "사케",
    "홋카이도에서 만난 ‘에조노쿠마’. 라벨의 별자리와 곰 그림만으로도 여행의 장면이 선명하게 남는 사케였다.",
  ),
  drink(
    "dassai-23",
    "Dassai 23",
    "사케",
    "쌀을 23%까지 정미한 준마이다이긴죠. 포장과 병을 여는 순간부터 한 잔을 대하는 분위기가 달라지는 사케.",
  ),
  drink(
    "dassai-migaki",
    "DASSAI SYMPHONY ～MIGAKI～",
    "사케",
    "교향곡을 들려주며 발효한 특별 프로젝트의 다사이. 술과 음악을 실제 양조 과정에서 연결했다는 발상까지 함께 기억해 둔 병이다.",
  ),
  drink(
    "kubota-senju-ginjo",
    "Kubota Senju Ginjo",
    "사케",
    "식사 자리에서 자연스럽게 비워진 쿠보타 센쥬 긴죠. 과장 없이 음식 곁에 머무는 사케의 역할을 보여준 한 병이다.",
  ),
  drink(
    "yakitori-junmai-ginjo",
    "Yakitori Junmai Ginjo",
    "사케",
    "야키토리와 맞추기 위해 이름부터 직관적인 준마이긴죠. 숯불구이 한 점과 차갑게 곁들인 사케 한 잔의 조합을 기억한다.",
  ),
  drink(
    "hakutsuru-tanrei-junmai",
    "Hakutsuru Tanrei Junmai",
    "사케",
    "여행 중 종이팩으로 가볍게 집어 든 준마이. 격식을 차린 병보다도 장소와 순간이 기억을 완성해 준다는 기록.",
  ),
  drink(
    "damun-makgeolli",
    "Damun Makgeolli",
    "막걸리",
    "우윳빛 병과 절제된 라벨이 먼저 눈에 들어온 담은 막걸리. 막걸리도 충분히 차분하고 세련되게 기록될 수 있다는 인상을 남겼다.",
  ),
  drink(
    "won-soju-spirit",
    "Won Soju Spirit",
    "소주",
    "기존 기록의 표현을 그대로 빌리면 ‘소주의 탈을 쓴 사케’. 예상보다 맛있어서 짧은 감탄과 함께 남겨 둔 병이다.",
  ),
  drink(
    "ppiko-cherry-soju",
    "처음처럼 × 빠삐코 체리",
    "소주",
    "처음처럼과 빠삐코가 만난 체리맛 소주. 진지한 테이스팅보다 ‘이 조합이 정말 나왔다’는 재미로 남겨 둔 기록.",
  ),
  drink(
    "ellyeop-pyunjo",
    "Ellyeop-Pyunjoo",
    "전통주",
    "검은색과 흰색으로 정리된 병이 인상적인 일엽편주. 전통주의 이름과 패키지가 현대적으로 만난 장면을 남겼다.",
  ),
  drink(
    "corsendonk-christmas-ale",
    "Corsendonk Christmas Ale",
    "맥주",
    "겨울을 겨냥한 벨기에 크리스마스 에일. 짙은 몰트와 8.1% 도수가 계절 한정 병다운 존재감을 만든다.",
  ),
  drink(
    "taiwan-beer",
    "Taiwan Beer",
    "맥주",
    "여행지에서 마신 클래식 대만 맥주. 화려한 설명보다 현지 음식과 함께한 장면 자체가 기록의 중심인 한 캔.",
  ),
  drink(
    "taiwan-beer-pineapple",
    "Taiwan Beer Pineapple",
    "맥주",
    "파인애플 향을 더한 대만 과일맥주. 맥주라기보다 여행 중 한 번쯤 고르게 되는 달콤한 기분 전환에 가까웠다.",
  ),
  drink(
    "beurre-butter-beer",
    "BOULANGERIE BEURRE Butter Beer",
    "맥주",
    "부르의 버터비어. 이름만큼 강한 개성을 기대했지만 인위적인 느낌이 앞서 내 취향과는 거리가 있었다.",
  ),
  drink(
    "sapporo-classic",
    "Sapporo Classic",
    "맥주",
    "홋카이도에서만 만날 수 있는 삿포로 클래식. 내가 가장 좋아하는 인생 맥주이자, 양고기와 함께할 때 진가가 가장 선명해진다. 이 한 캔을 다시 마시기 위해 홋카이도로 향한다고 해도 과언이 아니다.",
  ),
  drink(
    "sapporo-premium-alcohol-free",
    "Sapporo Premium Alcohol Free",
    "무알코올 맥주",
    "술을 쉬어가고 싶을 때 고른 0.00% 맥주. ‘약간의 일탈’ 안에서도 다시 한 번 옆길로 새어 본 기록.",
  ),
  drink(
    "wuliangye",
    "Wuliangye",
    "바이주",
    "52도 중국 바이주. 향과 도수 모두 한 번에 존재감을 드러내 가볍게 넘기기 어려운 경험으로 남았다.",
  ),
  drink(
    "chinggis-gold-vodka",
    "Chinggis Gold",
    "보드카",
    "몽골에서 만난 칭기스 골드 보드카. 투명한 술과 금빛 장식이 대비돼 여행 기념품처럼 선명하게 기억되는 병이다.",
  ),
];
