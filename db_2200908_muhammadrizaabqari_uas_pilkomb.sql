-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2024 at 03:10 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2200908_muhammadrizaabqari_uas_pilkomb`
--

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_keuangan_riza`
--

CREATE TABLE `transaksi_keuangan_riza` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL,
  `status` enum('debit','kredit') DEFAULT NULL,
  `receiver` varchar(50) DEFAULT NULL,
  `jk` enum('L','P') DEFAULT NULL,
  `no_telp` varchar(13) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi_keuangan_riza`
--

INSERT INTO `transaksi_keuangan_riza` (`id`, `date`, `description`, `amount`, `status`, `receiver`, `jk`, `no_telp`, `address`) VALUES
(1, '2024-01-01', 'Sewa Lab Umum', 100000, 'debit', 'Dara', 'P', '08111222333', 'UPI'),
(2, '2024-01-02', 'Sewa Lab Praktikum', 100000, 'debit', 'Naura', 'P', '08333444555', 'UPI'),
(3, '2024-01-03', 'Sewa Amphitheater', 1000000, 'kredit', 'Azka', 'L', '08555666777', 'UPI'),
(4, '2024-01-04', 'Sewa Ruangan Kelas', 100000, 'kredit', 'Zia', 'P', '08777888999', 'UPI'),
(5, '2024-01-05', 'Pembelian Snack', 50000, 'debit', 'Naufal', 'L', '08999000111', 'Geger Kalong');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transaksi_keuangan_riza`
--
ALTER TABLE `transaksi_keuangan_riza`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaksi_keuangan_riza`
--
ALTER TABLE `transaksi_keuangan_riza`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
