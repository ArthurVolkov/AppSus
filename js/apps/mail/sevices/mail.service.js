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
                'id': '101',
                'subject': 'What you should know about our travel',
                'mailAddress': 'edna.henry@example.com',
                'body': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corporis deserunt, enim officia repudiandae dolorum ipsa. Incidunt quo iste, eius impedit debitis eos consequatur molestiae laboriosam assumenda eum nam tenetur?',
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*5

            },
            {
                'id': '102',
                'subject': `The lazy person's way to our travel`,
                'mailAddress': 'peter.fisher@example.com',
                'body': `bank the other (that was, a book of novellas that you don't really need to read, anyway), and we'll talk about that (or the other half of it, perhaps), but let's assume a few more questions — a lot more things that are novellas. The question: What would happen if we stopped growing and changed the genes? The solution to this is obvious: If we can grow and change the genes, and by increasing our overall intelligence, we can more effectively and effectively copy our genes. That's very unlikely, but it's also the case that scientists sometimes require hospital stays to get health care A big, bad, bad paradox awaits us when we get to Mars.`,
                'sentAt': 0,
                'isImporant': false,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*2

            },
            {
                'id': '103',
                'subject': `15 things you didn't know about bank`,
                'mailAddress': 'pearl.craig@example.com',
                'body': `Why are all the "natural" life forms that we all share a common ancestor? Wouldn't this have been the case, if DNA wasn't already at its peak useful?We might have, for example, been able to put down a tiny malaria parasite — or at least, a very small one — that turns out to be crucial to the immune system. The more microbes are present, the higher the immunosuppressive an attack would have been. This would have meant that the protective immune system would have been insufficiently specialized for fighting infections. We might have grown used to the fact that our ancestors had a lot more of stuff than we'd grown used to, and that our genes were getting weaker and weaker. (Or, alternatively, that we were becoming less important.)`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': false,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*8
            },
            {
                'id': '104',
                'subject': 'See how easily you can get Dropbox',
                'mailAddress': 'melinda.arnold@example.com',
                'body': `But the evidence doesn't prove that this is exactly the case. We might have grown used to the fact that our ancestors had a lot more stuff than we'd grown used to, and that our genes were getting weaker and weaker. But the evidence doesn't prove that this is exactly the case. The more microbes are present, the higher the immunosuppressive an attack would be. Or, alternatively, that we were becoming less important. (Or alternatively, that we were becoming less important.) So what would happen if we stopped growing and changed the genes? Here, the answer is complicated, because our genes were already at the peak of their useful capacity. What we could do is start breeding with our new ancestors, and begin breeding with them as soon as they become useful.`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': false,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*15
            },
            {
                'id': '105',
                'subject': 'Your package from AliExpress',
                'mailAddress': 'melinda.arnold@example.com',
                'body': `If we did that, maybe the new ones would have a different gene that was much weaker. But the more microbes we grow, the weaker the genes become. Then, of course, we could introduce new species into our culture, and so we'd have to keep breeding. And we'd have to create a new species to continue breeding indefinitely. That's one thing we do know about the evolution of DNA, because the DNA we created after we started breeding was almost exclusively derived from inherited changes. It was inherited, so we were basically growing a bunch of new cells on the genome, but gradually slowing down. Or, more simply, the DNA we used to make new cells: One example? The new cells don't have to have all the genes you used to make new cells — they just make the cells. Which would be great for getting rid of them. But the idea that we could do this in response to genetic changes is a false alarm. So what is the evidence? The best-case scenario is that our parents were born with only one genome, and the genes that would be inherited under normal circumstances would be the same as our parents'. (Or, worse, genes would have been used to create new cells, or even genes could be inherited.) But if our genes didn't have to have all the genes they had, then the genes of other races would be different. What is the best-case scenario?
                `,
                'sentAt': 0,
                'isImporant': false,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*4
            },
            {
                'id': '106',
                'subject': 'The uncomfortable truth about Gmail',
                'mailAddress': 'vernon.ramos@example.com',
                'body': `why we learn programming? It doesn't have a whole lot of information. What we don't have at this point is, for people who are new to programming they can just start a discussion with code. I can say to people a lot about whether an app or a Twitter account has a lot to gain from doing a bit of programming and how to achieve this. I would say all programming is probably going to be for doing code. But, even though programming is a lot harder than just knowing the language, I think this should be seen as a choice as well: do we focus on one thing, or does it make sense to focus on this? Do it have to be the same thing, or even put in the same thread and try and make a better version of it?`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*43
            },
            {
                'id': '107',
                'subject': 'For when you need Visa',
                'mailAddress': 'timmothy.carr@example.com', 'body': `Do we make a different version? Yes. But, actually, there are many programming languages. The best way I can say is to make a different version for all, a new language, as part of this "programming" part. These are the most common programming languages. I started with a simple DSL, a DSL that I think was popular in the early days of web/internet as soon as possible, but the same DSL is still in use, and that is, the most difficult DSLs to get to! I thought, "This DSL is one I don't really want!"<|endoftext|>A few months ago, I told a friend that I would write a book. A few months ago, I told a friend that I would tell a blog about how it was different. This story probably fits about a year but about an hour from the writing desk, I was looking for a book. It appeared in a couple of newspapers I was looking for. As a matter of fact, I haven't found it in print and my editor was doing it again. I'm not going to waste any time there. As I explained, "You know, in the 1970's, people believed that there was a new American president that would replace the Constitution. I believe one thing is clear: I think that a constitutional amendment would have a positive impact on our country. I think that a constitutional amendment is certainly the best way to accomplish that."`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*13
            },
            {
                'id': '108',
                'subject': 'have you started?',
                'mailAddress': 'toni.miles@example.com',
                'body': `And here we are. It's a new American invention that had a long career as "President." In fact, it didn't really have any chance to have a very successful presidency. It was simply a modern invention. I was a couple of years into my career in the office of the Senate. I went back when I was in my late 40's. I had already known President Nixon of the United States because I had a very small brain. I didn't know how much I had been aware of what was going on, of course. I remember going to visit our new country. I was surprised by the fact that he had no idea what was going on. But I was also shocked that he hadn't told me about the new Constitution. He was one of the most respected men in Congress. And I'm not sure what to do about that. The answer is simple. I don't know.`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*6
            },
            {
                'id': '109',
                'subject': '4 questions answered about account',
                'mailAddress': 'lester.jenkins@example.com',
                'body': `I knew that there was a new president. The only thing I heard about it was that if I had known then why would I have come back? And in this email conversation that I had with an American friend, that the next president would have the most authority on the matter, would have known that I was going to do everything I had to make his request. There was one problem with the request for our country. And it was that the president was aware of a constitutional amendment that had been a part of the Constitution and had been ratified by Congress You mentioned the constitution. That was a real problem. You mentioned it also in the book of my work on the constitution.`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*25
            },
            {
                'id': '110',
                'subject': 'What you should know about our travel',
                'mailAddress': 'edna.henry@example.com',
                'body': `Here's a bit of the exchange I had with President Nixon. We just didn't know about it at the time that these things happened. He said, "We don't know when the Constitution was ratified but we have the same understanding that we are going to be in for the duration of the current law because we're going to follow the same constitutional rules that we took when Nixon passed, which have been the laws in our view." The Supreme Court had ruled in 1933 that the amendment applied not only to what the founders wrote in their constitution but even to other forms of government as well. But I have to say that for a lot of other presidents, I don't know that there was a really new president in the old days. This president didn't know what the Constitution was and he said, "Well, I know it. I haven't read the Constitution, right?" So he said something I didn't know. And it wasn't clear to me a month or a half ago that he could do that, but it made me very happy. I have been very proud of the constitutional amendment of 1933. So the Constitution was one of the most important documents that I've ever read`,
                'sentAt': 0,
                'isImporant': false,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*18
            },
            {
                'id': '111',
                'subject': 'Your package from AliExpress',
                'mailAddress': 'melinda.arnold@example.com',
                'body': `why not I was asked to keep a close eye on the upcoming Star Tribune, my blog and news.com, and its topics. Thanks for considering my writing. The "Post-Sloatian" title is one I never liked, but as this space age has been moving forward, my interest in new spaceflight and more space exploration has almost gotten stale. I have no desire to start a new space program with someone else, which seems silly when we are one-and-a-half to the powers-that-be in the same way as I do, the Federation of Star Trek. I'll be posting a full report soon, but at the end of this week's post this seems like most of it is to say "thank you, it was a long shot". A quick glance back after our story's debut, and the fact you were probably surprised by the fact the title was the basis for a new Star Trek series. But I'll give you one full week, so here is what I want you to look forward to after seeing all the updates in the coming weeks. A quick look back at Star Trek's "Star Trek" "Reassessing" In the aftermath of "Reassessing" I decided to start reading it again, or maybe just find some other one. Here's what I've done so far: As I write this, the latest episode of Star Trek TV (which is currently taking place in early 2020 and is on the TV show The Next Generation) appears to be about a year old.`,
                'sentAt': 0,
                'isImporant': false,
                'isIncoming': true,
                'isReaded': false,
                'sentAt' : Date.now() - 1000*60*60*24*15
            },
            {
                'id': '112',
                'subject': 'We are the Italian family restaurant',
                'mailAddress': 'jamie.lowe@example.com',
                'body': `I am a white man who believed in the removal of whites from parts of this country. I feel sorry for him personally and I wish him the very best in future. I feel that the people in that position are being unjustly dealt with." The "Undecided Person" emails were to have been sent at the last minute. I received this email from the person who sent the email, who is identified only by the name "J.Dinty." On the same day, in a letter from an e-mail address, I received an e-mail from another white guy writing: The best place to start is on our side and help people make the world a better place. Let's work together to bring these communities together and make something happen. — Tom Udall (@tommythson) May 18, 2017 I don't just want to be a little racist but also, I want to be the only person capable of telling a story about how racist you have become for the benefit of all of us. That's how you achieve racial justice. But you also are capable of being the only person capable of telling a story about what you did. And you are responsible for ensuring that this country stays prosperous. If I were an American, I'd be the president of the United States of America. Let's get started today with a new generation of people who stand up for the things that can be done to help people in this country. We're not getting to the bottom of racial issues; we're not getting to the top of a lot of the problems. You've never seen this type of issue before. Now we have a whole new generation who have an idea of how to fix those things to ensure that these problems aren't reversed and continue to exist in the future. Because if we can improve the quality of life for people across the country and get these issues addressed as a result of these changes, we'll get the same result. Every white person is going to be better equipped to tackle systemic problems and that's precisely what we're doing. But there is no time for complacency for anyone. And we still have people who've been in the office who're going to tell stories about how racist they are. That speaks to what the country wants and is doing right now. I want to thank them for serving us and that's why I'm so grateful for this week's column. I don't know if I'd be able to tell an African-American you can't believe it or tell you can't believe it. But for those of us who haven't come here before, I want to thank you for giving some of your attention to the issues that are most important to us in a way that we believe can't be misconstrued or ignored. By any means, I have no doubt that the people I've spoken to believe and worked for in this country will continue to speak freely about racial injustice`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*50
            },
            {
                'id': '113',
                'subject': 'And of course I can help with whatever',
                'mailAddress': 'vernon.ramos@example.com',
                'body': `We make our great food available for a nominal fee and our small local team can arrange for delivery. The menu is a selection of delicious food and wine, all freshly prepared and delivered daily. All our cooking is made with high quality ingredients and certified organic. Our chef, Jiro Nakazato, has been awarded multiple accolades and is considered by many to be one of the best chefs in Europe for his culinary excellence. We also serve the best pizza in London, served in our private restaurant.`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*87
            },
            {
                'id': '114',
                'subject': 'I have always wanted concerts',
                'mailAddress': 'jamie.lowe@example.com',
                'body': `What we offer. It’s a unique experience that’s designed to complement your meal. Its not just a choice between two courses, but a truly meaningful, flavour-packed experience. Our menu is inspired by a Mediterranean heritage, giving it a lively edge, and with the inspiration of italian flavours. Its the perfect balance of the two cultures and offers a great choice of a la carte tablesides or two to two dining in the restaurante`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*65
            },
            {
                'id': '115',
                'subject': 'The performance is the perfect',
                'mailAddress': 'deanna.terry@example.comm',
                'body': `Our aim is to make the most of the food you eat, in the restaurants you frequent and the places you go. We are committed to creating a great dining experience for your guests and our staff. We are committed to creating a great dining experience for your guests and our staff. We are committed to creating a great dining experience for your guests and our staff.`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*12
            },
            {
                'id': '116',
                'subject': 'Schola’s 40th birthday',
                'mailAddress': 'vernon.murray@example.com',
                'body': `We know that our customers will always come first, and we're always open to new ideas and new ideas as well. We’re proud to add our newest addition - chef Giuseppe. Giuseppe is a true Italian chef and has been serving the Naples area for years, creating very authentic Italian-style pizzas with passionate chefs. Giuseppe is the one responsible for the pizza that has been on our menu since September 2017 and will continue to be on our menu till 2029. Giuseppe has a lot of experience in the restaurant business and we look forward to working with him to create a new and innovative concept.`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*3
            },
            {
                'id': '117',
                'subject': 'First world tour in 2015',
                'mailAddress': 'layla.brewer@example.com',
                'body': `Our main objective is to provide quality wines by the bottle in a relaxed, warm, family-friendly environment with comfortable chairs. The small dining area opens up into a private room which has beautiful tiling work from the outside of the wall as well as soft lighting. Guests can enjoy meals or other activities during the day such like watching movies at night. A real treat awaits diners returning back home after their adventure abroad!`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*12
            },
            {
                'id': '118',
                'subject': 'We are a boutique salon',
                'mailAddress': 'dora.armstrong@example.com',
                'body': `The company is called: We are located in the village of Lomisco which is almost exactly 90 kilometres from Rio Grande Valley on the right hand side of Rio Grande (Lominsh). Our aim is simple, if there was an easy way to get around here then everyone living this island could enjoy their life as they please... But due too many challenges at home/work/ school all attempts have been fruitless until now...`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*5
            },
            {
                'id': '119',
                'subject': 'Areas of Chicago',
                'mailAddress': 'shane.fox@example.com',
                'body': `To keep things simple at a distance from everything else going on in town and enjoy some good old-fashioned fun. If you’ve read any of our previous posts about taking care yourself (hereandhere) you know how busy life can get these days – especially when all your work is focused one place instead being surrounded by family and friends while working through the week. It doesn&apost always make sense but sometimes finding time during that crazy weekday evening commute just isn&Apropriate either!`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*23
            },
            {
                'id': '120',
                'subject': 'Community since 1997',
                'mailAddress': 'claude.watson@example.com',
                'body': `We are a family run business which owns and operates a local backpacker hostel and a small cottage in beautiful Morla. We started our journey in 2003 and over the years have done our share of accommodation and accommodation tours. We offer a range of facilities and services to suit all budgets and budgets. The outdoor activities and the community spirit are our specialities, and we always ensure that your stay is hassle free and hassle free! You can book online through the website or call us on 0800 646 3999.`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*34
            },
            {
                'id': '121',
                'subject': 'We serve it in its sweetest, most natural way',
                'mailAddress': 'becky.washington@example.com',
                'body': `We are a family of six, but we have many years of experience working with kids from our life in Finland. Our staff provides services for our customers from organising our trips - to booking our flights and accommodation, to organising our trips - to finding the best activities and the best scenery to organise them. We are a company of Finnish, German, Swedish, Irish, American, Canadian, and British nationalities. We are a team of family who have lived together in Finland for a long time, some 20 years.`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*1
            },
            {
                'id': '122',
                'subject': 'The Coffee Roasterry Shop',
                'mailAddress': 'vera.green@example.com',
                'body': `The Nook family has lived in Botswana since 1961. Since their arrival they have made lifelong friends who have helped them grow as travellers. They love what they do and are dedicated professionals of providing value to their clients through excellent customer service.> With over 14 years experience in the field I am always seeking new ideas & challenges; building on my previous expertise while exploring ways that I can best provide quality results at affordable prices.`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*79
            },
            {
                'id': '123',
                'subject': 'We like coffee that is freshly',
                'mailAddress': 'brian.jacobs@example.com',
                'body': `We are a family friendly, green touristic enterprise. We provide a daily tour of the forest through the forest, a morning or evening safari, and the opportunity to live in the forest for a day, afternoon or evening. We also have a special day each year for all the children to set off to the forest.`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*43
            },
            {
                'id': '124',
                'subject': `We believe that it's the little things`,
                'mailAddress': 'stephen.chavez@example.com',
                'body': `We are a team of experienced individuals who are passionate about their work. We are here to ensure that you enjoy your holiday with us, without compromising on the quality of the holiday. Our team has worked in the tourism industry for over 20 years and have developed an amazing rapport with our clients, with whom we have made many relationships. We are here to take care of your trip, so that you can take it to the next level.`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*32
            },
            {
                'id': '125',
                'subject': `We've had a long standing relationship`,
                'mailAddress': 'aubrey.ferguson@example.com',
                'body': `As the name implies, the concert is a celebration of the Schola Chorale. It is an event that reflects a rich cultural heritage. As a musical ensemble, the Schola is regarded as one of the leading choirs of the world and a classical music institution in London. The ensemble has been active since the 16th century and is recognised as one of the most outstanding choirs of the 19th century.`,
                'sentAt': 0,
                'isImporant': true,
                'isIncoming': true,
                'isReaded': true,
                'sentAt' : Date.now() - 1000*60*60*24*76
            },

        ]
    return mailsList;
}
