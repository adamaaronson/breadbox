(this.webpackJsonpbreadbox=this.webpackJsonpbreadbox||[]).push([[0],{28:function(e,t,s){},35:function(e,t,s){},36:function(e,t,s){},50:function(e,t,s){},51:function(e,t,s){},52:function(e,t,s){"use strict";s.r(t);var n=s(2),a=s.n(n),o=s(29),r=s.n(o),i=s(8),c=s(9),u=s(4),l=s(11),h=s(10),m=(s(35),s(17)),d=s(5),b=(s(36),s(1));function j(){return Object(b.jsx)("div",{className:"header",children:Object(b.jsxs)("div",{className:"title-box",children:[Object(b.jsx)("img",{className:"logo",src:"logo.png"}),Object(b.jsxs)("div",{className:"title-and-subtitle",children:[Object(b.jsx)("h1",{className:"title",children:"Breadbox"}),Object(b.jsx)("h4",{className:"subtitle",children:"Asking the real questions!"})]})]})})}var p=s(24);s(38);p.a.initializeApp({apiKey:"AIzaSyBqT3oIwoJSdKuj4iq_m2EBK1bh4TnSLbg",authDomain:"breadbox-147c2.firebaseapp.com",projectId:"breadbox-147c2",storageBucket:"breadbox-147c2.appspot.com",messagingSenderId:"458411662648",appId:"1:458411662648:web:fcd2c043f4fe74769c35cd",measurementId:"G-1N4225LKW7"});var f=p.a.database(),g=function(e){Object(l.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(i.a)(this,s),(n=t.call(this,e)).state={name:"",roomCode:"",joiningRoom:!1,settingUpGame:!1},n.handleNameChange=n.handleNameChange.bind(Object(u.a)(n)),n.handleNameSubmit=n.handleNameSubmit.bind(Object(u.a)(n)),n.handleRoomCodeChange=n.handleRoomCodeChange.bind(Object(u.a)(n)),n.handleCreateRoomClick=n.handleCreateRoomClick.bind(Object(u.a)(n)),n.handleJoinRoomClick=n.handleJoinRoomClick.bind(Object(u.a)(n)),n.handleRoomCodeSubmit=n.handleRoomCodeSubmit.bind(Object(u.a)(n)),n}return Object(c.a)(s,[{key:"handleNameChange",value:function(e){e.preventDefault(),this.setState({name:e.target.value})}},{key:"handleNameSubmit",value:function(e){e.preventDefault()}},{key:"handleRoomCodeChange",value:function(e){e.preventDefault(),this.setState({roomCode:e.target.value})}},{key:"generateID",value:function(e){for(var t=[],s="0123456789",n=s.length,a=0;a<e;a++)t.push(s.charAt(Math.floor(Math.random()*n)));return t.join("")}},{key:"handleCreateRoomClick",value:function(){var e=this.generateID(5);f.ref("games/"+e).set({started:!1,finished:!1,answererID:null,memberIDs:[],questions:[]});var t=f.ref("games/"+e+"/memberIDs").push({name:this.state.name}).key,s={};s["/games/"+e+"/answererID"]=t,f.ref().update(s),this.props.onSetUserID(t),this.props.onSetUserName(this.state.name),this.props.onSetRoomCode(e),this.props.onSetAnswerer(!0),this.setState({settingUpGame:!0})}},{key:"handleJoinRoomClick",value:function(){this.setState({joiningRoom:!0})}},{key:"isValidRoomCode",value:function(e){return f.ref("games/"+e).once("value").then((function(e){return e.exists()}))}},{key:"handleRoomCodeSubmit",value:function(e){var t=this;e.preventDefault();var s=this.state.roomCode;this.isValidRoomCode(s).then((function(e){if(e){var n=f.ref("games/"+s+"/memberIDs").push({name:t.state.name}).key;t.props.onSetRoomCode(s),t.props.onSetUserID(n),t.props.onSetUserName(t.state.name),t.props.onSetAnswerer(!1),t.setState({settingUpGame:!0})}else alert("Invalid room code!")}))}},{key:"render",value:function(){return this.state.settingUpGame?Object(b.jsx)(d.a,{to:"./setup"}):Object(b.jsx)("div",{className:"welcome-page-wrapper",children:Object(b.jsxs)("div",{className:"welcome-page",children:[Object(b.jsx)(j,{}),Object(b.jsx)("p",{className:"game-description",children:"Play Twenty Questions online with your friends!"}),Object(b.jsxs)("form",{className:"name-form",onSubmit:this.handleNameSubmit,children:[Object(b.jsx)("label",{htmlFor:"enter-name",className:"enter-name-label",children:"What's your name?"}),Object(b.jsx)("input",{className:"enter-name",id:"enter-name",type:"text",onChange:this.handleNameChange})]}),Object(b.jsx)("button",{className:"create-room",disabled:""===this.state.name,onClick:this.handleCreateRoomClick,children:"Create new room"}),Object(b.jsx)("button",{className:"join-room",disabled:""===this.state.name,onClick:this.handleJoinRoomClick,children:"Join room"}),this.state.joiningRoom&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("div",{className:"enter-room-code-label",children:"Enter room code:"}),Object(b.jsxs)("form",{className:"room-code-form",onSubmit:this.handleRoomCodeSubmit,children:[Object(b.jsx)("input",{className:"enter-room-code",id:"enter-room-code",type:"text",onChange:this.handleRoomCodeChange}),Object(b.jsx)("button",{type:"submit",className:"room-code-button",disabled:""===this.state.roomCode,children:"Submit"})]})]})]})})}}]),s}(n.Component),v=s(7),x=s.n(v),O=s(15),C=(s(50),function(e){Object(l.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(i.a)(this,s),(n=t.call(this,e)).state={thing:"",currentPlayers:[],beginningGame:!1,answererName:""},n.handleThingChange=n.handleThingChange.bind(Object(u.a)(n)),n.handleSubmitThing=n.handleSubmitThing.bind(Object(u.a)(n)),n}return Object(c.a)(s,[{key:"handleThingChange",value:function(e){this.setState({thing:e.target.value})}},{key:"componentDidMount",value:function(){var e=Object(O.a)(x.a.mark((function e(){var t=this;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Game setup loaded"),f.ref("games/"+this.props.roomCode+"/questions").remove(),f.ref("games/"+this.props.roomCode+"/memberIDs").on("value",(function(e){var s=[];e.forEach((function(e){s.push(e.val().name)})),t.setState({currentPlayers:s})})),f.ref("games/"+this.props.roomCode+"/started").on("value",(function(e){e.val()&&t.setState({beginningGame:!0})})),f.ref("games/"+this.props.roomCode+"/answererID").once("value",(function(e){f.ref("games/"+t.props.roomCode+"/memberIDs/"+e.val()).once("value",(function(e){t.setState({answererName:e.val().name}),console.log(e.val().name)}))}));case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){f.ref("games/"+this.props.roomCode+"/memberIDs").off(),f.ref("games/"+this.props.roomCode+"/started").off()}},{key:"handleSubmitThing",value:function(e){e.preventDefault();var t={};t["games/"+this.props.roomCode+"/started"]=!0,t["games/"+this.props.roomCode+"/thing"]=this.state.thing,f.ref().update(t)}},{key:"render",value:function(){return this.state.beginningGame?Object(b.jsx)(d.a,{to:"./game"}):Object(b.jsxs)("div",{className:"game-page game-setup-page",children:[Object(b.jsx)(j,{}),Object(b.jsxs)("h2",{className:"game-setup-header",children:["You're ",this.props.isAnswerer?"answering":"guessing"," this round!"]}),Object(b.jsxs)("div",{className:"room-code-box",children:[Object(b.jsx)("h3",{className:"send-the-code",children:"Send your friends this code:"}),Object(b.jsx)("h1",{className:"room-code",children:this.props.roomCode})]}),Object(b.jsxs)("div",{className:"current-players-list",children:[Object(b.jsx)("h3",{className:"current-players-header",children:"People playing:"}),Object(b.jsx)("h2",{children:this.state.currentPlayers.join(", ")})]}),this.props.isAnswerer?Object(b.jsxs)("form",{className:"thing-input-form",onSubmit:this.handleSubmitThing,children:[Object(b.jsx)("h2",{className:"thing-input-label",htmlFor:"thing-input-box",children:"What are you thinking of?"}),Object(b.jsx)("h4",{children:"(don't tell anyone!)"}),Object(b.jsx)("input",{className:"thing-input-box",id:"thing-input-box",type:"text",onChange:this.handleThingChange}),Object(b.jsx)("button",{type:"submit",disabled:""===this.state.thing,children:"Start game!"})]}):Object(b.jsx)("div",{children:Object(b.jsxs)("h3",{children:["Waiting for ",this.state.answererName," to pick a thing..."]})})]})}}]),s}(n.Component)),N=function(e){Object(l.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(i.a)(this,s),(n=t.call(this,e)).state={awaitQuestions:!0,questions:[]},n}return Object(c.a)(s,[{key:"componentDidMount",value:function(){var e=Object(O.a)(x.a.mark((function e(){var t=this;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({awaitQuestions:!0}),f.ref("games/"+this.props.roomCode+"/questions").on("child_changed",(function(e){if(t.state.awaitQuestions){var s={questionText:e.val().questionText,userName:e.val().userName,answer:e.val().answer,isGuess:e.val().isGuess},n=t.state.questions;n.push(s),t.setState({questions:n})}}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this.setState({awaitQuestions:!1})}},{key:"render",value:function(){var e=this;return Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{className:"question-log-title",children:"Answer log"}),0==this.state.questions.length?Object(b.jsx)("div",{className:"no-questions",children:"No questions answered!"}):Object(b.jsx)("div",{className:"question-log-table",children:this.state.questions.slice(0).reverse().map((function(t,s){return Object(b.jsxs)(a.a.Fragment,{children:[Object(b.jsx)("span",{className:"question-number",children:e.state.questions.length-s}),Object(b.jsxs)("span",{className:"question-log-name",children:[t.userName," ",t.isGuess?"guessed:":"asked:"]}),Object(b.jsx)("span",{className:"question-log-question",children:t.questionText}),Object(b.jsx)("span",{className:"question-log-answer "+(t.answer.startsWith("No")?"answer-no":"")+(t.answer.startsWith("Yes")?"answer-yes":""),children:t.answer})]},"q"+s)}))})]})}}]),s}(n.Component),w=(s(28),function(e){Object(l.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(i.a)(this,s),(n=t.call(this,e)).state={question:"",guess:"",finished:!1,answererName:""},n.handleQuestionChange=n.handleQuestionChange.bind(Object(u.a)(n)),n.handleGuessChange=n.handleGuessChange.bind(Object(u.a)(n)),n.handleQuestionSubmit=n.handleQuestionSubmit.bind(Object(u.a)(n)),n.handleGuessSubmit=n.handleGuessSubmit.bind(Object(u.a)(n)),n}return Object(c.a)(s,[{key:"handleQuestionChange",value:function(e){this.setState({question:e.target.value})}},{key:"handleGuessChange",value:function(e){this.setState({guess:e.target.value})}},{key:"componentDidMount",value:function(){var e=Object(O.a)(x.a.mark((function e(){var t=this;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:f.ref("games/"+this.props.roomCode+"/finished").on("value",(function(e){e.val()&&t.setState({finished:!0})})),f.ref("games/"+this.props.roomCode+"/answererID").once("value",(function(e){f.ref("games/"+t.props.roomCode+"/memberIDs/"+e.val()).once("value",(function(e){t.setState({answererName:e.val().name}),console.log(e.val().name)}))}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){f.ref("games/"+this.props.roomCode+"/finished").off()}},{key:"handleQuestionSubmit",value:function(e){e.preventDefault(),f.ref("games/"+this.props.roomCode+"/questions").push({timestamp:(new Date).getTime(),questionText:this.state.question,userName:this.props.userName,isGuess:!1,answer:null}),this.setState({question:""})}},{key:"handleGuessSubmit",value:function(e){e.preventDefault(),f.ref("games/"+this.props.roomCode+"/questions").push({timestamp:(new Date).getTime(),questionText:this.state.guess,userName:this.props.userName,isGuess:!0,answer:null}),this.setState({guess:""})}},{key:"render",value:function(){return this.state.finished?Object(b.jsx)(d.a,{to:"./end"}):Object(b.jsxs)("div",{className:"game-page guesser-page",children:[Object(b.jsx)(j,{}),Object(b.jsxs)("div",{className:"player-info-boxes",children:[Object(b.jsxs)("h3",{className:"player-name-box",children:["Name: ",this.props.userName]}),Object(b.jsxs)("h3",{className:"player-roomcode-box",children:["Room code: ",this.props.roomCode]})]}),Object(b.jsxs)("h3",{className:"thing-youre-thinking-of",children:[this.state.answererName," is thinking of something..."]}),Object(b.jsxs)("div",{className:"player-body",children:[Object(b.jsxs)("div",{className:"player-body-main",children:[Object(b.jsxs)("form",{className:"question-form",onSubmit:this.handleQuestionSubmit,children:[Object(b.jsx)("label",{className:"question-box-label",htmlFor:"question-input-box",children:"Ask a question:"}),Object(b.jsxs)("div",{className:"guesser-input-wrapper",children:[Object(b.jsx)("input",{className:"guesser-input",id:"question-input-box",type:"text",value:this.state.question,onChange:this.handleQuestionChange,placeholder:"Is it bigger than a breadbox?"}),Object(b.jsx)("button",{type:"submit",disabled:""===this.state.question,children:"Ask"})]})]}),Object(b.jsxs)("form",{className:"guess-form",onSubmit:this.handleGuessSubmit,children:[Object(b.jsx)("label",{className:"question-box-label",htmlFor:"guess-input-box",children:"Venture a guess:"}),Object(b.jsxs)("div",{className:"guesser-input-wrapper",children:[Object(b.jsx)("input",{className:"guesser-input",id:"guess-input-box",type:"text",value:this.state.guess,onChange:this.handleGuessChange,placeholder:"Bread"}),Object(b.jsx)("button",{type:"submit",disabled:""===this.state.guess,children:"Guess"})]})]})]}),Object(b.jsx)(N,{roomCode:this.props.roomCode})]})]})}}]),s}(n.Component)),y=function(e){Object(l.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(i.a)(this,s),(n=t.call(this,e)).state={questions:[],answer:"",thing:"",finished:!1},n.handleClickAnswer=n.handleClickAnswer.bind(Object(u.a)(n)),n}return Object(c.a)(s,[{key:"componentDidMount",value:function(){var e=Object(O.a)(x.a.mark((function e(){var t=this;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:f.ref("games/"+this.props.roomCode+"/questions").on("child_added",(function(e){var s={questionID:e.key,userName:e.val().userName,questionText:e.val().questionText,isGuess:e.val().isGuess};t.setState((function(e){return e.questions.push(s),e}))})),f.ref("games/"+this.props.roomCode+"/thing").once("value",(function(e){t.setState({thing:e.val()})})),f.ref("games/"+this.props.roomCode+"/finished").on("value",(function(e){e.val()&&t.setState({finished:!0})}));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){f.ref("games/"+this.props.roomCode+"/questions").off(),f.ref("games/"+this.props.roomCode+"/finished").off()}},{key:"handleClickAnswer",value:function(e){e.preventDefault();var t={};t["/games/"+this.props.roomCode+"/questions/"+this.state.questions[0].questionID+"/answer"]=e.target.value,f.ref().update(t),this.state.questions[0].isGuess&&e.target.value.startsWith("Yes")&&((t={})["/games/"+this.props.roomCode+"/finished"]=!0,t["/games/"+this.props.roomCode+"/winnerName"]=this.state.questions[0].userName,f.ref().update(t)),this.setState((function(e){return e.questions.shift(),e}))}},{key:"render",value:function(){var e=0===this.state.questions.length;return this.state.finished?Object(b.jsx)(d.a,{to:"./end"}):Object(b.jsxs)("div",{className:"game-page answerer-page",children:[Object(b.jsx)(j,{}),Object(b.jsxs)("div",{className:"player-info-boxes",children:[Object(b.jsxs)("h3",{className:"player-name-box",children:["Name: ",this.props.userName]}),Object(b.jsxs)("h3",{className:"player-roomcode-box",children:["Room code: ",this.props.roomCode]})]}),Object(b.jsx)("p",{children:"You are thinking of..."}),Object(b.jsx)("h2",{className:"thing-youre-thinking-of",children:this.state.thing}),Object(b.jsxs)("div",{className:"player-body",children:[Object(b.jsxs)("div",{className:"player-body-main",children:[e?Object(b.jsx)("h3",{className:"question-box",children:"Waiting for questions..."}):Object(b.jsxs)("div",{className:"question-box",children:[Object(b.jsxs)("h4",{className:"person-asking",children:[this.state.questions[0].userName," ",this.state.questions[0].isGuess?"guesses":"asks","..."]}),Object(b.jsx)("h3",{className:"question-asked",children:this.state.questions[0].questionText})]}),e||!this.state.questions[0].isGuess?Object(b.jsxs)("div",{className:"question-answer-buttons",children:[Object(b.jsxs)("div",{className:"big-answer-buttons",children:[Object(b.jsx)("button",{className:"yes-button",value:"Yes",disabled:e,onClick:this.handleClickAnswer,children:"Yes"}),Object(b.jsx)("button",{className:"no-button",value:"No",disabled:e,onClick:this.handleClickAnswer,children:"No"})]}),Object(b.jsxs)("div",{className:"small-answer-buttons",children:[Object(b.jsx)("button",{value:"Sometimes",disabled:e,onClick:this.handleClickAnswer,children:"Sometimes"}),Object(b.jsx)("button",{value:"Not sure",disabled:e,onClick:this.handleClickAnswer,children:"Not sure"}),Object(b.jsx)("button",{value:"Irrelevant",disabled:e,onClick:this.handleClickAnswer,children:"Irrelevant"})]})]}):Object(b.jsxs)("div",{className:"question-answer-buttons",children:[Object(b.jsxs)("div",{className:"big-answer-buttons",children:[Object(b.jsx)("button",{className:"yes-button",value:"Yes!",disabled:e,onClick:this.handleClickAnswer,children:"Yes!"}),Object(b.jsx)("button",{className:"no-button",value:"No",disabled:e,onClick:this.handleClickAnswer,children:"No"})]}),Object(b.jsx)("div",{className:"small-answer-buttons",children:Object(b.jsx)("button",{value:"Close!",disabled:e,onClick:this.handleClickAnswer,children:"Close!"})})]})]}),Object(b.jsx)(N,{roomCode:this.props.roomCode})]})]})}}]),s}(n.Component),k=(s(51),function(e){Object(l.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(i.a)(this,s),(n=t.call(this,e)).state={currentPlayers:[],winnerName:"",thing:"",nextAnswererSelected:!1,prevAnswererID:"",firstLoad:!0},n.setNextAnswerer=n.setNextAnswerer.bind(Object(u.a)(n)),n}return Object(c.a)(s,[{key:"componentDidMount",value:function(){var e=Object(O.a)(x.a.mark((function e(){var t,s=this;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:f.ref("games/"+this.props.roomCode+"/memberIDs").once("value",(function(e){var t=[];e.forEach((function(e){t.push({userID:e.key,userName:e.val().name})})),s.setState({currentPlayers:t})})),f.ref("games/"+this.props.roomCode+"/winnerName").once("value",(function(e){s.setState({winnerName:e.val()})})),f.ref("games/"+this.props.roomCode+"/thing").once("value",(function(e){s.setState({thing:e.val()})})),f.ref("games/"+this.props.roomCode+"/answererID").once("value",(function(e){s.setState({prevAnswererID:e.val()})})),t=f.ref("games/"+this.props.roomCode+"/answererID"),f.ref("games/"+this.props.roomCode+"/finished").on("value",(function(e){t.once("value",(function(e){s.props.onSetAnswerer(e.val()===s.props.userID)})),s.state.firstLoad||s.setState({nextAnswererSelected:!0}),s.setState({firstLoad:!1})}));case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){f.ref("games/"+this.props.roomCode+"/finished").off()}},{key:"setNextAnswerer",value:function(e){e.preventDefault();var t={};t["/games/"+this.props.roomCode+"/answererID/"]=e.target.value,t["/games/"+this.props.roomCode+"/started"]=!1,t["/games/"+this.props.roomCode+"/finished"]=!1,f.ref().update(t)}},{key:"render",value:function(){var e=this;return this.state.nextAnswererSelected?Object(b.jsx)(d.a,{to:"./setup"}):Object(b.jsxs)("div",{className:"game-page endgame-page",children:[Object(b.jsx)(j,{}),Object(b.jsxs)("h2",{className:"winner-announcement",children:[this.state.winnerName," won the game!"]}),Object(b.jsxs)("h3",{className:"thing-announcement",children:["The answer was ",this.state.thing,"."]}),this.props.isAnswerer?Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{className:"player-name-button-header",children:"Who's thinking of something next?"}),Object(b.jsx)("div",{children:this.state.currentPlayers.map((function(t){return Object(b.jsx)("button",{className:"player-name-button",value:t.userID,onClick:e.setNextAnswerer,children:t.userName},t.userID)}))})]}):Object(b.jsx)("div",{className:"player-name-button-header",children:"Waiting for the next answerer to be chosen..."})]})}}]),s}(n.Component)),S=function(e){Object(l.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(i.a)(this,s),(n=t.call(this,e)).state={userID:"",userName:"",roomCode:"",isAnswerer:!0},n.setAnswerer=n.setAnswerer.bind(Object(u.a)(n)),n.setRoomCode=n.setRoomCode.bind(Object(u.a)(n)),n.setUserID=n.setUserID.bind(Object(u.a)(n)),n.setUserName=n.setUserName.bind(Object(u.a)(n)),n}return Object(c.a)(s,[{key:"setAnswerer",value:function(e){this.setState({isAnswerer:e})}},{key:"setRoomCode",value:function(e){this.setState({roomCode:e})}},{key:"setUserID",value:function(e){this.setState({userID:e})}},{key:"setUserName",value:function(e){this.setState({userName:e})}},{key:"getRealPath",value:function(e){return"/breadbox"+e}},{key:"render",value:function(){var e=this;return Object(b.jsx)(m.a,{children:Object(b.jsxs)("div",{className:"app",children:[Object(b.jsx)(d.b,{exact:!0,path:this.getRealPath("/"),render:function(){return Object(b.jsx)(g,{onSetRoomCode:e.setRoomCode,onSetAnswerer:e.setAnswerer,onSetUserID:e.setUserID,onSetUserName:e.setUserName})}}),Object(b.jsx)(d.b,{exact:!0,path:this.getRealPath("/setup"),render:function(){return Object(b.jsx)(C,{roomCode:e.state.roomCode,isAnswerer:e.state.isAnswerer})}}),Object(b.jsx)(d.b,{exact:!0,path:this.getRealPath("/game"),render:function(){return e.state.isAnswerer?Object(b.jsx)(y,{userID:e.state.userID,userName:e.state.userName,roomCode:e.state.roomCode}):Object(b.jsx)(w,{userID:e.state.userID,userName:e.state.userName,roomCode:e.state.roomCode})}}),Object(b.jsx)(d.b,{exact:!0,path:this.getRealPath("/end"),render:function(){return Object(b.jsx)(k,{roomCode:e.state.roomCode,isAnswerer:e.state.isAnswerer,thing:e.state.thing,userID:e.state.userID,isPreviousAnswerer:e.state.isAnswerer,onSetAnswerer:e.setAnswerer})}})]})})}}]),s}(n.Component);r.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(S,{})}),document.getElementById("root"))}},[[52,1,2]]]);
//# sourceMappingURL=main.af06ffd3.chunk.js.map