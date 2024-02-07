// O '* as Dialog' importa tudo de dentro do diretorio passado no from e garda dentro de um objeto
//Biblioteca Radix de componentes sem estilização
import * as Dialog from '@radix-ui/react-dialog'


interface NoteCardProps{
  note: {
    date: Date,
    content: string
  }
}

export function NoteCard({note}: NoteCardProps){
  return(
    //Tudo tem que estar dentro do Root
    //O conteudo que é sempre mostrado fica no Tigger
    //O conteudo que vai aparecer ao clicar fica no Content, por padrão é renderizado após o Tigger
    //Usar o Portal quando quiser mover (teleportar) o conteúdo do Content para o body
    // Overley faz o efeito de todo o resto ficar meio escuro, mas precisa inserir o css `inset-0 fixed bg-black/60`
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md text-left bg-slate-800 p-5 flex flex-col gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-300'>
          {note.date.toISOString()}
        </span>
        <div className='h-px w-full bg-slate-600/50'></div>
        <p className='text-sm leading-6 text-slate-400'>
          {note.content}
        </p>
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'></div>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content className='z-10 bg-slate-700 rounded-md flex flex-col fixed left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 max-w-[640px] w-full h-[60vh] outline-none '>
          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className='text-sm font-medium text-slate-300'>
              {note.date.toISOString()}
            </span>
            <div className='h-px w-full bg-slate-600/50'></div>
            <p className='text-sm leading-6 text-slate-400'>
              {note.content}
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}