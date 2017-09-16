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
  return db.runSql("CREATE TABLE `session` (\
    `token` varchar(255) DEFAULT NULL,\
    `user` int(11) DEFAULT NULL,\
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,\
    `createdAt` datetime DEFAULT NULL,\
    `updatedAt` datetime DEFAULT NULL,\
    PRIMARY KEY (`id`),\
    UNIQUE KEY `token` (`token`)\
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
};

exports.down = function(db) {
  return db.runSql("DROP TABLE `session`");
};

exports._meta = {
  "version": 1
};
