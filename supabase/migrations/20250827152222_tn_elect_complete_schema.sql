-- Location: supabase/migrations/20250827152222_tn_elect_complete_schema.sql
-- Schema Analysis: Fresh project - No existing schema detected
-- Integration Type: Complete new schema creation
-- Dependencies: None - Creating from scratch

-- 1. Custom Types and Enums
CREATE TYPE public.user_role AS ENUM ('admin', 'election_officer', 'analyst', 'viewer');
CREATE TYPE public.election_type AS ENUM ('assembly', 'parliamentary', 'local_body');
CREATE TYPE public.election_status AS ENUM ('scheduled', 'ongoing', 'completed', 'cancelled');
CREATE TYPE public.candidate_status AS ENUM ('nominated', 'approved', 'disqualified', 'withdrawn');

-- 2. Core Tables

-- User profiles for authentication
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'viewer'::public.user_role,
    language_preference TEXT DEFAULT 'en' CHECK (language_preference IN ('en', 'ta')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Political parties
CREATE TABLE public.parties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_ta TEXT NOT NULL,
    short_name TEXT NOT NULL UNIQUE,
    symbol_url TEXT,
    founded_year INTEGER,
    description_en TEXT,
    description_ta TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Election cycles
CREATE TABLE public.elections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_ta TEXT NOT NULL,
    election_type public.election_type NOT NULL,
    election_year INTEGER NOT NULL,
    election_date DATE NOT NULL,
    result_date DATE,
    status public.election_status DEFAULT 'scheduled'::public.election_status,
    total_constituencies INTEGER,
    total_voters BIGINT,
    voter_turnout_percentage DECIMAL(5,2),
    description_en TEXT,
    description_ta TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Constituencies
CREATE TABLE public.constituencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_ta TEXT NOT NULL,
    constituency_number INTEGER NOT NULL,
    election_type public.election_type NOT NULL,
    district_en TEXT NOT NULL,
    district_ta TEXT NOT NULL,
    assembly_segment INTEGER,
    parliamentary_segment INTEGER,
    total_voters INTEGER,
    reserved_for TEXT, -- 'SC', 'ST', 'General', etc.
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    area_km2 DECIMAL(10, 2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Candidates
CREATE TABLE public.candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_ta TEXT NOT NULL,
    party_id UUID REFERENCES public.parties(id) ON DELETE SET NULL,
    age INTEGER,
    gender TEXT CHECK (gender IN ('M', 'F', 'O')),
    education_en TEXT,
    education_ta TEXT,
    occupation_en TEXT,
    occupation_ta TEXT,
    criminal_cases INTEGER DEFAULT 0,
    assets_declared DECIMAL(15, 2),
    photo_url TEXT,
    status public.candidate_status DEFAULT 'nominated'::public.candidate_status,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Election results
CREATE TABLE public.election_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
    constituency_id UUID NOT NULL REFERENCES public.constituencies(id) ON DELETE CASCADE,
    candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
    party_id UUID REFERENCES public.parties(id) ON DELETE SET NULL,
    votes_received INTEGER NOT NULL DEFAULT 0,
    vote_percentage DECIMAL(5, 2) NOT NULL DEFAULT 0,
    margin_votes INTEGER,
    is_winner BOOLEAN DEFAULT false,
    position INTEGER, -- 1st, 2nd, 3rd place
    deposit_forfeited BOOLEAN DEFAULT false,
    total_voters INTEGER NOT NULL,
    votes_polled INTEGER NOT NULL,
    invalid_votes INTEGER DEFAULT 0,
    voter_turnout_percentage DECIMAL(5, 2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User bookmarks for candidate tracking
CREATE TABLE public.candidate_bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, candidate_id)
);

-- User preferences and settings
CREATE TABLE public.user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    preferred_view TEXT DEFAULT 'cards' CHECK (preferred_view IN ('cards', 'table')),
    results_per_page INTEGER DEFAULT 12 CHECK (results_per_page IN (12, 24, 48)),
    default_election_year INTEGER,
    notifications_enabled BOOLEAN DEFAULT true,
    theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- 3. Indexes for Performance
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);

CREATE INDEX idx_parties_short_name ON public.parties(short_name);
CREATE INDEX idx_parties_is_active ON public.parties(is_active);

CREATE INDEX idx_elections_year_type ON public.elections(election_year, election_type);
CREATE INDEX idx_elections_status ON public.elections(status);

CREATE INDEX idx_constituencies_number_type ON public.constituencies(constituency_number, election_type);
CREATE INDEX idx_constituencies_district ON public.constituencies(district_en);

CREATE INDEX idx_candidates_party_id ON public.candidates(party_id);
CREATE INDEX idx_candidates_status ON public.candidates(status);

CREATE INDEX idx_election_results_election_constituency ON public.election_results(election_id, constituency_id);
CREATE INDEX idx_election_results_candidate ON public.election_results(candidate_id);
CREATE INDEX idx_election_results_party ON public.election_results(party_id);
CREATE INDEX idx_election_results_winner ON public.election_results(is_winner);
CREATE INDEX idx_election_results_votes ON public.election_results(votes_received DESC);

CREATE INDEX idx_candidate_bookmarks_user ON public.candidate_bookmarks(user_id);
CREATE INDEX idx_user_preferences_user ON public.user_preferences(user_id);

-- 4. Unique Constraints
CREATE UNIQUE INDEX idx_constituencies_unique ON public.constituencies(constituency_number, election_type);
CREATE UNIQUE INDEX idx_election_results_unique ON public.election_results(election_id, constituency_id, candidate_id);

-- 5. Functions for automatic profile creation and data management
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'viewer'::public.user_role)
    );
    
    -- Create user preferences
    INSERT INTO public.user_preferences (user_id) VALUES (NEW.id);
    
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_election_result_stats()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
    total_votes INTEGER;
    winner_votes INTEGER;
BEGIN
    -- Calculate total votes for the constituency in this election
    SELECT SUM(votes_received) INTO total_votes
    FROM public.election_results
    WHERE election_id = NEW.election_id AND constituency_id = NEW.constituency_id;
    
    -- Find winner (highest votes)
    SELECT MAX(votes_received) INTO winner_votes
    FROM public.election_results
    WHERE election_id = NEW.election_id AND constituency_id = NEW.constituency_id;
    
    -- Update vote percentages and winner status
    UPDATE public.election_results 
    SET 
        vote_percentage = ROUND((votes_received::DECIMAL / NULLIF(total_votes, 0)) * 100, 2),
        is_winner = (votes_received = winner_votes)
    WHERE election_id = NEW.election_id AND constituency_id = NEW.constituency_id;
    
    -- Calculate margins
    UPDATE public.election_results 
    SET margin_votes = (
        SELECT winner_votes - votes_received
        FROM public.election_results er2
        WHERE er2.election_id = NEW.election_id 
        AND er2.constituency_id = NEW.constituency_id
        AND er2.id = public.election_results.id
    )
    WHERE election_id = NEW.election_id AND constituency_id = NEW.constituency_id
    AND votes_received < winner_votes;
    
    RETURN NEW;
END;
$$;

-- 6. Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.constituencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.election_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies

-- Pattern 1: Core user table - user_profiles
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 4: Public read, private write for core data
CREATE POLICY "public_can_read_parties"
ON public.parties
FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "admins_manage_parties"
ON public.parties
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles up
        WHERE up.id = auth.uid() AND up.role IN ('admin', 'election_officer')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles up
        WHERE up.id = auth.uid() AND up.role IN ('admin', 'election_officer')
    )
);

-- Public read for elections data
CREATE POLICY "public_can_read_elections"
ON public.elections
FOR SELECT
TO public
USING (true);

CREATE POLICY "officers_manage_elections"
ON public.elections
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles up
        WHERE up.id = auth.uid() AND up.role IN ('admin', 'election_officer')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles up
        WHERE up.id = auth.uid() AND up.role IN ('admin', 'election_officer')
    )
);

-- Public read for constituencies
CREATE POLICY "public_can_read_constituencies"
ON public.constituencies
FOR SELECT
TO public
USING (true);

CREATE POLICY "officers_manage_constituencies"
ON public.constituencies
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles up
        WHERE up.id = auth.uid() AND up.role IN ('admin', 'election_officer')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles up
        WHERE up.id = auth.uid() AND up.role IN ('admin', 'election_officer')
    )
);

-- Public read for candidates
CREATE POLICY "public_can_read_candidates"
ON public.candidates
FOR SELECT
TO public
USING (status = 'approved');

CREATE POLICY "officers_manage_candidates"
ON public.candidates
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles up
        WHERE up.id = auth.uid() AND up.role IN ('admin', 'election_officer')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles up
        WHERE up.id = auth.uid() AND up.role IN ('admin', 'election_officer')
    )
);

-- Public read for election results
CREATE POLICY "public_can_read_election_results"
ON public.election_results
FOR SELECT
TO public
USING (true);

CREATE POLICY "officers_manage_election_results"
ON public.election_results
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles up
        WHERE up.id = auth.uid() AND up.role IN ('admin', 'election_officer')
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles up
        WHERE up.id = auth.uid() AND up.role IN ('admin', 'election_officer')
    )
);

-- Pattern 2: Simple user ownership for bookmarks
CREATE POLICY "users_manage_own_candidate_bookmarks"
ON public.candidate_bookmarks
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Pattern 2: Simple user ownership for preferences
CREATE POLICY "users_manage_own_user_preferences"
ON public.user_preferences
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 8. Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_election_result_change
  AFTER INSERT OR UPDATE ON public.election_results
  FOR EACH ROW EXECUTE FUNCTION public.update_election_result_stats();

-- 9. Mock Data
DO $$
DECLARE
    admin_user_id UUID := gen_random_uuid();
    officer_user_id UUID := gen_random_uuid();
    viewer_user_id UUID := gen_random_uuid();
    
    dmk_party_id UUID := gen_random_uuid();
    aiadmk_party_id UUID := gen_random_uuid();
    bjp_party_id UUID := gen_random_uuid();
    pmk_party_id UUID := gen_random_uuid();
    mdmk_party_id UUID := gen_random_uuid();
    
    election_2021_id UUID := gen_random_uuid();
    election_2016_id UUID := gen_random_uuid();
    
    kolathur_const_id UUID := gen_random_uuid();
    edappadi_const_id UUID := gen_random_uuid();
    dharmapuri_const_id UUID := gen_random_uuid();
    thoothukudi_const_id UUID := gen_random_uuid();
    chennai_south_const_id UUID := gen_random_uuid();
    chepauk_const_id UUID := gen_random_uuid();
    
    stalin_candidate_id UUID := gen_random_uuid();
    eps_candidate_id UUID := gen_random_uuid();
    anbumani_candidate_id UUID := gen_random_uuid();
    kanimozhi_candidate_id UUID := gen_random_uuid();
    tamilisai_candidate_id UUID := gen_random_uuid();
    udhayanidhi_candidate_id UUID := gen_random_uuid();
    vaiko_candidate_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with complete field structure
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@tnelect.gov.in', crypt('AdminPass123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Election Administrator", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (officer_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'officer@tnelect.gov.in', crypt('OfficerPass123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Election Officer", "role": "election_officer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (viewer_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'citizen@example.com', crypt('ViewerPass123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Tamil Citizen", "role": "viewer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Insert political parties
    INSERT INTO public.parties (id, name_en, name_ta, short_name, symbol_url, founded_year, description_en, description_ta) VALUES
        (dmk_party_id, 'Dravida Munnetra Kazhagam', 'திராவிட முன்னேற்றக் கழகம்', 'DMK', 'https://example.com/dmk-symbol.png', 1949, 'Dravidian Progressive Party', 'திராவிட முன்னேற்றக் கட்சி'),
        (aiadmk_party_id, 'All India Anna Dravida Munnetra Kazhagam', 'அனைத்திந்திய அண்ணா திராவிட முன்னேற்றக் கழகம்', 'AIADMK', 'https://example.com/aiadmk-symbol.png', 1972, 'All India Anna Dravida Progressive Party', 'அனைத்திந்திய அண்ணா திராவிட முன்னேற்றக் கட்சி'),
        (bjp_party_id, 'Bharatiya Janata Party', 'பாரதீய ஜனதா கட்சி', 'BJP', 'https://example.com/bjp-symbol.png', 1980, 'Indian People Party', 'இந்திய மக்கள் கட்சி'),
        (pmk_party_id, 'Pattali Makkal Katchi', 'பட்டாளி மக்கள் கட்சி', 'PMK', 'https://example.com/pmk-symbol.png', 1989, 'Vanniyar Community Party', 'வன்னியர் சமூக கட்சி'),
        (mdmk_party_id, 'Marumalarchi Dravida Munnetra Kazhagam', 'மறுமலர்ச்சி திராவிட முன்னேற்றக் கழகம்', 'MDMK', 'https://example.com/mdmk-symbol.png', 1994, 'Renaissance Dravidian Progressive Party', 'மறுமலர்ச்சி திராவிட முன்னேற்றக் கட்சி');

    -- Insert elections
    INSERT INTO public.elections (id, name_en, name_ta, election_type, election_year, election_date, result_date, status, total_constituencies, total_voters, voter_turnout_percentage) VALUES
        (election_2021_id, 'Tamil Nadu Assembly Election 2021', 'தமிழ்நாடு சட்டப்பேரவை தேர்தல் 2021', 'assembly', 2021, '2021-04-06', '2021-05-02', 'completed', 234, 62866305, 72.78),
        (election_2016_id, 'Tamil Nadu Assembly Election 2016', 'தமிழ்நாடு சட்டப்பேரவை தேர்தல் 2016', 'assembly', 2016, '2016-05-16', '2016-05-19', 'completed', 234, 57096213, 74.26);

    -- Insert constituencies
    INSERT INTO public.constituencies (id, name_en, name_ta, constituency_number, election_type, district_en, district_ta, total_voters, reserved_for, latitude, longitude) VALUES
        (kolathur_const_id, 'Kolathur', 'கோலத்தூர்', 5, 'assembly', 'Chennai', 'சென்னை', 275543, 'General', 13.1358, 80.2197),
        (edappadi_const_id, 'Edappadi', 'எடப்பாடி', 87, 'assembly', 'Salem', 'சேலம்', 246789, 'General', 11.7833, 78.1667),
        (dharmapuri_const_id, 'Dharmapuri', 'தர்மபுரி', 82, 'assembly', 'Dharmapuri', 'தர்மபுரி', 298456, 'General', 12.1275, 78.1589),
        (thoothukudi_const_id, 'Thoothukudi', 'தூத்துக்குடி', 181, 'assembly', 'Thoothukudi', 'தூத்துக்குடி', 287543, 'General', 8.7642, 78.1348),
        (chennai_south_const_id, 'Chennai South', 'சென்னை தெற்கு', 175, 'assembly', 'Chennai', 'சென்னை', 298743, 'General', 13.0067, 80.2206),
        (chepauk_const_id, 'Chepauk-Thiruvallikeni', 'சேப்பாக்கம்-திருவல்லிக்கேணி', 9, 'assembly', 'Chennai', 'சென்னை', 245789, 'General', 13.0732, 80.2609);

    -- Insert candidates
    INSERT INTO public.candidates (id, name_en, name_ta, party_id, age, gender, education_en, education_ta, occupation_en, occupation_ta, assets_declared, photo_url, status) VALUES
        (stalin_candidate_id, 'M. K. Stalin', 'மு. க. ஸ்டாலின்', dmk_party_id, 68, 'M', 'Graduate', 'பட்டதாரி', 'Politician', 'அரசியல்வாதி', 4500000.00, 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 'approved'),
        (eps_candidate_id, 'Edappadi K. Palaniswami', 'எடப்பாடி கே. பழனிசாமி', aiadmk_party_id, 67, 'M', 'Graduate', 'பட்டதாரி', 'Politician', 'அரசியல்வாதி', 3800000.00, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'approved'),
        (anbumani_candidate_id, 'Anbumani Ramadoss', 'அன்புமணி ராமதாஸ்', pmk_party_id, 53, 'M', 'MBBS, MS', 'எம்.பி.பி.எஸ், எம்.எஸ்', 'Doctor, Politician', 'மருத்துவர், அரசியல்வாதி', 2800000.00, 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg', 'approved'),
        (kanimozhi_candidate_id, 'Kanimozhi Karunanidhi', 'கனிமொழி கருணாநிதி', dmk_party_id, 54, 'F', 'MA English Literature', 'ஆங்கில இலக்கியத்தில் முதுகலை', 'Politician, Writer', 'அரசியல்வாதி, எழுத்தாளர்', 3200000.00, 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', 'approved'),
        (tamilisai_candidate_id, 'Tamilisai Soundararajan', 'தமிழிசை சௌந்தரராஜன்', bjp_party_id, 60, 'F', 'MBBS', 'எம்.பி.பி.எஸ்', 'Doctor, Politician', 'மருத்துவர், அரசியல்வாதி', 1800000.00, 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg', 'approved'),
        (udhayanidhi_candidate_id, 'Udhayanidhi Stalin', 'உதயநிதி ஸ்டாலின்', dmk_party_id, 44, 'M', 'Graduate', 'பட்டதாரி', 'Actor, Producer, Politician', 'நடிகர், தயாரிப்பாளர், அரசியல்வாதி', 5200000.00, 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg', 'approved'),
        (vaiko_candidate_id, 'Vaiko', 'வைகோ', mdmk_party_id, 72, 'M', 'MA Political Science', 'அரசியல் அறிவியலில் முதுகலை', 'Politician', 'அரசியல்வாதி', 2100000.00, 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg', 'approved');

    -- Insert election results for 2021
    INSERT INTO public.election_results (election_id, constituency_id, candidate_id, party_id, votes_received, total_voters, votes_polled, invalid_votes, voter_turnout_percentage) VALUES
        -- Kolathur constituency (Stalin wins)
        (election_2021_id, kolathur_const_id, stalin_candidate_id, dmk_party_id, 89456, 275543, 198543, 1234, 72.04),
        
        -- Edappadi constituency (EPS wins)
        (election_2021_id, edappadi_const_id, eps_candidate_id, aiadmk_party_id, 76543, 246789, 178234, 987, 72.23),
        
        -- Dharmapuri constituency (Anbumani wins)
        (election_2021_id, dharmapuri_const_id, anbumani_candidate_id, pmk_party_id, 95678, 298456, 218901, 1456, 73.35),
        
        -- Thoothukudi constituency (Kanimozhi wins)
        (election_2021_id, thoothukudi_const_id, kanimozhi_candidate_id, dmk_party_id, 87234, 287543, 211234, 1123, 73.47),
        
        -- Chennai South constituency (Tamilisai loses to DMK candidate, showing competitive election)
        (election_2021_id, chennai_south_const_id, tamilisai_candidate_id, bjp_party_id, 72345, 298743, 203123, 876, 67.99),
        
        -- Chepauk-Thiruvallikeni constituency (Udhayanidhi wins)
        (election_2021_id, chepauk_const_id, udhayanidhi_candidate_id, dmk_party_id, 91234, 245789, 176876, 1087, 72.0);

    -- Create some candidate bookmarks for the viewer user
    INSERT INTO public.candidate_bookmarks (user_id, candidate_id, notes) VALUES
        (viewer_user_id, stalin_candidate_id, 'Chief Minister candidate to watch'),
        (viewer_user_id, kanimozhi_candidate_id, 'Strong women leader'),
        (viewer_user_id, anbumani_candidate_id, 'Medical professional in politics');

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error in mock data: %', SQLERRM;
END $$;