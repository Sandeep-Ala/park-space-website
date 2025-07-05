-- =============================================
-- PARK SPACE CRM DATABASE SCHEMA
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- LEADS TABLE
-- =============================================
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    company VARCHAR(100),
    location VARCHAR(100),
    service_type VARCHAR(50) NOT NULL, -- 'boom-barriers', 'cctv', 'biometric', etc.
    sub_service VARCHAR(50), -- Specific brand or type
    message TEXT,
    source VARCHAR(50) DEFAULT 'website', -- 'website', 'whatsapp', 'phone', 'referral'
    status VARCHAR(20) DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'quoted', 'converted', 'lost'
    priority VARCHAR(10) DEFAULT 'medium', -- 'high', 'medium', 'low'
    estimated_value DECIMAL(10,2),
    
    -- Lead scoring fields
    lead_score INTEGER DEFAULT 0,
    is_qualified BOOLEAN DEFAULT false,
    
    -- Assignment and tracking
    assigned_to VARCHAR(100), -- Sales person assigned
    follow_up_date TIMESTAMP,
    last_contacted TIMESTAMP,
    
    -- SEO and tracking data
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    referrer_url TEXT,
    landing_page VARCHAR(255),
    user_agent TEXT,
    ip_address INET,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SERVICES TABLE
-- =============================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(255),
    features JSONB, -- Array of features
    price_range VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description VARCHAR(255),
    keywords TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- BRANDS TABLE
-- =============================================
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    service_id UUID REFERENCES services(id),
    logo VARCHAR(255),
    description TEXT,
    features JSONB,
    price_starting_from DECIMAL(10,2),
    is_popular BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- LEAD ACTIVITIES TABLE
-- =============================================
CREATE TABLE lead_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- 'call', 'email', 'whatsapp', 'meeting', 'quote_sent', 'status_change'
    title VARCHAR(255),
    description TEXT,
    notes TEXT,
    performed_by VARCHAR(100),
    scheduled_for TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- QUOTES TABLE
-- =============================================
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    quote_number VARCHAR(50) UNIQUE NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    brand VARCHAR(50),
    items JSONB NOT NULL, -- Array of quote items with quantities and prices
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'sent', 'accepted', 'rejected', 'expired'
    valid_until DATE,
    terms_conditions TEXT,
    notes TEXT,
    created_by VARCHAR(100),
    sent_at TIMESTAMP,
    accepted_at TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CONTACTS TABLE (for follow-ups)
-- =============================================
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    contact_date TIMESTAMP NOT NULL,
    contact_type VARCHAR(50) NOT NULL, -- 'call', 'email', 'whatsapp', 'site_visit'
    outcome VARCHAR(100), -- 'interested', 'not_interested', 'call_back', 'quote_requested'
    notes TEXT,
    next_follow_up TIMESTAMP,
    contacted_by VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- BLOG POSTS TABLE (for SEO content)
-- =============================================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt VARCHAR(500),
    content TEXT NOT NULL,
    featured_image VARCHAR(255),
    meta_title VARCHAR(255),
    meta_description VARCHAR(255),
    keywords TEXT[],
    author VARCHAR(100),
    status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'published', 'archived'
    published_at TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Leads table indexes
CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_service_type ON leads(service_type);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_location ON leads(location);

-- Lead activities indexes
CREATE INDEX idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX idx_lead_activities_activity_type ON lead_activities(activity_type);
CREATE INDEX idx_lead_activities_created_at ON lead_activities(created_at);

-- Quotes indexes
CREATE INDEX idx_quotes_lead_id ON quotes(lead_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_created_at ON quotes(created_at);

-- Blog posts indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for services and brands (for website display)
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Brands are viewable by everyone" ON brands FOR SELECT USING (is_active = true);
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts FOR SELECT USING (status = 'published');

-- Leads can be inserted by anyone (form submissions)
CREATE POLICY "Anyone can create leads" ON leads FOR INSERT WITH CHECK (true);

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate lead score
CREATE OR REPLACE FUNCTION calculate_lead_score(lead_row leads)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
BEGIN
    -- Basic contact information
    IF lead_row.phone IS NOT NULL AND lead_row.phone != '' THEN score := score + 20; END IF;
    IF lead_row.email IS NOT NULL AND lead_row.email != '' THEN score := score + 10; END IF;
    IF lead_row.company IS NOT NULL AND lead_row.company != '' THEN score := score + 15; END IF;
    IF lead_row.location IS NOT NULL AND lead_row.location != '' THEN score := score + 10; END IF;
    
    -- Service interest
    IF lead_row.service_type IS NOT NULL THEN score := score + 15; END IF;
    IF lead_row.sub_service IS NOT NULL THEN score := score + 10; END IF;
    
    -- Message quality
    IF lead_row.message IS NOT NULL AND LENGTH(lead_row.message) > 50 THEN score := score + 20; END IF;
    
    RETURN score;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- INITIAL DATA SEEDING
-- =============================================

-- Insert services
INSERT INTO services (name, slug, description, short_description, features, price_range, display_order, meta_title, meta_description) VALUES
('Boom Barriers', 'boom-barriers', 'Complete boom barrier solutions with premium brands like FAAC, Benica, Roger, and more. Professional installation and maintenance services.', 'Automated boom barrier systems for parking and access control', '["FAAC Premium Barriers", "Benica Cost-effective Solutions", "Roger High-speed Barriers", "Professional Installation", "24/7 Maintenance Support"]', '₹35,000 - ₹1,50,000', 1, 'Boom Barriers Hyderabad | FAAC Benica Roger | Park Space', 'Best boom barrier installation and service in Hyderabad. FAAC, Benica, Roger authorized dealer. Call +91-9876543210 for quote.'),

('CCTV Services', 'cctv-services', 'Complete CCTV surveillance solutions with installation, maintenance, and monitoring services for residential and commercial properties.', 'Professional CCTV installation and monitoring services', '["HD IP Cameras", "DVR/NVR Systems", "Remote Monitoring", "Night Vision", "Mobile App Access"]', '₹15,000 - ₹2,00,000', 2, 'CCTV Installation Hyderabad | IP Cameras | Park Space', 'Professional CCTV camera installation in Hyderabad. HD cameras, DVR/NVR systems. Call for quote.'),

('Biometric Attendance', 'biometric-attendance', 'Advanced biometric attendance systems with fingerprint, face recognition, and card-based access control solutions.', 'Biometric time attendance and access control systems', '["Fingerprint Scanners", "Face Recognition", "Card Access", "Time Attendance", "Payroll Integration"]', '₹8,000 - ₹50,000', 3, 'Biometric Attendance System Hyderabad | Time Watch | Park Space', 'Biometric attendance systems in Hyderabad. Fingerprint, face recognition, time tracking. Best prices.'),

('Door Access Controllers', 'door-access-controllers', 'Secure door access control systems with biometric, card, and remote access options for enhanced security.', 'Advanced door access control and security systems', '["Biometric Access", "RFID Cards", "Remote Control", "Time-based Access", "Audit Trails"]', '₹12,000 - ₹80,000', 4, 'Door Access Control System Hyderabad | Biometric | Park Space', 'Door access control systems in Hyderabad. Biometric, RFID, remote access solutions.'),

('Fire & Alarm Systems', 'fire-alarm-systems', 'Complete fire detection and alarm systems for commercial and industrial buildings with 24/7 monitoring.', 'Fire detection and alarm systems for safety', '["Smoke Detectors", "Fire Alarms", "Sprinkler Integration", "Emergency Lighting", "24/7 Monitoring"]', '₹20,000 - ₹3,00,000', 5, 'Fire Alarm System Hyderabad | Safety Solutions | Park Space', 'Fire alarm and detection systems in Hyderabad. Smoke detectors, emergency systems installation.'),

('Networking Systems', 'networking-systems', 'Complete networking infrastructure solutions including LAN, WiFi, switches, and router installations.', 'Professional networking and IT infrastructure services', '["LAN Setup", "WiFi Solutions", "Network Switches", "Router Configuration", "Cable Management"]', '₹10,000 - ₹1,50,000', 6, 'Networking Solutions Hyderabad | LAN WiFi Setup | Park Space', 'Professional networking solutions in Hyderabad. LAN, WiFi, switches, router installation services.'),

('Bollard Barriers', 'bollard-barriers', 'Fixed and retractable bollard barriers for vehicle access control and perimeter security.', 'Vehicle access control with bollard barriers', '["Fixed Bollards", "Retractable Bollards", "Automatic Operation", "LED Lighting", "Anti-Ram Protection"]', '₹25,000 - ₹1,00,000', 7, 'Bollard Barriers Hyderabad | Vehicle Access Control | Park Space', 'Bollard barriers in Hyderabad. Fixed and retractable bollards for vehicle access control.'),

('Flap Barriers', 'flap-barriers', 'Pedestrian access control with optical turnstiles and flap barrier systems for modern offices and buildings.', 'Pedestrian access control with flap barriers', '["Optical Sensors", "Card Integration", "Bi-directional Access", "Visitor Management", "Emergency Release"]', '₹45,000 - ₹1,20,000', 8, 'Flap Barriers Hyderabad | Pedestrian Access Control | Park Space', 'Flap barriers and turnstiles in Hyderabad. Pedestrian access control for offices and buildings.'),

('Swing Gates', 'swing-gates', 'Automated swing gate systems for residential and commercial properties with remote control operation.', 'Automated swing gate systems and motors', '["FAAC Motors", "Remote Control", "Safety Sensors", "Manual Override", "Weather Resistant"]', '₹30,000 - ₹80,000', 9, 'Automatic Swing Gates Hyderabad | FAAC Motors | Park Space', 'Automatic swing gates in Hyderabad. FAAC motors, remote control, professional installation.'),

('Sliding Gate Motors', 'sliding-gate-motors', 'Heavy-duty sliding gate motor systems for large gates with professional installation and service.', 'Sliding gate automation with powerful motors', '["Heavy-duty Motors", "Track Systems", "Remote Control", "Safety Features", "Weather Protection"]', '₹40,000 - ₹1,50,000', 10, 'Sliding Gate Motors Hyderabad | Automation | Park Space', 'Sliding gate motors and automation in Hyderabad. Heavy-duty systems, professional installation.');

-- Insert brands for boom barriers
INSERT INTO brands (name, service_id, description, features, price_starting_from, is_popular, display_order) VALUES
('FAAC', (SELECT id FROM services WHERE slug = 'boom-barriers'), 'Premium Italian brand with 50+ years of experience in automation', '["3-second opening speed", "RFID integration", "Weather resistant", "LED lighting", "Anti-crash system"]', 82600, true, 1),
('Benica', (SELECT id FROM services WHERE slug = 'boom-barriers'), 'Reliable and cost-effective barrier solutions for commercial use', '["Manual backup", "Loop detector compatible", "Adjustable speed", "Anti-crash system", "Local service support"]', 45000, false, 2),
('Roger', (SELECT id FROM services WHERE slug = 'boom-barriers'), 'High-speed barriers for intensive commercial and industrial use', '["High-speed operation", "Heavy-duty motor", "Traffic light integration", "Remote monitoring", "Industrial grade"]', 65000, false, 3),
('Syrotech', (SELECT id FROM services WHERE slug = 'boom-barriers'), 'Indian brand with excellent service network and spare parts availability', '["Local service support", "Cost-effective parts", "Customizable options", "GSM integration", "Easy maintenance"]', 35000, false, 4),
('AGS', (SELECT id FROM services WHERE slug = 'boom-barriers'), 'Robust barriers designed for heavy-duty industrial applications', '["Heavy-duty construction", "Industrial grade", "Explosion-proof options", "Fail-safe operation", "Corrosion resistant"]', 55000, false, 5);

-- =============================================
-- VIEWS FOR REPORTING
-- =============================================

-- Lead summary view
CREATE VIEW lead_summary AS
SELECT 
    l.id,
    l.name,
    l.phone,
    l.email,
    l.service_type,
    l.location,
    l.status,
    l.lead_score,
    l.estimated_value,
    l.assigned_to,
    l.created_at,
    l.updated_at,
    COUNT(la.id) as activity_count,
    MAX(la.created_at) as last_activity,
    COUNT(q.id) as quote_count
FROM leads l
LEFT JOIN lead_activities la ON l.id = la.lead_id
LEFT JOIN quotes q ON l.id = q.lead_id
GROUP BY l.id, l.name, l.phone, l.email, l.service_type, l.location, l.status, l.lead_score, l.estimated_value, l.assigned_to, l.created_at, l.updated_at;

-- Monthly leads report view
CREATE VIEW monthly_leads_report AS
SELECT 
    DATE_TRUNC('month', created_at) as month,
    service_type,
    COUNT(*) as total_leads,
    COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted_leads,
    AVG(lead_score) as avg_lead_score,
    SUM(estimated_value) as total_estimated_value
FROM leads
GROUP BY DATE_TRUNC('month', created_at), service_type
ORDER BY month DESC, service_type;

-- Service performance view
CREATE VIEW service_performance AS
SELECT 
    s.name as service_name,
    s.slug,
    COUNT(l.id) as total_leads,
    COUNT(CASE WHEN l.status = 'converted' THEN 1 END) as converted_leads,
    ROUND((COUNT(CASE WHEN l.status = 'converted' THEN 1 END) * 100.0 / NULLIF(COUNT(l.id), 0)), 2) as conversion_rate,
    AVG(l.lead_score) as avg_lead_score,
    SUM(l.estimated_value) as total_pipeline_value
FROM services s
LEFT JOIN leads l ON s.slug = l.service_type
WHERE s.is_active = true
GROUP BY s.id, s.name, s.slug
ORDER BY total_leads DESC;

-- =============================================
-- STORED PROCEDURES FOR COMMON OPERATIONS
-- =============================================

-- Procedure to create a new lead with automatic scoring
CREATE OR REPLACE FUNCTION create_lead_with_scoring(
    p_name VARCHAR(100),
    p_phone VARCHAR(20),
    p_email VARCHAR(255) DEFAULT NULL,
    p_company VARCHAR(100) DEFAULT NULL,
    p_location VARCHAR(100) DEFAULT NULL,
    p_service_type VARCHAR(50),
    p_sub_service VARCHAR(50) DEFAULT NULL,
    p_message TEXT DEFAULT NULL,
    p_source VARCHAR(50) DEFAULT 'website',
    p_utm_source VARCHAR(100) DEFAULT NULL,
    p_utm_medium VARCHAR(100) DEFAULT NULL,
    p_utm_campaign VARCHAR(100) DEFAULT NULL,
    p_referrer_url TEXT DEFAULT NULL,
    p_landing_page VARCHAR(255) DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL,
    p_ip_address INET DEFAULT NULL
)
RETURNS UUID AS $
DECLARE
    new_lead_id UUID;
    calculated_score INTEGER;
BEGIN
    -- Insert the lead
    INSERT INTO leads (
        name, phone, email, company, location, service_type, sub_service, 
        message, source, utm_source, utm_medium, utm_campaign, 
        referrer_url, landing_page, user_agent, ip_address
    ) VALUES (
        p_name, p_phone, p_email, p_company, p_location, p_service_type, p_sub_service,
        p_message, p_source, p_utm_source, p_utm_medium, p_utm_campaign,
        p_referrer_url, p_landing_page, p_user_agent, p_ip_address
    ) RETURNING id INTO new_lead_id;
    
    -- Calculate and update lead score
    SELECT calculate_lead_score(leads.*) INTO calculated_score 
    FROM leads WHERE id = new_lead_id;
    
    UPDATE leads SET 
        lead_score = calculated_score,
        is_qualified = CASE WHEN calculated_score >= 60 THEN true ELSE false END
    WHERE id = new_lead_id;
    
    -- Create initial activity
    INSERT INTO lead_activities (lead_id, activity_type, title, description)
    VALUES (new_lead_id, 'lead_created', 'New Lead Created', 'Lead created through ' || p_source);
    
    RETURN new_lead_id;
END;
$ LANGUAGE plpgsql;

-- Procedure to update lead status with activity tracking
CREATE OR REPLACE FUNCTION update_lead_status(
    p_lead_id UUID,
    p_new_status VARCHAR(20),
    p_performed_by VARCHAR(100),
    p_notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $
DECLARE
    old_status VARCHAR(20);
BEGIN
    -- Get current status
    SELECT status INTO old_status FROM leads WHERE id = p_lead_id;
    
    -- Update status
    UPDATE leads SET 
        status = p_new_status,
        last_contacted = CASE WHEN p_new_status IN ('contacted', 'qualified', 'quoted') THEN NOW() ELSE last_contacted END
    WHERE id = p_lead_id;
    
    -- Log activity
    INSERT INTO lead_activities (lead_id, activity_type, title, description, performed_by)
    VALUES (
        p_lead_id, 
        'status_change', 
        'Status Changed: ' || old_status || ' → ' || p_new_status,
        COALESCE(p_notes, 'Status updated from ' || old_status || ' to ' || p_new_status),
        p_performed_by
    );
    
    RETURN true;
END;
$ LANGUAGE plpgsql;

-- =============================================
-- SAMPLE DATA FOR TESTING
-- =============================================

-- Insert some sample leads for testing
INSERT INTO leads (name, phone, email, location, service_type, sub_service, message, source, status) VALUES
('Rajesh Kumar', '+919876543210', 'rajesh@example.com', 'Banjara Hills, Hyderabad', 'boom-barriers', 'FAAC', 'Need boom barrier for apartment complex entrance', 'website', 'new'),
('Priya Sharma', '+919876543211', 'priya.sharma@company.com', 'Gachibowli, Hyderabad', 'cctv-services', NULL, 'Looking for CCTV installation for office', 'website', 'contacted'),
('Amit Patel', '+919876543212', NULL, 'Secunderabad', 'biometric-attendance', 'TIME WATCH', 'Need biometric system for factory', 'whatsapp', 'qualified'),
('Sunita Reddy', '+919876543213', 'sunita@example.com', 'Jubilee Hills, Hyderabad', 'door-access-controllers', NULL, 'Access control for residential building', 'website', 'quoted');

-- Update lead scores for sample data
UPDATE leads SET 
    lead_score = calculate_lead_score(leads.*),
    is_qualified = CASE WHEN calculate_lead_score(leads.*) >= 60 THEN true ELSE false END;

-- =============================================
-- ANALYTICS AND REPORTING FUNCTIONS
-- =============================================

-- Function to get conversion funnel data
CREATE OR REPLACE FUNCTION get_conversion_funnel(
    start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
    end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE(
    stage VARCHAR(20),
    count BIGINT,
    percentage NUMERIC
) AS $
DECLARE
    total_leads BIGINT;
BEGIN
    -- Get total leads in period
    SELECT COUNT(*) INTO total_leads 
    FROM leads 
    WHERE created_at::date BETWEEN start_date AND end_date;
    
    RETURN QUERY
    SELECT 
        unnest(ARRAY['new', 'contacted', 'qualified', 'quoted', 'converted']) as stage,
        unnest(ARRAY[
            (SELECT COUNT(*) FROM leads WHERE status = 'new' AND created_at::date BETWEEN start_date AND end_date),
            (SELECT COUNT(*) FROM leads WHERE status IN ('contacted', 'qualified', 'quoted', 'converted') AND created_at::date BETWEEN start_date AND end_date),
            (SELECT COUNT(*) FROM leads WHERE status IN ('qualified', 'quoted', 'converted') AND created_at::date BETWEEN start_date AND end_date),
            (SELECT COUNT(*) FROM leads WHERE status IN ('quoted', 'converted') AND created_at::date BETWEEN start_date AND end_date),
            (SELECT COUNT(*) FROM leads WHERE status = 'converted' AND created_at::date BETWEEN start_date AND end_date)
        ]) as count,
        unnest(ARRAY[
            ROUND((SELECT COUNT(*) FROM leads WHERE status = 'new' AND created_at::date BETWEEN start_date AND end_date) * 100.0 / NULLIF(total_leads, 0), 2),
            ROUND((SELECT COUNT(*) FROM leads WHERE status IN ('contacted', 'qualified', 'quoted', 'converted') AND created_at::date BETWEEN start_date AND end_date) * 100.0 / NULLIF(total_leads, 0), 2),
            ROUND((SELECT COUNT(*) FROM leads WHERE status IN ('qualified', 'quoted', 'converted') AND created_at::date BETWEEN start_date AND end_date) * 100.0 / NULLIF(total_leads, 0), 2),
            ROUND((SELECT COUNT(*) FROM leads WHERE status IN ('quoted', 'converted') AND created_at::date BETWEEN start_date AND end_date) * 100.0 / NULLIF(total_leads, 0), 2),
            ROUND((SELECT COUNT(*) FROM leads WHERE status = 'converted' AND created_at::date BETWEEN start_date AND end_date) * 100.0 / NULLIF(total_leads, 0), 2)
        ]) as percentage;
END;
$ LANGUAGE plpgsql;