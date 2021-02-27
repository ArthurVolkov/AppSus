import { storageService } from '../../services/async-storage-service.js'

const DB_KEY = 'keeps'
const gKeeps = _createKeeps();

export const keepService = {
    query,
    queryPinned,
    queryNotPinned,
    remove,
    save,
    update,
    getEmptyKeep,
    getById,
    getNextId,
    getPrevId
}

function query() {
    return storageService.query(DB_KEY)
}

function queryPinned() {
    return storageService.query(DB_KEY)
    .then (res=>{ 
        return res.filter(keep => {
        if (keep.isPinned) return keep 
        })
    })
}

function queryNotPinned() {
    return storageService.query(DB_KEY)
    .then (res=>{ 
        return res.filter(keep => {
        if (!keep.isPinned) return keep 
        })
    })
}

function remove(keepId) {
  return storageService.remove(DB_KEY, keepId)
}

function getNextId(keepId){
  return storageService.getNextId(DB_KEY, keepId)
}

function getPrevId(keepId){
  return storageService.getPrevId(DB_KEY, keepId)
}

function save(keep) {
    return storageService.post(DB_KEY, keep)
}

function update(keep) {
    return storageService.put(DB_KEY,keep);
}

function getEmptyKeep() {
    return {
        id: null,
        type: "noteTxt",
        isPinned: false,
        info: {
            txts: [{txt:'',doneAt: null},
                   {txt:'',doneAt: null}],
        url: null,
        },
        style: {
            backgroundColor: ''
        },
        isTodo: false
    }
}

function getById(id) {
  return storageService.get(DB_KEY, id)
}

function _createKeeps() {
    storageService.query(DB_KEY)
    .then (keeps => {
        if (!keeps || !keeps.length) {
            keeps = initData();
            storageService.postMany(DB_KEY,keeps)
        }
        return keeps;
    })
}

function initData() {
    var keepsList =
    [
       {
            id: '101',
            type: "noteTxt",
            isPinned: true,
            info: {
                txts: [{ txt: "what can i do!", doneAt: null},
                       { txt: "im eddicted to you", doneAt: null}],
                url: null,
            },
            style: {
                backgroundColor: 'purple'
            },
            isTodo: false
        },
        {
            id: '102',
            type: "noteTodos",
            isPinned: true,
            info: {
                txts: [
                        { txt: "go to shop", doneAt: 187111111 },
                        { txt: "Do this", doneAt: null },
                        { txt: "Do that", doneAt: null },
                        { txt: "go home", doneAt: null }],
                url: null,
            },
            style: {
                backgroundColor: "pink"
            },
            isTodo: true
        },
        {
            id: '103',
            type: "noteImg",
            isPinned: false,
            info: {
                txts: [{ txt: "Fullstack Me Baby!", doneAt: null}],
                url: "https://picsum.photos/200/300",
            },
            style: {
                backgroundColor: "blue"
            },
            isTodo: true
        },
        {
            id: '104',
            type: "noteImg",
            isPinned: true,
            info: {
                txts: [{ txt: "hit me baby", doneAt: null},
                       { txt: "on more time", doneAt: null}],
                url: "https://picsum.photos/200/300",
            },
            style: {
                backgroundColor: "yellow"
            },
            isTodo: true
        },
        {
            id: '105',
            type: "noteTxt",
            isPinned: false,
            info: {
                txts: [{ txt: "sprint 3", doneAt: null},
                       { txt: "go to sleep", doneAt: null}],
                url: null,
            },
            style: {
                backgroundColor: 'grey'
            },
            isTodo: false
        },
        {
            id: '106',
            type: "noteImg",
            isPinned: false,
            info: {
                txts: [{ txt: "Fullstack Me Baby!", doneAt: null},
                       { txt: "hey Me Baby!", doneAt: null}],
                url: "https://picsum.photos/200/300",
            },
            style: {
                backgroundColor: "blue"
            },
            isTodo: true
        },
        {
            id: '107',
            type: "noteTodos",
            isPinned: true,
            info: {
                txts: [
                        { txt: "keep", doneAt: 187111111 },
                        { txt: "mail", doneAt: null },
                        { txt: "mail", doneAt: null }],
                url: null,
            },
            style: {
                backgroundColor: ''
            },
            isTodo: true
        },
        {
            id: '108',
            type: "noteImg",
            isPinned: true,
            info: {
                txts: [{ txt: "this is a very", doneAt: null},
                       { txt: "nice picture", doneAt: null}],
                url: "https://picsum.photos/200/300",
            },
            style: {
                backgroundColor: "blue"
            },
            isTodo: true
        },
        {
            id: '109',
            type: "noteTxt",
            isPinned: true,
            info: {
                txts: [{ txt: "I love JS", doneAt: null}],
                url: null,
            },
            style: {
                backgroundColor: ''
            },
            isTodo: false
        },
            {
            id: '110',
            type: "noteImg",
            isPinned: false,
            info: {
                txts: [{ txt: "there is something", doneAt: null},
                       { txt: "i dont know why", doneAt: null}],
                url: "https://picsum.photos/200/300",
            },
            style: {
                backgroundColor: "pink"
            },
            isTodo: false
        },
        {
            id: '111',
            type: "noteImg",
            isPinned: false,
            info: {
                txts: [{ txt: "Vue is the king", doneAt: null},
                       { txt: "or not!!", doneAt: null}],
                url: "https://picsum.photos/200/300",
            },
            style: {
                backgroundColor: "blue"
            },
            isTodo: true
        },
              {
            id: '112',
            type: "noteTxt",
            isPinned: true,
            info: {
                txts: [{ txt: "see at sprint 4", doneAt: null},
                       { txt: "and go to work", doneAt: null}],
                url: null,
            },
            style: {
                backgroundColor: 'red'
            },
            isTodo: false
        },
    ]
    return keepsList;
}
