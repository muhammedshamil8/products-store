let todoList = JSON.parse(localStorage.getItem('todoList')) || [{}];


function todoListrender() {
     let todoListHtml = '';

     for (let i = 0; i < todoList.length; i++) {
          const todoObject = todoList[i];
          // const name = todoObject.name;
          // const duedate = todoObject.duedate;
          const { name, companyname } = todoObject;
          const html = `
          <tr class="tr">
     <td >${name}</td>
     <td > ${companyname}</td>
          <td class="delete-btn-td"><button  onclick="
          const confirmation = confirm('Are you sure you want to delete the product?');
   
     if (confirmation) {
          todoList.splice(${i},1);
          todoListrender();
     saveTostorage();
     }

          " class="delete-btn">Delete</button></td>
     </tr>

     
          `;
          todoListHtml += html;

     };
     // console.log(todoListHtml);
     document.querySelector('.js-todolist-table').innerHTML = todoListHtml;
     saveTostorage();

}

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
          alert('Please fill product_name fields.');
     }

}
function saveTostorage() {
     localStorage.setItem('todoList', JSON.stringify(todoList));
}
function resetList() {
     todoList.splice(0);
     todoList = [];
     todoListrender();
     saveTostorage();
     localStorage.removeItem('todoList');
    
}

console.log(todoListrender());

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
