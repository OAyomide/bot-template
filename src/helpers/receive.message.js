import { SendText, CallSendAPI, SendgalleryObject } from './util'

async function ProcessReceivedMessageEvent(event) {
  const { sender, recipient, timestamp, message } = event

  console.log("Received message for %s and page %s at %s with message %s", sender.id, recipient.id, timestamp, JSON.stringify(message))
  //the message id of the message we're receiving and the message text itself
  const { mid, text } = message
  if (text === 'hello') {
    SendText(sender.id, 'Hello to you too! 👋')
  } else if (text === 'share') {
    const dummyData = [
      {
       name: 'Ayomide Onigbinde',
       role: 'Contract Software Engineer',
       img: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?cs=srgb&dl=adorable-animal-cat-20787.jpg&fm=jpg'
      },
      {
        name: 'Jacob Molina',
        role: 'Marketing and Sales',
        img: 'https://www.seniorcatwellness.com/wp-content/uploads/2018/06/cats-gums-have-black-speckles.jpg'
      },
      {
        name: 'Pierre Luc-Cantin',
        role: 'Engineering Lead',
        img: 'https://www.cat-health-detective.com/images/whiskers.jpg'
      }
    ]

    const ranking  = 45
    
    const el = []
    dummyData.map((x, y) => {
      el.push({
        title: x.name,
        subtitle: x.role,
        image_url: x.img,
        buttons: [
          {
            type: 'element_share',
            share_contents: {
              attachment: {
                type: 'template',
                payload: {
                  template_type: 'generic',
                  elements: [
                    {
                      title: 'Fancy Share Content',
                      image_url: 'https://www.cat-health-detective.com/images/whiskers.jpg',
                      subtitle: `Hey I am number ${ranking} on the leaderboard. COme and play with me`,
                      buttons: [
                        {
                          title: 'View!',
                          type: 'web_url',
                          url: 'https://chipputdouble.com/user/ayomide?action=sharingleaderboard'
                        }
                      ]
                    }
                  ]
                }
              }
            }
          }
        ]
      })
    })

    SendgalleryObject(sender.id, el)
  }
}

module.exports = { ProcessReceivedMessageEvent }
