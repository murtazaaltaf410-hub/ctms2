USE ctms_db;

-- Demo users are created by: cd backend && npm run seed
-- All demo accounts use password: Password@123
-- Do NOT insert users here — seed.sql placeholders will NOT work for login.

-- Routes (University of Kashmir North Campus, Baramulla area coordinates)
INSERT INTO routes (name, description, distance_km, estimated_time_min, start_point, end_point) VALUES
('Route A - Baramulla to North Campus', 'Main route from Baramulla town to North Campus via Sopore', 18.5, 45, 'Baramulla Bus Stand', 'North Campus Gate'),
('Route B - Sopore to North Campus', 'Direct route from Sopore to North Campus', 12.3, 30, 'Sopore Main Chowk', 'North Campus Gate'),
('Route C - Handwara to North Campus', 'Route via Kupwara road connecting Handwara students', 25.0, 60, 'Handwara Bus Stand', 'North Campus Gate'),
('Route D - Campus Shuttle', 'Internal campus shuttle between blocks', 3.2, 15, 'Admin Block', 'Library Block');

-- Stops for Route A (Baramulla to North Campus)
INSERT INTO stops (route_id, name, latitude, longitude, stop_order, estimated_arrival_offset_min) VALUES
(1, 'Baramulla Bus Stand', 34.19890000, 74.36360000, 1, 0),
(1, 'Main Market Baramulla', 34.20120000, 74.35800000, 2, 8),
(1, 'Pattan Crossing', 34.21500000, 74.34000000, 3, 18),
(1, 'Sopore Bypass', 34.22800000, 74.32000000, 4, 28),
(1, 'North Campus Main Gate', 34.23500000, 74.31000000, 5, 45);

-- Stops for Route B
INSERT INTO stops (route_id, name, latitude, longitude, stop_order, estimated_arrival_offset_min) VALUES
(2, 'Sopore Main Chowk', 34.28600000, 74.47200000, 1, 0),
(2, 'Dangerpora', 34.27000000, 74.42000000, 2, 10),
(2, 'Watergam', 34.25500000, 74.38000000, 3, 20),
(2, 'North Campus Gate', 34.23500000, 74.31000000, 4, 30);

-- Stops for Route C
INSERT INTO stops (route_id, name, latitude, longitude, stop_order, estimated_arrival_offset_min) VALUES
(3, 'Handwara Bus Stand', 34.40000000, 74.28000000, 1, 0),
(3, 'Kupwara Road Junction', 34.35000000, 74.29000000, 2, 20),
(3, 'Langate', 34.29000000, 74.30000000, 3, 40),
(3, 'North Campus Gate', 34.23500000, 74.31000000, 4, 60);

-- Stops for Route D (Campus Shuttle)
INSERT INTO stops (route_id, name, latitude, longitude, stop_order, estimated_arrival_offset_min) VALUES
(4, 'Admin Block', 34.23550000, 74.30950000, 1, 0),
(4, 'Science Block', 34.23600000, 74.31000000, 2, 5),
(4, 'Engineering Block', 34.23650000, 74.31050000, 3, 10),
(4, 'Library Block', 34.23700000, 74.31100000, 4, 15);

-- Buses
INSERT INTO buses (bus_number, capacity, route_id, driver_id, qr_code, status) VALUES
('UOK-NC-01', 45, 1, 1, 'UOK-NC-01-QR', 'active'),
('UOK-NC-02', 40, 2, 2, 'UOK-NC-02-QR', 'active'),
('UOK-NC-03', 35, 3, 3, 'UOK-NC-03-QR', 'idle'),
('UOK-NC-04', 30, 4, 1, 'UOK-NC-04-QR', 'active');

-- Sample announcements
INSERT INTO announcements (title, message, type, priority, created_by) VALUES
('Welcome to CTMS', 'Campus Transport Management System is now live for University of Kashmir North Campus students.', 'general', 'medium', 1),
('Morning Schedule', 'Buses operate from 7:00 AM to 6:00 PM on weekdays.', 'general', 'low', 1);
