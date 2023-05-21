import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {CgChevronDoubleDown} from "react-icons/cg";
import {IoIosArrowBack} from "react-icons/io";
import {IoHome} from "react-icons/io5";
import './Info.css';


function Info() {
	// 라우팅 시 검게 Fade
  const [showTransition, setShowTransition] = useState(false);
  const transitionRef = useRef(null);

  useEffect(() => {
    setShowTransition(true);
    transitionRef.current.style.opacity = 1;
  }, []);
	
	//스크롤 이벤트
  const [isVisible, setIsVisible] = useState(false);
	const [divNum, setDivNum] = useState(0);
	  //100vh의 픽셀 수 계산, 브라우저가 지원하지 않으면 639;
	const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 639);
	
  useEffect(() => {
		function handleScroll() {
			const scrollPosition = window.scrollY;
			if (scrollPosition > -1 && scrollPosition < height) { // 스크롤 위치가 100을 넘으면 보이기
				setIsVisible(true);
				setDivNum(1);
			} else if (scrollPosition > height && scrollPosition < height*2) { 
				setIsVisible(true);
				setDivNum(2);
			} else if (scrollPosition > height*2 && scrollPosition < height*3) { 
				setIsVisible(true);
				setDivNum(3);
			} else if (scrollPosition > height*3 && scrollPosition < height*4) { 
				setIsVisible(true);
				setDivNum(4);
			} else if (scrollPosition > height*4 && scrollPosition < height*5) { 
				setIsVisible(true);
				setDivNum(5);
			}
		}

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
	
  return (
    <div className="info-container">
			(<Link to="/">
				<IoIosArrowBack className="backbutton2" width="40px" height="40px" color='white'/>
			</Link>)
      <div className="transition" ref={transitionRef} />
      <div className="info-content">
				{divNum === 1 && isVisible && <div className="show-me">
					 스크롤을 내려보세요. <br></br>
					 <CgChevronDoubleDown size="25" color="white"></CgChevronDoubleDown>
				 </div>}
 				{divNum === 2 && isVisible && <div className="show-me">
					 안녕하세요. <br></br> 챗지피티 한국어버전을 만든 <br></br> 24살 개발자입니다.
					 <br></br>
				 </div>}
				{divNum === 3 && isVisible && <div className="show-me-long">
					 앱을 개발하게 된 계기는 <br></br> 부모님께서 뉴스를 보시곤 <br></br> ChatGPT를 써보고 싶은데 <br></br> 어떻게 쓰는건지 모르겠다 <br></br> 말씀하시는걸 듣고
					 <br></br>
				 </div>}
				{divNum === 4 && isVisible && <div className="show-me-long">
					 남녀노소 누구나 <br></br> 혁신적인 기술을 <br></br> 경험해볼 수 있는 <br></br> 세상이 되었으면 좋겠다는 <br></br> 생각에서 였습니다.
					 <br></br>
				 </div>}
				{divNum === 5 && isVisible && <div className="show-me-last">
					 접근성과 편리성을 높이고자  <br></br> 언제나 노력하고 있습니다. <br></br> 사용하시면서 불편했던 점은 <br></br> 문의 넣어주신다면 <br></br> 빠른 시일내에 <br></br> 반영하도록 하겠습니다. <br></br><br></br> 이용해주셔서 감사합니다.
					 <br></br>
				 </div>}
				{divNum === 5 && isVisible && <Link to="/">
						<IoHome className="homebutton" color='white'/>
					</Link>}
      </div>
    </div>
  );
}

export default Info;

// video 오류로 잠시 보류, divNum===5인 두 div 사이에 들어갔었음.

// {divNum === 5 && isVisible && <div className="background-effect">
// <video autolay loop muted playsinline style={{ width: '100vw', height: '45vh'}}>
// <source src="/effect.mp4" type="video/mp4" />
// </video>
// </div>}