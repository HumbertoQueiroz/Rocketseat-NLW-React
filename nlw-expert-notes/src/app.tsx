import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard }  from './components/note-card'

interface Note{
  id: string,
  date: Date,
  content: string
}

export function App() {
  
  const [search, setSearch]=useState('')
  // usar função para chamar o estado inicial da Notas
  const [notes, setNotes]=useState<Note[]>(()=>{
    //Função esta checando se tem algum valor guardado no localStorage
    //Se tiver inicia com o valor guardado descibvertudo de JSON
    //Se não inicia vazio
   const notesOnStorage=localStorage.getItem('notes')
   if(notesOnStorage){
    return JSON.parse(notesOnStorage)
   }
    return []
  })

  function onNoteCreated(content:string){
    const newNote={
      //Gerado um id unico tipo UUID
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }

    //Aqui guardamos os comentários em uma varial
    const notesArray=[newNote, ...notes]

    //Usamos o set para alterar
    setNotes(notesArray)

    //Guardamos os valores de notas no localStorage (API do nagevador) em que mesmo que atualize a página fica guardado, mas tem que converter para JSON
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch (event:ChangeEvent<HTMLInputElement>){
    const query = event.target.value

    setSearch(query)
  }
  //aqui que é feito a busca, e depois exibido na tela lá em baixo
  const filteredNotes= search!= ''? notes.filter(note=>note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())):notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt="NLW Expert" />
      <form className='w-full'>
        <input 
          className='w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-slate-500'
          type="text" 
          placeholder='Busque em suas notas...'
          onChange={handleSearch}
        />
      </form>
      <div className='h-px bg-slate-700'></div>
      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
       <NewNoteCard onNoteCreated={onNoteCreated} />
      {filteredNotes.map((note)=>{
        return(
          <NoteCard key={note.id}  note={note} />
        )
      })}
      </div>
    </div>
    
  )
    
}

