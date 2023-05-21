import React, { useState } from 'react';
import TextAreaAutoResize from "react-textarea-autosize";
import './inquiry.css';

function Inquiry() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
		
		// 데이터를 서버로 전송하는 로직을 추가해야 합니다.
		fetch('https://openaiappserver.run.goorm.site/inquiry', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, message }),
			})
		.then((response) => response.json())
		.then((data) => {
		console.log('Success:', data);
		// 성공 시 사용자에게 알리고, 입력한 데이터를 초기화합니다.
		alert('문의가 전달되었습니다!');
		setName('');
		setEmail('');
		setMessage('');
		})
		.catch((error) => {
		console.error('Error:', error);
		// 에러 발생 시 사용자에게 알리고, 입력한 데이터를 초기화하지 않습니다.
		alert('에러가 발생하여 문의가 전달되지 못했습니다.');
		});
		
  }

  return (
		<div className='inquiry'>
			<h2>문의하기</h2>
			<p>불편했던 점이나 궁금한 점, 무엇이든 문의해주세요! 최대한 빨리 답변 드릴 수 있도록 노력하겠습니다.</p>
			<form onSubmit={handleSubmit}>
				<label>
					성함: 
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
				</label>
				<br></br>
				<label>
					회신받을 이메일: 
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</label>
				<br></br>
				<label>
					내용: 
					<TextAreaAutoResize value={message} placeholder="내용을 입력해주세요." onChange={(e) => setMessage(e.target.value)} />
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
  );
}

export default Inquiry;

// 토스 1000원 보내기 - https://blog.naver.com/PostView.naver?blogId=juny607&logNo=222631830394&parentCategoryNo=&categoryNo=52&viewDate=&isShowPopularPosts=true&from=search
