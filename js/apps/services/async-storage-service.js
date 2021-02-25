export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
    getNextId,
    getPrevId
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities);
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity.id === entityId))
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity.id === entityId);
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function getNextId(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            var idx = entities.findIndex(entity => entity.id === entityId)
            if (idx === entities.length - 1) var nextIdx = 0;
            else nextIdx = idx+1;
            return entities[nextIdx].id;
        })
}

function getPrevId(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            var idx = entities.findIndex(entity => entity.id === entityId)
            if (idx === 0) var prevIdx = entities.length-1;
            else prevIdx = idx-1;
            return entities[prevIdx].id;
        })
}

function post(entityType, newEntity) {
    newEntity.id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.unshift(newEntity);
            _save(entityType, entities)
            return newEntity;
        })
}

function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {
            entities.push(...newEntities);
            _save(entityType, entities)
            return entities;
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity.id === updatedEntity.id);
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity;
        })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 12) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}