SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('CONTACT','SURF_TRIP_REQUEST') NOT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`id`, `name`, `type`, `is_active`) VALUES
(1, 'Surf Trip Request', 'SURF_TRIP_REQUEST', 1);

-- --------------------------------------------------------

--
-- Table structure for table `form_answers`
--

CREATE TABLE `form_answers` (
  `id` int(11) NOT NULL,
  `submission_id` int(11) NOT NULL,
  `field_id` int(11) DEFAULT NULL,
  `value` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `form_fields`
--

CREATE TABLE `form_fields` (
  `id` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `explanation` text DEFAULT NULL,
  `type` enum('SINGLE','MULTIPLE','RANK','TEXT') NOT NULL,
  `display_type` enum('CARDS','SLIDER','CHECKBOX','RADIO') DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `position` int(11) DEFAULT 0,
  `is_required` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_fields`
--

INSERT INTO `form_fields` (`id`, `form_id`, `label`, `subtitle`, `explanation`, `type`, `display_type`, `image_url`, `is_active`, `position`, `is_required`, `created_at`, `updated_at`) VALUES
(2, 1, 'How often do you paddle out?', NULL, NULL, 'SINGLE', 'RADIO', NULL, 1, 2, 1, '2026-04-26 12:40:53', '2026-04-26 12:40:53'),
(3, 1, 'What type of waves are you most comfortable with?', 'Pick your playground', 'If you are unsure, just select the smallest option. Better safe than sorry!', 'MULTIPLE', 'CARDS', NULL, 1, 3, 1, '2026-04-26 12:40:53', '2026-04-26 12:40:53'),
(4, 1, 'Have you tackled any of these before?', 'Select all that apply', 'Don\'t worry if you haven\'t! New Zealand has spots for all ocean knowledge levels.', 'MULTIPLE', 'CHECKBOX', NULL, 1, 4, 1, '2026-04-26 12:40:53', '2026-04-26 12:40:53'),
(5, 1, 'What is your go-to board?', NULL, NULL, 'SINGLE', 'CARDS', NULL, 1, 5, 1, '2026-04-26 12:40:53', '2026-04-26 12:40:53'),
(6, 1, 'What is the vibe of your ideal trip?', NULL, NULL, 'SINGLE', 'RADIO', NULL, 1, 6, 1, '2026-04-26 12:40:53', '2026-04-26 12:40:53'),
(7, 1, 'How adventurous are you feeling?', NULL, NULL, 'SINGLE', 'SLIDER', NULL, 1, 7, 1, '2026-04-26 12:40:53', '2026-04-26 12:40:53'),
(8, 1, 'What size waves are you chasing?', NULL, NULL, 'SINGLE', 'RADIO', NULL, 1, 8, 1, '2026-04-26 12:40:53', '2026-04-26 12:40:53'),
(9, 1, 'Who\'s coming along for the ride?', 'Select all that apply', NULL, 'MULTIPLE', 'CHECKBOX', NULL, 1, 9, 1, '2026-04-26 12:40:53', '2026-04-26 12:40:53'),
(10, 1, 'Rank what matters most to you on this trip', 'Drag to reorder', 'Put your top priority at the very top. This is the secret sauce for your custom itinerary.', 'RANK', NULL, NULL, 1, 10, 1, '2026-04-26 12:40:53', '2026-04-26 12:40:53'),
(11, 1, 'Tell us a quick story: what is your best (or worst!) surf experience so far?', NULL, 'We love a good surf story, and it actually tells us a lot about your relationship with the ocean.', 'TEXT', NULL, NULL, 1, 11, 0, '2026-04-26 12:40:53', '2026-04-26 12:40:53');

-- --------------------------------------------------------

--
-- Table structure for table `form_field_options`
--

CREATE TABLE `form_field_options` (
  `id` int(11) NOT NULL,
  `field_id` int(11) NOT NULL,
  `label` varchar(500) NOT NULL,
  `value` varchar(500) NOT NULL,
  `feedback` varchar(500) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `position` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_field_options`
--

INSERT INTO `form_field_options` (`id`, `field_id`, `label`, `value`, `feedback`, `image_url`, `position`, `created_at`, `updated_at`, `is_active`) VALUES
(6, 2, 'First surf trip / rarely surf', 'FIRST_TIME', 'You are going to be hooked.', NULL, 1, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(7, 2, 'A few times a year', 'FEW_TIMES_YEAR', 'Let\'s make this trip count!', NULL, 2, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(8, 2, '1–2 times per month', 'ONCE_TWICE_MONTH', 'Solid rhythm.', NULL, 3, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(9, 2, '1–2 times per week', 'ONCE_TWICE_WEEK', 'A true local somewhere!', NULL, 4, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(10, 2, 'Almost every day', 'ALMOST_DAILY', 'Living the dream.', NULL, 5, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(11, 3, 'Small & mellow (ideal for learning / cruising)', 'SMALL_MELLOW', 'Smooth sailing.', NULL, 1, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(12, 3, 'Fun and playful beach breaks', 'BEACH_BREAK', 'Perfect for trying new maneuvers.', NULL, 2, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(13, 3, 'Consistent intermediate waves', 'INTERMEDIATE_WAVES', 'We\'ve got plenty of those on the West Coast.', NULL, 3, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(14, 3, 'Powerful waves and bigger swells', 'POWERFUL', 'Hold on tight!', NULL, 4, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(15, 3, 'I\'m flexible — depends on conditions', 'FLEXIBLE', 'The true surfer mindset.', NULL, 5, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(16, 4, 'Rip currents', 'RIP_CURRENTS', NULL, NULL, 1, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(17, 4, 'Reef breaks', 'REEF_BREAKS', NULL, NULL, 2, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(18, 4, 'Point breaks', 'POINT_BREAKS', NULL, NULL, 3, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(19, 4, 'Long paddle outs', 'LONG_PADDLE', 'Get those shoulders ready!', NULL, 4, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(20, 4, 'None of the above / still learning', 'NONE', 'That\'s what we are here for.', NULL, 5, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(21, 5, 'Soft-top / foamie', 'SOFT_TOP', 'Maximum fun, minimum stress.', NULL, 1, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(22, 5, 'Longboard', 'LONGBOARD', 'Classic style.', NULL, 2, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(23, 5, 'Funboard / Mid-length', 'FUNBOARD', 'The ultimate wave catcher.', NULL, 3, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(24, 5, 'Shortboard', 'SHORTBOARD', 'Time to shred.', NULL, 4, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(25, 5, 'Multiple boards depending on conditions', 'MULTIPLE', 'A true quiver builder.', NULL, 5, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(26, 5, 'None of the above (never surfed)', 'NEVER_SURFED', 'We\'ll find the perfect match for you.', NULL, 6, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(27, 6, 'Relaxed & family-friendly', 'FAMILY', NULL, NULL, 1, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(28, 6, 'Surf & chill with friends', 'FRIENDS_CHILL', NULL, NULL, 2, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(29, 6, 'Surf-focused performance trip', 'PERFORMANCE', NULL, NULL, 3, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(30, 6, 'Road-trip adventure & discovery', 'ROAD_TRIP', NULL, NULL, 4, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(31, 6, 'Romantic / couple escape', 'COUPLE', NULL, NULL, 5, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(32, 6, 'Solo traveler social vibe', 'SOLO_SOCIAL', NULL, NULL, 6, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(33, 7, 'Super easy — chill spots, short drives, reliable waves, plenty of downtime', 'COMFORT', 'We know the best cozy spots.', NULL, 1, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(34, 7, 'Easy with a twist — mostly accessible spots with a few detours for better waves', 'MID_COMFORT', 'Easy days, good waves.', NULL, 2, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(35, 7, 'Adventure-driven — regular drives to explore different breaks and conditions', 'ADVENTUROUS', 'We\'ll chase the best waves.', NULL, 3, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(36, 7, 'Full send — long missions, remote spots, flexible plans to chase the best swell', 'ADVENTUROUS_PLUS', 'Off the beaten path we go!', NULL, 4, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(37, 8, '1–2 ft — small & safe', 'SMALL', NULL, NULL, 1, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(38, 8, '2–3 ft — fun & friendly', 'FUN', NULL, NULL, 2, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(39, 8, '3–5 ft — intermediate challenge', 'INTERMEDIATE', NULL, NULL, 3, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(40, 8, '5–7 ft — powerful surf', 'POWERFUL', NULL, NULL, 4, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(41, 8, 'I\'ll follow your guidance', 'GUIDANCE', NULL, NULL, 5, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(42, 9, 'Partner', 'PARTNER', NULL, NULL, 1, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(43, 9, 'Friends group', 'FRIENDS', NULL, NULL, 2, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(44, 9, 'Family with children', 'FAMILY', NULL, NULL, 3, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(45, 9, 'Solo', 'SOLO', NULL, NULL, 4, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(46, 9, 'Other (please specify)', 'OTHER', NULL, NULL, 5, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(47, 10, 'Progressing my surf skills', 'PROGRESS', NULL, NULL, 1, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(48, 10, 'Finding uncrowded surf spots', 'UNCROWDED', NULL, NULL, 2, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(49, 10, 'Scenic road-trip experience', 'SCENIC', NULL, NULL, 3, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(50, 10, 'Local culture & nature', 'CULTURE', NULL, NULL, 4, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(51, 10, 'Comfort & easy logistics', 'COMFORT', NULL, NULL, 5, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1),
(52, 10, 'Budget-friendly trip', 'BUDGET', NULL, NULL, 6, '2026-04-26 12:44:26', '2026-04-26 12:44:26', 1);

-- --------------------------------------------------------

--
-- Table structure for table `form_submissions`
--

CREATE TABLE `form_submissions` (
  `id` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `client_firstname` varchar(100) NOT NULL,
  `client_lastname` varchar(100) NOT NULL,
  `client_email` varchar(100) NOT NULL,
  `client_phone` varchar(100) DEFAULT NULL,
  `status` enum('NEW','READ','REPLIED','ARCHIVED') DEFAULT 'NEW',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `url` varchar(500) NOT NULL,
  `mime_type` varchar(100) DEFAULT NULL,
  `size_bytes` int(11) DEFAULT NULL,
  `alt` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp(),
  `cloudinary_public_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `filename`, `url`, `mime_type`, `size_bytes`, `alt`, `uploaded_at`, `cloudinary_public_id`) VALUES
(31, 'surfer-ocean-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371781/alaia-surf/smiellaliohhjewonehe.webp', 'image/webp', 148900, NULL, '2026-05-21 15:56:22', 'alaia-surf/smiellaliohhjewonehe'),
(32, 'new-zealand-night-sky-roadtrip.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371782/alaia-surf/xd1kbfq78ssesmzjp5vt.webp', 'image/webp', 246934, NULL, '2026-05-21 15:56:23', 'alaia-surf/xd1kbfq78ssesmzjp5vt'),
(33, 'chasing-waves-road-trip.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371783/alaia-surf/zgkepdzy0lvnj2u7qpzz.webp', 'image/webp', 169892, NULL, '2026-05-21 15:56:24', 'alaia-surf/zgkepdzy0lvnj2u7qpzz'),
(34, 'surf-aerial-view.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371784/alaia-surf/fq0o281g1kk1dhenvlsv.webp', 'image/webp', 256754, NULL, '2026-05-21 15:56:25', 'alaia-surf/fq0o281g1kk1dhenvlsv'),
(35, 'van-roadtrip-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371785/alaia-surf/kltuby2vrkyzghtjzeot.webp', 'image/webp', 163502, NULL, '2026-05-21 15:56:26', 'alaia-surf/kltuby2vrkyzghtjzeot'),
(36, 'sunset-ocean-roadtrip-van-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371786/alaia-surf/oechyazulz7pypu1ecj7.webp', 'image/webp', 153012, NULL, '2026-05-21 15:56:27', 'alaia-surf/oechyazulz7pypu1ecj7'),
(37, 'surfboards-under-flax.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371787/alaia-surf/esvdj5gkashhayapvujz.webp', 'image/webp', 210158, NULL, '2026-05-21 15:56:28', 'alaia-surf/esvdj5gkashhayapvujz'),
(38, 'surf-west-coast-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371788/alaia-surf/eodicbzxomcacqkqfkzp.webp', 'image/webp', 220306, NULL, '2026-05-21 15:56:29', 'alaia-surf/eodicbzxomcacqkqfkzp'),
(39, 'surfer-roadtrip-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371789/alaia-surf/w0qabnxvbjmxn6x5aks9.webp', 'image/webp', 93198, NULL, '2026-05-21 15:56:30', 'alaia-surf/w0qabnxvbjmxn6x5aks9'),
(40, 'roadtrip-ocean-sunset.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371790/alaia-surf/cnzdrzxqkf6uqfksot0z.webp', 'image/webp', 72010, NULL, '2026-05-21 15:56:31', 'alaia-surf/cnzdrzxqkf6uqfksot0z'),
(41, 'surf-instructor-paco-new-zealand.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371791/alaia-surf/ct91azvupsopyngfh9e1.webp', 'image/webp', 194048, NULL, '2026-05-21 15:56:31', 'alaia-surf/ct91azvupsopyngfh9e1'),
(42, 'Paco-Goalard-surf-instructor.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371861/alaia-surf/zjfedvfev8dbut3wxrlp.webp', 'image/webp', 162634, NULL, '2026-05-21 15:57:42', 'alaia-surf/zjfedvfev8dbut3wxrlp'),
(44, 'muriwai-beach-in-new-zealand-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372316/alaia-surf/dd3emacx5bcgbixlrtmg.mp4', 'video/mp4', 2923991, NULL, '2026-05-21 16:05:17', 'alaia-surf/dd3emacx5bcgbixlrtmg'),
(45, 'new-zealand-beach-discover-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372317/alaia-surf/iq3kehca43jcks49pyzz.mp4', 'video/mp4', 1240711, NULL, '2026-05-21 16:05:18', 'alaia-surf/iq3kehca43jcks49pyzz'),
(46, 'new-zealand-beach-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372319/alaia-surf/d3v99keh5deqdfws8htv.mp4', 'video/mp4', 1003367, NULL, '2026-05-21 16:05:21', 'alaia-surf/d3v99keh5deqdfws8htv'),
(47, 'new-zealand-ocean-road-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372321/alaia-surf/ykzgpfosfz9hdenzppnx.mp4', 'video/mp4', 2991946, NULL, '2026-05-21 16:05:22', 'alaia-surf/ykzgpfosfz9hdenzppnx'),
(48, 'new-zealand-ocean-road-lanscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372323/alaia-surf/rcdfwlvb6ufgfgzsyqcy.mp4', 'video/mp4', 1845967, NULL, '2026-05-21 16:05:24', 'alaia-surf/rcdfwlvb6ufgfgzsyqcy'),
(49, 'new-zealand-east-coast-surf-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372324/alaia-surf/yhysodlwfsrdevjsi0by.mp4', 'video/mp4', 796660, NULL, '2026-05-21 16:05:26', 'alaia-surf/yhysodlwfsrdevjsi0by'),
(50, 'raglan-beach-in-new-zealand-landscape-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372326/alaia-surf/fzon5shim6aokmiiaevh.mp4', 'video/mp4', 2633018, NULL, '2026-05-21 16:05:28', 'alaia-surf/fzon5shim6aokmiiaevh'),
(51, 'surf-lesson-beginner.jpg', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779373643/alaia-surf/hpo2dem08dmhzagml7j2.jpg', 'image/jpeg', 1130380, NULL, '2026-05-21 16:27:24', 'alaia-surf/hpo2dem08dmhzagml7j2'),
(52, 'surf-group-lesson-beginner.jpg', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779373644/alaia-surf/uiaussgbgrvytoqgom4q.jpg', 'image/jpeg', 783028, NULL, '2026-05-21 16:27:25', 'alaia-surf/uiaussgbgrvytoqgom4q'),
(53, 'Paco-surf-instructor-raglan-web.mp4', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779375310/alaia-surf/co2aazaouunhxouemvza.mp4', 'video/mp4', 2386907, NULL, '2026-05-21 16:55:11', 'alaia-surf/co2aazaouunhxouemvza'),
(54, 'new-zealand-surf-spot.webp', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779379786/alaia-surf/am2brubss0rr42ejbffm.webp', 'image/webp', 122916, NULL, '2026-05-21 18:09:47', 'alaia-surf/am2brubss0rr42ejbffm');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` enum('SUPER_ADMIN','COACH','ASSISTANT') NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'SUPER_ADMIN', 'Full access', '2026-04-26 12:39:12'),
(2, 'COACH', 'Surf coach access', '2026-04-26 12:39:12'),
(3, 'ASSISTANT', 'Limited access', '2026-04-26 12:39:12');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(10) NOT NULL,
  `type` varchar(50) NOT NULL,
  `duration` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `site_content`
--

CREATE TABLE `site_content` (
  `id` int(11) NOT NULL,
  `key_name` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `type` enum('TEXT','RICHTEXT','IMAGE_URL','NUMBER') NOT NULL DEFAULT 'TEXT',
  `page` varchar(100) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_content`
--

INSERT INTO `site_content` (`id`, `key_name`, `value`, `type`, `page`, `label`, `created_at`, `updated_at`) VALUES
(1, 'home_hero_title', 'Your next adventure starts here', 'TEXT', 'home', 'Hero Title', '2026-04-26 12:39:12', '2026-05-21 23:42:36'),
(2, 'home_hero_cta_lesson', 'Book a lesson', 'TEXT', 'home', 'Hero CTA Lesson', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(3, 'home_hero_cta_trip', 'My surf trip', 'TEXT', 'home', 'Hero CTA Trip', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(4, 'home_lesson_group_title', 'Group Lessons', 'TEXT', 'home', 'Lesson Group Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(5, 'home_lesson_group_desc', 'Join a fun and energetic group session designed for adults of all levels. Learn the fundamentals of surfing alongside others.', 'RICHTEXT', 'home', 'Lesson Group Description', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(6, 'home_lesson_group_b1', 'Learn to read waves and ocean safety', 'TEXT', 'home', 'Lesson Group Bullet 1', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(7, 'home_lesson_group_b2', 'Master the pop-up technique', 'TEXT', 'home', 'Lesson Group Bullet 2', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(8, 'home_lesson_group_b3', 'Ride your first waves in a small group', 'TEXT', 'home', 'Lesson Group Bullet 3', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(9, 'home_lesson_private_title', 'Private Lessons', 'TEXT', 'home', 'Lesson Private Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(10, 'home_lesson_private_desc', 'Get personalized one-on-one coaching tailored to your exact skill level. Perfect for rapid progression.', 'RICHTEXT', 'home', 'Lesson Private Description', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(11, 'home_lesson_private_b1', '100% focused on your technique', 'TEXT', 'home', 'Lesson Private Bullet 1', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(12, 'home_lesson_private_b2', 'Custom location based on your level', 'TEXT', 'home', 'Lesson Private Bullet 2', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(13, 'home_lesson_private_b3', 'Flexible scheduling to suit you', 'TEXT', 'home', 'Lesson Private Bullet 3', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(14, 'home_usp_main_title', 'Come catch some waves.', 'TEXT', 'home', 'USP Main Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(15, 'home_usp_1_title', 'Safety', 'TEXT', 'home', 'USP 1 Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(16, 'home_usp_1_desc', 'Your safety is our top priority. Certified instructors only.', 'TEXT', 'home', 'USP 1 Description', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(17, 'home_usp_2_title', 'Progression', 'TEXT', 'home', 'USP 2 Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(18, 'home_usp_2_desc', 'Structured coaching to ensure you make real progress.', 'TEXT', 'home', 'USP 2 Description', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(19, 'home_usp_3_title', 'Fun', 'TEXT', 'home', 'USP 3 Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(20, 'home_usp_3_desc', 'Surfing is all about smiles and good vibes.', 'TEXT', 'home', 'USP 3 Description', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(21, 'home_usp_4_title', 'Small groups', 'TEXT', 'home', 'USP 4 Title', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(22, 'home_usp_4_desc', 'Maximum 5 people per coach for better attention.', 'TEXT', 'home', 'USP 4 Description', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(23, 'home_coach_title', 'About coach', 'TEXT', 'home', 'Coach Title', '2026-04-26 12:39:12', '2026-05-21 22:57:55'),
(24, 'home_coach_bio', 'Born and raised by the ocean, I have been surfing for over 20 years. After training in France, I moved to NZ to share my passion. My approach is simple: patient, personalized, and always fun.', 'RICHTEXT', 'home', 'Coach Bio', '2026-04-26 12:39:12', '2026-04-26 12:39:12'),
(44, 'home_lesson_group_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779373644/alaia-surf/uiaussgbgrvytoqgom4q.jpg', 'IMAGE_URL', 'home', 'Lesson Group Image', '2026-05-15 00:51:44', '2026-05-21 16:58:27'),
(45, 'home_lesson_private_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779373643/alaia-surf/hpo2dem08dmhzagml7j2.jpg', 'IMAGE_URL', 'home', 'Lesson Private Image', '2026-05-15 00:51:44', '2026-05-21 16:58:38'),
(46, 'home_lesson_coaching_title', 'Coaching', 'TEXT', 'home', 'Lesson Coaching Title', '2026-05-15 00:51:44', '2026-05-15 00:51:44'),
(47, 'home_lesson_coaching_desc', 'Tailored video analysis and feedback sessions to accelerate your progression wherever you are.', 'RICHTEXT', 'home', 'Lesson Coaching Description', '2026-05-15 00:51:44', '2026-05-15 00:51:44'),
(48, 'home_lesson_coaching_b1', 'Video analysis of your surfing', 'TEXT', 'home', 'Lesson Coaching Bullet 1', '2026-05-15 00:51:44', '2026-05-15 00:51:44'),
(49, 'home_lesson_coaching_b2', 'Personalised feedback report', 'TEXT', 'home', 'Lesson Coaching Bullet 2', '2026-05-15 00:51:44', '2026-05-15 00:51:44'),
(50, 'home_lesson_coaching_b3', 'Remote or in-person sessions', 'TEXT', 'home', 'Lesson Coaching Bullet 3', '2026-05-15 00:51:44', '2026-05-15 00:51:44'),
(51, 'home_lesson_coaching_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371789/alaia-surf/w0qabnxvbjmxn6x5aks9.webp', 'IMAGE_URL', 'home', 'Lesson Coaching Image', '2026-05-15 00:51:44', '2026-05-21 16:58:54'),
(52, 'home_hero_image', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372326/alaia-surf/fzon5shim6aokmiiaevh.mp4', 'IMAGE_URL', 'home', 'Hero Background Image', '2026-05-15 21:30:34', '2026-05-21 16:31:14'),
(53, 'home_coach_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371791/alaia-surf/ct91azvupsopyngfh9e1.webp', 'IMAGE_URL', 'home', 'Coach Image', '2026-05-15 21:30:34', '2026-05-21 16:57:56'),
(54, 'home_simple_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371784/alaia-surf/fq0o281g1kk1dhenvlsv.webp', 'IMAGE_URL', 'home', 'Simple Image', '2026-05-15 21:30:34', '2026-05-21 16:58:08'),
(55, 'about_hero_title', 'About ALAIA Surf Coach', 'TEXT', 'about', 'Hero Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(56, 'about_hero_subtitle', 'Passionate about sharing the art of surfing in New Zealand\'s stunning waters', 'TEXT', 'about', 'Hero Subtitle', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(57, 'about_hero_image', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779375310/alaia-surf/co2aazaouunhxouemvza.mp4', 'IMAGE_URL', 'about', 'Hero Background Image', '2026-05-15 21:41:23', '2026-05-21 16:55:16'),
(58, 'about_coach_title', 'Meet Paco, Your Coach', 'TEXT', 'about', 'Coach Section Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(59, 'about_coach_subtitle', 'Expert surfer & certified instructor', 'TEXT', 'about', 'Coach Section Subtitle', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(60, 'about_coach_content', 'With over 20 years of surfing experience and 8 years as a surf coach, nothing is more rewarding than helping my students progress and truly connect with the ocean. Based in Raglan, New Zealand, I specialize in personalized coaching that adapts to your skill level and goals. Whether you\'re catching your first wave or perfecting your cutback, I\'m here to guide you every step of the way.', 'RICHTEXT', 'about', 'Coach Description', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(61, 'about_coach_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371861/alaia-surf/zjfedvfev8dbut3wxrlp.webp', 'IMAGE_URL', 'about', 'Coach Photo', '2026-05-15 21:41:23', '2026-05-21 16:57:28'),
(62, 'about_coach_button_text', 'Book a lesson', 'TEXT', 'about', 'Coach Button Text', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(63, 'about_coach_button_url', '/book-surf-lesson', 'TEXT', 'about', 'Coach Button URL', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(64, 'about_values_title', 'What Makes ALAIA Different', 'TEXT', 'about', 'Values Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(65, 'about_values_subtitle', 'We believe surfing is more than a sport, it\'s a lifestyle, a connection to nature, and a journey of personal growth.', 'TEXT', 'about', 'Values Subtitle', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(66, 'about_value_1_title', 'Safety First', 'TEXT', 'about', 'Value 1 Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(67, 'about_value_1_desc', 'Certified instructors, proper equipment, and comprehensive ocean safety training for every student.', 'TEXT', 'about', 'Value 1 Description', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(68, 'about_value_2_title', 'Personalized', 'TEXT', 'about', 'Value 2 Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(69, 'about_value_2_desc', 'Every lesson is tailored to your skill level, physical abilities, and personal goals.', 'TEXT', 'about', 'Value 2 Description', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(70, 'about_value_3_title', 'Small Groups', 'TEXT', 'about', 'Value 3 Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(71, 'about_value_3_desc', 'Maximum 4 students per session ensures individual attention and faster progress.', 'TEXT', 'about', 'Value 3 Description', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(72, 'about_value_4_title', 'Local Expert', 'TEXT', 'about', 'Value 4 Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(73, 'about_value_4_desc', 'Deep knowledge of Raglan\'s breaks, tides, and conditions for the perfect surf session.', 'TEXT', 'about', 'Value 4 Description', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(74, 'about_mission_title', 'Sharing the Stoke, One Wave at a Time', 'TEXT', 'about', 'Mission Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(75, 'about_mission_p1', 'At ALAIA Surf Coach, our mission is simple: to help you fall in love with surfing while respecting the ocean and its power. We create a safe, supportive environment where beginners feel confident and intermediate surfers push their limits.', 'RICHTEXT', 'about', 'Mission Paragraph 1', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(76, 'about_mission_p2', 'Every lesson is an opportunity to connect with nature, challenge yourself, and experience the pure joy of riding waves. We\'re not just teaching you to surf, we\'re introducing you to a lifestyle that will stay with you forever.', 'RICHTEXT', 'about', 'Mission Paragraph 2', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(77, 'about_mission_p3', 'Beyond individual lessons, we organize custom surf trips around New Zealand, taking you to hidden gems and world-class breaks that only locals know about.', 'RICHTEXT', 'about', 'Mission Paragraph 3', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(78, 'about_cta_title', 'Ready to Start Your Surf Journey?', 'TEXT', 'about', 'CTA Title', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(79, 'about_cta_subtitle', 'Book your first lesson today or plan an unforgettable surf trip across New Zealand', 'TEXT', 'about', 'CTA Subtitle', '2026-05-15 21:41:23', '2026-05-15 21:41:23'),
(80, 'surf_trip_hero_title', 'Plan your custom surf trip', 'TEXT', 'surf-trip', 'Hero Title', '2026-05-17 19:12:23', '2026-05-17 19:12:23'),
(81, 'surf_trip_hero_subtitle', 'Answer a few questions about your experience and what you\'re looking for. We\'ll use your answers to design the perfect New Zealand surf adventure for you.', 'RICHTEXT', 'surf-trip', 'Hero Subtitle', '2026-05-17 19:12:23', '2026-05-17 19:12:23'),
(82, 'surf_trip_card_1_title', '5 minutes', 'TEXT', 'surf-trip', 'Card 1 Title', '2026-05-17 19:12:23', '2026-05-17 19:12:23'),
(83, 'surf_trip_card_1_desc', 'Quick and easy to complete', 'TEXT', 'surf-trip', 'Card 1 Description', '2026-05-17 19:12:23', '2026-05-17 19:12:23'),
(84, 'surf_trip_card_2_title', '10 questions', 'TEXT', 'surf-trip', 'Card 2 Title', '2026-05-17 19:12:23', '2026-05-17 19:12:23'),
(85, 'surf_trip_card_2_desc', 'About your level and preferences', 'TEXT', 'surf-trip', 'Card 2 Description', '2026-05-17 19:12:23', '2026-05-17 19:12:23'),
(86, 'surf_trip_card_3_title', 'Custom trip', 'TEXT', 'surf-trip', 'Card 3 Title', '2026-05-17 19:12:23', '2026-05-17 19:12:23'),
(87, 'surf_trip_card_3_desc', 'Tailored just for you', 'TEXT', 'surf-trip', 'Card 3 Description', '2026-05-17 19:12:23', '2026-05-17 19:12:23'),
(88, 'surf_trip_cta', 'Start the quiz →', 'TEXT', 'surf-trip', 'CTA Button', '2026-05-17 19:12:23', '2026-05-17 19:12:23'),
(89, 'terms_title', 'Terms & Conditions', 'TEXT', 'terms', 'Page Title', '2026-05-19 13:09:36', '2026-05-19 13:09:36'),
(90, 'terms_last_updated', 'May 2026', 'TEXT', 'terms', 'Last Updated', '2026-05-19 13:09:36', '2026-05-19 13:09:36'),
(91, 'terms_body', 'Welcome to ALAIA Surf Coach. By booking a lesson or surf trip with us, you agree to the following terms.\r\n\r\nBookings & Payment\r\nAll bookings are confirmed once payment has been received. Payment is taken on the day of your session unless otherwise agreed.\r\n\r\nCancellations\r\nCancellations made more than 24 hours in advance are eligible for a full reschedule. Cancellations within 24 hours may not be eligible for a reschedule. In the event of extreme weather or unsafe ocean conditions, we reserve the right to reschedule your session at no cost to you.\r\n\r\nHealth & Safety\r\nParticipants are expected to be in reasonable physical health and able to swim at least 50 metres. You must inform your coach of any medical conditions before the session begins. ALAIA Surf Coach reserves the right to refuse participation if a participant is deemed unfit or poses a safety risk.\r\n\r\nLiability\r\nSurfing involves inherent risks. By participating, you acknowledge and accept these risks. ALAIA Surf Coach is not liable for personal injury, loss, or damage arising from participation in our activities, except where required by law.\r\n\r\nCode of Conduct\r\nWe expect all participants to treat fellow surfers, coaches, and the ocean environment with respect. Harassment or disrespectful behaviour will result in immediate removal from the session without refund.\r\n\r\nContact\r\nFor any questions about these terms, please contact us via the contact page on our website.', 'RICHTEXT', 'terms', 'Content', '2026-05-19 13:09:36', '2026-05-19 13:09:36'),
(92, 'privacy_title', 'Privacy Policy', 'TEXT', 'privacy', 'Page Title', '2026-05-19 13:09:46', '2026-05-19 13:09:46'),
(93, 'privacy_last_updated', 'May 2026', 'TEXT', 'privacy', 'Last Updated', '2026-05-19 13:09:46', '2026-05-19 13:09:46'),
(94, 'privacy_body', 'ALAIA Surf Coach is committed to protecting your privacy. This policy explains how we collect, use, and store your personal information.\r\n\r\nInformation We Collect\r\nWhen you book a lesson or submit an enquiry, we collect your name, email address, phone number, and any other information you choose to provide. We do not collect payment card details directly.\r\n\r\nHow We Use Your Information\r\nWe use your information to confirm bookings, send reminders and updates, respond to enquiries, and improve our services. We do not sell or share your personal data with third parties.\r\n\r\nEmail Communications\r\nBy providing your email address, you consent to receiving booking confirmations and service-related emails. You may opt out of marketing communications at any time by contacting us.\r\n\r\nData Storage & Security\r\nYour data is stored securely and retained only as long as necessary for the purposes outlined above. We take reasonable technical measures to protect your information from unauthorised access.\r\n\r\nYour Rights\r\nYou have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, please contact us through the contact page on our website.\r\n\r\nCookies\r\nOur website may use cookies to improve your browsing experience. You can disable cookies in your browser settings at any time.\r\n\r\nChanges to This Policy\r\nWe may update this privacy policy from time to time. The latest version will always be available on this page.', 'RICHTEXT', 'privacy', 'Content', '2026-05-19 13:09:46', '2026-05-19 13:09:46'),
(95, 'snz_hero_title', 'Surf in New Zealand', 'TEXT', 'surf-in-new-zealand', 'Hero Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(96, 'snz_hero_subtitle', 'Surf lessons, packages and custom trips — based in Raglan, New Zealand.', 'TEXT', 'surf-in-new-zealand', 'Hero Subtitle', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(97, 'snz_hero_image', 'https://res.cloudinary.com/dz8bupnto/video/upload/v1779372317/alaia-surf/iq3kehca43jcks49pyzz.mp4', 'IMAGE_URL', 'surf-in-new-zealand', 'Hero Background Image', '2026-05-20 00:00:00', '2026-05-21 16:56:16'),
(98, 'snz_lessons_eyebrow', 'Raglan, New Zealand', 'TEXT', 'surf-in-new-zealand', 'Lessons Eyebrow', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(99, 'snz_lessons_title', 'Surf Lessons', 'TEXT', 'surf-in-new-zealand', 'Lessons Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(100, 'snz_lessons_desc', 'Group lessons, private sessions and coaching in Raglan — for every level, at every stage of your surf journey.', 'RICHTEXT', 'surf-in-new-zealand', 'Lessons Description', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(101, 'snz_lessons_b1', 'Small groups of 4 students maximum', 'TEXT', 'surf-in-new-zealand', 'Lessons Bullet 1', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(102, 'snz_lessons_b2', 'Board & wetsuit included', 'TEXT', 'surf-in-new-zealand', 'Lessons Bullet 2', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(103, 'snz_lessons_b3', 'Ocean safety briefing every session', 'TEXT', 'surf-in-new-zealand', 'Lessons Bullet 3', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(104, 'snz_lessons_b4', 'Beginner to intermediate levels welcome', 'TEXT', 'surf-in-new-zealand', 'Lessons Bullet 4', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(105, 'snz_packages_eyebrow', 'More sessions, better value', 'TEXT', 'surf-in-new-zealand', 'Packages Eyebrow', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(106, 'snz_packages_title', 'Surf Packages', 'TEXT', 'surf-in-new-zealand', 'Packages Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(107, 'snz_packages_desc', 'Book 3 or 5 sessions and save. Pick your dates one at a time — no expiry date.', 'RICHTEXT', 'surf-in-new-zealand', 'Packages Description', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(108, 'snz_packages_b1', 'Single lesson — $60', 'TEXT', 'surf-in-new-zealand', 'Packages Bullet 1', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(109, 'snz_packages_b2', '3-lesson package — $160 (save $20)', 'TEXT', 'surf-in-new-zealand', 'Packages Bullet 2', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(110, 'snz_packages_b3', '5-lesson package — $250 (save $50)', 'TEXT', 'surf-in-new-zealand', 'Packages Bullet 3', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(111, 'snz_trips_eyebrow', 'New Zealand, your way', 'TEXT', 'surf-in-new-zealand', 'Trips Eyebrow', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(112, 'snz_trips_title', 'Custom Surf Trips', 'TEXT', 'surf-in-new-zealand', 'Trips Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(113, 'snz_trips_desc', 'We plan the route, read the forecast, and coach you in the water. You just focus on surfing.', 'RICHTEXT', 'surf-in-new-zealand', 'Trips Description', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(114, 'snz_trips_b1', 'Spot selection based on your level & the forecast', 'TEXT', 'surf-in-new-zealand', 'Trips Bullet 1', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(115, 'snz_trips_b2', 'Personalised coaching in the water', 'TEXT', 'surf-in-new-zealand', 'Trips Bullet 2', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(116, 'snz_trips_b3', 'Local knowledge — we know where the crowds aren\'t', 'TEXT', 'surf-in-new-zealand', 'Trips Bullet 3', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(117, 'book_hero_title', 'Book a Surf Lesson', 'TEXT', 'book-surf-lesson', 'Hero Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(118, 'book_hero_subtitle', 'Raglan, New Zealand', 'TEXT', 'book-surf-lesson', 'Hero Subtitle', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(119, 'book_schedule_title', 'Upcoming Sessions', 'TEXT', 'book-surf-lesson', 'Schedule Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(121, 'book_schedule_empty', 'No sessions currently scheduled. Get in touch to arrange a lesson.', 'TEXT', 'book-surf-lesson', 'Empty Schedule Message', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(122, 'book_contact_title', 'Book or Ask a Question', 'TEXT', 'book-surf-lesson', 'Contact Section Title', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(123, 'book_contact_desc', 'Ready to get in the water? Send us a message and we\'ll confirm your session.', 'RICHTEXT', 'book-surf-lesson', 'Contact Section Description', '2026-05-20 00:00:00', '2026-05-20 00:00:00'),
(124, 'book_hero_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779371789/alaia-surf/w0qabnxvbjmxn6x5aks9.webp', 'IMAGE_URL', 'book-surf-lesson', 'Hero \r\n  Image', '2026-05-20 00:00:00', '2026-05-21 17:02:44'),
(125, 'home_review_1_name', 'Test Name', 'TEXT', 'home', 'Review 1 — Name', '2026-05-21 12:31:01', '2026-05-21 12:32:10'),
(126, 'home_review_1_quote', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed lacinia elit sit amet sagittis commodo. Nullam venenatis id ipsum a mollis. ', 'RICHTEXT', 'home', 'Review 1 — Quote', '2026-05-21 12:31:01', '2026-05-21 12:32:40'),
(127, 'home_review_2_name', 'Test Name 2', 'TEXT', 'home', 'Review 2 — Name', '2026-05-21 12:31:01', '2026-05-21 12:32:47'),
(128, 'home_review_2_quote', 'Cras at lectus ut augue tempus gravida at sit amet erat. Ut id pulvinar metus, sit amet cursus tellus.', 'RICHTEXT', 'home', 'Review 2 — Quote', '2026-05-21 12:31:01', '2026-05-21 12:33:00'),
(129, 'home_review_3_name', 'Test Name 3', 'TEXT', 'home', 'Review 3 — Name', '2026-05-21 12:31:01', '2026-05-21 12:33:06'),
(130, 'home_review_3_quote', 'Phasellus dapibus tortor nunc, at sollicitudin tortor mollis eget. Vivamus felis nisi, semper eu volutpat in, lobortis mollis sapien.', 'RICHTEXT', 'home', 'Review 3 — Quote', '2026-05-21 12:31:01', '2026-05-21 12:33:18'),
(131, 'global_footer_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779379786/alaia-surf/am2brubss0rr42ejbffm.webp', 'IMAGE_URL', 'global', 'Footer Background Image', '2026-05-21 17:52:38', '2026-05-21 18:10:00'),
(132, 'global_instagram_url', '', 'TEXT', 'global', 'Instagram URL', '2026-05-21 17:52:38', '2026-05-21 17:52:38'),
(133, 'global_facebook_url', '', 'TEXT', 'global', 'Facebook URL', '2026-05-21 17:52:38', '2026-05-21 17:52:38'),
(140, 'global_price_group_adults', '60', 'NUMBER', 'global', 'Group Lesson Adults (NZD)', '2026-05-21 18:37:00', '2026-05-21 18:37:00'),
(141, 'global_price_group_kids', '40', 'NUMBER', 'global', 'Group Lesson Kids (NZD)', '2026-05-21 18:37:00', '2026-05-21 18:37:59'),
(142, 'global_price_private', '100', 'NUMBER', 'global', 'Private Lesson (NZD)', '2026-05-21 18:37:00', '2026-05-21 18:37:00'),
(143, 'global_price_coaching', '200', 'NUMBER', 'global', 'Surf Coaching (NZD)', '2026-05-21 18:37:00', '2026-05-21 18:37:54'),
(144, 'global_price_pack_3', '160', 'NUMBER', 'global', '3-Session Package (NZD)', '2026-05-21 18:37:00', '2026-05-21 18:37:00'),
(145, 'global_price_pack_5', '250', 'NUMBER', 'global', '5-Session Package (NZD)', '2026-05-21 18:37:00', '2026-05-21 18:37:00'),
(148, 'about_mission_image', 'https://res.cloudinary.com/dz8bupnto/image/upload/v1779373643/alaia-surf/hpo2dem08dmhzagml7j2.jpg', 'IMAGE_URL', 'about', 'Mission Image', '2026-05-21 22:58:38', '2026-05-21 22:58:38'),
(151, 'faq_cat1_title', 'Before your lesson', 'TEXT', 'faq', 'Category 1 Title', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(152, 'faq_cat1_item1_q', 'Do I need to know how to swim?', 'TEXT', 'faq', 'Cat 1 — Q1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(153, 'faq_cat1_item1_a', 'Yes — you need to be a comfortable swimmer. You don\'t need to be a strong swimmer, but you should be able to swim at least 50 metres unaided and feel at ease in the ocean.', 'TEXT', 'faq', 'Cat 1 — A1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(154, 'faq_cat1_item2_q', 'What should I bring?', 'TEXT', 'faq', 'Cat 1 — Q2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(155, 'faq_cat1_item2_a', 'Just yourself and a towel. We provide the surfboard, wetsuit, and all the equipment you need. Bring a change of clothes and a bottle of water for after the session.', 'TEXT', 'faq', 'Cat 1 — A2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(156, 'faq_cat1_item3_q', 'What should I wear under the wetsuit?', 'TEXT', 'faq', 'Cat 1 — Q3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(157, 'faq_cat1_item3_a', 'A swimsuit or board shorts under the wetsuit is ideal. Avoid anything with metal zips or buckles as they can be uncomfortable and damage the wetsuit.', 'TEXT', 'faq', 'Cat 1 — A3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(158, 'faq_cat1_item4_q', 'Is there a minimum age or fitness level?', 'TEXT', 'faq', 'Cat 1 — Q4', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(159, 'faq_cat1_item4_a', 'We welcome surfers aged 8 and up. You don\'t need to be an athlete, but a basic level of fitness helps — you\'ll be paddling and popping up repeatedly. If you have any health concerns, let us know before booking.', 'TEXT', 'faq', 'Cat 1 — A4', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(160, 'faq_cat1_item5_q', 'What if the surf is too big or the conditions are bad?', 'TEXT', 'faq', 'Cat 1 — Q5', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(161, 'faq_cat1_item5_a', 'We monitor conditions closely. If the surf is unsuitable for learning, we\'ll contact you to reschedule. Your safety always comes first — Raglan is known for its variety of breaks so there\'s usually a sheltered option.', 'TEXT', 'faq', 'Cat 1 — A5', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(162, 'faq_cat2_title', 'The lessons', 'TEXT', 'faq', 'Category 2 Title', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(163, 'faq_cat2_item1_q', 'How long is each session?', 'TEXT', 'faq', 'Cat 2 — Q1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(164, 'faq_cat2_item1_a', 'Each group session runs for 2 hours, including a land-based safety briefing at the start.', 'TEXT', 'faq', 'Cat 2 — A1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(165, 'faq_cat2_item2_q', 'How many people are in a group lesson?', 'TEXT', 'faq', 'Cat 2 — Q2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(166, 'faq_cat2_item2_a', 'Maximum 4 students per group. This keeps the coach-to-student ratio low enough that you still get plenty of individual feedback.', 'TEXT', 'faq', 'Cat 2 — A2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(167, 'faq_cat2_item3_q', 'What level do I need to be?', 'TEXT', 'faq', 'Cat 2 — Q3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(168, 'faq_cat2_item3_a', 'Group lessons are open to complete beginners through to intermediate surfers. If you\'re more advanced and want targeted coaching, ask us about private coaching sessions.', 'TEXT', 'faq', 'Cat 2 — A3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(169, 'faq_cat2_item4_q', 'Where do lessons take place?', 'TEXT', 'faq', 'Cat 2 — Q4', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(170, 'faq_cat2_item4_a', 'Most lessons take place at Ngarunui Beach (Raglan\'s main surf beach), which has a consistent, mellow shore break perfect for learning. The exact spot varies with tide and swell conditions on the day.', 'TEXT', 'faq', 'Cat 2 — A4', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(171, 'faq_cat2_item5_q', 'Will I actually stand up on my first lesson?', 'TEXT', 'faq', 'Cat 2 — Q5', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(172, 'faq_cat2_item5_a', 'Most people do — but it\'s not a guarantee. Every session is different and the ocean has its own schedule. What we can guarantee is that you\'ll learn proper technique, ocean awareness, and come away stoked regardless.', 'TEXT', 'faq', 'Cat 2 — A5', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(173, 'faq_cat3_title', 'Packages & booking', 'TEXT', 'faq', 'Category 3 Title', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(174, 'faq_cat3_item1_q', 'How do surf packages work?', 'TEXT', 'faq', 'Cat 3 — Q1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(175, 'faq_cat3_item1_a', 'Send us a message via the contact form or email to ask about available sessions. We\'ll confirm your slot and any package details directly. No need to choose all your dates upfront — book them one at a time as you go.', 'TEXT', 'faq', 'Cat 3 — A1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(176, 'faq_cat3_item2_q', 'Do package sessions expire?', 'TEXT', 'faq', 'Cat 3 — Q2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(177, 'faq_cat3_item2_a', 'No expiry date. Use your sessions whenever suits you. That said, we recommend spacing them within a few weeks for the best progression — muscle memory fades quickly.', 'TEXT', 'faq', 'Cat 3 — A2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(178, 'faq_cat3_item3_q', 'Can I book for multiple people?', 'TEXT', 'faq', 'Cat 3 — Q3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(179, 'faq_cat3_item3_a', 'Yes. Just mention the number of participants in your message. For groups larger than 4, contact us directly and we\'ll arrange a private session.', 'TEXT', 'faq', 'Cat 3 — A3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(180, 'faq_cat3_item4_q', 'How do I book a lesson?', 'TEXT', 'faq', 'Cat 3 — Q4', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(181, 'faq_cat3_item4_a', 'Check the upcoming session dates on the booking page and get in touch via the contact form. We\'ll confirm your session and share all the details by email.', 'TEXT', 'faq', 'Cat 3 — A4', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(182, 'faq_cat4_title', 'Cancellation & payment', 'TEXT', 'faq', 'Category 4 Title', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(183, 'faq_cat4_item1_q', 'How do I cancel a session?', 'TEXT', 'faq', 'Cat 4 — Q1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(184, 'faq_cat4_item1_a', 'Contact us at least 24 hours before your session to cancel or reschedule. Cancellations made after that point are not eligible for a refund or reschedule.', 'TEXT', 'faq', 'Cat 4 — A1', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(185, 'faq_cat4_item2_q', 'When do I pay?', 'TEXT', 'faq', 'Cat 4 — Q2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(186, 'faq_cat4_item2_a', 'Payment is collected on the day of your lesson — we don\'t take any payment online. We accept cash and card at the session.', 'TEXT', 'faq', 'Cat 4 — A2', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(187, 'faq_cat4_item3_q', 'What happens if the coach cancels?', 'TEXT', 'faq', 'Cat 4 — Q3', '2026-05-27 09:53:03', '2026-05-27 09:53:03'),
(188, 'faq_cat4_item3_a', 'If we cancel a session for any reason (weather, emergency), you\'ll be notified by email and offered a full reschedule at no extra cost.', 'TEXT', 'faq', 'Cat 4 — A3', '2026-05-27 09:53:03', '2026-05-27 09:53:03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `reset_token` varchar(64) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` datetime DEFAULT NULL,
  `reset_token_expires_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `email`, `password`, `first_name`, `last_name`, `reset_token`, `is_active`, `last_login`, `reset_token_expires_at`, `created_at`, `updated_at`) VALUES
(2, 1, 'ellinor.st@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$hulgVMQbc5b18YB7xfu4eA$ASJY++vEoNF5FbBwIyPTBV6ZcFSGcmn6w7fvGpEBPKs', 'Admin', 'ALAIA', 'cfb3601b-8fb3-4a40-a43c-2340fae7215a', 1, '2026-05-29 10:42:16', '2026-05-26 21:13:44', '2026-05-13 14:17:06', '2026-05-29 10:42:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `form_answers`
--
ALTER TABLE `form_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `submission_id` (`submission_id`),
  ADD KEY `field_id` (`field_id`);

--
-- Indexes for table `form_fields`
--
ALTER TABLE `form_fields`
  ADD PRIMARY KEY (`id`),
  ADD KEY `form_id` (`form_id`);

--
-- Indexes for table `form_field_options`
--
ALTER TABLE `form_field_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `field_id` (`field_id`);

--
-- Indexes for table `form_submissions`
--
ALTER TABLE `form_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `form_id` (`form_id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_content`
--
ALTER TABLE `site_content`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key_name` (`key_name`),
  ADD KEY `idx_site_content_page` (`page`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `idx_users_reset_token` (`reset_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `form_answers`
--
ALTER TABLE `form_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `form_fields`
--
ALTER TABLE `form_fields`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `form_field_options`
--
ALTER TABLE `form_field_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `form_submissions`
--
ALTER TABLE `form_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `site_content`
--
ALTER TABLE `site_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `form_answers`
--
ALTER TABLE `form_answers`
  ADD CONSTRAINT `form_answers_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `form_submissions` (`id`);

--
-- Constraints for table `form_fields`
--
ALTER TABLE `form_fields`
  ADD CONSTRAINT `form_fields_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `forms` (`id`);

--
-- Constraints for table `form_field_options`
--
ALTER TABLE `form_field_options`
  ADD CONSTRAINT `form_field_options_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `form_fields` (`id`);

--
-- Constraints for table `form_submissions`
--
ALTER TABLE `form_submissions`
  ADD CONSTRAINT `form_submissions_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `forms` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
