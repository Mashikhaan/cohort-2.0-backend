
import { useState,useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([
    // {
    //   title:"this is title number 1",
    //   description:"this is description number 1",
    // },
    // {
    //   title:"this is title number 2",
    //   description:"this is description number 2",
    // },
    // {
    //   title:"this is title number 3",
    //   description:"this is description number 3",
    // },
    // {
    //   title:"this is title number 4",
    //   description:"this is description number 4",
    // },
    // {
    //   title:"this is title number 5",
    //   description:"this is description number 5",
    // },
    // {
    //   title:"this is title number 6",
    //   description:"this is description number 6",
    // },

  ])

  console.log("hello");
  
  /* GET NOTES */
  function fetchNotes(){
    axios.get("/api/notes")
  .then((res)=>{
    console.log(res.data.notes);
    setNotes(res.data.notes)
    
  })
  }
  useEffect(() => {
      fetchNotes()
  }, [])
  

/* POST NOTES */
function addNote(e){
  e.preventDefault()
  if(!e.target.elements.title.value || !e.target.elements.description.value) return
  const {title,description} = e.target.elements
  console.log(title.value,description.value);

  axios.post("/api/notes",{
    title:title.value,
    description:description.value
  })
  .then((res)=>{
    console.log(res.data);
    fetchNotes()
    title.value = ""
    description.value = ""
    
  })
  

}

/* DELETE/api/notes */
function deleteNotes(id){
axios.delete(`/api/notes/${id}`)
.then((res)=>{
  console.log(res.data);
 fetchNotes()
})
}

/* PATCH/api/notes */

function editNotes(id,description){
  if(!description) return
  axios.patch(`/api/notes/${id}`,{
    description:description
  })
  .then((res)=>{
console.log(res.data);
fetchNotes()

  })

}

  return (
    <>
   <form  className="note-form" onSubmit={addNote}>
     <input name='title' type="text" placeholder="Enter title" />
    <input name = 'description' type="text" placeholder="Enter description" />
    <button >Add Note</button>
   </form>

    <div className="notes">
       {
        notes.map((note,index)=>{
            return (
    <div key={index} className="note">
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <button onClick={()=>{deleteNotes(note._id)}} id='deletebtn'>Delete</button>
      <button onClick={()=>{
        const newDescription = prompt("enter new description")
       editNotes(note._id,newDescription)
      }} id='editbtn'>Edit</button>
    </div>
  );
        })
       }
    </div>
    </>
  )
}

export default App