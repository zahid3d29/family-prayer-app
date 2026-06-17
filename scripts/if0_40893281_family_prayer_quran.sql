-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql203.infinityfree.com
-- Generation Time: Jun 10, 2026 at 12:54 PM
-- Server version: 11.4.12-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `if0_40893281_family_prayer_quran`
--

-- --------------------------------------------------------

--
-- Table structure for table `Apr_2025`
--

CREATE TABLE `Apr_2025` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Apr_2025`
--

INSERT INTO `Apr_2025` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Rony', '1687373678', '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15', 'April', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `Apr_2026`
--

CREATE TABLE `Apr_2026` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Apr_2026`
--

INSERT INTO `Apr_2026` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Kaniz fatima', '1770755040', '1,2,3,4,5', 'April', 2026),
(2, 'Johora lucky', '1683032413', '6,7,8,9,10', 'April', 2026),
(3, 'Din islam', '1683032411', '28,29,30', 'April', 2026),
(4, 'Rony', '1687373678', '11,12,13,14,15,16,17,18,19', 'April', 2026),
(5, 'Sadia Sultana Mim', '1759287477', '20', 'April', 2026),
(6, 'Monna', '1521333206', '21,22,23,24,25,26,27', 'April', 2026);

-- --------------------------------------------------------

--
-- Table structure for table `Aug_2025`
--

CREATE TABLE `Aug_2025` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Aug_2025`
--

INSERT INTO `Aug_2025` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Johora lucky', '1683032413', '10,11,12,13,14', 'August', 2025),
(2, 'Manik', '0168303241', '15,16,17', 'August', 2025),
(3, 'Monna', '1521333206', '1,2,3,4,5,6,7,8', 'August', 2025),
(4, 'Rony', '1687373678', '22,23,24,25,26,27,28,29,30', 'August', 2025),
(5, 'Sadia Sultana Mim', '1759287477', '9', 'August', 2025),
(6, 'Kaniz fatima', '1770755040', '18,19,20,21', 'August', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `dec_2024`
--

CREATE TABLE `dec_2024` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` int(15) NOT NULL,
  `assigned_paras` text NOT NULL,
  `submission_date` datetime NOT NULL DEFAULT current_timestamp(),
  `month` text NOT NULL,
  `year` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dec_2024`
--

INSERT INTO `dec_2024` (`id`, `name`, `phone`, `assigned_paras`, `submission_date`, `month`, `year`) VALUES
(1, 'Rony', 1687373678, '24,25,26,27,28,29,30', '2024-12-01 11:30:08', 'December', '2024'),
(2, 'Johora lucky', 1683032413, '19,20,21,22,23', '2024-12-01 11:46:23', 'December', '2024'),
(3, 'Ayshe', 1863818489, '5,6', '2024-12-02 02:04:53', 'December', '2024'),
(4, 'Din islam', 1683032411, '16,17,18', '2024-12-01 23:30:49', 'December', '2024'),
(5, 'Ruma', 1626509483, '1,2,3,4', '2024-12-03 03:40:14', 'December', '2024'),
(6, 'jahangir', 1721088526, '10', '2024-12-06 03:10:51', 'December', '2024');

-- --------------------------------------------------------

--
-- Table structure for table `Dec_2025`
--

CREATE TABLE `Dec_2025` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Dec_2025`
--

INSERT INTO `Dec_2025` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Johora lucky', '1683032413', '10,11,12,13,14', 'December', 2025),
(2, 'Monna', '1521333206', '1,2,3,4,5,6,7,8,9', 'December', 2025),
(3, 'Kaniz fatima', '1770755040', '15,16,17,18', 'December', 2025),
(4, 'Manik', '1683032411', '19,20,21', 'December', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `Feb_2025`
--

CREATE TABLE `Feb_2025` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Feb_2025`
--

INSERT INTO `Feb_2025` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Rony', '1687373678', '21,22,23,24,25,26,27,28,29,30', 'February', 2025),
(2, 'Manik', '1683032411', '1,2,3,4', 'February', 2025),
(3, 'Ayshe', '1863818489', '19,20', 'February', 2025),
(4, 'Appi', '1770755040', '5,6,7,8,9', 'February', 2025),
(5, 'Ayshe', '0186381848', '18', 'February', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `Feb_2026`
--

CREATE TABLE `Feb_2026` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Feb_2026`
--

INSERT INTO `Feb_2026` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Johora lucky', '1683032413', '20,21,22,23,24', 'February', 2026),
(2, 'Kaniz fatima', '1770755040', '1,2,3,4', 'February', 2026),
(3, 'Monna', '1521333206', '5,6,7,8,9,10,11,12,13,14', 'February', 2026),
(4, 'Manik', '1683032411', '15,16,17', 'February', 2026),
(5, 'Rony', '1687373678', '25,26,27,28,29,30', 'February', 2026),
(6, 'Sadia Sultana Mim', '1759287477', '18,19', 'February', 2026);

-- --------------------------------------------------------

--
-- Table structure for table `Jan_2025`
--

CREATE TABLE `Jan_2025` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Jan_2025`
--

INSERT INTO `Jan_2025` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Rony', '1687373678', '11,12,13,14,15,16,17,18,19,20', 'January', 2025),
(2, 'Din islam', '1683032411', '28,29,30', 'January', 2025),
(3, 'Johora lucky', '1683032413', '23,24,25,26,27', 'January', 2025),
(4, 'Ayshe', '1863818489', '21,22', 'January', 2025),
(5, 'DIN MOHAMMAD', '1999996789', '1', 'January', 2025),
(6, 'Jahangir', '1721088526', '10', 'January', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `Jan_2026`
--

CREATE TABLE `Jan_2026` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Jan_2026`
--

INSERT INTO `Jan_2026` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Rony', '1687373678', '1,2,3,4,5,6,7,8', 'January', 2026);

-- --------------------------------------------------------

--
-- Table structure for table `Jul_2025`
--

CREATE TABLE `Jul_2025` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Jul_2025`
--

INSERT INTO `Jul_2025` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Rony', '1687373678', '22,23,24,25,26,27,28,29,30', 'July', 2025),
(2, 'Johora lucky', '1683032413', '1,2,3,4,5', 'July', 2025),
(3, 'Manik', '1683032411', '6,7,8', 'July', 2025),
(4, 'Kanig Fatama', '1770755040', '9,10,11,12,13', 'July', 2025),
(5, 'Ayshe', '1863818489', '14,15', 'July', 2025),
(6, 'Monna', '1521333206', '16,17,18,19,20', 'July', 2025),
(7, 'Sadia Sultana Mim', '1759287477', '21', 'July', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `Jun_2025`
--

CREATE TABLE `Jun_2025` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Jun_2025`
--

INSERT INTO `Jun_2025` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Sadia Sultana Mim', '1759287477', '1', 'June', 2025),
(2, 'Rony', '1687373678', '2,3,4,5,6,7,8,9,10,11,12,13,14,15', 'June', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `Mar_2025`
--

CREATE TABLE `Mar_2025` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Mar_2025`
--

INSERT INTO `Mar_2025` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Rony', '1687373678', '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15', 'March', 2025),
(2, 'Manik', '1683032411', '16,17,18,19,20', 'March', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `Mar_2026`
--

CREATE TABLE `Mar_2026` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Mar_2026`
--

INSERT INTO `Mar_2026` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Rony', '1687373678', '1,2,3,4,5,6,7,8,9,10', 'March', 2026),
(2, 'Manik', '1683032411', '11,12,13', 'March', 2026),
(3, 'Monna', '1521333206', '20,21,22,23,24,25,26,27,28,29,30', 'March', 2026),
(4, 'Kaniz fatima', '1770755040', '17,18,19', 'March', 2026),
(5, 'Johora lucky', '1683032413', '14,15,16', 'March', 2026);

-- --------------------------------------------------------

--
-- Table structure for table `May_2025`
--

CREATE TABLE `May_2025` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `May_2025`
--

INSERT INTO `May_2025` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Rony', '1687373678', '16,17,18,19,20,21,22,23,24,25,26,27,28,29,30', 'May', 2025),
(2, 'Johora lucky', '1683032413', '1,2,3,4,5,6,7,8', 'May', 2025),
(3, 'Ruma', '1770755040', '9,10,11,12,13', 'May', 2025),
(4, 'Manik', '1683032411', '14,15', 'May', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `May_2026`
--

CREATE TABLE `May_2026` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `May_2026`
--

INSERT INTO `May_2026` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Manik', '1683032411', '1,2,3', 'May', 2026),
(2, 'Monna', '1521333206', '4,5,6,7,8,9,10,11,12,13', 'May', 2026),
(3, 'Kaniz fatima', '1770755040', '14,15,16', 'May', 2026),
(4, 'Johora lucky', '1683032413', '17,18,19,20', 'May', 2026),
(5, 'Rony', '1687373678', '21,22,23,24,25,26,27,28,29', 'May', 2026),
(6, 'Sadia Sultana Mim', '1759287477', '30', 'May', 2026);

-- --------------------------------------------------------

--
-- Table structure for table `Nov_2025`
--

CREATE TABLE `Nov_2025` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Nov_2025`
--

INSERT INTO `Nov_2025` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Johora lucky', '1683032413', '1,2,3,4,5', 'November', 2025),
(2, 'Kaniz fatima', '1770755040', '6,7,8,9,10', 'November', 2025),
(3, 'Monna', '1521333206', '11,12,13,14,15,16,17,18,19,20', 'November', 2025),
(4, 'Manik', '1683032411', '21,22,23', 'November', 2025),
(5, 'Rony', '1687373678', '25,26,27,28,29,30', 'November', 2025),
(6, 'Sadia Sultana Mim', '1759287477', '24', 'November', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `Oct_2025`
--

CREATE TABLE `Oct_2025` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Oct_2025`
--

INSERT INTO `Oct_2025` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Rony', '1687373678', '22,23,24,25,26,27,28,29,30', 'October', 2025),
(2, 'Sadia Sultana mim', '1759287477', '21', 'October', 2025),
(3, 'Johora lucky', '1683032413', '16,17,18,19,20', 'October', 2025),
(4, 'Manik', '1683032411', '4,5,6', 'October', 2025),
(5, 'Ruma', '1770755040', '1,2,3', 'October', 2025),
(6, 'Monna', '1521333206', '7,8,9,10,11,12,13,14', 'October', 2025),
(7, 'Ayshe', '1863818489', '15', 'October', 2025);

-- --------------------------------------------------------

--
-- Table structure for table `Sep_2025`
--

CREATE TABLE `Sep_2025` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `assigned_paras` text NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Sep_2025`
--

INSERT INTO `Sep_2025` (`id`, `name`, `phone`, `assigned_paras`, `month`, `year`) VALUES
(1, 'Manik', '0168303241', '1,2,3,4', 'September', 2025),
(2, 'Johora lucky', '1683032413', '16,17,18,19,20', 'September', 2025),
(3, 'Rony', '1687373678', '5,6,7,8,9,10,11,12,13,14', 'September', 2025),
(4, 'Sadia Sultana Mim', '1759287477', '15', 'September', 2025),
(5, 'Kaniz fatima', '1770755040', '21,22,23,24', 'September', 2025),
(6, 'Monna', '1521333206', '25,26,27,28,29,30', 'September', 2025);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Apr_2025`
--
ALTER TABLE `Apr_2025`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Apr_2026`
--
ALTER TABLE `Apr_2026`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Aug_2025`
--
ALTER TABLE `Aug_2025`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dec_2024`
--
ALTER TABLE `dec_2024`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `Dec_2025`
--
ALTER TABLE `Dec_2025`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Feb_2025`
--
ALTER TABLE `Feb_2025`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Feb_2026`
--
ALTER TABLE `Feb_2026`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Jan_2025`
--
ALTER TABLE `Jan_2025`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Jan_2026`
--
ALTER TABLE `Jan_2026`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Jul_2025`
--
ALTER TABLE `Jul_2025`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Jun_2025`
--
ALTER TABLE `Jun_2025`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Mar_2025`
--
ALTER TABLE `Mar_2025`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Mar_2026`
--
ALTER TABLE `Mar_2026`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `May_2025`
--
ALTER TABLE `May_2025`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `May_2026`
--
ALTER TABLE `May_2026`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Nov_2025`
--
ALTER TABLE `Nov_2025`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Oct_2025`
--
ALTER TABLE `Oct_2025`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Sep_2025`
--
ALTER TABLE `Sep_2025`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Apr_2025`
--
ALTER TABLE `Apr_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Apr_2026`
--
ALTER TABLE `Apr_2026`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Aug_2025`
--
ALTER TABLE `Aug_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `dec_2024`
--
ALTER TABLE `dec_2024`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `Dec_2025`
--
ALTER TABLE `Dec_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Feb_2025`
--
ALTER TABLE `Feb_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Feb_2026`
--
ALTER TABLE `Feb_2026`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Jan_2025`
--
ALTER TABLE `Jan_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Jan_2026`
--
ALTER TABLE `Jan_2026`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Jul_2025`
--
ALTER TABLE `Jul_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Jun_2025`
--
ALTER TABLE `Jun_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Mar_2025`
--
ALTER TABLE `Mar_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Mar_2026`
--
ALTER TABLE `Mar_2026`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `May_2025`
--
ALTER TABLE `May_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `May_2026`
--
ALTER TABLE `May_2026`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Nov_2025`
--
ALTER TABLE `Nov_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Oct_2025`
--
ALTER TABLE `Oct_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Sep_2025`
--
ALTER TABLE `Sep_2025`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
