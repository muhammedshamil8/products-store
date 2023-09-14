function displayOfflineMessage() {
     const offlineMessage = `
       <div class="offline-message">
         <p>You are currently offline. Some features may not be available.</p>
       </div>
     `;
     document.body.insertAdjacentHTML('afterbegin', offlineMessage);
   }
   
   if (!navigator.onLine) {
     displayOfflineMessage();
   }
   

let todoList = JSON.parse(localStorage.getItem('todoList')) || [{}];


function todoListrender() {
     let todoListHtml = '';

    todoList.forEach((todoObject,index) => {
     
  
          const { name, companyname } = todoObject;
          const html = `
          <tr class="tr">
     <td >${name}</td>
     <td > ${companyname}</td>
          <td class="delete-btn-td"><button  class="delete-btn js-delete-todo-table">Delete</button></td>
     </tr>

     
          `;
          todoListHtml += html;

    });
     // console.log(todoListHtml);
     document.querySelector('.js-todolist-table').innerHTML = todoListHtml;
     saveTostorage();

     document.querySelectorAll('.js-delete-todo-table')
     .forEach((deleteButton,index)=>{
          deleteButton.addEventListener('click',()=>{
               const confirmation = confirm('Are you sure you want to delete the product?');
   
               if (confirmation) {
                    todoList.splice(index,1);
                    todoListrender();
               saveTostorage();
               }
          })
     })
};
document.querySelector('.js-add-btn')
.addEventListener('click',()=>{
     Addtodo();
})
function Addtodo() {
    
     const todoInputname = document.querySelector('.js-todo');
     const todoInputcompanyname = document.querySelector('.js-todo2');

     const name = todoInputname.value;
     const companyname = todoInputcompanyname.value;

     if (name) {
          todoList.push({
               // name:name,
               // duedate:duedate
               name,
               companyname
          });
          // console.log(todoList);
          todoInputname.value = '';
          todoInputcompanyname.value = '';
          todoListrender();
          saveTostorage();
          const buttonElement = document.querySelector('.js-add-btn');

          if (buttonElement.innerText === 'Add') {
            buttonElement.innerText = 'Added';
            buttonElement.classList.add('is-Added');
          
            
            setTimeout(() => {
              buttonElement.innerText = 'Add';
              buttonElement.classList.remove('is-Added');
            }, 2000); 
          }
     } else {
          alert('Please fill product name fields.');
     }

}
function saveTostorage() {
     localStorage.setItem('todoList', JSON.stringify(todoList));
}
function resetList() {
     // todoList.splice(0);
     todoList = [];
     todoListrender();
     saveTostorage();
     localStorage.removeItem('todoList');
    
}

// console.log(todoListrender());

function confirmReset() {
     const confirmation = confirm('Are you sure you want to clear the list?');

     if (confirmation) {
          const buttonElement = document.querySelector('.js-reset-btn');

          if (buttonElement.innerText === 'Reset list') {
            buttonElement.innerText = 'Reseted';
            buttonElement.classList.add('is-reset');
          
            
            setTimeout(() => {
              buttonElement.innerText = 'Reset list';
              buttonElement.classList.remove('is-reset');
            }, 2000); 
          }
          resetList(); 
     }
}

function searchProducts() {
     var input, filter, table, tr, td, i, txtValue;
     input = document.getElementById("myInput");
     filter = input.value.toUpperCase();
     table = document.getElementById("myTable");
     tr = table.getElementsByTagName("tr");
     for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
               txtValue = td.textContent || td.innerText;
               if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
               } else {
                    tr[i].style.display = "none";
               }
          }
     }
}
function clearFilter() {
     var input = document.getElementById("myInput");
     input.value = ""; 
     searchProducts(); 
}
