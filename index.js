let text=document.getElementsByClassName('text')[0];
let div,check,span,tasklist,p,newValue,k;
let flag=false;

function setlocal(arr){
	localStorage.setItem('itemList',JSON.stringify(arr));
}
function getlocal(){
  let local=localStorage.getItem('itemList');
  if(local===null)
    arr=[];
  else
    arr=JSON.parse(local);
  return arr;
 }
 
// adding item
text.addEventListener('keyup',function(event){
  var txt=event.target.value;
  if(txt.length!==0)
  {
    // keycode for  enter  key
    if(event.keyCode===13)
    {     
      // retrieving item from localStorage
      let arr=getlocal();
  
      //  condition for update
      if(flag===true)
      {
      	var d;
        for(let i=0;i<arr.length;i++){
          // comparing oldvalue (k) 
          if(arr[i].itemName===k){
            d=document.getElementsByClassName('item');
            //d=document.getElementById(k);
            d[i].firstElementChild.innerText=txt;
            //d.firstElementChild.innerText=txt;
            arr[i].itemName=txt;
            text.value="";
			      setlocal(arr);
            break;
          }
        }
		
        // for inserting new item
        flag=false;
      }
	  else{
		    let ID=Date.now();
      	arr.push({id:ID,itemName:txt,check:false, del:txt+txt});
        setlocal(arr);      	
		
        // creating div with item class
        div=document.createElement('div');
        div.setAttribute('class','item');
		    div.setAttribute('id',txt+txt);
        
        // appending <p> to <div>
        p=document.createElement('p');
        p.innerHTML=txt;
		    p.setAttribute('id',ID+txt+txt);
        div.appendChild(p);
		
        // adding checkbox and X button
        check=document.createElement('div');
        check.setAttribute('class','check');
		
        //checkbox
        checkbox=document.createElement('input');
        checkbox.setAttribute('type','checkbox');
		    checkbox.setAttribute('id',txt+txt+ID);
		
        checkbox.addEventListener('change', function (){
          checkItem(ID);
        });

        // appending checkbox to check class div
        check.appendChild(checkbox);

        // X button
        span=document.createElement('span');
        span.innerHTML='X&nbsp;&nbsp;';

        var i=document.createElement('i');
        i.setAttribute('class','fa fa-edit');

        i.addEventListener('click',function(){
          updateItem(ID);
        });

        // appending X to check class div
        check.appendChild(span);

        // appending edit icon to check class div
        check.appendChild(i);
        
        // appending check class to item class
        div.appendChild(check);

        // appending class item to class tasklist
        tasklist=document.getElementsByClassName('tasklist')[0];      
        tasklist.appendChild(div);

        // emptying the text box
        text.value=""; 

        // clicking on X button
        span.addEventListener('click',function(){
            deleteItem(ID);
        });   
    	}
        localStorage.setItem('itemList',JSON.stringify(arr));
        //location.reload();
      }
  }
  else
    alert('Field Required');
});

// showing item
let html="";
window.onload=show;
function show(){
	//localStorage.clear();
    let arr=getlocal();
    var d;
    if(arr.length!==0){
      arr.forEach(function(value,index){
        if(value!==null || value!=="")
        {
          d=document.createElement('div');
          d.setAttribute('class','item');
          //d.setAttribute('id',value.itemName);
          d.setAttribute('id',value.del);
          document.getElementsByClassName('tasklist')[0].appendChild(d);
          
          if(value.check===true)
          {
            html+=`
            <p style="text-decoration:line-through;" id=${value.id}${value.del}>${value.itemName}</p>
            <div class="check">
              <input type="checkbox" id=${value.del}${value.id} onchange="checkItem(${value.id})" checked />
              <span class=${value.id} onclick="deleteItem(${value.id})">X&nbsp;&nbsp;</span>
              <i class="fa fa-edit" onclick="updateItem(${value.id})"></i>
            </div>`;  
          }else{
            html+=`
            <p id=${value.id}${value.del} style="text-decoration:none;">${value.itemName}</p>
            <div class="check">
              <input type="checkbox" id=${value.del}${value.id} onchange="checkItem(${value.id})"/>
              <span class=${value.id} onclick="deleteItem(${value.id})">X&nbsp;&nbsp;</span>
              <i class="fa fa-edit" onclick="updateItem(${value.id})"></i>
            </div>`;
          }
		  //d.innerHTML=html;
		  //html="";
        }
        d.innerHTML=html;
		  html="";

      });
    }
}

// delete items
function deleteItem(index){
  let arr=getlocal();
  
  let id=arr.find(function(value){
	  return value.id==index;
  });
  console.log(index,id);
  var itemdiv=document.getElementById(id.del);
  arr.splice(arr.indexOf(id),1);
  setlocal(arr);
  document.getElementsByClassName('tasklist')[0].removeChild(itemdiv);
}

// updating item
function updateItem(index){

  flag=true;
  newValue=document.getElementsByClassName('text')[0];
  let arr=getlocal();
  
    for(let i=0;i<arr.length;i++){
      if(arr[i].id===index){
      	k=arr[i].itemName;
        newValue.value=arr[i].itemName;
        break;
      }
  }
}

// checkbox item
function checkItem(index){
   let arr=getlocal();
   let val=arr.find(function(value){
	if(value.id==index)
		return value;
  });
  console.log(val,typeof index)
  var checkBox=document.getElementById(val.del+index);
  var p=document.getElementById(index+val.del);
  index=arr.indexOf(val);
  
  if(checkBox.checked===true)
  {
    //console.log('checked');
    arr[index].check=true;
	  console.log(index,p);
    p.style.textDecoration="line-through";
  }
  else{
    //console.log('not checked');
    arr[index].check=false;
    p.style.textDecoration="none";
  }
  setlocal(arr);
}
