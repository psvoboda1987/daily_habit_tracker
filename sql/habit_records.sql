-- Adminer 4.7.3 MySQL dump
SET
    NAMES utf8;

SET
    time_zone = '+00:00';

SET
    foreign_key_checks = 0;

SET
    sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

USE `test`;

CREATE TABLE `habit_record` (
    `record_id` int(11) NOT NULL AUTO_INCREMENT,
    `date` date NOT NULL,
    `habit_1` tinyint(1) NOT NULL,
    `habit_2` tinyint(1) NOT NULL,
    `habit_3` tinyint(1) NOT NULL,
    PRIMARY KEY (`record_id`),
    UNIQUE KEY `date` (`date`)
) ENGINE = MyISAM AUTO_INCREMENT = 79 DEFAULT CHARSET = utf8;

-- 2019-10-02 09:47:43