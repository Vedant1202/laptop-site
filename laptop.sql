-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2019 at 12:16 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laptop`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `pid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `display` float NOT NULL,
  `storage` int(11) NOT NULL,
  `ram` int(11) NOT NULL,
  `os` varchar(255) NOT NULL,
  `warranty` int(11) NOT NULL,
  `price` bigint(20) NOT NULL,
  `imgname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pid`, `name`, `display`, `storage`, `ram`, `os`, `warranty`, `price`, `imgname`) VALUES
(2, 'Lenovo Ideapad', 15.6, 1, 8, 'Windows 10', 1, 73000, 'lenovo.jpeg'),
(3, 'Apple MacBook', 13.3, 2, 8, 'Mac', 1, 63000, 'mac.jpg'),
(4, 'Asus ROG Strix G', 15.6, 1, 8, 'Windows 10', 1, 60000, 'asus.jpeg'),
(5, 'Dell XPS', 13, 3, 8, 'Windows 10', 2, 90000, 'dell-na-original-imafkcr9hx7hpjus.jpeg'),
(6, 'HP Envy', 13, 3, 8, 'Linux', 2, 80000, 'hp-na-2-in-1-laptop-original-imafany65hm2hnvg.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `username`, `password`, `fname`, `lname`) VALUES
(11, 'Rishi40', '$2y$10$uoWQNx2wbfJ5im/WW6ofHO6AWV9MYYuZU5MIqQiR71MpZl4SF/ibS', 'Rishi', 'Pandya');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
