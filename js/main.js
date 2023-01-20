const addBtn = document.querySelector('#addBtn');
const main = document.querySelector('#main');

// Add Note Button
addBtn.addEventListener('click', function () {
    addNote();
})

// Save Notes
const saveNotes = () => {
    const notes = document.querySelectorAll('.note textarea');
    const data = [];

    notes.forEach((note) => {
        data.push(note.value);
    })

    if (data.length === 0) {
        localStorage.removeItem('notes');
    }
    else {
        localStorage.setItem('notes', JSON.stringify(data));
    }
}


// Add Note Functionality
const addNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note')
    note.innerHTML = `
    <div class="tool">
       <i class="save fas fa-save"></i>
       <i class="trash fas fa-trash"></i>
    </div>
    <textarea>${text}</textarea>`

    note.querySelector('.trash').addEventListener('click', function () {
        note.remove();
        saveNotes();
    })

    note.querySelector('.save').addEventListener('click', function () {
        saveNotes();
    })

    main.appendChild(note);
    saveNotes();
}


// Initial self call funtion, on new refresh page
(
    function () {
        const lsNotes = JSON.parse(localStorage.getItem('notes'));
        if (lsNotes === null) {
            addNote();
        }
        else {
            lsNotes.forEach((lsNote) => {
                addNote(lsNote);
            })
        }
    }
)()