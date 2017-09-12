'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql("CREATE TABLE `page` (\
    `title` varchar(255) DEFAULT NULL,\
    `summary` varchar(255) DEFAULT NULL,\
    `content` varchar(255) DEFAULT NULL,\
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
    `createdAt` datetime DEFAULT NULL,\
    `updatedAt` datetime DEFAULT NULL,\
    PRIMARY KEY (`id`),\
    KEY `title` (`title`)\
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
};

exports.down = function(db) {
  return db.runSql("DROP TABLE `page`");
};

exports._meta = {
  "version": 1
};
