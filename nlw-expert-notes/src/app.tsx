import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard }  from './components/note-card'

const notes={
  date: new Date(),
  content: 'Hello Word'
}

export function App() {
  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt="NLW Expert" />
      <form className='w-full'>
        <input 
          className='w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-slate-500'
          type="text" 
          placeholder='Busque em suas notas...'
        />
      </form>
      <div className='h-px bg-slate-700'></div>
      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
       <NewNoteCard />
        <NoteCard note={notes}
        />
        <NoteCard 
          note={{
            date: new Date(),
            content: 'Hello Word'
          }}
        />
      </div>
    </div>
    
  )
    
}

