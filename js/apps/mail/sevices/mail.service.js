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
    update,
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
    return Promise.resolve({
        'subject': '',
        'mailAddress': '',
        'body': '',
        'isReaded': false,
        'isImporant': false,
        'isIncoming': false,
        'sentAt': null
    })
}

function getById(id) {
    return storageService.get(DB_KEY, id)
}

function update(mail) {
    return storageService.put(DB_KEY, mail)
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
                'subject': 'account deleting',
                'mailAddress': 'gmail@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*5

            },
            {
                'id': '22222',
                'subject': 'account information',
                'mailAddress': 'gmail@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': false,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*2

            },
            {
                'id': '33333',
                'subject': 'mas ahnasa',
                'mailAddress': 'misim@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': false,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*8
            },
            {
                'id': '44444',
                'subject': 'from bank',
                'mailAddress': 'leumi@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': false,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*15
            },
            {
                'id': '55555',
                'subject': 'new jobs for you',
                'mailAddress': 'jobmaster@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': false,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*4
            },
            {
                'id': '66666',
                'subject': 'mas ahnasa',
                'mailAddress': 'misim@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*43
            },
            {
                'id': '77777',
                'subject': 'dropbox overloaded',
                'mailAddress': 'dropbox@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*13
            },
            {
                'id': '88888',
                'subject': 'have you started?',
                'mailAddress': 'webhost@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*6
            },
            {
                'id': '99999',
                'subject': 'account information',
                'mailAddress': 'gmail@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*74
            },
            {
                'id': '10101',
                'subject': 'have you started?',
                'mailAddress': 'webhost@gmail.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': false,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*18
            },

        ]
    return mailsList;
}
