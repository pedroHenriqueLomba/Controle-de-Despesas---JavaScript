// Criando objeto de despesa
class Expense{
    constructor(year, month, day, category, description, price){
        this.year = year;
        this.month = month;
        this.day = day;
        this.category = category;
        this.description = description;
        this.price = price;
    }
    authData(){
        for (let attr in this) {
            if (this[attr] == null || this[attr] == "" || this[attr] == undefined) {
                return false           
            }
        }
        return true
    }
}

function getExpensesId(){
    id = localStorage.getItem("id")
    if(id == null){
        localStorage.setItem("id", 0)
    }
}

let nextId = () => {
    let next = parseFloat(localStorage.getItem("id")) + 1
    localStorage.setItem("id", next)
    return next
}

function registerExpense() {
    year = document.getElementById("year").value
    month = document.getElementById("month").value
    day = document.getElementById("day").value
    category = document.getElementById("category").value
    description = document.getElementById("description").value
    price = document.getElementById("price").value

    exp = new Expense(year, month, day, category, description, price)

    if (exp.authData()) {
        localStorage.setItem(nextId(), JSON.stringify(exp))
        document.getElementById("modal-title").className = "text-success"
        document.getElementById("modal-title").innerHTML = "Sucesso!"
        document.getElementById("modal-body").innerHTML = "A despesa foi cadastrada com sucesso"
        document.getElementById("modal-btn").className = "btn btn-success"
        document.getElementById("modal-btn").innerHTML = "Fechar"
        $('#modal').modal("show")
        document.getElementById("year").value = ""
        document.getElementById("month").value = ""
        document.getElementById("day").value = ""
        document.getElementById("category").value = ""
        document.getElementById("description").value = ""
        document.getElementById("price").value = ""
    }else{
        document.getElementById("modal-title").className = "text-danger"
        document.getElementById("modal-title").innerHTML = "Erro no cadastro de despesa!"
        document.getElementById("modal-body").innerHTML = "Por favor verifique se todos os dados foram preenchidos!"
        document.getElementById("modal-btn").className = "btn btn-danger"
        document.getElementById("modal-btn").innerHTML = "Voltar e corrigir"
        $('#modal').modal("show")
    }

}

function getAllExpenses() {
    if(localStorage.getItem("id")){
        let id = localStorage.getItem("id")
        let allExpenses = []
        for (let index = 1; index <= id; index++) {
            let exp = localStorage.getItem(index) 
            allExpenses.push(JSON.parse(exp))
        }
        return allExpenses
    }
}

function deleteExpense(id){
    localStorage.removeItem(id)
    window.location.reload()
}

function showExpenses(Expenses){
    Expenses.forEach((expense, idDespesa) => {
        if(expense != null && expense != undefined && expense != ""){      
            let deleteButton = document.createElement("button")
            deleteButton.className = "btn btn-danger"
            deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
            deleteButton.onclick = function () {
                deleteExpense(idDespesa+1)
            }
            let row = expensesTable.insertRow()
            row.insertCell(0).innerHTML = `${expense.day}/${expense.month}/${expense.year}`
            row.insertCell(1).innerHTML = expense.category
            row.insertCell(2).innerHTML = expense.description
            row.insertCell(3).innerHTML = `R$ ${expense.price}`
            row.insertCell(4).append(deleteButton)
        }
    });
}

function removeExpenses() {
    expensesTable.innerHTML = ""
}

function filterExpense(){
    let allExpenses = getAllExpenses()
    let year = document.getElementById("year").value == "" ? true : document.getElementById("year").value
    let month = document.getElementById("month").value == "" ? true : document.getElementById("month").value
    let day = document.getElementById("day").value == "" ? true : document.getElementById("day").value
    let category = document.getElementById("category").value == "" ? true : document.getElementById("category").value
    let description = document.getElementById("description").value == "" ? true : document.getElementById("description").value
    let price = document.getElementById("price").value == "" ? true : document.getElementById("price").value
    let filter = new Expense(year, month, day, category, description, price)
    let filteredExpenses = []
    // Lógica de filtro
    allExpenses.forEach(expense => {
        if(expense != null && expense != undefined && expense != ""){    
            if(filter.year == expense.year || filter.year == true){
                if(filter.month == expense.month || filter.month == true){
                    if(filter.day == expense.day || filter.day == true){
                        if(filter.category == expense.category || filter.category == true){
                            if(filter.description == expense.description || filter.description == true){
                                if(filter.price == expense.price || filter.price == true){
                                    filteredExpenses.push(expense)
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    removeExpenses()
    showExpenses(filteredExpenses)
}