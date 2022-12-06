const Addbtn = document.querySelector('.addbtn')
const formcard = document.querySelector('.form')
const Cancelbtn = document.querySelector('.cancel')
const cover = document.querySelector('.cover')
const BookAddbtn = document.querySelector('.add')
const BookName = document.querySelector('.BookName')
const BookAuthor = document.querySelector('.BookAuthor')
const Pages = document.querySelector('.Pages')
const Language = document.querySelector('.Language')

const completedPages = document.querySelector('.completedPages')
const maincontainer = document.querySelector('.maincontainer')
const EditBookDetailsBtn = document.querySelectorAll('.Edit')
const Editbtn = document.querySelector('.Edit')
const checkbox = document.getElementById('checkbox')
const Selectel = document.getElementById('status')

const DeleteLocalStorage = document.querySelector('.DeleteLocalStorage')

Selectel.onchange = (ev)=>{
    let index = Selectel.selectedIndex
    let Options = Selectel.options[index].innerText
}


let BookLocalstorage = JSON.parse(localStorage.getItem('Data')) || []

let TotalBooks = 0
let completedBooks = 0
let TotalPages = 0
let PagesRead = 0
let Id = 0



function showformcard() {
    formcard.style.display = 'flex'
    cover.style.display = 'block'

}

function Canceltoadd() {
    formcard.style.display = 'none'
    cover.style.display = 'none'
    document.body.style.overflow = "scroll"

    BookAddbtn.classList.remove('deactive')

}

function AddBook() {
    // const Id = document.getElementById('id')
    let PagesVal = +Pages.value
    let comPages = +completedPages.value
    if(PagesVal < comPages){
        alert('read pages is not be more then Total Pages')
        return
    }
    
    else if (BookName.value === '' || BookAuthor.value === '' ||
        Pages.value === '' || Language.value === '' || completedPages.value === '') 
        {

        alert('Plz Enter All Details')
        return
    }
    else {
       
        var select = document.getElementById('status');
        
        this.name = BookName.value
        this.author = BookAuthor.value
        this.Pages = +Pages.value
        this.language = Language.value
        this.completedPages = +completedPages.value
        this.option = select.options[select.selectedIndex].innerText


        let data = {
            Id: Id,
            name: this.name,
            author: this.author,
            Pages: this.Pages,
            ReadPages:this.completedPages,
            Language: this.language,
            completeorNot:this.option

        }

        BookLocalstorage.push(data)
        localStorage.setItem('Data', JSON.stringify([...BookLocalstorage]))

        const bookCard = document.createElement('div')
        bookCard.classList.add('bookCard')
        bookCard.setAttribute('id', Id)

        bookCard.innerHTML = `
        <div class="mybook">
        <h3>${this.name}</h3>
        <p>${this.author}</p>
    </div>
    

    
    <div class="pages">
    <h4>Number of Pages :  <span id="Pages"> ${this.Pages}</span></h4>
    <h4>PagesRead: <span id="readPages">${this.completedPages}</span></h4>
    <h4>Language : <span id="language">${this.language}</span> </h4>
    <h4>Completed : <span id="completed">${this.option}</span> </h4>


</div>


            <button class ="Removebtn">Remove</button>
       
        `
        maincontainer.appendChild(bookCard)
        Canceltoadd()
        Id++         
    }
    
TotalPagesfn()
RemoveBook()
    BookName.value = ''
    BookAuthor.value = ''
    Pages.value = ''
    completedPages.value = ''
    Language.value = ''

}

function DisplayUi() {
    BookLocalstorage.forEach(element => {

        const bookCard = document.createElement('div')
        bookCard.classList.add('bookCard')
        bookCard.setAttribute('id', Id)
        bookCard.innerHTML = `
    <div class="mybook">
    <h3>${element.name}</h3>
    <p>${element.author}</p>
</div>


<div class="pages">
<h4>Number of Pages :  <span id="Pages"> ${element.Pages}</span></h4>
<h4>PagesRead: <span id="readPages">${element.ReadPages}</span></h4>
<h4>Language : <span id="language">${element.Language}</span> </h4>
<h4>Completed : <span id="completed">${element.completeorNot}</span> </h4>


</div>


        <button class ="Removebtn">Remove</button>
    
    `
        maincontainer.appendChild(bookCard)

        Id++

        // TotalPagesfn()
    });
    RemoveBook()
    TotalPagesfn()
   
    BookName.value = ''
    BookAuthor.value = ''
    Pages.value = ''
    completedPages.value = ''
    Language.value = ''

}

TotalBooks = BookLocalstorage.length

function TotalPagesfn() {

    TotalBooks = BookLocalstorage.length
    const Totalbook = document.getElementById('Book')
    const completedBook = document.getElementById('completedBook')
    const Totalpages1 = document.getElementById('Totalpages')
    const PagesReadEl = document.getElementById('PagesRead')

    
    BookLocalstorage.forEach(element => {
        TotalPages += +element.Pages
        PagesRead += +element.ReadPages

    })
    Totalbook.innerText = TotalBooks
    Totalpages1.innerText = TotalPages
    PagesReadEl.innerText = PagesRead

    TotalPages = 0
    PagesRead = 0
    TotalBooks = 0
    console.log(completedBooks)
}

DisplayUi()


function RemoveBook(){
const removebtn = document.querySelectorAll('.Removebtn')

        removebtn.forEach(btn => {
            btn.addEventListener('click', function (e) { 
                let myId = (e.path[1].id)
                console.log(e)
                const Bookid = document.getElementById(`${(e.path[1].id)}`)
                
                BookLocalstorage.splice(BookLocalstorage.findIndex( a =>{
                    a.id === myId
                    Bookid.remove()
                    
                    
                }))
                TotalPagesfn()
                localStorage.setItem('Data', JSON.stringify([...BookLocalstorage]))

            })
        })
    }
RemoveBook()

Cancelbtn.addEventListener('click', Canceltoadd)
Addbtn.addEventListener('click', showformcard)
BookAddbtn.addEventListener('click', AddBook)

const LibraryBtn = document.querySelector('.Libtn')
const CloseLibrary = document.querySelector('.fa-xmark')
const librarydata = document.querySelector('.librarydata')

LibraryBtn.addEventListener('click',function(e){
        librarydata.style.display = 'block'
        librarydata.style.position = 'absolute'
        librarydata.style.left = '15px'
        librarydata.style.top = '120px'   
})

CloseLibrary.addEventListener('click',function(){
    if(screen.width < 720){
        librarydata.style.left = '-100%'
    }
    else{
        librarydata.style.left = '100%'
    }
})







