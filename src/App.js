import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'; //밑에 주석코드 쓰려면 Link 추가해야됨.
import './App.css';
import Chat from './Chat.js';
import ChatInfo from './chatInfo.js';
import Inquiry from './inquiry.js';
import Info from './Info.js';

// Easily add high-quality animation to any native app. -> https://github.com/airbnb/lottie-web

/* 모든 페이지 확대/축소 비활성화, 메인페이지는 스크롤도 비활성화 */
if (window.location.href === "https://openaiapp.run.goorm.site") {
  document.documentElement.style.overflow = "hidden";
  document.body.style.touchAction = "none";
  document.body.style.userZoom = "none";
} else {
  document.documentElement.style.overflow = "auto";
  document.body.style.touchAction = "auto";
  document.body.style.userZoom = "none";
}


function Card(props) {
  return (
	<figure class="long">
	  <a href={props.link}>
		<figcaption>
		  <div class="line">
			<span>
			  <p className="content">{props.content}</p>
			</span>
		  </div>
		</figcaption>
	  </a>
	</figure>
  );
}
 
function App() {
	// 뒤로가기
	const [showBackbutton, setShowBackbutton] = useState(true);
	const handleLinkClick = () => {
    setShowBackbutton(false);
  };
	const handleBackbuttonClick = () => {
    setShowBackbutton(false);
  };
	
	// 실행 시 오토 비디오 구현
  const [showVideo, setShowVideo] = useState(true);
  const [isFading, setIsFading] = useState(false);
  useEffect(() => {
    const video = document.getElementById('video');

    if (video) {
      video.addEventListener('ended', () => {
        setIsFading(true);
        setTimeout(() => {
          setShowVideo(false);
          setIsFading(false);
        }, 1000);
      }); 
    }
  }, []);

  return (
    <Router>
      <div className="app">
        {showVideo && window.location.pathname === '/' ? (
          <video id="video" autoPlay muted style={{ width:'100%', height: '97vh', margin: '0 auto', objectFit: 'cover', opacity: isFading ? '0' : '1', transition: 'opacity 1s' }}>
            <source src="/loading.mp4" type="video/mp4" />
          </video>
        ) : (
          <>
            <nav className="nav">
							<div className="nav-content">
								 {window.location.pathname !== '/' && window.location.pathname !== '/Info' && showBackbutton && (
									<Link to="/">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbVbi7Gie45HnJazrY6kz-3YgVfYVa3Z9lVQ&usqp=CAU" alt="" className="backbutton" width="30px" height="30px" onClick={handleBackbuttonClick}/>
									</Link>
									)}
								<Link to="/" className="title" onClick={handleLinkClick}>
									ChatGPT 한국어버전
								</Link>
							</div>
            </nav>
						<div className={isFading ? 'fadeOut' : 'fadeIn'} style={{ opacity: isFading ? '0' : '1', transition: 'opacity 1s' }}>
              {isFading ? null : (
							<Switch>
								<Route exact path="/" render={() => (
									<div className="Home">
										<div className="row">
											<div className="column1">
												<Card link="/chat" />
											</div>
										</div>
										<div className="row">
											<div className="column2">
												<Card link="/chatInfo" />
											</div>
										</div>
										<div className="row">
											<div className="column3">
												<Card link="/Info" />
											</div>
											<div className="column4">
												<Card link="/inquiry" />
											</div>
										</div>
									</div>
								)}/>
								<Route path="/chatInfo" component={chatInfo} />
								<Route path="/chat" component={chat} />
								<Route path="/info" component={info} />
								<Route path="/inquiry" component={inquiry} />
							</Switch>
							)}
						</div>
          </>
        )}
      </div>
    </Router>
  );
}

function chatInfo() {
  return <ChatInfo></ChatInfo>;
}

function chat() {
  return <Chat></Chat>;
}

function info() {
  return <Info></Info>;
}

function inquiry() {
  return <Inquiry></Inquiry>;
}

export default App;