function addDataToLocalStorage(todo) {
    var actualTodoList = window.localStorage.getItem('todolist')
    actualTodoList = JSON.parse(actualTodoList)
    var newTodo = {
        todo: todo,
        completed: false
    }
    actualTodoList.push(newTodo)
    var newTodoList = actualTodoList
    window.localStorage.setItem('todolist', JSON.stringify(newTodoList))
    addItemToList(newTodo)
}

function addItemToList(newItem, newElementIndex) {
    var node = document.createElement("li");
    node.setAttribute('class', 'list-group-item list-group-item-action');
    var textnode = document.createTextNode(newItem.todo);
    node.appendChild(textnode);
    // Boton de Accion
    var button = document.createElement("button");
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'close');
    button.setAttribute('aria-label', 'Close');
    var span = document.createElement("span");
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times;'
    button.appendChild(span)
    node.appendChild(button)

    // Append to <ul>
    document.getElementById("listGrp").appendChild(node);
}

function deleteItemLocalStorage(index) {
    var actualTodoList = window.localStorage.getItem('todolist')
    actualTodoList = JSON.parse(actualTodoList)
    // Borramos del Array
    actualTodoList.splice(index, 1)
    // Guardamos nuevo Array
    var newTodoList = actualTodoList
    window.localStorage.setItem('todolist', JSON.stringify(newTodoList))
    deleteItemOfList(index)
}

function deleteItemOfList(index) {
    var ul = document.getElementById('listGrp');
    ul.removeChild(ul.childNodes[index])
}

function bootstrapData() {
    // if Exists data do nothing. If already data retrieve it
    if (window.localStorage.getItem('todolist') != null) {
        // Hay datos
        var todolist = JSON.parse(window.localStorage.getItem('todolist'))
        // Build List
        var list = ''
        for (var todo of todolist) {
            list += `<li class="list-group-item list-group-item-action">${todo.todo}
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </li>`
        }
        // Append to View
        document.getElementById("listGrp").innerHTML = list
    } else {
        // No hay datos previos
        // Clean current Localstorage
        window.localStorage.removeItem('todolist')
        // Create BootstrapData
        var todolist = [{
            todo: 'Visit Brazil',
            completed: false
        }, {
            todo: 'Learn how to Surf',
            completed: false
        }, {
            todo: 'Get a Sony Alpha Camera',
            completed: false
        }]
        // Build List
        var list = ''
        for (var todo of todolist) {
            list += `<li class="list-group-item list-group-item-action">${todo.todo}
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </li>`
        }
        // Append to View
        document.getElementById("listGrp").innerHTML = list
        // Save data to localStorage
        window.localStorage.setItem('todolist', JSON.stringify(todolist))
    }
}

// Consume Api
async function catsFacts() {
    var facts = await $.get('https://catfact.ninja/fact?max_length=140').catch(err => console.log(err)).promise()
    $('#fact').text(facts.fact)
}

document.addEventListener('DOMContentLoaded', (event) => {
    bootstrapData()
    catsFacts()
    // Use this Listener to manage ids clicked independent if the user deleted from
    // beggining or end, this way we don't append statics ids with onclick on element
    $("#listGrp").on("click", "li", function () {
        deleteItemLocalStorage($(this).index())
    });

})