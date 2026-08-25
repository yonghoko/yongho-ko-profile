export type ConferencePublication = {
  no: number;
  date: string;
  title: string;
  authors: string;
  venue: string;
  role: "First Author" | "Co-author";
  details?: string;
  doi?: string;
  selected?: boolean;
};

export const conferencePublications: ConferencePublication[] = [
  {
    no: 56,
    date: "2026-08-28",
    role: "Co-author",
    title: "Post-Quantum SUCI for 6G: An Experimental Performance Evaluation of TR 33.703",
    authors: "Hoseok Kwon, Yongho Ko, Ilsun You",
    venue: "The 27th World Conference on Information Security Applications (WISA 2026)",
  },
  {
    no: 54,
    date: "2026-07-10",
    role: "First Author",
    title: "A Formal Security Analysis of SUCI-Stage Reused Key Binding in the 5G-AKA Family",
    authors: "Yongho Ko, Ilsun You",
    venue: "The 2nd IFIP WG 8.4 International Symposium on E-Business Information Systems Evolution (EBISION 2026)",
    selected: true,
  },
  {
    no: 41,
    date: "2026-04-29",
    role: "First Author",
    title: "미래 민감 군 통신 환경을 위한 Stealth-5G-AKA 설계 및 분석",
    authors: "고용호, 유일선",
    venue: "제9회 5G보안워크숍",
  },
  {
    no: 42,
    date: "2025-12-16",
    role: "First Author",
    title: "Unified Formal Verification of Security Requirements in the TLS Family",
    authors: "Yongho Ko, Hoseok Kwon, Ilsun You",
    venue: "The 9th International Conference on Mobile Internet Security (MobiSec 2025)",
    selected: true,
  },
  {
    no: 43,
    date: "2025-12-16",
    role: "Co-author",
    title: "A Hybrid EDHOC Protocol",
    authors: "SeongHan Shin, Adi Panca Saputra Iskandar, Yongho Ko, Ilsun You",
    venue: "The 9th International Conference on Mobile Internet Security (MobiSec 2025)",
  },
  {
    no: 44,
    date: "2025-10-09",
    role: "Co-author",
    title: "Formal and Practical Analysis of Early-Stage Vulnerabilities in EAP-TLS 1.3 Against DDoS Attacks",
    authors: "Adi Panca Saputra Iskandar, Yongho Ko, Bonam Kim, Linawati, Ilsun You",
    venue: "2025 IEEE International Conference on Smart-Green Technology in Electrical and Information Systems (ICSGTEIS 2025)",
    details: "pp. 59–64",
    doi: "https://doi.org/10.1109/ICSGTEIS68532.2025.11284357",
    selected: true,
  },
  {
    no: 45,
    date: "2025-08-21",
    role: "Co-author",
    title: "Blockchain-Assisted Handover Authentication: A Lightweight and Scalable Approach for 5G",
    authors: "Adi Panca Saputra Iskandar, Yongho Ko, Bonam Kim, Ilsun You",
    venue: "The 26th World Conference on Information Security Applications (WISA 2025)",
  },
  {
    no: 47,
    date: "2025-06-24",
    role: "Co-author",
    title: "5G 시스템 내 키에 대한 NIST SP 800-57 기반 키 관리 정책 분석",
    authors: "우창현, 고용호, 김보남, 유일선",
    venue: "Conference on Information Security and Cryptography–Summer 2025 (CISC-S 2025)",
  },
  {
    no: 46,
    date: "2024-12-17",
    role: "Co-author",
    title: "Comprehensive Formal Verification of EAP-AKA’-FS Using ProVerif: Ensuring Robustness in Future Mobile Networks",
    authors: "SeongHan Shin, Yongho Ko, Ilsun You",
    venue: "The 8th International Conference on Mobile Internet Security (MobiSec 2024)",
  },
  {
    no: 50,
    date: "2024-08-22",
    role: "Co-author",
    title: "5G Private Networks: A Survey on Architecture, Threats, Security Requirements, and Research Challenges",
    authors: "Changhyeon Woo, Jieon Oh, Yongho Ko, Ilsun You",
    venue: "The 25th World Conference on Information Security Applications (WISA 2024)",
  },
  {
    no: 48,
    date: "2024-06-21",
    role: "Co-author",
    title: "SA 기반 5G 시스템의 포스트 양자 암호 전환을 위한 양자내성암호 적용 및 보안성 분석",
    authors: "오지언, 우창현, 박영신, 고용호, 유일선",
    venue: "Conference on Information Security and Cryptography–Summer 2024 (CISC-S 2024)",
  },
  {
    no: 49,
    date: "2024-06-20",
    role: "First Author",
    title: "5G 이동통신 표준 네트워크 프로토콜 취약점 분석: 5G-AKA를 중심으로",
    authors: "고용호, 원태호, 유일선",
    venue: "2024년도 한국통신학회 하계종합학술발표회",
    details: "pp. 0628–0629",
    selected: true,
  },
  {
    no: 40,
    date: "2024-02",
    role: "Co-author",
    title: "독립형 5G 1차 인증을 위한 순방향비밀성 지원 기술 동향",
    authors: "권호석, 고용호, 유일선",
    venue: "한국통신학회지(정보와통신)",
    details: "41(3), pp. 18–26",
  },
  {
    no: 39,
    date: "2023-12-02",
    role: "Co-author",
    title: "TLS 1.3 0-RTT 보안성 분석 및 성능분석을 통한 보안과 성능 트레이드오프 연구",
    authors: "박영신, 오종민, 권호석, 고용호, 유일선",
    venue: "Conference on Information Security and Cryptography–Winter 2023 (CISC-W 2023)",
  },
  {
    no: 36,
    date: "2018-12-08",
    role: "Co-author",
    title: "Security management for backhaul-aware 5G-V2X",
    authors: "Vishal Sharma, Yongho Ko, Jiyoon Kim, Ilsun You",
    venue: "Conference on Information Security and Cryptography–Winter 2018 (CISC-W 2018)",
  },
  {
    no: 32,
    date: "2018-06-18",
    role: "First Author",
    title: "제한된 IoT환경에서의 침입탐지기법 동향분석",
    authors: "고용호, 이경률, 유일선, 임강빈",
    venue: "The 8th Workshop on Convergent and Smart Media Systems (CSMS 2018)",
  },
  {
    no: 33,
    date: "2017-11-23",
    role: "Co-author",
    title: "Sha Liu가 제안한 비대칭 3자 기반 인증 기법 정형화 분석",
    authors: "윤건, 이연수, 박훈용, 고용호, 유일선",
    venue: "The 7th Workshop on Convergent and Smart Media Systems (CSMS 2017)",
  },
  {
    no: 34,
    date: "2017-06-22",
    role: "Co-author",
    title: "무선 공유기 펌웨어 업데이트 취약점 공격 시나리오",
    authors: "이재헌, 고용호, 김창훈, 송유정, 유일선",
    venue: "Conference on Information Security and Cryptography–Summer 2017 (CISC-S 2017)",
  },
  {
    no: 37,
    date: "2017-02-20",
    role: "Co-author",
    title: "체내 이식형 의료기기를 위한 경량화 인증 프로토콜 설계 및 정형화 검증",
    authors: "김지윤, 권순현, 고용호, 유일선",
    venue: "The 5th Workshop on Convergent and Smart Media Systems (CSMS 2017)",
  },
];

export const selectedConferencePublications = conferencePublications.filter(
  (publication) => publication.selected,
);
