import { storageService } from '../../services/async-storage-service.js'

const DB_KEY = 'keeps'
const gKeeps = _createKeeps();

export const keepService = {
    query,
    remove,
    save,
    getEmptyKeep,
    getById,
    getNextId,
    getPrevId
}

function query() {
    return storageService.query(DB_KEY)
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

function getEmptyKeep() {
    return {
        "id": '',
        "type": '',
        "isPinned": false,
        "info": {"txt": ''}
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
            type: "noteTxt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        // {
        //     type: "NoteImg",
        //     info: {
        //         url: "http://some-img/me",
        //         title: "Me playing Mi"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        {
            type: "noteTodos",
            info: {
                label: "How was it:",
                todos: [
                        { txt: "Do that", doneAt: null },
                        { txt: "Do this", doneAt: 187111111 }]
            }
        }
    ]
    return keepsList;
}
