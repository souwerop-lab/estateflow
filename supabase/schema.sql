-- EstateFlow portfolio-ready SaaS demo schema.
-- Apply this to the chosen Supabase project before enabling Vercel env vars.

drop table if exists public.favorites cascade;
drop table if exists public.property_price_history cascade;
drop table if exists public.dashboard_activity cascade;
drop table if exists public.dashboard_leads cascade;
drop table if exists public.dashboard_metrics cascade;
drop table if exists public.market_stats cascade;
drop table if exists public.properties cascade;
drop table if exists public.agents cascade;

create table public.agents (
  id text primary key,
  name text not null,
  title text not null,
  avatar text not null,
  phone text not null,
  email text not null,
  rating numeric not null,
  review_count integer not null default 0,
  total_sales integer not null default 0,
  active_listings integer not null default 0,
  experience integer not null default 0,
  specialties text[] not null default '{}',
  bio text not null,
  languages text[] not null default '{}',
  certifications text[] not null default '{}',
  social_media jsonb not null default '{}'::jsonb
);

create table public.properties (
  id text primary key,
  agent_id text not null references public.agents(id) on delete restrict,
  title text not null,
  description text not null,
  price integer not null,
  price_per_sqft integer not null,
  address jsonb not null,
  coordinates jsonb not null,
  type text not null check (type in ('house', 'apartment', 'condo', 'townhouse', 'villa', 'penthouse')),
  status text not null check (status in ('for-sale', 'for-rent', 'sold', 'pending')),
  bedrooms integer not null,
  bathrooms integer not null,
  sqft integer not null,
  year_built integer not null,
  lot_size text not null,
  garage integer not null default 0,
  images text[] not null default '{}',
  amenities text[] not null default '{}',
  features text[] not null default '{}',
  listed_date date not null,
  days_on_market integer not null default 0,
  views integer not null default 0,
  saves integer not null default 0,
  open_house text,
  virtual_tour text,
  is_featured boolean not null default false,
  is_new boolean not null default false
);

create table public.property_price_history (
  id bigint generated always as identity primary key,
  property_id text not null references public.properties(id) on delete cascade,
  date date not null,
  price integer not null,
  event text not null
);

create table public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  property_id text not null references public.properties(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, property_id)
);

create table public.dashboard_metrics (
  id bigint generated always as identity primary key,
  total_listings integer not null,
  active_listings integer not null,
  total_views integer not null,
  views_change numeric not null,
  total_leads integer not null,
  leads_change numeric not null,
  total_revenue integer not null,
  revenue_change numeric not null,
  closed_deals integer not null,
  deals_change numeric not null,
  avg_days_on_market numeric not null,
  conversion_rate numeric not null
);

create table public.dashboard_leads (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null,
  avatar text not null,
  property text not null,
  property_id text not null,
  message text not null,
  status text not null check (status in ('new', 'contacted', 'qualified', 'negotiating', 'closed', 'lost')),
  date date not null,
  source text not null,
  budget text not null
);

create table public.dashboard_activity (
  id text primary key,
  type text not null check (type in ('listing', 'lead', 'sale', 'view', 'offer', 'review')),
  title text not null,
  description text not null,
  timestamp text not null,
  related_id text,
  icon text not null,
  sort_order integer not null default 0
);

create table public.market_stats (
  id bigint generated always as identity primary key,
  label text not null,
  value text not null,
  change numeric not null,
  change_label text not null,
  icon text not null,
  period text not null,
  sort_order integer not null default 0
);

grant usage on schema public to anon, authenticated;
grant select on public.agents, public.properties, public.property_price_history, public.dashboard_metrics, public.dashboard_leads, public.dashboard_activity, public.market_stats to anon, authenticated;
grant select, insert, delete on public.favorites to authenticated;

alter table public.agents enable row level security;
alter table public.properties enable row level security;
alter table public.property_price_history enable row level security;
alter table public.favorites enable row level security;
alter table public.dashboard_metrics enable row level security;
alter table public.dashboard_leads enable row level security;
alter table public.dashboard_activity enable row level security;
alter table public.market_stats enable row level security;

create policy "Agents are publicly readable" on public.agents for select using (true);
create policy "Properties are publicly readable" on public.properties for select using (true);
create policy "Price history is publicly readable" on public.property_price_history for select using (true);
create policy "Dashboard metrics are demo readable" on public.dashboard_metrics for select using (true);
create policy "Dashboard leads are demo readable" on public.dashboard_leads for select using (true);
create policy "Dashboard activity is demo readable" on public.dashboard_activity for select using (true);
create policy "Market stats are publicly readable" on public.market_stats for select using (true);

create policy "Users can read own favorites" on public.favorites
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can add own favorites" on public.favorites
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can delete own favorites" on public.favorites
  for delete to authenticated
  using ((select auth.uid()) = user_id);

insert into public.agents (id, name, title, avatar, phone, email, rating, review_count, total_sales, active_listings, experience, specialties, bio, languages, certifications, social_media) values
('agent-1', 'Sarah Mitchell', 'Senior Real Estate Advisor', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80', '+1 (305) 555-0142', 'sarah.mitchell@estateflow.com', 4.9, 127, 89, 12, 8, array['Luxury Homes','Waterfront Properties','New Construction'], 'Sarah specializes in waterfront properties and new construction across Miami and South Florida, combining deep market knowledge with concierge-level service.', array['English','Spanish'], array['CRS','ABR','SRES'], '{"linkedin":"#","instagram":"#"}'),
('agent-2', 'James Rodriguez', 'Luxury Property Specialist', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80', '+1 (310) 555-0198', 'james.rodriguez@estateflow.com', 4.8, 98, 112, 9, 12, array['Luxury Estates','Celebrity Homes','Gated Communities'], 'James navigates Beverly Hills and greater Los Angeles luxury inventory with discretion, sharp negotiation, and a long record of high-value residential closings.', array['English','Spanish','Portuguese'], array['CRS','CLHMS','GRI'], '{"linkedin":"#","instagram":"#","twitter":"#"}'),
('agent-3', 'Emily Chen', 'Urban Living Specialist', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80', '+1 (212) 555-0267', 'emily.chen@estateflow.com', 4.9, 156, 134, 15, 10, array['Condos & Co-ops','High-Rise Living','Investment Properties'], 'Emily helps buyers understand Manhattan inventory, building financials, neighborhood dynamics, and the nuance of competitive urban transactions.', array['English','Mandarin','Cantonese'], array['ABR','CRS','CIPS'], '{"linkedin":"#","instagram":"#"}'),
('agent-4', 'Michael Thompson', 'Commercial & Residential Expert', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80', '+1 (512) 555-0334', 'michael.thompson@estateflow.com', 4.7, 84, 76, 11, 15, array['Commercial Real Estate','Mixed-Use','Land Development'], 'Michael brings architecture-informed valuation and practical market insight to residential and mixed-use opportunities across Austin.', array['English'], array['CCIM','SIOR','CRS'], '{"linkedin":"#","twitter":"#"}');

insert into public.properties (id, agent_id, title, description, price, price_per_sqft, address, coordinates, type, status, bedrooms, bathrooms, sqft, year_built, lot_size, garage, images, amenities, features, listed_date, days_on_market, views, saves, open_house, virtual_tour, is_featured, is_new) values
('prop-1', 'agent-1', 'Luxury Waterfront Villa', 'Experience coastal living at its finest in this waterfront villa with panoramic ocean views, floor-to-ceiling glass, a chef kitchen, wine cellar, and home theater.', 4250000, 850, '{"street":"1234 Ocean Drive","city":"Miami Beach","state":"FL","zip":"33139","full":"1234 Ocean Drive, Miami Beach, FL 33139"}', '{"lat":25.7907,"lng":-80.13}', 'villa', 'for-sale', 5, 4, 5000, 2021, '0.45 acres', 3, array['https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80','https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=1600&q=80','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'], array['pool','gym','parking','ac','garden','security','wifi'], array['Ocean Views','Private Beach Access','Chef''s Kitchen','Wine Cellar','Home Theater'], '2024-01-15', 45, 1250, 89, 'Sat, Mar 15 • 1:00 PM - 4:00 PM', '#', true, false),
('prop-2', 'agent-2', 'Beverly Hills Modern Estate', 'An architectural estate above Sunset Boulevard with city-to-ocean views, soaring ceilings, a zero-edge pool, museum-quality finishes, and a gated motor court.', 4500000, 750, '{"street":"9801 Sunset Crest Drive","city":"Beverly Hills","state":"CA","zip":"90210","full":"9801 Sunset Crest Drive, Beverly Hills, CA 90210"}', '{"lat":34.0901,"lng":-118.4065}', 'house', 'for-sale', 6, 5, 6000, 2022, '0.72 acres', 4, array['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80','https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80'], array['pool','gym','parking','ac','garden','security','wifi','fireplace'], array['Infinity Pool','City & Ocean Views','Smart Home System','Home Gym','Guest House'], '2024-02-01', 30, 2340, 156, 'Sun, Mar 16 • 2:00 PM - 5:00 PM', '#', true, false),
('prop-3', 'agent-3', 'Manhattan Skyline Penthouse', 'A full-floor Midtown penthouse with 360-degree skyline views, private elevator landing, wraparound terrace, and five-star building amenities.', 3850000, 1925, '{"street":"432 Park Avenue, PH-A","city":"New York","state":"NY","zip":"10022","full":"432 Park Avenue, PH-A, New York, NY 10022"}', '{"lat":40.7614,"lng":-73.9718}', 'penthouse', 'for-sale', 3, 3, 2000, 2019, 'N/A', 1, array['https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=80','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80','https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=80'], array['doorman','elevator','concierge','gym','parking','ac','rooftop'], array['360° City Views','Private Elevator','Wraparound Terrace','Chef''s Kitchen','Walk-In Closets'], '2024-01-20', 40, 3120, 234, null, '#', true, false),
('prop-4', 'agent-3', 'SoHo Designer Loft', 'A sun-drenched SoHo loft with cast-iron columns, exposed brick, arched windows, Calacatta marble counters, and radiant heated floors.', 2150000, 1640, '{"street":"87 Mercer Street, Loft 4A","city":"New York","state":"NY","zip":"10012","full":"87 Mercer Street, Loft 4A, New York, NY 10012"}', '{"lat":40.7234,"lng":-73.9994}', 'apartment', 'for-sale', 2, 2, 1310, 1890, 'N/A', 0, array['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80','https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1600&q=80','https://images.unsplash.com/photo-1560448205-17d3a46c84de?auto=format&fit=crop&w=1600&q=80'], array['elevator','laundry','ac','storage','doorman','pet'], array['Exposed Brick','Cast-Iron Columns','Arched Windows','Radiant Heat'], '2024-02-28', 12, 890, 67, null, '#', false, true),
('prop-5', 'agent-1', 'Coral Gables Mediterranean', 'A restored Mediterranean Revival home with barrel-tile roof, coral stone accents, tropical landscaping, resort-style pool, and formal entertaining rooms.', 1875000, 520, '{"street":"2340 Alhambra Circle","city":"Coral Gables","state":"FL","zip":"33134","full":"2340 Alhambra Circle, Coral Gables, FL 33134"}', '{"lat":25.7498,"lng":-80.2589}', 'house', 'for-sale', 4, 3, 3600, 1936, '0.38 acres', 2, array['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80','https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80','https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1600&q=80'], array['pool','parking','ac','garden','fireplace','security'], array['Barrel-Tile Roof','Coral Stone Accents','Tropical Garden','Formal Dining Room'], '2024-02-10', 25, 760, 51, null, '#', false, false),
('prop-6', 'agent-4', 'Modern Austin Bungalow', 'A renovated bungalow minutes from downtown Austin with open living spaces, smart home features, shaded outdoor dining, and a private backyard.', 975000, 610, '{"street":"1510 Travis Heights Blvd","city":"Austin","state":"TX","zip":"78704","full":"1510 Travis Heights Blvd, Austin, TX 78704"}', '{"lat":30.2447,"lng":-97.7452}', 'house', 'for-sale', 3, 2, 1600, 2018, '0.18 acres', 1, array['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80','https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80','https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1600&q=80'], array['parking','ac','garden','wifi','pet'], array['Downtown Access','Private Backyard','Smart Home','Outdoor Dining'], '2024-03-01', 10, 640, 42, null, '#', true, true);

insert into public.property_price_history (property_id, date, price, event) values
('prop-1', '2024-01-15', 4500000, 'Listed'),
('prop-1', '2024-02-01', 4250000, 'Price Reduced'),
('prop-2', '2024-02-01', 4500000, 'Listed'),
('prop-3', '2024-01-20', 3950000, 'Listed'),
('prop-3', '2024-02-15', 3850000, 'Price Reduced'),
('prop-4', '2024-02-28', 2150000, 'Listed'),
('prop-5', '2024-02-10', 1875000, 'Listed'),
('prop-6', '2024-03-01', 975000, 'Listed');

insert into public.dashboard_metrics (total_listings, active_listings, total_views, views_change, total_leads, leads_change, total_revenue, revenue_change, closed_deals, deals_change, avg_days_on_market, conversion_rate)
values (24, 18, 14520, 12.5, 89, 8.3, 2450000, 15.2, 6, 20.0, 32, 6.7);

insert into public.dashboard_leads (id, name, email, phone, avatar, property, property_id, message, status, date, source, budget) values
('lead-1', 'John Martinez', 'john.martinez@gmail.com', '+1 (305) 555-1201', '/avatars/lead-1.jpg', 'Luxury Waterfront Villa', 'prop-1', 'I am very interested in scheduling a private showing this weekend. Please let me know your availability.', 'new', '2024-03-10', 'Website', '$4M - $5M'),
('lead-2', 'Lisa Wang', 'lisa.wang@outlook.com', '+1 (212) 555-3344', '/avatars/lead-2.jpg', 'Manhattan Skyline Penthouse', 'prop-3', 'Could you send me the floor plans and HOA details? My partner and I are relocating next month.', 'contacted', '2024-03-09', 'Website', '$3M - $4M'),
('lead-3', 'Robert Taylor', 'r.taylor@yahoo.com', '+1 (512) 555-5567', '/avatars/lead-3.jpg', 'Modern Austin Bungalow', 'prop-6', 'We are a family of four looking for a home near good schools. Is this property still available?', 'qualified', '2024-03-08', 'Referral', '$800K - $1.2M'),
('lead-4', 'Samantha Cole', 'samantha.cole@gmail.com', '+1 (310) 555-8899', '/avatars/lead-4.jpg', 'Beverly Hills Modern Estate', 'prop-2', 'Love the virtual tour. Would it be possible to arrange a private viewing next Tuesday afternoon?', 'negotiating', '2024-03-05', 'Direct', '$3.5M - $4.5M');

insert into public.dashboard_activity (id, type, title, description, timestamp, related_id, icon, sort_order) values
('act-1', 'listing', 'New Listing Published', 'Luxury Waterfront Villa has been listed for $4,250,000.', '2 hours ago', 'prop-1', 'home', 1),
('act-2', 'lead', 'New Lead Received', 'John Martinez submitted an inquiry about Luxury Waterfront Villa.', '3 hours ago', 'lead-1', 'user', 2),
('act-3', 'offer', 'Offer Submitted', 'Samantha Cole submitted a $3.8M offer on Beverly Hills Modern Estate.', '5 hours ago', 'prop-2', 'file-text', 3),
('act-4', 'view', 'Property Viewed', 'Manhattan Skyline Penthouse received 45 new views in the last 24 hours.', '6 hours ago', 'prop-3', 'eye', 4),
('act-5', 'sale', 'Deal Closed', 'SoHo Designer Loft has moved into escrow.', 'Yesterday', 'prop-4', 'dollar-sign', 5);

insert into public.market_stats (label, value, change, change_label, icon, period, sort_order) values
('Properties Sold', '12,500+', 12.5, 'vs last year', 'home', '2026', 1),
('Total Revenue', '$3.2B+', 18.3, 'vs last year', 'dollar-sign', '2026', 2),
('Happy Clients', '8,400+', 22.1, 'vs last year', 'users', '2026', 3),
('Cities Covered', '150+', 15.8, 'vs last year', 'map-pin', '2026', 4);
