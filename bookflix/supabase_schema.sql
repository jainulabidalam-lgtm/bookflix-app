-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Books table
CREATE TABLE IF NOT EXISTS books (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  epub_url TEXT,
  pdf_url TEXT,
  genre TEXT[] DEFAULT '{}',
  source TEXT CHECK (source IN ('gutenberg', 'cc', 'user')),
  license_type TEXT,
  is_verified BOOLEAN DEFAULT false,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for books
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Verified books are viewable by everyone" ON books FOR SELECT USING (is_verified = true);
CREATE POLICY "Users can see their own unverified books" ON books FOR SELECT USING (auth.uid() = uploaded_by);
CREATE POLICY "Users can upload books" ON books FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

-- 3. Reading Progress table
CREATE TABLE IF NOT EXISTS reading_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  progress FLOAT DEFAULT 0, -- 0 to 100
  last_position TEXT, -- Could be a chapter or character offset
  last_read TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, book_id)
);

-- RLS for reading_progress
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own progress" ON reading_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON reading_progress FOR ALL USING (auth.uid() = user_id);

-- 4. Bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  label TEXT,
  position TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for bookmarks
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own bookmarks" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own bookmarks" ON bookmarks FOR ALL USING (auth.uid() = user_id);

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user on sign up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. User Logins Activity table (Requested)
CREATE TABLE IF NOT EXISTS user_logins (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  country TEXT,
  login_time TIME DEFAULT CURRENT_TIME,
  login_date DATE DEFAULT CURRENT_DATE,
  login_year INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for user_logins
ALTER TABLE user_logins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own login history" ON user_logins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert login records" ON user_logins FOR INSERT WITH CHECK (true);
