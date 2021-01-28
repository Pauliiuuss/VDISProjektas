(this["webpackJsonpdis-ui"]=this["webpackJsonpdis-ui"]||[]).push([[0],{155:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),s=t(53),l=t.n(s),o=t(13),i=t(2),c=t(3),m=t(7),u=t(6),d=t(4),h=(t(63),t(64),t(9)),p=t(14),g=t.n(p),v=new(function(){function e(){Object(i.a)(this,e)}return Object(c.a)(e,[{key:"login",value:function(e,a){return g.a.post("/dis-app/api/auth/signin",{username:e,password:a}).then((function(e){return e.data.accessToken&&localStorage.setItem("user",JSON.stringify(e.data)),e.data}))}},{key:"logout",value:function(){localStorage.removeItem("user")}},{key:"register",value:function(e,a,t){return g.a.post("/dis-app/api/auth/signup",{username:e,password:t})}},{key:"getCurrentUser",value:function(){return JSON.parse(localStorage.getItem("user"))}}]),e}()),f=t(23),b=t.n(f),E=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(i.a)(this,t),(n=a.call(this,e)).logOut=n.logOut.bind(Object(h.a)(n)),n.state={showModeratorBoard:!1,showAdminBoard:!1,currentUser:void 0},n}return Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=v.getCurrentUser();e&&this.setState({currentUser:e,showModeratorBoard:e.roles.includes("ROLE_MODERATOR"),showAdminBoard:e.roles.includes("ROLE_ADMIN")})}},{key:"logOut",value:function(){v.logout()}},{key:"render",value:function(){var e=this.state,a=e.currentUser,t=e.showModeratorBoard,n=e.showAdminBoard;return r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-expand navbar-dark bg-dark"},r.a.createElement("img",{src:b.a,alt:"logo",style:{width:"5rem"}}),r.a.createElement("div",{className:"navbar-nav mr-auto"},t&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(o.b,{to:"/dis-app/mod",className:"nav-link"},"Moderator Board")),n&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(o.b,{to:"/dis-app/admin",className:"nav-link"},"Admin Board")),a&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(o.b,{to:"/dis-app/user",className:"nav-link"},"User"))),a?r.a.createElement("div",{className:"navbar-nav ml-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(o.b,{to:"/dis-app/profile",className:"nav-link"},a.username)),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{href:"/dis-app/login",className:"nav-link",onClick:this.logOut},"LogOut"))):r.a.createElement("div",{className:"navbar-nav ml-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(o.b,{to:"/dis-app/register",className:"nav-link"},"Sign Up")))))}}]),t}(n.Component),N=t(19),y=t.n(N),k=t(15),j=t.n(k),O=t(20),S=t.n(O),w=function(e){if(!e)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"Privalomi laukai turi b\u016bti u\u017epildyti!")},C=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(i.a)(this,t),(n=a.call(this,e)).handleLogin=n.handleLogin.bind(Object(h.a)(n)),n.onChangeUsername=n.onChangeUsername.bind(Object(h.a)(n)),n.onChangePassword=n.onChangePassword.bind(Object(h.a)(n)),n.state={username:"",password:"",loading:!1,message:""},n}return Object(c.a)(t,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"handleLogin",value:function(e){var a=this;e.preventDefault(),this.setState({message:"",loading:!0}),this.form.validateAll(),0===this.checkBtn.context._errors.length?v.login(this.state.username,this.state.password).then((function(){a.props.history.push("/dis-app/profile"),window.location.reload()}),(function(e){a.setState({loading:!1,message:"Neteisingi prisijungimo vardas ar slapta\u017eodis!"})})):this.setState({loading:!1})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"mx-auto",style:{width:"30rem",marginTop:"5rem",backgroundColor:"#E2E2E2",paddingBottom:"1rem"}},r.a.createElement("img",{src:b.a,alt:"logo",style:{width:"30rem"}}),r.a.createElement(y.a,{onSubmit:this.handleLogin,ref:function(a){e.form=a}},r.a.createElement("div",{className:"form-group mx-auto mt-3",style:{width:"10rem"}},r.a.createElement("label",{htmlFor:"username"},"Prisijungimo vardas"),r.a.createElement(j.a,{type:"text",className:"form-control",name:"username",value:this.state.username,onChange:this.onChangeUsername,validations:[w]})),r.a.createElement("div",{className:"form-group mx-auto",style:{width:"10rem"}},r.a.createElement("label",{htmlFor:"password"},"Slapta\u017eodis"),r.a.createElement(j.a,{type:"password",className:"form-control",name:"password",value:this.state.password,onChange:this.onChangePassword,validations:[w]})),r.a.createElement("div",{className:"form-group text-center mt-5"},r.a.createElement("button",{className:"btn btn-secondary",disabled:this.state.loading},this.state.loading&&r.a.createElement("span",{className:"spinner-border spinner-border-sm"}),r.a.createElement("span",null,"Prisijungti"))),this.state.message&&r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:"alert alert-danger",role:"alert"},this.state.message)),r.a.createElement(S.a,{style:{display:"none"},ref:function(a){e.checkBtn=a}}))))}}]),t}(n.Component),x=t(55),U=function(e){if(!e)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"\u0160is laukas privalomas!")},B=function(e){if(!Object(x.isEmail)(e))return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"Nurodykite teising\u0105 el. pa\u0161t\u0105.")},P=function(e){if(e.length<4||e.length>20)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"Vartotojo vard\u0105 turi sudaryti nema\u017eiau kaip 4 simboliai.")},R=function(e){if(e.length<8||e.length>40)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"Slapta\u017eod\u012f turi sudaryti nema\u017eiau kaip 8 simboliai. Slapta\u017eodyje turi b\u016bti did\u017ei\u0173j\u0173 ir ma\u017e\u0173j\u0173 raid\u017ei\u0173 ir bent vienas skai\u010dius.")},A=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(i.a)(this,t),(n=a.call(this,e)).handleRegister=n.handleRegister.bind(Object(h.a)(n)),n.onChangeUsername=n.onChangeUsername.bind(Object(h.a)(n)),n.onChangeEmail=n.onChangeEmail.bind(Object(h.a)(n)),n.onChangePassword=n.onChangePassword.bind(Object(h.a)(n)),n.state={username:"",email:"",password:"",successful:!1,message:""},n}return Object(c.a)(t,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"handleRegister",value:function(e){var a=this;e.preventDefault(),this.setState({message:"",successful:!1}),this.form.validateAll(),0===this.checkBtn.context._errors.length&&v.register(this.state.username,this.state.email,this.state.password).then((function(e){a.setState({message:e.data.message,successful:!0})}),(function(e){a.setState({successful:!1,message:"\u012evyko klaida! Bandykite dar kart\u0105."})}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"card card-container"},r.a.createElement("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),r.a.createElement(y.a,{onSubmit:this.handleRegister,ref:function(a){e.form=a}},!this.state.successful&&r.a.createElement("div",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"username"},"Prisijungimo vardas"),r.a.createElement(j.a,{type:"text",className:"form-control",name:"username",value:this.state.username,onChange:this.onChangeUsername,validations:[U,P]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"email"},"El. pa\u0161tas"),r.a.createElement(j.a,{type:"text",className:"form-control",name:"email",value:this.state.email,onChange:this.onChangeEmail,validations:[U,B]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Slapta\u017eodis"),r.a.createElement(j.a,{type:"password",className:"form-control",name:"password",value:this.state.password,onChange:this.onChangePassword,validations:[U,R]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary btn-block"},"U\u017eregistruoti"))),this.state.message&&r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:this.state.successful?"alert alert-success":"alert alert-danger",role:"alert"},this.state.message)),r.a.createElement(S.a,{style:{display:"none"},ref:function(a){e.checkBtn=a}}))))}}]),t}(n.Component);function M(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{Authorization:"Bearer "+e.accessToken}:console.log("Nera token")}var D=new(function(){function e(){Object(i.a)(this,e)}return Object(c.a)(e,[{key:"getPublicContent",value:function(){return g.a.get("/dis-app/api/test/all")}},{key:"getUserBoard",value:function(){return g.a.get("/dis-app/api/test/user",{headers:M()})}},{key:"getModeratorBoard",value:function(){return g.a.get("/dis-app/api/test/mod",{headers:M()})}},{key:"getAdminBoard",value:function(){return g.a.get("/dis-app/api/test/admin",{headers:M()})}}]),e}()),I=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(i.a)(this,t),(n=a.call(this,e)).state={content:""},n}return Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;D.getUserBoard().then((function(a){e.setState({content:a.data})}),(function(a){e.setState({content:a.response&&a.response.data&&a.response.data.message||a.message||a.toString()})}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("header",{className:"jumbotron"},r.a.createElement("h3",null,this.state.content)))}}]),t}(n.Component),L=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(i.a)(this,t),(n=a.call(this,e)).state={content:""},n}return Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;D.getModeratorBoard().then((function(a){e.setState({content:a.data})}),(function(a){e.setState({content:a.response&&a.response.data&&a.response.data.message||a.message||a.toString()})}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("header",{className:"jumbotron"},r.a.createElement("h3",null,this.state.content)))}}]),t}(n.Component),_=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(e){var n;return Object(i.a)(this,t),(n=a.call(this,e)).state={content:""},n}return Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;D.getAdminBoard().then((function(a){e.setState({content:a.data})}),(function(a){e.setState({content:a.response&&a.response.data&&a.response.data.message||a.message||a.toString()})}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("header",{className:"jumbotron"},r.a.createElement("h3",null,this.state.content)))}}]),t}(n.Component),F=t(56),T=t(30),J=t.n(T),$=t(57),z=new(function(){function e(){Object(i.a)(this,e)}return Object(c.a)(e,[{key:"createUser",value:function(e){return g.a.post("/dis-app/api/admin/create",e,{headers:M()})}}]),e}()),V=function(e){if(0!==e.length)return e.length<4||e.length>20?r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"Prisijungimo vardas turi b\u016bti sudarytas i\u0161 ne ma\u017eiau kaip 4 simboli\u0173."," "):void 0},H=function(e){if(0!==e.length)return e.length<8||e.length>20||null===e.match(/^(?=.*[0-9])(?=.*[!@#$%^&+*])[a-zA-Z0-9!@#$%^+&*].{8,20}$/)?r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"Slapta\u017eodyje, kur\u012f turi sudaryti i\u0161 8\u201320 simboli\u0173, turi b\u016bti bent viena did\u017eioji raid\u0117, viena ma\u017eoji raid\u0117, vienas skai\u010dius ir vienas simbolis."):void 0},W=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(){var e;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=a.call.apply(a,[this].concat(r))).state={role:"",name:"",pass:"",message:"",successful:!1,selectedRole:"ROLE_SPEC",loading:!1,redirect:null,userReady:!1,currentUser:{username:""},roles:[]},e.handleCreate=function(){var a=Object($.a)(J.a.mark((function a(t){var n,r,s,l;return J.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(t.preventDefault(),e.setState({message:"",loading:!0}),n=e.state,r=n.name,s=n.pass,l=n.selectedRole,e.form.validateAll(),0!==e.checkBtn.context._errors.length){a.next=7;break}return a.next=7,z.createUser({username:r,password:s,role:l}).then((function(a){e.setState({message:a.data.message,successful:!0,name:"",pass:"",loading:!1})}),(function(a){var t=a.response&&a.response.data&&a.response.data.message||a.message||a.toString();e.setState({successful:!1,message:t,loading:!1})}));case 7:e.setState({loading:!1});case 8:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}(),e.handleSelectChange=function(a){var t=a.target.value;e.setState({selectedRole:t})},e.handleInputChange=function(a){e.setState(Object(F.a)({},a.target.name,a.target.value))},e}return Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=v.getCurrentUser();e||this.setState({redirect:"/dis-app/home"}),this.setState({currentUser:e,userReady:!0,roles:e.roles})}},{key:"render",value:function(){var e=this;if(this.state.redirect)return r.a.createElement(d.a,{to:this.state.redirect});var a=this.state,t=(a.currentUser,a.roles,a.name),n=a.pass;return r.a.createElement("div",{className:"container"},r.a.createElement("div",null,r.a.createElement(y.a,{className:"col-6 mx-auto mt-5",ref:function(a){e.form=a}},r.a.createElement("div",{className:"mb-3"},r.a.createElement("label",{htmlFor:"exampleInputUsername",className:"form-label"},"Sukurti vartotojo prisijungimo vard\u0105"),r.a.createElement(j.a,{name:"name",onChange:this.handleInputChange,validations:[V],value:t,type:"text",placeholder:"\u012eveskite prisijungimo vard\u0105",className:"form-control",id:"name","aria-describedby":"usernameHelp"}),r.a.createElement("div",{id:"usernameHelp",className:"form-text text-secondary"},"pvz.: VardasPavard\u0117")),r.a.createElement("div",{className:"mb-3"},r.a.createElement("label",{htmlFor:"exampleInputPassword1",className:"form-label"},"Sukurti vartotojo prisijungimo slapta\u017eod\u012f"),r.a.createElement(j.a,{name:"pass",value:n,onChange:this.handleInputChange,validations:[H],type:"text",placeholder:"\u012eveskite slapta\u017eod\u012f",className:"form-control",id:"pass"})),r.a.createElement("div",{className:"mb-3"},r.a.createElement("label",{htmlFor:"exampleInputPassword1",className:"form-label"},"Priskirti role"),r.a.createElement("select",{defaultValue:"ROLE_SPEC",onChange:this.handleSelectChange,className:"form-control",id:"exampleFormControlSelect1"},r.a.createElement("option",{value:"ROLE_SPEC"},"\u0160vietimo specialistas"),r.a.createElement("option",{value:"ROLE_PARENT"},"Glob\u0117jas"))),r.a.createElement("button",{type:"submit",onClick:this.handleCreate,className:"btn btn-success mr-3",disabled:this.state.loading},this.state.loading&&r.a.createElement("span",{className:"spinner-border spinner-border-sm"}),"Sukurti"),r.a.createElement(o.c,{to:"/admin",className:"btn btn-secondary mr-3"},"At\u0161aukti"),this.state.message&&r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:this.state.successful?"alert alert-success":"alert alert-danger",role:"alert"},this.state.message)),r.a.createElement(S.a,{style:{display:"none"},ref:function(a){e.checkBtn=a}})),r.a.createElement("h5",{className:"text-center mt-5"},"Naudotoj\u0173 s\u0105ra\u0161as"),r.a.createElement("table",{className:"table col-6 mt-3 mx-auto"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{scope:"col"},"#"),r.a.createElement("th",{scope:"col"},"Prisijungimo vardas"),r.a.createElement("th",{scope:"col"},"Rol\u0117"))))))}}]),t}(n.Component),G=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(){var e;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=a.call.apply(a,[this].concat(r))).state={redirect:null,userReady:!1,currentUser:{username:""},roles:[]},e}return Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=v.getCurrentUser();e||this.setState({redirect:"/dis-app/home"}),this.setState({currentUser:e,userReady:!0,roles:e.roles})}},{key:"render",value:function(){return this.state.roles.indexOf("ROLE_ADMIN")>0?r.a.createElement(W,null):r.a.createElement("h1",null,"Depending on role you will see content here. Parent and Spec main screens has not been created yet!")}}]),t}(n.Component),Z=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(){return Object(i.a)(this,t),a.apply(this,arguments)}return Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(E,null),r.a.createElement("div",{className:"container mt-3"},r.a.createElement(d.d,null,r.a.createElement(d.b,{exact:!0,path:["/dis-app","/dis-app/login"],component:C}),r.a.createElement(d.b,{exact:!0,path:"/dis-app/register",component:A}),r.a.createElement(d.b,{exact:!0,path:"/dis-app/profile",component:G}),r.a.createElement(d.b,{path:"/dis-app/user",component:I}),r.a.createElement(d.b,{path:"/dis-app/mod",component:L}),r.a.createElement(d.b,{path:"/dis-app/admin",component:_}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(o.a,null,r.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},23:function(e,a,t){e.exports=t.p+"static/media/logo.86652faf.png"},58:function(e,a,t){e.exports=t(155)},64:function(e,a,t){}},[[58,1,2]]]);
//# sourceMappingURL=main.1af27bf8.chunk.js.map