(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{43:function(e,n,t){},44:function(e,n,t){"use strict";t.r(n);var c=t(18),r=t.n(c),u=t(19),o=t(3),a=t(1),i=t(4),s=t.n(i),d=t(0),l=function(e){return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)("li",{id:e.person.id,children:[" ",e.person.name," ",e.person.number,"  "]},e.person.name),Object(d.jsx)("button",{onClick:function(){return e.handleDelete(e.person.id,e.person.name)},children:" Delete "})]})},j=function(e){return Object(d.jsx)("ul",{children:e.persons.filter((function(n){return n.name.toLowerCase().match(e.search.toLowerCase())})).map((function(n){return Object(d.jsx)(l,{person:n,handleDelete:e.handleDelete},n.id)}))})},h=function(e){return Object(d.jsxs)("form",{onSubmit:e.AddPerson,children:[Object(d.jsxs)("div",{children:["name: ",Object(d.jsx)("input",{value:e.newName,onChange:e.handleName}),"number: ",Object(d.jsx)("input",{value:e.newNumber,onChange:e.handleNumber})]}),Object(d.jsx)("div",{children:Object(d.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){return Object(d.jsx)("form",{children:Object(d.jsxs)("div",{children:["Search: ",Object(d.jsx)("input",{type:"search",value:e.search,onChange:e.handleSearch})]})})},f="/api/persons",m=function(){return s.a.get(f).then((function(e){return e.data}))},O=function(e){return s.a.post(f,e).then((function(e){return e.data}))},p=function(e,n){return s.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},x=function(e){return s.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},v=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),i=Object(o.a)(r,2),s=i[0],l=i[1],f=Object(a.useState)(""),v=Object(o.a)(f,2),w=v[0],g=v[1],N=Object(a.useState)(""),S=Object(o.a)(N,2),C=S[0],k=S[1],y=Object(a.useState)(null),A=Object(o.a)(y,2),D=A[0],T=A[1],P=Object(a.useState)(""),E=Object(o.a)(P,2),I=E[0],J=E[1];Object(a.useEffect)((function(){m().then((function(e){c(e)}))}),[]);var L=function(e){var n=e.message,t=e.type;return null===n?null:Object(d.jsx)("div",{className:t,children:n})};return Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Phonebook"}),Object(d.jsx)(b,{search:C,handleSearch:function(e){k(e.target.value)}}),Object(d.jsx)("h2",{children:" Add a new "}),Object(d.jsx)(L,{message:D,type:I}),Object(d.jsx)(h,{AddPerson:function(e){e.preventDefault();var n={name:s,number:w},r=Object(u.a)(t).findIndex((function(e){return e.name===s}));r>-1?window.confirm(s+" Already exists, would you like to update their number?")&&p(t[r].id,n).then((function(e){c(t.map((function(n){return n.id===e.id?e:n}))),T("Added "+s),J("sucess"),setTimeout((function(){T(null)}),5e3)})).catch((function(e){J("error"),T("Could not update "+s),setTimeout((function(){T(null)}),5e3)})):O(n).then((function(e){c(t.concat(e)),T("Added "+s),J("sucess"),setTimeout((function(){T(null)}),5e3)})).catch((function(e){J("error"),T("Could not create "+s),setTimeout((function(){T(null)}),5e3)}))},newName:s,handleName:function(e){l(e.target.value)},newNumber:w,handleNumber:function(e){g(e.target.value)}}),Object(d.jsx)("h2",{children:"Numbers"}),Object(d.jsx)(j,{persons:t,search:C,handleDelete:function(e,n){window.confirm("Would you like to delete "+n+" ?")&&x(e).then((function(r){console.log(n+" was deleted"),c(t.filter((function(n){return n.id!==e})))})).catch((function(e){J("error"),T("Could not remove "+s),setTimeout((function(){T(null)}),5e3)}))}})]})};t(43);r.a.render(Object(d.jsx)(v,{}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.45e89434.chunk.js.map