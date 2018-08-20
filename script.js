'use strict';var _slicedToArray=function(){function a(b,c){var d=[],f=!0,g=!1,j=void 0;try{for(var l,k=b[Symbol.iterator]();!(f=(l=k.next()).done)&&(d.push(l.value),!(c&&d.length===c));f=!0);}catch(m){g=!0,j=m}finally{try{!f&&k['return']&&k['return']()}finally{if(g)throw j}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}(),board=Math.min(Math.floor(Math.min(window.innerWidth,window.innerHeight)/32),20);grid=new Isometric(board);var initProps={x:0,y:board-1,w:1,h:1,hue:20};num=new Num(initProps,Date.now()),control=new Control;var anchor=num.shoveCoords;control.anchor=anchor,control.update(anchor);var base=null,validExp=!1;window.expEq.style.visibility='hidden',window.exp.style.visibility='hidden';var state=-1;function updateNote(){var a='';switch(state++,state){case 0:a='What is a number?',window.next.textContent='Next \u203A',window.note.classList.remove('hidden'),window.overlay.classList.remove('hidden'),window.note.parentElement.classList.remove('done');break;case 1:a='Let us see if we can figure it out together...';break;case 2:a='Go ahead and pull the circle away from the box.',window.next.classList.add('hidden'),window.overlay.classList.add('hidden');break;case 3:a='As we generate more of the same boxes, the count increases.';break;case 4:a='So, now there are '+window.result.value+' boxes.',window.next.classList.remove('hidden'),window.overlay.classList.remove('hidden');break;case 5:a='A number, therefore, is nothing but a symbol used to express how many things are being referred to, or how much there is of some thing (OED).';break;case 6:a=window.result.value+' is a symbol denoting the amount of some thing (here boxes).';break;case 7:a='We can also say, '+window.result.value+' is same as: \n '+window.add.value;break;case 8:a='Addition is just repeatedly adding 1, till there are no more of that same thing left.';break;case 9:a='Now, try pushing the circle towards the box.',window.next.classList.add('hidden'),window.overlay.classList.add('hidden');break;case 10:a='As you let go of the circle, the number of boxes reduce.';break;case 11:a='Pushing removes boxes, and pulling puts more of them in there.',window.next.classList.remove('hidden'),window.overlay.classList.remove('hidden');break;case 12:a='See what happens if you push the circle all the way to the first box in one go.',window.next.classList.add('hidden'),window.overlay.classList.add('hidden');break;case 13:a='We just stacked all the boxes in a vertical tower as a group of '+window.result.value+' boxes.',window.next.classList.remove('hidden'),window.overlay.classList.remove('hidden'),state++;break;case 15:a='Now, try pulling the circle again.',window.next.classList.add('hidden'),window.overlay.classList.add('hidden');break;case 16:a='This time it puts more of the same group. So, instead of counting one box at a time, it is now counting each group at a time.',window.next.classList.remove('hidden'),window.overlay.classList.remove('hidden');break;case 17:a='And this is what multiplication is, repeated addition of a fixed number:\n '+window.add.value+' \n = '+window.mult.value;break;case 18:a='Try having the same amount of groups as there were boxes initially before the tower was formed.',window.next.classList.add('hidden'),window.overlay.classList.add('hidden');break;case 19:a='By adding the group same amount of times as the original number in the group we get an exponent:\n '+window.exp.value,window.next.classList.remove('hidden'),window.overlay.classList.remove('hidden');break;case 20:a='Exponent of 2 is a special case where the structure has same width, and height, thereby also called square.';break;case 21:a='Now, just like last time, push the circle all the way to first tower.',window.next.classList.add('hidden'),window.overlay.classList.add('hidden');break;case 22:var b=window.exp.value.split(' ^ ')[0];a='The number of boxes in the tower becomes the solution to the last multiplication:\n '+b+' x '+b+' = '+window.result.value,window.next.classList.remove('hidden'),window.overlay.classList.remove('hidden');break;case 23:a='Try repeating the last sequence of steps, to get same amount of this new group as the original number.',window.next.classList.add('hidden'),window.overlay.classList.add('hidden');break;case 24:var _window$exp$value$spl=window.exp.value.split(' ^ '),_window$exp$value$spl2=_slicedToArray(_window$exp$value$spl,2),c=_window$exp$value$spl2[0],d=_window$exp$value$spl2[1];a='This just extended the exponent to '+d+', which is the repeat multiplication of the original number:\n '+Array(+d).fill(+c).join(' x ')+' \n = '+window.exp.value,window.next.classList.remove('hidden'),window.overlay.classList.remove('hidden');break;case 25:a='Go ahead and continue exploring, or reset to start with 1 box.',window.next.textContent='Reset',window.overlay.classList.add('hidden');break;default:grid.reset(),num.reset(initProps),shove.update(initProps);var f=num.shoveCoords;control.anchor=f,control.update(f),window.help.textContent='Show Intro',window.next.classList.remove('hidden'),window.next.textContent='Reset',window.overlay.classList.add('hidden'),window.note.classList.add('hidden'),window.note.parentElement.classList.add('done'),window.result.value=1,window.add.value=1,window.mult.value=1,window.exp.value=1,window.expEq.style.visibility='hidden',window.exp.style.visibility='hidden';}window.note.textContent=a}function updateView(a){var _e$detail=a.detail,b=_e$detail.w,c=_e$detail.h;!base&&1<c&&(base=c,validExp=!0);var d=b*c;window.result.value=d,window.add.value=Array(b).fill(c).join(' + '),window.mult.value=c+' x '+b;var f;if(base){var g=Math.log(d)/Math.log(base);f=Math.trunc(g),validExp=1e-9>g-f,validExp?(window.expEq.style.visibility='visible',window.exp.style.visibility='visible',window.exp.value=base+' ^ '+Math.round(f)):(window.expEq.style.visibility='hidden',window.exp.style.visibility='hidden')}'update'===a.type?(2==state||9==state)&&updateNote():'end'===a.type&&(3==state||10==state||12==state&&1===b||15==state||18==state&&f!==void 0&&validExp||21==state&&1===b||23==state&&f!==void 0&&validExp)&&updateNote()}function handleHelpClick(){25>=state?(state=25,updateNote(),window.help.textContent='Show Intro'):(updateNote(),state=-1,window.help.textContent='Skip Intro \xBB',updateNote())}document.body.addEventListener('update',updateView),document.body.addEventListener('end',updateView),window.next.addEventListener('click',updateNote),window.help.addEventListener('click',handleHelpClick);function tick(){requestAnimationFrame(tick),grid.ctx.clearRect(0,0,grid.width,grid.height),control.render(),shove.render(),num.render()}updateNote(),tick();