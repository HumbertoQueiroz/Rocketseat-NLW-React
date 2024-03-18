import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps{
  onNoteCreated: (content:string)=>void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({onNoteCreated}:NewNoteCardProps){
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [isRecordin, setIsRecordin] = useState(false)
  const [content, setContent] = useState('')

  function handleStartEditor(){
    setShouldShowOnboarding(false)
  }

  //Pega os valores dentro do Textarea e quando for vazio'' retorna para tela de selecionar gravar audio ou digitar texto
  function handleContentChanged(event:ChangeEvent<HTMLTextAreaElement>){
    setContent(event.target.value)
    
   if(event.target.value===''){
    setShouldShowOnboarding(true)
   }
  }

  function handleSaveNote(event:FormEvent){
    event.preventDefault()
    if(content===''){
      return 
    }
    onNoteCreated(content)
    setContent('')
    setShouldShowOnboarding(true)
    toast.success('Nota criada com sucesso')
12
  }


  function handleStartRecording(){
    //Verificando se o navegador tem o suporte a API fe conversão de audio para texto
    //caso não tenha ele retorna uma alterta de erro
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    if(!isSpeechRecognitionAPIAvailable){
      toast.error('Infelizmente seu navegador não suporta a API de gravação, tente trocar pelo chorme, Edge ou Safari')
      return
    }

    setIsRecordin(true)
    setShouldShowOnboarding(false)

    //Para o TS reconhecer os caminhos e funcionaressa chamada tem que instalar um pacote `npm install -D @types/dom-speech-recognition`
    //Como o caminho no chorme é diferente do edge e safari usamos essa const para armazenar os caminhos
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    //
    speechRecognition = new SpeechRecognitionAPI()

    //Define a linguagem do audio
    speechRecognition.lang='pt-BR'
    //Define para continuat gravando até que informe manualente para parar
    speechRecognition.continuous = true
    //Define a quantidade de alternativas de texto retornadas
    //1 para retornar a alternativa que API considera mais correta
    speechRecognition.maxAlternatives = 1
    //Tras os resultados conforme vai falando e não somente ao final
    speechRecognition.interimResults = true
    //Esse metódo recebe uma função como parametro
    //Ele que de fato ouve e
    //Toda vez que ouvir uma palavra ele executa a função 
    //Retorna a palavra em texto
    speechRecognition.onresult = (event)=>{
      const transcripition = Array.from(event.results).reduce((text, result)=>{
        return text.concat(result[0].transcript)
      },'')
      
      setContent(transcripition)
    }

    speechRecognition.onerror=(event)=>{
      console.error(event)
    }

    speechRecognition.start()
    
  }

  function handleStopRecording(){
    setIsRecordin(false)

   if (speechRecognition!==null){
     speechRecognition.stop()
   }
  }

  return(
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md flex flex-col  bg-slate-700 text-left p-5 gap-3 hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
        <div className='h-px w-full bg-slate-600/50'></div>
        <p className='text-sm leading-6 text-slate-400'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto bg-slate-700 md:rounded-md flex flex-col md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:max-w-[640px] md:w-full md:h-[60vh] outline-none '>
          <Dialog.Close className=' absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 rounded-md'>
          <X className='size-5' />
          </Dialog.Close>
          <form className='flex-1 flex flex-col'>
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className='text-sm font-medium text-slate-300'>
                Adicionar nota
              </span>
              <div className='h-px w-full bg-slate-600/50'></div>
              {shouldShowOnboarding ? (
                <p className='text-sm leading-6 text-slate-400'>
                Comece <button type='button' onClick={handleStartRecording} className='font-medium text-lime-400 hover:underline'>gravando uma note</button> em áudio ou se preferir <button type='button' onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>
              </p>
              ): (
                <textarea 
                  autoFocus
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none' 
                  onChange={handleContentChanged}
                  value={content}
                />
              )}
            </div>
            {isRecordin ? (
               <button 
                type="button" 
                onClick={handleStopRecording}
                className='w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-slate-300 outline-none font-medium hover:text-slate-100'
              >
                <div className='size-3 rounded-full bg-red-500 animate-pulse'/>
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleSaveNote}
                className='w-full bg-lime-400 py-4 text-center text-lime-950 outline-none font-medium hover:bg-lime-500'
              >
                Salvar nota
              </button>
            )}
            
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

