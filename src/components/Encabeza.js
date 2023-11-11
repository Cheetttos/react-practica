export function Encabeza() {
    return (
        <div className='grid grid-cols-12 items-center p-2 bg-gradient-to-t to-indigo-400 from-teal-500 h-full'>
        <div className='col-span-2'>
          <img src="./logo.png" alt="logo-itc" className='max-h-32' />
        </div>
        <div className='col-span-10 text-left'>
          <p className='font-extrabold font-mono text-4xl'>TEDW</p>
        </div>
      </div>
    );
  }
  