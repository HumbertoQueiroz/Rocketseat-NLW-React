// O '* as Dialog' importa tudo de dentro do diretorio passado no from e garda dentro de um objeto
//Biblioteca Radix de componentes sem estilização
// executar `npm install @radix-ui/react-dialog`
import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'


interface NoteCardProps{
  note: {
    id: string,
    date: Date,
    content: string,
  }
  onNoteDelete: (id:string)=> void
}

export function NoteCard({note, onNoteDelete}: NoteCardProps){
  return(
    //Tudo tem que estar dentro do Root
    //O conteudo que é sempre mostrado fica no Tigger
    //O conteudo que vai aparecer ao clicar fica no Content, por padrão é renderizado após o Tigger
    //Usar o Portal quando quiser mover (teleportar) o conteúdo do Content para o body
    // Overley faz o efeito de todo o resto ficar meio escuro, mas precisa inserir o css `inset-0 fixed bg-black/60`
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md text-left bg-slate-800 p-5 flex flex-col gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-600'>
        <span className='text-sm font-medium text-slate-300'>
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true})}
        </span>
        <div className='h-px w-full bg-slate-600/50'></div>
        <p className='text-sm leading-6 text-slate-400'>
          {note.content}
        </p>
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'></div>
      </Dialog.Trigger>
        
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content className='fixed overflow-hidden bg-slate-700 inset-0 md:inset-auto md:rounded-md flex flex-col md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] md:w-full md:h-[60vh] outline-none '>
          <Dialog.Close className=' absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 rounded-md'>
          <X className='size-5' />
          </Dialog.Close>
          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className='text-sm font-medium text-slate-300'>
              {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true})}
            </span>
            <div className='h-px w-full bg-slate-600/50'></div>
            <p className='text-sm leading-6 text-slate-400'>
              {note.content}
            </p>
          </div>

          <button 
            type="button" 
            className='w-full bg-slate-800 py-4 text-center text-slate-300 outline-none font-medium group'
            onClick={()=>onNoteDelete(note.id)}
          >
            Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}