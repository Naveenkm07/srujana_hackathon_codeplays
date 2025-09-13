-- Smart Tutor Dashboard Database Schema
-- Run this SQL in Supabase SQL Editor

-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'student',
  avatar_url TEXT,
  google_id VARCHAR(255) UNIQUE,
  progress JSONB DEFAULT '{}',
  badges TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects table
CREATE TABLE subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons table
CREATE TABLE lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content JSONB,
  difficulty VARCHAR(20) DEFAULT 'beginner',
  duration INTEGER DEFAULT 30,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  progress_percentage INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  time_spent INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Quizzes table
CREATE TABLE quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  questions JSONB NOT NULL,
  time_limit INTEGER DEFAULT 300,
  passing_score INTEGER DEFAULT 70,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO subjects (name, description, icon, color) VALUES
('Mathematics', 'Learn fundamental math concepts', '🔢', '#3b82f6'),
('Science', 'Explore the natural world', '🔬', '#10b981'),
('English', 'Master language and literature', '📚', '#f59e0b'),
('History', 'Understand the past', '🏛️', '#8b5cf6');

INSERT INTO lessons (subject_id, title, description, content, difficulty, duration, order_index) 
SELECT 
  s.id,
  'Introduction to ' || s.name,
  'Basic concepts and fundamentals of ' || s.name,
  jsonb_build_object(
    'steps', jsonb_build_array(
      jsonb_build_object('title', 'Welcome', 'content', 'Welcome to this lesson!'),
      jsonb_build_object('title', 'Learn', 'content', 'Let''s start learning!'),
      jsonb_build_object('title', 'Practice', 'content', 'Time to practice!'),
      jsonb_build_object('title', 'Complete', 'content', 'Congratulations!')
    )
  ),
  'beginner',
  30,
  1
FROM subjects s;

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own progress" ON user_progress FOR ALL USING (auth.uid() = user_id);

-- Public read access for subjects and lessons
CREATE POLICY "Anyone can view subjects" ON subjects FOR SELECT USING (true);
CREATE POLICY "Anyone can view lessons" ON lessons FOR SELECT USING (true);
CREATE POLICY "Anyone can view quizzes" ON quizzes FOR SELECT USING (true);
