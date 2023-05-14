import React from 'react';
import { Fade } from 'react-awesome-reveal';
import './chatInfo.css';

function ChatInfo() {
  return (
    <div className="chatInfo">
	  	<div className="element">
			<Fade direction={"up"} duration={2000} triggerOnce={true}>
				<h2>
				ChatGPT란?
				</h2>
			</Fade>
			<Fade delay={700} duration={2000} triggerOnce={true}>
				<p>
				ChatGPT는 OpenAI에서 개발한 대규모 언어 모델 중 하나입니다. 사람들이 일상적으로 사용하는 말투와 문장 구조를 학습하여, 말하는 사람의 의도를 이해하고 적절한 답변을 제공할 수 있습니다.
				<br></br> <br></br>
				ChatGPT는 Generative Pre-trained Transformer라는 인공지능 기술을 활용하여 자연스러운 대화를 구현합니다. 대화를 시작하면, 사전 학습된 데이터를 통해 입력된 문장을 이해하고 관련된 정보를 추출하여 사용자의 질문에 가장 적합한 답변을 생성하게 됩니다. 학습 데이터의 특성 상 신뢰성이 낮은 정보가 생성될 가능성이 있지만, 비교적 높은 정확성으로 사람간의 대화와 유사한 대화를 생성할 수 있습니다.
				<br></br> <br></br>
				ChatGPT는 고객 서비스, 교육, 상담, 텍스트 요약 등의 분야에서 사용할 수 있습니다. 혹은 대화형 인터페이스와 결합하여 다양한 방면에서 사용자의 질문에 언제든 답변을 제공하는 인공지능 비서로도 사용할 수 있습니다.
				</p>
			</Fade>
			</div>
			<Fade delay={700} duration={2000} triggerOnce={true}>
			<div className="element">
				<p style={{textAlign: 'center'}}>
				<img src="https://koreajoongangdaily.joins.com/data/photo/2023/03/21/f36c6376-51ed-485a-9c63-2c2c0d0e959f.jpg" width="80%" height="40%" style={{marginTop: '1em', marginBottom: '1em'}} alt=''></img>  
				</p>
			</div>
			</Fade>
			<Fade delay={700} duration={2000} triggerOnce={true}>
			<div className="element">
				<p>
					ChatGPT를 사용하는 방법은 매우 간단합니다. 사용자는 ChatGPT와 대화를 시작하기 위해 입력창에 원하는 질문이나 문장을 입력하면 됩니다. ChatGPT는 입력된 문장을 분석하고 그에 맞는 답변을 생성하여 사용자에게 제공합니다. 사용자는 ChatGPT의 답변에 대해 만족할 때까지 대화를 이어나갈 수 있습니다.
				<br></br> <br></br>
					또한 ChatGPT는 다양한 언어를 지원하므로, 다른 언어 사용자와 대화를 나눌 수도 있습니다.
				</p>
			</div>
			</Fade>
			<br></br>
			<Fade direction="up" delay={800} duration={1800} triggerOnce={true}>
			<div className="element">
				<h2>
				ChatGPT 활용 가이드
				</h2>
			</div>
			</Fade>
			<Fade delay={1200} duration={2000} triggerOnce={true}>
			<div className="element">
				<p>
					<b>1. ChatGPT는 기사, 논문 등의 요약이나 컨텐츠 생성, 브레인스토밍 등의 언어 처리에 특화된 모델입니다.</b> 복잡한 계산같은 수학적인 문제보다는 언어 처리와 관련된 질문에 대해 강력한 성능을 자랑합니다.
				</p>
			</div>
			</Fade>
			<Fade delay={1200} duration={2000} triggerOnce={true}>
			<div className="element">
				<p>
					<b>2. ChatGPT는 질문의 형태에 따라 매우 다양한 결과물을 만들어낼 수 있습니다.</b> 말의 어조, 언어적 특성, 문화적 차이 등 다양한 요소에 따라 답변이 달라질 수 있으므로 ChatGPT와 대화할 때 자신이 원하는 답변이나 요구를 분명하게 표현하여 프롬프트를 작성하는 것이 중요합니다.  
				</p>
		  </div>
			</Fade>
			<Fade delay={1200} duration={2000} triggerOnce={true}>
		  <div className="element">
				<p>
					<b>3. ChatGPT는 많은 데이터를 학습하고 분석하였지만, 학습 데이터도 사람이 작성한 것이기에 완벽하지 않습니다.</b> 특히 학습에 사용한 한국어 데이터는 영어 데이터에 비해 상대적으로 훨씬 적기때문에 ChatGPT가 잘못된 답변을 제공할 수 있으므로 제공된 답변을 맹신해서는 안됩니다. ChatGPT의 답변에 부족한 내용이 있을 땐 추가적인 질문을 통해 답변을 개선할 수 있습니다. 포기하지 말고 ChatGPT에게 질문을 던져보세요.
				</p>
		  </div>
			</Fade>
			<Fade delay={1200} duration={2000} triggerOnce={true}>
			<div className="element">
				<p style={{textAlign: 'center'}}>
				<img src="https://jiho-ml.com/content/images/2023/01/chatgpt-intro1-1.png" width="80%" height="40%" style={{marginTop: '1em', marginBottom: '1em'}} alt=''></img>  
				</p>
			</div>
			</Fade>
			<Fade delay={1200} duration={2000} triggerOnce={true}>
			<div className="element">
				<p>
					ChatGPT는 사용자의 입력과 피드백을 바탕으로 계속해서 학습하고 발전하므로, 사용자가 제공하는 답변도 인공지능 모델의 발전에 기여하게 됩니다.
				</p>
				<p>
					ChatGPT를 효율적으로 활용하여 보다 편리하고 편안한 삶을 누려보세요!
				</p>
			</div>
			</Fade>
    </div>
  );
}

export default ChatInfo;