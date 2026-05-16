-- =========================================================================
-- 논어 한구절 프로젝트 DB 스키마 (PostgreSQL / Supabase 용)
-- =========================================================================

-- UUID 확장을 위한 pgcrypto 또는 uuid-ossp 사용
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. 논어 본문 테이블
CREATE TABLE analects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter VARCHAR(255) NOT NULL,            -- 예: 학이편(學而篇)
  original_text TEXT NOT NULL,              -- 한자 원문 및 독음
  translation TEXT NOT NULL,                -- 번역
  explanation TEXT NOT NULL,                -- 해설
  application TEXT NOT NULL,                -- 적용 사례
  target_date DATE UNIQUE,                  -- 해당 구절이 노출될 지정 날짜 (하루 하나씩)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 태그 마스터 테이블
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,        -- 예: 자기계발, 인간관계, 리더십
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. 논어-태그 매핑 테이블 (N:M 관계)
CREATE TABLE analect_tags (
  analect_id UUID REFERENCES analects(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (analect_id, tag_id)
);


-- =========================================================================
-- [MVP 이후 확장 고려] 사용자 및 관심사 관련 테이블 스키마
-- (MVP에서는 로그인 기능이 없지만, 향후 이 구조를 바탕으로 기능 추가)
-- =========================================================================

-- 4. 사용자 테이블 (Supabase Auth와 연동 가능)
CREATE TABLE users (
  id UUID PRIMARY KEY,                      -- Supabase Auth의 auth.users id와 동일하게 사용 권장
  email VARCHAR(255) UNIQUE,
  nickname VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. 사용자-관심태그 매핑 테이블 (개인 맞춤형 큐레이션용)
CREATE TABLE user_favorite_tags (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, tag_id)
);

-- 6. 사용자가 스크랩(북마크)한 논어 목록 테이블
CREATE TABLE user_bookmarks (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  analect_id UUID REFERENCES analects(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (user_id, analect_id)
);
