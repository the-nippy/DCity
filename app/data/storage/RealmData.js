/**
 * 各个表类
 */


const NowCitySchema = {
    name: 'city',
    primaryKey: 'id',
    properties: {
        id:'int',
        cityName: 'string',
        cityId: 'string',
    }
}

//记录位置的表
const PositionSchema = {
    name: 'position',
    properties: {
        start: 'int',
        count: 'int',
        total: 'int',
        locs: {type: 'list', objectType: 'loc'},
    }
}

const LocSchema = {
    name: 'loc',
    properties: {
        parent: "string",
        id: "string",
        name: "string",
        uid: "string"
    }
}

//音乐表
const MusicSchema = {
    name: 'music',
    properties: {
        start: 'int',
        count: "int",
        total: 'int',
        events: {type: 'list', objectType: 'event'},
    }
}

//单个事件表
const EventSchema = {
    name: 'event',
    properties: {
        title: 'string',
        loc_name: 'string',
        price_range: 'string',
        wisher_count: 'int',
        participant_count: 'int',
        begin_time: 'string',
        end_time: 'string',
        address: 'string',
        image: 'string',
        has_ticket: 'bool',
        owner: 'owner',
        content: 'string'
    }
}

//用户数据表
const OwnerSchema = {
    name: 'owner',
    properties: {
        name: 'string',
        id: 'string',
        avatar: 'string',
        alt: 'string'
    }
}

//数据库版本管理
const RealmData = [{
    schema: [
        PositionSchema,
        LocSchema,
        MusicSchema,
        EventSchema,
        OwnerSchema,
        NowCitySchema,
    ],
    path: 'DCity.realm',
    schemaVersion: 1,
    //不写这个会在更新时出错
    migration: (oldRealm, newRealm) => {
    }

}];
export default RealmData;