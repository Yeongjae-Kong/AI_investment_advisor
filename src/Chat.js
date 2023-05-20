import React, { useState, useEffect } from 'react';
import {VscDebugRestart} from "react-icons/vsc";
import './Chat.css';

function Chat() {
  // user의 메세지를 저장하는 state 변수
  const [userMessages, setUserMessages] = useState([]);
  // AI 응답을 저장하는 state 변수
  const [assistantMessages, setAssistantMessages] = useState([]);
  // API 호출 중인지 나타내는 state 변수
  const [isLoading, setIsLoading] = useState(false);
  // 입력값이 있는지 체크하는 state 변수
  const [inputValue, setInputValue] = useState('');
	
	const chatBox = document.querySelector('.chat-box');
	
useEffect(() => {
    loadMessages();
  }, []);
	
// 로컬스토리지에 메세지 저장하는 함수
const addMessage = (message) => {
  // localStorage에서 메시지 목록 가져오기
  let messages = JSON.parse(localStorage.getItem('messages')) || [];
  // 새로운 메시지 추가하기
  messages.push(message);
  // localStorage에 메시지 목록 저장하기
  localStorage.setItem('messages', JSON.stringify(messages));
}

// 페이지 로드 시 localStorage에 저장된 메시지 불러오기
const loadMessages = () => {
  // localStorage에서 메시지 목록 가져오기
  let messages = JSON.parse(localStorage.getItem('messages')) || [];

  // 메시지 목록을 화면에 그리기
  messages.forEach((message, index) => {
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    // userMessages와 assistantrMessages를 구분하여 화면에 출력
    if (index % 2 === 0) {
      chatMessage.innerHTML = `<p class="user">${message}</p>`;
    } else {
      chatMessage.innerHTML = `<p class='assistant'>${message}</p>`;
    }
		let chatBox = document.querySelector('.chat-box');
		
    chatBox.appendChild(chatMessage);
  });
}
	
  // 메세지 전송 버튼 클릭 시 실행
  const handleSendMessage = async () => {
    // 채팅 입력창에서 입력된 메세지 가져오기
    const chatInput = document.querySelector('.chat-input input');
		const message = chatInput.value;

    // 메세지가 비어있으면 전송하지 않음
    if (message === '') {
      return;
    }
		
		const chatMessage = document.createElement('div');
		chatMessage.classList.add('chat-message');
		chatMessage.innerHTML = `<p class="user">${chatInput.value}</p>`;
    chatBox.appendChild(chatMessage);

    // 로딩 중임을 나타내는 state 변수 값 변경
    setIsLoading(true);

		//userMessage 메세지 추가
		userMessages.push(message);
		
		// 스크롤을 맨 아래로 내리기
		chatBox.scrollTop = chatBox.scrollHeight;

		chatInput.value = '';
		
    // OpenAI API에 POST 요청 보내기
    const response = await fetch('https://openaiappserver.run.goorm.site/test', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userMessages: userMessages,
        assistantMessages: assistantMessages,
      })
    });

    // API 응답 결과 가져오기
    const data = await response.json();
    // 로딩 중임을 나타내는 state 변수 값 변경
    setIsLoading(false);

		//assistantMessage 메세지 추가
		assistantMessages.push(data.assistant);

		// 스크롤을 맨 아래로 내리기
		chatBox.scrollTop = chatBox.scrollHeight;
		
		// 메시지 localStorage에 추가하기
  	addMessage(message);
		addMessage(data.assistant);
		
		const assistantMessage = document.createElement('div');
		assistantMessage.classList.add('chat-message');
		assistantMessage.innerHTML = `<p class='assistant'>${data.assistant}</p>`;
		chatBox.appendChild(assistantMessage);
  };
	
  // input 값이 변경될 때마다 실행되는 함수
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // 엔터키 입력 시 메세지 전송 함수 호출
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  }

  // 채팅 입력창에서 입력값이 있을 때만 버튼 생성
useEffect(() => {
  const chatButton = document.querySelector('#button');
  if (chatButton) {
    if (inputValue !== '') {
      chatButton.style.display = 'block';
    } else {
      chatButton.style.display = 'none';
    }
  }
}, [inputValue]);
	
	// 로컬 스토리지를 비우는 함수
function handleClick() {
		console.log('user : ', userMessages);
		console.log('ai : ', assistantMessages);
	  localStorage.clear();
	  document.location.reload();
  }
	
	
// /* ---- 모바일에서 가상키보드 사이즈에 따른 chatInput 위치 변경----*/
// let windowHeight = window.innerHeight;

// window.addEventListener('resize', () => {
//   let newWindowHeight = window.innerHeight;
//   const keyboardHeight = windowHeight - newWindowHeight;
//   windowHeight = newWindowHeight;

//   if (keyboardHeight > 0) {
//     const chatInput = document.querySelector('.chat-input');
//     chatInput.style.bottom = `${keyboardHeight}px`;
//   }
// });

// // 최초 실행 시 가상 키보드의 높이를 측정
// if (window.visualViewport.height > window.innerHeight) {
//   const keyboardHeight = window.visualViewport.height - window.innerHeight;
//   const chatInput = document.querySelector('.chat-input');
//   chatInput.style.bottom = `${keyboardHeight}px`;
// }
	
	
return (
		<div className="chat-container">
			<div className="chat-box">
				{(Object.keys(userMessages).length > 0 || localStorage.length > 0) && <VscDebugRestart size="25" color="rgba(0,0,0,0.8)" onClick={handleClick}/>}
				<div className="chat-message">
					<p className="assistant">저에게 무엇이든 물어보세요!</p>
				</div>
			</div>
      {isLoading && (
          <div className="chat-message" style={{backgroundColor:"white"}}>
            <p className="loader">잠시만 기다려주세요. 답변 길이에 따라 5~20초가량 소모됩니다.</p>
          </div>
      )}
      <div className="chat-input">
        <input id="input" type="text" placeholder="메세지를 입력하세요." onKeyDown={handleKeyDown} onChange={handleChange} />
        {inputValue !== '' && <button id="send-button" onClick={handleSendMessage} hover>보내기</button>}
      </div>
    </div>
  );
}


export default Chat;













