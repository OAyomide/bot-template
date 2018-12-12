import axios from 'axios'
import config from '../config/config'

const SendgalleryObject = (id, elements) => {
  const dt = {
    recipient:{
      id: id
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [...elements]
        }
      }
    }
  }

  CallSendAPI(dt)
}


function SendText(userid, text) {
  const data = {
    recipient: {
      id: userid
    },
    message: {
      text: text
    }
  }

  CallSendAPI(data)
}
// function SendGallery(userid) {
//   const data = {

// }

async function CallSendAPI(data) {
  try {
    const ax = await axios({
      method: 'post',
      url: 'https://graph.facebook.com/v3.1/me/messages',
      data: data,
      params: { access_token: config.ACCESS_TOKEN}
    })
    const { recipient_id:  rsid, message_id: msgid } = ax.data
    console.log(`SUCCESSFULLY SENT MESSAGE TO: %s`, rsid)
  } catch (e) {
    console.log(`ERROR USING CALL SEND API TO SEND THE DATA`, e.response.data.error)
  }
}

module.exports = { SendText, CallSendAPI, SendgalleryObject }