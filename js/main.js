let form = document.querySelector('.main-form')
let inoutTitle = document.querySelector('.text-input')
let inoutDate = document.querySelector('.inoutDate')
let inoutDescription = document.querySelector('textarea')

function eventListeners() {
    form.addEventListener('submit', infoErea)
}
eventListeners()

if (window.location.href.includes('?id=') === true) {
    document.querySelector('.submit-btn').style.display = 'none'
    document.querySelector('.edit-btn').style.display = 'block'

    let idEdited = window.location.href.split('=')
    let newId = idEdited[1]

    let name = (async () => {
        let url = `https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${newId}`
        let response = await fetch(url)
        let notes = await response.json()
        console.log(notes);

        inoutTitle.value = notes.title
        inoutDate.value = notes.dueDate
        inoutDescription.value = notes.description
    })();
}

document.querySelector('.edit-btn').addEventListener('click' , (e) => {
    e.preventDefault()

    let idEdited = window.location.href.split('=')

    let newId = idEdited[1]

    let name = (async () => {
        let url = `https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${newId}`
        let response = await fetch(url)
        let notes = await response.json()

        notes.id = newId
        notes.title = inoutTitle.value,
        notes.description= inoutDescription.value,
        notes.dueDate = inoutDate.value,
        notes.checked = notes.checked
        notes.updatedAt = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()} || ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        notes.createAt = notes.createAt

        
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notes),
        })

        window.location.href = 'index.html'

        inoutDate.value = ''
        inoutDescription.value = ''
        inoutTitle.value = ''
        

        document.querySelector('.submit-btn').style.display = 'block'
        document.querySelector('.edit-btn').style.display = 'none'

        
    })();

    function myFunction() {
        let x = document.getElementById("snackbar1");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    myFunction()

})

function infoErea(e) {
    e.preventDefault()

    if (inoutTitle.value === '') {
        document.querySelector('h5').style.display = 'block'
        form.style.boxShadow= '0 0 0 0.2rem #ff9997';
    } else {
        form.style.boxShadow= 'none';
        document.querySelector('h5').style.display = 'none'

    let name = (async () => {
        let url = 'https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos'
        let response = await fetch(url)
        let notes = await response.json()
        numId = notes.length

            
        
        
        let info = {
            // id: numId + 1,
            title: inoutTitle.value,
            description: inoutDescription.value,
            dueDate: inoutDate.value,
            checked: false,
            updatedAt: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()} || ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            createdAt: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()} || ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        }

        
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        })
        
        // console.log(info);

        inoutTitle.value = '';
        inoutDescription.value = '';
    
    })();
    function myFunction() {
        let x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    myFunction()
}
}