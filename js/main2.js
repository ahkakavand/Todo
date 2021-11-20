let ul = document.querySelector('.main-todo')
let numId;

document.addEventListener('click', (e) => {

    if (e.target.classList.contains('fa-trash-alt')) {

        document.querySelector('#modalDelte').style.display = 'block'
        document.querySelector('.overlay').style.display = 'block'

        let titleBox = document.querySelector('#titleModal').innerText = `title : ${e.target.parentElement.parentElement.querySelector('label').innerText}`
        let dateBox = document.querySelector('#dateModal').innerText = `dueDate : ${e.target.parentElement.querySelector('span').innerText}`
        let desBox = document.querySelector('#decModal').innerText = `description : ${e.target.parentElement.parentElement.parentElement.querySelector('p').innerText}`


        let todo = e.target.parentElement.parentElement.parentElement
        numId = e.target.parentElement.parentElement.parentElement.id

        document.querySelector('.yesBox').addEventListener('click', () => {
            console.log('yes');
            document.querySelector('#modalDelte').style.display = 'none'
            document.querySelector('.overlay').style.display = 'none'

            todo.remove()

            fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${numId}`, {
                method: 'DELETE'
            })

            function myFunction() {
                let x = document.getElementById("snackbar2");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);
            }
            myFunction()
        })

        document.querySelector('.noBox').addEventListener('click', () => {
            document.querySelector('#modalDelte').style.display = 'none'
            document.querySelector('.overlay').style.display = 'none'
        })
    }
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-pencil-alt')) {
        numId = e.target.parentElement.parentElement.parentElement.id
        window.location.href = `index.html?id=${numId}`
    }
})

document.addEventListener('DOMContentLoaded', () => {
    (async () => {
        let url = 'https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos'
        let urlNum;

        if (window.location.href.includes('=') === true) {
            let getUrlNew = window.location.href.split('=')[1];
            urlNum = `https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos?page=${getUrlNew}&limit=10`
        } else {
            urlNum = `https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos?page=1&limit=10`
            window.location.href = 'todo-list.html?page=1'
        }


        let response = await fetch(url)
        let notes = await response.json()

        let responseNum = await fetch(urlNum)
        let notesNum = await responseNum.json()

        console.log(notes);

        notesNum.forEach(item => {
            let li = document.createElement('li')
            li.id = item.id
            li.classList = 'main-item'

            let template = `
            <div class="content-box">
            <div class="content-box">
                <input class="check" type="checkbox" ${item.checked == false ? ' ' : 'checked' }>
                <label class="${item.checked == false ? ' ' : 'checkTest' }">${item.title}</label>
            </div>
            <div class="icon-box">
                <span class="dateClass" >${item.dueDate}</span>
                <i class="fas fa-pencil-alt"></i>
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
        <p>${item.description}</p>
        `
            li.innerHTML = template
            ul.append(li)
        });

        let numPage = Math.ceil(notes.length / 10)

        let ulPageNumber = document.createElement('ul')
        ulPageNumber.classList = 'page-menu'

        for (let i = 1; i <= numPage; i++) {
            let li = document.createElement('li')
            li.classList = 'page-item'
            li.id = i
            let tem = `<button class="pageBtnMenu">${i}</button>`
            li.innerHTML = tem
            ulPageNumber.appendChild(li)
        }

        let mainPageNumber = document.getElementById('main-page-number')
        mainPageNumber.appendChild(ulPageNumber)

        mainPageNumber.addEventListener('click', (e) => {
            let pageClicekd;
            if (e.target.classList.contains('pageBtnMenu')) {
                pageClicekd = e.target.parentElement.id
            } else {
                pageClicekd = 1
            }
            window.location.href = `todo-list.html?page=${pageClicekd}`
        })

        let numPageInfo = window.location.href.split('=')[1]
        document.getElementById(numPageInfo).firstChild.style.background = '#1266f1'
        document.getElementById(numPageInfo).firstChild.style.color = '#fcfcfc'
        document.getElementById(numPageInfo).firstChild.style.borderRadius = '3px'
    })();
})

let idForNote;

ul.addEventListener('click', (e) => {
    if (e.target.classList.contains('check')) {
        idForNote = e.target.parentElement.parentElement.parentElement.id
        let name = (async () => {
            let url = 'https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos'
            let response = await fetch(url)
            let notes = await response.json()
            numId = notes.length
        })();

        (async () => {
            let url = `https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${idForNote}`
            let response = await fetch(url)
            let notes = await response.json()

            if (notes.checked === false) {

                notes.id = idForNote
                notes.title = notes.title,
                    notes.description = notes.description,
                    notes.duDate = notes.duDate,
                    notes.checked = true
                notes.updatedAt = notes.updatedAt,
                    notes.createAt = notes.createAt


                fetch(url, {
                    method: 'PUT', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(notes),
                })

            } else if (notes.checked === true) {
                notes.id = idForNote
                notes.title = notes.title,
                    notes.description = notes.description,
                    notes.duDate = notes.duDate,
                    notes.checked = false
                notes.updatedAt = notes.updatedAt,
                    notes.createAt = notes.createAt

                fetch(url, {
                    method: 'PUT', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(notes),
                })
            }
        })();
        if (e.target.parentElement.parentElement.parentElement.querySelector('label').classList.contains('checkTest') === false) {
            e.target.parentElement.parentElement.parentElement.querySelector('label').classList = 'checkTest'
        } else {
            e.target.parentElement.parentElement.parentElement.querySelector('label').classList = ' '
        }
    }
})