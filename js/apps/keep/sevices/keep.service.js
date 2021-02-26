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

function getNextId(keepId) {
    return storageService.getNextId(DB_KEY, keepId)
}

function getPrevId(keepId) {
    return storageService.getPrevId(DB_KEY, keepId)
}

function save(keep) {
    return storageService.post(DB_KEY, keep)
}

function getEmptyKeep() {
    return {
        type: "noteTxt",
        isPinned: false,
        info: {
            label: '',
            txts: [],
            url: null,
            title: ''
        },
        style: {
            backgroundColor: ''
        }
    }
}

function getById(id) {
    return storageService.get(DB_KEY, id)
}

function _createKeeps() {
    storageService.query(DB_KEY)
        .then(keeps => {
            if (!keeps || !keeps.length) {
                keeps = initData();
                storageService.postMany(DB_KEY, keeps)
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
                    label: "here i am",
                    txts: [{ txt: "Fullstack Me Baby!", doneAt: null },
                    { txt: "hey Me Baby!", doneAt: null }],
                    url: null,
                    title: ''
                },
                style: {
                    backgroundColor: ''
                }
            },
            {
                id: '102',
                type: "noteTodos",
                info: {
                    label: "How was it:",
                    txts: [
                        { txt: "Do that", doneAt: null },
                        { txt: "Do this", doneAt: 187111111 }]
                }
            },
            {
                id: '103',
                type: "noteImg",
                isPinned: false,
                info: {
                    label: "here i am",
                    txts: [{ txt: "Fullstack Me Baby!", doneAt: null },
                    { txt: "hey Me Baby!", doneAt: null }],
                    url: "https://robohash.org/arthur.png",
                    title: "Me playing Mi"
                },
                style: {
                    backgroundColor: "blue"
                }
            },
            {
                id: '104',
                type: "noteImg",
                isPinned: false,
                info: {
                    label: "here i am",
                    txts: [{ txt: "Fullstack Me Baby!", doneAt: null },
                    { txt: "hey Me Baby!", doneAt: null }],
                    url: "https://robohash.org/itzik.png",
                    title: "Me playing Mi"
                },
                style: {
                    backgroundColor: "yellow"
                }
            },
            {
                id: '105',
                type: "noteTxt",
                isPinned: true,
                info: {
                    label: "here i am",
                    txts: [{ txt: "Fullstack Me Baby!", doneAt: null },
                    { txt: "hey Me Baby!", doneAt: null }],
                    url: null,
                    title: ''
                },
                style: {
                    backgroundColor: ''
                }
            },
            {
                id: '106',
                type: "noteTodos",
                info: {
                    label: "How was it:",
                    txts: [
                        { txt: "Do that", doneAt: null },
                        { txt: "Do this", doneAt: 187111111 }]
                }
            },
            {
                id: '107',
                type: "noteImg",
                isPinned: false,
                info: {
                    label: "here i am",
                    txts: [{ txt: "Fullstack Me Baby!", doneAt: null },
                    { txt: "hey Me Baby!", doneAt: null }],
                    url: "https://robohash.org/arthur.png",
                    title: "Me playing Mi"
                },
                style: {
                    backgroundColor: "blue"
                }
            },
            {
                id: '108',
                type: "noteImg",
                isPinned: false,
                info: {
                    label: "here i am",
                    txts: [{ txt: "Fullstack Me Baby!", doneAt: null },
                    { txt: "hey Me Baby!", doneAt: null }],
                    url: "https://robohash.org/itzik.png",
                    title: "Me playing Mi"
                },
                style: {
                    backgroundColor: "yellow"
                }
            }
        ]
    return keepsList;
}
