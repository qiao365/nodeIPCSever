var Sequelize = require('sequelize');
const KEYS = require("../models/oauth2.model").KEYS;

var sequelize = new Sequelize('ubcbag', 'ubcbag', 'ubcbag', {
    host:"localhost",
    logging: true,
    define: {
        freezeTableName: true,
        underscored: true

    },
    dialect:'postgres'
});

var bluebird = require('bluebird');
var redisdb = require('redis');
var redis = redisdb.createClient();
bluebird.promisifyAll(redisdb.RedisClient.prototype);
bluebird.promisifyAll(redisdb.Multi.prototype);
/**
//如果时区不正确，则需要放开
require('pg').types.setTypeParser(1114, stringValue => {
    return new Date(stringValue + "+0000");
    // e.g., UTC offset. Use any offset that you would like.
});
 **/
/**
初始化数据
**/
const APP= "UBCBag";
redis.hmset(`${KEYS.client}${APP}`,{
    clientId:'ubcbag',
    clientSecret:'d2lmaWN1cnJlb'
    
});
let grantKeys = `${KEYS.client}${APP}${KEYS.grantTypes}`;
redis.sadd(grantKeys, "password");
redis.sadd(grantKeys, "refresh_token");


exports.sequelize = sequelize;
exports.Sequelize = Sequelize;
exports.redis = redis;
