require('dotenv').config({path:'../.env'});

const apiKey = process.env.OPENAI_API_KEY;
const gmailPw  = process.env.GMAIL_PW;
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const nodemailer = require('nodemailer');
var cors = require('cors')
const app = express()

const configuration = new Configuration({
    apiKey: apiKey,
  });
const openai = new OpenAIApi(configuration);

// //CORS 설정 - cloudflare pages에 연결했을 때
// let corsOptions = {
//     origin: 'https://openaiapp-wpuax.run.goorm.site', //'https://ai-investment.pages.dev', 
//     credentials: true
// }
// app.use(cors(corsOptions));

//CORS 설정 - 모두 접근 허용
app.use(cors());

//POST 요청 받을 수 있게 만듬
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// POST method route
app.post('/test', async function (req, res) {
    let { userMessages, assistantMessages} = req.body
		
    let messages = [
		  {role: "system", content: "너는 ChatGPT야. 사람들이 너에게 질문을 하면 최대한 모른다고 대답하지 말고, 검색을 해서 정보를 찾아서 대답해주어야 돼. 그리고 어떠한 경우에도 친절하게 말을 해주어야 해. 하지만 이또한 검색에서 나온 정보이므로 정확하지 않을 가능성이 있다고도 말해주면 좋을 것 같아. "},
			{role: "user", content: "너는 ChatGPT야. 사람들이 너에게 질문을 하면 최대한 모른다고 대답하지 말고, 검색을 해서 정보를 찾아서 대답해주어야 돼. 그리고 어떠한 경우에도 친절하게 말을 해주어야 해. 하지만 이또한 검색에서 나온 정보이므로 정확하지 않을 가능성이 있다고도 말해주면 좋을 것 같아. "},
			{role: "assistant", content: "네, 말씀하신 대로입니다. 저는 최대한 빠르고 정확하게 검색을 통해 정보를 찾아서 대답하도록 노력하겠습니다. 하지만 검색에서 나온 정보이므로 정확하지 않을 가능성도 있습니다. 따라서 그러한 경우에는 해당 정보가 정확하지 않을 수도 있다는 점을 이해해주시기 바랍니다. 어떤 질문이든 친절하게 대답해드리겠습니다."},
    ]

    while (userMessages.length != 0 || assistantMessages.length != 0) {
        if (userMessages.length !== 0) {
            messages.push(
                JSON.parse('{"role": "user", "content": "'+String(userMessages.shift()).replace(/\n/g,"")+'"}')
            )
        }
        if (assistantMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "assistant", "content": "'+String(assistantMessages.shift()).replace(/\n/g,"")+'"}')
            )
        }
    }

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
				max_tokens: 512,
        messages: messages
    });
    let answer = completion.data.choices[0].message['content']
    res.json({"assistant": answer});
});


// Inquiry.js로부터 받은 메일 보내기
app.post('/inquiry', (req, res) => {
  const { name, email, message } = req.body;

  // nodemailer 설정
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'kong730010@gmail.com',
      pass: gmailPw,
    },
  });

  // 이메일 내용 설정
  const mailOptions = {
    from: 'kong730010@gmail.com',
    to: 'kong73000@gmail.com',
    subject: '문의가 도착했습니다!',
    text: `보낸 사람: ${name}\n이메일 주소: ${email}\n내용: ${message}`,
  };

  // 이메일 전송
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('에러가 발생하여 문의가 전달되지 못했습니다.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: '문의가 전달되었습니다!' });
    }
  });
});


app.listen(3001, function() {
	console.log("Listening on port 3001.")
})
