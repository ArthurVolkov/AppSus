import { storageService } from '../../services/async-storage-service.js'

const DB_KEY = 'mails'
const gMails = _createMails();

export const mailService = {
    query,
    remove,
    save,
    getEmptyMail,
    getById,
    getNextId,
    getPrevId
}

function query(dbKey = null) {
    if (!dbKey) return storageService.query(DB_KEY)
    else return storageService.query(dbKey);
}

function remove(mailId) {
  return storageService.remove(DB_KEY, mailId)
}

function getNextId(mailId){
  return storageService.getNextId(DB_KEY, mailId)
}

function getPrevId(mailId){
  return storageService.getPrevId(DB_KEY, mailId)
}

function save(mail) {
    return storageService.post(DB_KEY, mail)
}

function getEmptyMail() {
    return {
        "id": '',
        "subject": '',
        "body": '',
        "isRead": false,
        "sentAt": null
      }
}

function getById(id) {
  return storageService.get(DB_KEY, id)
}

function _createMails() {
    storageService.query(DB_KEY)
    .then (mails => {
        if (!mails || !mails.length) {
            mails = initData();
            storageService.postMany(DB_KEY,mails)
        }
        return mails;
    })
}

function initData() {
    var mailsList =
    [
        {
            "id": '11111',
            "subject": 'hello1',
            "body": 'bla bla 1',
            "isRead": false,
            "sentAt": 0
        },
        {
            "id": '22222',
            "subject": 'hello2',
            "body": 'bla bla 2',
            "isRead": true,
            "sentAt": 0
        },
        {
            "id": '33333',
            "subject": 'hello3',
            "body": 'bla bla 3',
            "isRead": false,
            "sentAt": 0
        },
        {
            "id": '44444',
            "subject": 'hello4',
            "body": 'bla bla 4',
            "isRead": false,
            "sentAt": 0
        }
    ]
    return mailsList;
}
