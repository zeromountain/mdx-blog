---
title: 우아콘 어드민 플랫폼
description: 우아한형제들의 연례 컨퍼런스인 '우아콘'의 관리를 위한 종합 어드민 플랫폼 개발
order: 1
section: projects
techStack: ['TypeScript', 'React', 'Next.js', 'Redux', 'Chakra UI', 'TanStack Query']
thumbnail: /projects/woowacon-admin.avif
---

# 우아콘 어드민 플랫폼 개발

## 프로젝트 개요

- 우아한형제들의 연례 컨퍼런스인 '우아콘'의 관리를 위한 종합 어드민 플랫폼 개발

## 기술 스택

TypeScript, React, Next.js, Redux, React Hook Form + Yup, Chakra UI, TanStack Query

## 주요 개발 내용

### 1. 다중 컨퍼런스 관리 시스템

- Redux Toolkit을 활용한 다년도 컨퍼런스 상태 관리
- 연도별 컨퍼런스 데이터 분리 및 전환 기능 구현
- 과거 컨퍼런스 데이터 접근 및 새 컨퍼런스 템플릿 생성 기능
- 컨퍼런스 간 데이터 마이그레이션 시스템 개발

```javascript
// 컨퍼런스 선택 상태 관리 예시
const conferenceSlice = createSlice({
  name: 'conferences',
  initialState: {
    selectedYear: new Date().getFullYear(),
    conferences: {},
    isLoading: false
  },
  reducers: {
    switchConference: (state, action) => {
      state.selectedYear = action.payload;
    },
    ...
  },
});
```

### 2. 콘텐츠 관리 시스템

- React-Hook-Form과 Yup을 활용한 다양한 콘텐츠 유형 관리
- 연사, 세션, 타임테이블 등 복합적 콘텐츠 관리 폼 구현
- 이미지 및 영상 업로드 기능 (Next.js API Routes 활용)
- 실시간 폼 유효성 검증 및 사용자 피드백 시스템

```tsx
...

// 세션 관리를 위한 유효성 검증 스키마
const sessionSchema = yup.object({
  conferenceYear: yup.number().required("컨퍼런스 연도를 선택해주세요"),
  conferenceTitle: yup.string().required("컨퍼런스 제목을 입력해주세요"),
  trackCount: yup.number()
    .min(1, "최소 1개 이상의 트랙이 필요합니다")
    .max(10, "최대 10개까지의 트랙을 설정할 수 있습니다")
    .required("트랙 수를 입력해주세요"),
  sessions: yup.array().of(
    yup.object({
      title: yup.string().required("세션 제목은 필수입니다"),
      speakerId: yup.string().required("연사를 선택해주세요"),
      description: yup.string()
        .max(1000, "세션 설명은 1000자를 초과할 수 없습니다")
        .required("세션 설명은 필수입니다"),
      track: yup.number().required("트랙을 선택해주세요"),
      startTime: yup.string().required("시작 시간을 입력해주세요"),
      endTime: yup.string().required("종료 시간을 입력해주세요"),
      tags: yup.array().of(
        yup.object({
          name: yup.string().required("태그명을 입력해주세요")
        })
      )
    })
  ).min(1, "최소 1개 이상의 세션을 등록해주세요")
});

// 연사 목록 (실제로는 API에서 가져올 데이터)
const speakers = [
  { id: "speaker1", name: "김개발" },
  { id: "speaker2", name: "이디자인" },
  { id: "speaker3", name: "박매니저" },
  { id: "speaker4", name: "최엔지니어" },
  { id: "speaker5", name: "정기획" },
];

const SessionManagementForm = () => {
  const toast = useToast();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(sessionSchema),
    defaultValues: {
      conferenceYear: selectedYear,
      conferenceTitle: `우아콘 ${selectedYear}`,
      trackCount: 3,
      sessions: [
        {
          title: "",
          speakerId: "",
          description: "",
          track: 1,
          startTime: "10:00",
          endTime: "11:00",
          tags: [{ name: "" }]
        }
      ]
    }
  });

  // 세션 배열 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sessions"
  });

  // 현재 설정된 트랙 수 감시
  const trackCount = watch("trackCount");

  // 폼 제출 처리
  const onSubmit = (data) => {
    console.log("세션 데이터:", data);

    // API 호출 코드 대신 토스트 메시지로 대체
    toast({
      title: "세션 저장 완료",
      description: `${data.sessions.length}개의 세션이 저장되었습니다.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    ...
  );
};

export default SessionManagementForm;
```

### 3. 대시보드 및 분석 시스템

- TanStack Query와 Chakra UI를 활용한 실시간 데이터 시각화
- 등록자 현황, 세션별 참여율 등 핵심 지표 대시보드 구현
- 커스텀 차트 및 데이터 그리드 컴포넌트 개발
- 실시간 데이터 업데이트 및 캐싱 전략 최적화

```tsx
// 대시보드 데이터 페칭 예시
const DashboardStats = () => {
  const { data: registrationStats, isLoading } = useQuery({
    queryKey: ['stats', 'registrations', selectedYear],
    queryFn: () => fetchRegistrationStats(selectedYear),
    refetchInterval: 1000 * 60, // 1분마다 자동 갱신
  });

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
      <StatCard
        title="총 등록자"
        value={registrationStats?.total || 0}
        icon={<FiUsers />}
        increase={registrationStats?.increasePercent}
      />
      {/* 기타 통계 카드 */}
    </SimpleGrid>
  );
};
```

### 4. 권한 관리 시스템

- Context API를 활용한 역할 기반 접근 제어(RBAC) 구현
- 관리자 권한 레벨에 따른 기능 접근 제어
- 컨퍼런스별 권한 분리 및 관리 기능
- 권한 변경 히스토리 추적 시스템

```tsx
// 권한 관리 컨텍스트 예시
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  // 권한 검사 함수
  const hasPermission = useCallback(
    (requiredPermission: string, conferenceId?: string) => {
      // 권한 검증 로직
      return permissions.some(
        (p) => p.name === requiredPermission && (!conferenceId || p.conferenceId === conferenceId),
      );
    },
    [permissions],
  );

  return <AuthContext.Provider value={{ currentUser, permissions, hasPermission }}>{children}</AuthContext.Provider>;
};
```

### 5. 반응형 UI 시스템

- Chakra UI 기반 커스텀 디자인 시스템 구축
- 다양한 화면 크기에 최적화된 어드민 레이아웃 구현
- 우아한형제들 브랜드 아이덴티티에 맞춘 테마 커스터마이징
- 접근성(A11Y) 고려한 UI 컴포넌트 설계

```ts
// 커스텀 테마 예시
const theme = extendTheme({
  colors: {
    woowa: {
      50: '#f5f9ff',
      100: '#e0edff',
      500: '#2ac1bc',
      900: '#06504e',
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'woowa.500',
          color: 'white',
          _hover: { bg: 'woowa.600' },
        },
      },
    },
  },
});
```

## 기술적 도전과 해결책

### 1. 다년도 데이터 구조 설계

**도전:** 연도별 컨퍼런스 데이터를 효율적으로 관리하면서 빠른 전환이 가능해야 함  
**해결책:**

- Redux 상태에서 중첩 정규화 구조 설계
- 연도를 키로 하는 객체 구조로 데이터 구성
- TanStack Query의 쿼리 키 전략을 활용한 캐싱 최적화

### 2. 복잡한 폼 상태 관리

**도전:** 다단계 콘텐츠 생성 프로세스와 복잡한 유효성 검증 요구사항  
**해결책:**

- React-Hook-Form의 중첩 폼 필드 활용
- 조건부 유효성 검증을 위한 커스텀 Yup 스키마 개발
- 폼 상태에 따른 UI 렌더링 최적화

### 3. 실시간 데이터 동기화

**도전:** 여러 관리자가 동시에 작업할 때 데이터 일관성 유지  
**해결책:**

- TanStack Query의 Optimistic Updates 패턴 구현
- 낙관적 업데이트와 서버 검증 전략

## 성과 및 학습

- 컨퍼런스 준비 시간 단축 효과
- 관리자 교체 시 인수인계 프로세스 간소화
- TypeScript와 Next.js를 활용한 타입 안정성 및 개발 생산성 향상
- 대규모 어드민 시스템 설계 및 구현 경험 습득
- Chakra UI를 활용한 확장 가능한 디자인 시스템 구축 역량 강화
