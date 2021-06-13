let grid = document.querySelector('.grid')
let colors=['red','yellow','green','blue','purple','black'];
let width=5;///width of grid
let swidth=3;
let squares=[];
let ssquares=[];
let col=[];
let score = document.querySelector('.score');
let scorevalue;
let smallgrid=document.querySelector('.smallgrid');
let checkbutton = document.querySelector('.check');
let win=document.querySelector('.result');
let randomcolor=Math.floor(Math.random()*width*width);
let reset = document.querySelector('.reset')
console.log(randomcolor);
//let timer = document.querySelector('.timer');
score.innerHTML=180
reset.addEventListener('click',resetpage)

function resetpage()
{
    console.log("reset");
    console.log(window.location);
    
    let nextUrl=window.location.href;
    window.location.replace(nextUrl);
}
for(let i=0;i<width*width;i++)
{
    let div=document.createElement('div');
    div.setAttribute('id',i);
    div.setAttribute('draggable',true);
    let randomcolor=colors[Math.floor(Math.random()*colors.length)];
    div.style.backgroundColor=randomcolor;
    div.style.border='0.5px black solid';
    
    col.push(randomcolor);
    squares.push(div);
    grid.appendChild(div);

}
squares[randomcolor].style.backgroundColor='white';
for(let i=0;i<width*width;i++)
{
    let div=document.createElement('div');
    div.setAttribute('id',i);
    if(i>width && i<width*width-width && i%5!=4 && i%5!=0)
    {
        let rand=Math.floor(Math.random()*colors.length)
     
    let randomcolor=col[rand]
    col.splice(rand,1)
    div.style.backgroundColor=randomcolor;
    }
    else{
        div.style.backgroundColor='white';
    }
      ssquares.push(div);
      smallgrid.appendChild(div);
}
squares.forEach((obj)=>
{
    obj.addEventListener('dragstart',dragstart)
    obj.addEventListener('dragend',dragend)
    obj.addEventListener('drop',dragdrop)
    obj.addEventListener('dragover',dragover)
    obj.addEventListener('dragenter',dragenter)
    obj.addEventListener('dragleave',dragleave)
})

let initalid=0;
let finalid=0;
let colorofinitial;
let coloroffinal;
function dragstart()
{
    initalid=parseInt(this.id);
    colorofinitial=this.style.backgroundColor
  //  console.log(colorofinitial)
}
function dragdrop()
{
    finalid=parseInt(this.id);
    coloroffinal=this.style.backgroundColor;
    if(coloroffinal=='white' || coloroffinal==null || !this.id){
        console.log('come on my g',coloroffinal,finalid);
    squares[finalid].style.backgroundColor=colorofinitial;
    squares[initalid].style.backgroundColor=coloroffinal;
    }
    else{
        squares[initalid].style.backgroundColor=colorofinitial;
        squares[finalid].style.backgroundColor=coloroffinal;
    }

}
function dragend()
{
    let validmoves=[initalid+1,initalid-1,initalid+width,initalid-width]
   // console.log(validmoves.includes(finalid))
    if(validmoves.includes(finalid))
    {
        
        
    }
    else
    {
      
        squares[initalid].style.backgroundColor=colorofinitial;
        squares[finalid].style.backgroundColor=coloroffinal;
    
    }
    
}
function dragover(e)
{
    e.preventDefault()
}
function dragenter(e)
{
    e.preventDefault()
}
function dragleave(e)
{
    e.preventDefault()
}
checkbutton.addEventListener('click',check)
function check()
{

  let   result=[]
for(let i=0;i<25;i++)
{
    if(i>width && i<width*width-width && i%5!=4 && i%5!=0)
    {
         if(squares[i].style.backgroundColor==ssquares[i].style.backgroundColor)
         {
              result.push(1)
         }
    }
}
if(result.length==9)
{
    win.innerHTML="you won";
    scorevalue=score.innerHTML;
    removeEventListener('click',check);
    squares.forEach((obj)=>
{
    
    obj.removeEventListener('dragstart',dragstart)
    obj.removeEventListener('dragend',dragend)
    obj.removeEventListener('drop',dragdrop)
    obj.removeEventListener('dragover',dragover)
    obj.removeEventListener('dragenter',dragenter)
    obj.removeEventListener('dragleave',dragleave)
})
score.innerHTML=0;

   
    
}
else{
    win.innerHTML="not correct buddy";
}



}

let comp=setInterval(()=>
{
    if(score.innerHTML==0 || score.innerHTML<0)
    {
        
        score.innerHTML="youre score is "+scorevalue;
        console.log("the score",scorevalue)
        clearInterval(comp);
        
    }
    
    if(score.innerHTML>0 && !score.innerHTML.includes("youre score is ")){
    score.innerHTML=score.innerHTML-1;}

   
},1000);


