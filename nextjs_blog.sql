/*
Navicat MySQL Data Transfer

Source Server         : Localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : nextjs_blog

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2023-12-04 14:33:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', 'Natural');
INSERT INTO `category` VALUES ('2', 'Social');

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `content` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_id` int(5) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('3', '<h2>dfdsfd fsdfdsfds sdfdsf</h2>', 'dfdfd wwwww', '2');
INSERT INTO `post` VALUES ('4', '<p>tuan test aaaa</p>', '123 456', '1');
INSERT INTO `post` VALUES ('5', '<h1>Bopbi lop</h1>', 'Tam Mao Su Vuong', '2');
INSERT INTO `post` VALUES ('6', '<p>Baml Monlp Tepop</p>', 'Plao Mop kaoq', '2');
INSERT INTO `post` VALUES ('7', '<p>gaol nuaond kol</p>', 'Baro laps mao', '1');
INSERT INTO `post` VALUES ('8', '<p>hello world</p>', 'Gao lals Feml', '2');
INSERT INTO `post` VALUES ('9', '<p>Halo, bros are handsome</p>', 'Happy Day for Men', '1');
INSERT INTO `post` VALUES ('11', '<p>change <u>basic</u></p>', 'What Basic name', '1');
INSERT INTO `post` VALUES ('12', '<p>Name basic</p>', 'Valop Acmn', '2');
INSERT INTO `post` VALUES ('13', '<p><em>Everybody </em>say hi !!! <strong>Yeahhhh.</strong></p>', 'Hinote for everybody 12', '2');
INSERT INTO `post` VALUES ('16', '<p>Cam vo cos soado dosp</p>', 'Constructor Alosdo', '2');
INSERT INTO `post` VALUES ('17', '<p>Body Weight</p>', 'Hamster Mouse', '1');
INSERT INTO `post` VALUES ('18', '<p>Soap Opera Bandwith <u>ddf</u></p>', 'Barodfd Astronauts', '2');
