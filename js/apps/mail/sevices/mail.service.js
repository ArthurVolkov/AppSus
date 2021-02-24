import { storageService } from '../../services/async-storage-service.js'

const DB_KEY = 'mailsDB'
_createMails();

export const mailService = {
    query,
    remove,
    save,
    getEmptyMail,
    getById,
    getNextId,
    getPrevId,
    getChainById
}

function query() {

    return storageService.query(DB_KEY)

}

function remove(mailId) {
    return storageService.remove(DB_KEY, mailId)
}

function getNextId(mailId) {
    return storageService.getNextId(DB_KEY, mailId)
}

function getPrevId(mailId) {
    return storageService.getPrevId(DB_KEY, mailId)
}

function save(mail) {
    return storageService.post(DB_KEY, mail)
}

function getEmptyMail() {
    return {
        'subject': '',
        'mailAddress': '',
        'body': '',
        'isRead': false,
        'isImporant': false,
        'isIncoming': false,
        'sentAt': null
    }
}

function getById(id) {
    return storageService.get(DB_KEY, id)
}

function getChainById(id) {
    return getById(id)
        .then(mail => {
            return storageService.query(DB_KEY)
                .then(mails => {
                    return mails.filter(currMail => {
                        return currMail.subject === mail.subject && currMail.mailAddress === mail.mailAddress
                    })
                })
        })
}

function _createMails() {
    return storageService.query(DB_KEY)
        .then(mails => {
            if (!mails || !mails.length) {
                mails = initData();
                storageService.postMany(DB_KEY, mails)
            }
            return mails;
        })
}


function initData() {
    var mailsList =
        [
            {
                'id': '11111',
                'subject': 'hello1',
                'mailAddress': 'leumi@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isRead': false,
            },
            {
                'id': '22222',
                'subject': 'hello1',
                'mailAddress': 'leumi@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isRead': false,
            },
            {
                'id': '33333',
                'subject': 'hello1',
                'mailAddress': 'leumi@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isRead': false,
            },
            {
                'id': '44444',
                'subject': 'hello1',
                'mailAddress': 'leumi@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isRead': false,
            },
            {
                'id': '55555',
                'subject': 'hello1',
                'mailAddress': 'leumi@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isRead': false,
            },

        ]
    return mailsList;
}
