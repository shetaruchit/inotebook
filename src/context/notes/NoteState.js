import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)


  //Get all notes
  const getNotes = async () => {

    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNGVhOTI4Mjg3MDMzZjY3N2E2ZGVjIn0sImlhdCI6MTY3Njk5NTI0Mn0.3Wc162-IXld2ZQZkK0OPz7Gc3xwoL-P5GyiJFKPNOSU"
      },

    });

    const json = await response.json()

    setNotes(json);
  }


  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNGVhOTI4Mjg3MDMzZjY3N2E2ZGVjIn0sImlhdCI6MTY3Njk5NTI0Mn0.3Wc162-IXld2ZQZkK0OPz7Gc3xwoL-P5GyiJFKPNOSU"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }



  //DELETE  note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNGVhOTI4Mjg3MDMzZjY3N2E2ZGVjIn0sImlhdCI6MTY3Njk5NTI0Mn0.3Wc162-IXld2ZQZkK0OPz7Gc3xwoL-P5GyiJFKPNOSU"
      },
    });

    const json = await response.json();
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);

  }



  //EDIT note\
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUt',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNGVhOTI4Mjg3MDMzZjY3N2E2ZGVjIn0sImlhdCI6MTY3Njk5NTI0Mn0.3Wc162-IXld2ZQZkK0OPz7Gc3xwoL-P5GyiJFKPNOSU"
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json =await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in clint..
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);

  }


  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;