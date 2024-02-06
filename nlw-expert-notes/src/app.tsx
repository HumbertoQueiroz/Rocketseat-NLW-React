import logo from './assets/logo-nlw-expert.svg'

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
    </div>
  )
    
}

