-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-08-2024 a las 01:37:00
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cvboost_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cvs`
--

CREATE TABLE `cvs` (
  `id` int(11) NOT NULL,
  `template_name` varchar(255) NOT NULL,
  `color` varchar(7) DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cvs`
--

INSERT INTO `cvs` (`id`, `template_name`, `color`, `file_path`, `created_at`, `updated_at`) VALUES
(1, 'CurriculumV', '#17a2b8', 'src\\components\\common\\PlantillasCV\\CurriculumV.jsx', '2024-08-09 13:37:26', '2024-08-09 13:37:26'),
(2, 'CurriculumV2', '#17a2b8', 'src\\components\\common\\PlantillasCV\\CurriculumV2.jsx', '2024-08-09 13:37:26', '2024-08-09 13:37:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cvuser`
--

CREATE TABLE `cvuser` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `cv_id` int(11) DEFAULT NULL,
  `template_name` varchar(255) DEFAULT NULL,
  `color` varchar(7) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cvuser`
--

INSERT INTO `cvuser` (`id`, `user_id`, `cv_id`, `template_name`, `color`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'CurriculumV2', '#28a745', '2024-08-11 20:55:11', '2024-08-11 20:55:11'),
(2, 1, 1, 'CurriculumV', '#17a2b8', '2024-08-12 17:13:41', '2024-08-12 17:13:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `termsandconditions`
--

CREATE TABLE `termsandconditions` (
  `id` int(11) NOT NULL,
  `version` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `effective_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `terms_state` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `termsandconditions`
--

INSERT INTO `termsandconditions` (`id`, `version`, `content`, `effective_date`, `created_at`, `terms_state`) VALUES
(1, '1.0', 'Estos Términos y Condiciones rigen el uso de este sitio web y sus servicios. Al acceder y utilizar este sitio web, usted acepta cumplir con estos términos. Nos reservamos el derecho de modificar estos términos en cualquier momento sin previo aviso. Las modificaciones entrarán en vigor tan pronto como se publiquen en el sitio web. El uso continuo del sitio después de tales modificaciones constituirá su aceptación de los nuevos términos. Usted es responsable de revisar periódicamente los términos para estar al tanto de cualquier cambio. Este sitio web y sus servicios se proporcionan \"tal cual\" y sin garantías de ningún tipo, ya sean explícitas o implícitas. No garantizamos que el sitio web estará disponible en todo momento o que estará libre de errores.', '2024-08-08', '2024-08-08 06:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usereducation`
--

CREATE TABLE `usereducation` (
  `id` int(11) NOT NULL,
  `cvid_user_template` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `school` varchar(255) DEFAULT NULL,
  `city_school` varchar(255) DEFAULT NULL,
  `certification` varchar(255) DEFAULT NULL,
  `field_of_study` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `currently_studying` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usereducation`
--

INSERT INTO `usereducation` (`id`, `cvid_user_template`, `user_id`, `school`, `city_school`, `certification`, `field_of_study`, `start_date`, `end_date`, `currently_studying`) VALUES
(1, 2, 1, 'Universidad Técnológica de Puebla', 'Puebla', 'Técnico Superior Universitario', 'Desarrollo de Software Multiplataforma', '2021-09-06', '2023-08-17', 0),
(4, 2, 1, 'Universidad Tecnológica de Puebla', 'Puebla', 'Ingeniería', 'Desarrolo y gestión del Software', '2023-09-04', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userinformation`
--

CREATE TABLE `userinformation` (
  `id` int(11) NOT NULL,
  `cvid_user_template` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(80) NOT NULL,
  `city` varchar(50) DEFAULT NULL,
  `municipality` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `colony` varchar(50) DEFAULT NULL,
  `postal_code` int(11) DEFAULT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `photo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `userinformation`
--

INSERT INTO `userinformation` (`id`, `cvid_user_template`, `id_user`, `name`, `surname`, `city`, `municipality`, `address`, `colony`, `postal_code`, `phone`, `email`, `photo`) VALUES
(1, 1, 1, 'Jorge Iván', 'Hernández Velázquez', 'Heroica Puebla de Zaragoza', 'Puebla', 'Privada 46 norte', 'Agricola Resurgimiento', 72370, '2222713922', 'ivannhdz03@gmail.com', 'JorgeIvánHernándezVelázquez_219680cfe2604078b33b8f75736ea4aa.jpeg'),
(2, 2, 1, 'Jorge Iván', 'Hernández Velázquez', 'Puebla', 'Ouebla', 'Privada 46 norte', 'Agricola Resurgimiento', 72340, '2222713922', 'ivannhdz03@gmail.com', 'JorgeIvánHernándezVelázquez_a20d96eff59c420f829b032fcc66e7f4.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `tipo` varchar(15) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `tipo`, `created_at`) VALUES
(1, 'utp0151511@alumno.utpuebla.edu.mx', '$2b$12$.TS82AZ5BhyuPDRee.hMWuBWRGV5rws/U4rpGN7TCl/Rm49QPZm4W', 'Jorge Iván Hernández Velázquez', 'Usuario', '2024-08-09 07:42:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userterms`
--

CREATE TABLE `userterms` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `terms_id` int(11) NOT NULL,
  `accepted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `userterms`
--

INSERT INTO `userterms` (`id`, `user_id`, `terms_id`, `accepted_at`) VALUES
(1, 1, 1, '2024-08-09 07:48:38');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cvs`
--
ALTER TABLE `cvs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cvuser`
--
ALTER TABLE `cvuser`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `cv_id` (`cv_id`);

--
-- Indices de la tabla `termsandconditions`
--
ALTER TABLE `termsandconditions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usereducation`
--
ALTER TABLE `usereducation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cvid_user_template` (`cvid_user_template`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `userinformation`
--
ALTER TABLE `userinformation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cvid_user_template` (`cvid_user_template`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `userterms`
--
ALTER TABLE `userterms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `terms_id` (`terms_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cvs`
--
ALTER TABLE `cvs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cvuser`
--
ALTER TABLE `cvuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `termsandconditions`
--
ALTER TABLE `termsandconditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usereducation`
--
ALTER TABLE `usereducation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `userinformation`
--
ALTER TABLE `userinformation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `userterms`
--
ALTER TABLE `userterms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cvuser`
--
ALTER TABLE `cvuser`
  ADD CONSTRAINT `cvuser_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cvuser_ibfk_2` FOREIGN KEY (`cv_id`) REFERENCES `cvs` (`id`);

--
-- Filtros para la tabla `usereducation`
--
ALTER TABLE `usereducation`
  ADD CONSTRAINT `usereducation_ibfk_1` FOREIGN KEY (`cvid_user_template`) REFERENCES `cvuser` (`id`),
  ADD CONSTRAINT `usereducation_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `userinformation`
--
ALTER TABLE `userinformation`
  ADD CONSTRAINT `userinformation_ibfk_1` FOREIGN KEY (`cvid_user_template`) REFERENCES `cvuser` (`id`),
  ADD CONSTRAINT `userinformation_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `userterms`
--
ALTER TABLE `userterms`
  ADD CONSTRAINT `userterms_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `userterms_ibfk_2` FOREIGN KEY (`terms_id`) REFERENCES `termsandconditions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
