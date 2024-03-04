 import './App.css'
 import { useState, useEffect } from 'react'


function App() {
   const [showModal, setShowModal] = useState(false);
   const [pomodoro, setPomodoro] = useState(0)
   const [short, setShort] = useState(0) 
   const [long, setLong] = useState(0)
   const [isActive, setIsActive] = useState('')
   const [timerValue, setTimerValue] = useState("00:00")
   const [first, setFirst] = useState(25)
   const [second, setSecond] = useState(5)
   const [thirt, setThirt] = useState(15)


   useEffect(() => {
     let timer = {}
     if (localStorage.getItem("timer")) {
       timer = JSON.parse(localStorage.getItem("timer"))
     } else {
       timer = {
         pomodoro: 25,
         short: 5,
         long: 15
       }

       localStorage.setItem("timer", JSON.stringify(timer))
     }
     setPomodoro(timer.pomodoro);
     setShort(timer.short);
     setLong(timer.long);
     setIsActive("pomodoro")

     setTimerValue(timer.pomodoro)
   }, [])

   function fChange(arg) {
    setFirst(arg.target.value)
 }
   function sChange(arg) {
    setSecond(arg.target.value)
 }
   function tChange(arg) {
    setThirt(arg.target.value);
 }

   function handleClick(arg) {
     setIsActive(arg)
     let num
     if(arg == "pomodoro") {
       if(first < 10){
         num = `0${first}`
       }else{
         num = first
       }    
     }
     if(arg == "short") {
       if(second < 10){
         num = `0${second}`
       }else{num = second}
     }
     if(arg == "long") {
       if(thirt < 10){
         num = `0${thirt}`
       }else{num = thirt}
     }
     setTimerValue(num)
   }


return (<>

     <div className={`w-full h-screen ${isActive == "pomodoro" ? "bg-red-500 transition-all duration-1000" : ''} ${isActive == "short" ? "bg-teal-500 transition-all duration-1000" : ''} ${isActive == "long" ? "bg-indigo-500 transition-all duration-1000" : ''}`}> 
     <div className="mx-auto w-1/3 py-3">
     {showModal ? (
    <>
      <div className=" flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-96 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl">Setting</h3>
              <button
                className=" bg-transparent border-0 text-black float-right"
                onClick={() => setShowModal(false)}
              >
                <span>
                <i className="fa-sharp fa-solid fa-xmark fa-xl"></i>
                </span>
              </button>
            </div>
            <div className="relative p-6 ">
             <form className='flex flex-col'>
              <label>Pomodoro</label>
              <input className='outline rounded' type="number" value={first} onChange={fChange} />
              <label>Short Breack</label>
              <input onChange={sChange} className='outline rounded' value={second} type="number" />
              <label>Long Breack</label>
              <input onChange={tChange} className='outline rounded' value={thirt} type="number" />
             </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null}
       <header className={`flex justify-between py-3 border-b ${isActive == "pomodoro" ? "border-red-600 transition-all duration-1000" : ''} ${isActive == "short" ? "border-teal-600 transition-all duration-1000" : ''} ${isActive == "long" ? "border-indigo-600 transition-all duration-1000" : ''}`}>
         <div className="logo">
           <span className='flex items-center text-slate-100 text-2xl cursor-pointer gap-1'><i className="fa-solid fa-circle-check"></i>Pomofocus</span>
           </div>
           <nav className='flex gap-3'>
             <button className={`flex gap-2 p-1 items-center ${isActive == "pomodoro" ? "bg-red-300 transition-all duration-1000" : ''}  ${isActive == "short" ? "bg-teal-300 transition-all duration-1000" : ''} ${isActive == "long" ? "bg-indigo-300 transition-all duration-1000" : ''} rounded text-slate-100`}>
             <i className="fa-solid fa-chart-column"></i>
             <span>Report</span>
             </button>
             <button onClick={() => setShowModal(true)} className={`flex gap-2 p-1 items-center ${isActive == "pomodoro" ? "bg-red-300 transition-all duration-1000" : ''}  ${isActive == "short" ? "bg-teal-300 transition-all duration-1000" : ''} ${isActive == "long" ? "bg-indigo-300 transition-all duration-1000" : ''} rounded text-slate-100`}>
             <i className="fa-solid fa-gear"></i>
             <span>Settings</span>
             </button>


           </nav>
       </header>
     </div>
     <div className={`main-card w-1/3 ${isActive == "pomodoro" ? "bg-red-300 transition-all duration-1000" : ''}  ${isActive == "short" ? "bg-teal-300 transition-all duration-1000" : ''} ${isActive == "long" ? "bg-indigo-300 transition-all duration-1000" : ''} mx-auto mt-10 rounded py-5`}>
       <div className="card-header w-3/4 flex justify-between gap-4 mx-auto items-center">
         <span onClick={() => {handleClick("pomodoro")}} className={`text-slate-100 cursor-pointer text-lg ${isActive == "pomodoro" ? "bg-red-600 p-1 rounded transition-all duration-1000" : ''}`}>Pomodoro</span>
         <span onClick={() => {handleClick("short")}} className={`text-slate-100 cursor-pointer text-lg ${isActive == "short" ? "bg-teal-600 p-1 rounded transition-all duration-1000" : ''}`}>Long Break</span>
         <span onClick={() => {handleClick("long")}} className={`text-slate-100 cursor-pointer text-lg ${isActive == "long" ? "bg-indigo-600 p-1 rounded transition-all duration-1000" : ''}`}>Long Break</span>
       </div>
       <div className="timer w-3/4 mx-auto mt-4">
         <span className='text-9xl font-bold text-slate-100 text-center'>{timerValue}:00</span>
       </div>
       <div className="start-button text-center mt-8">
         <button className={`bg-red-100 ${isActive == "pomodoro" ? "bg-red-100 text-red-700 transition-all duration-1000" : ''}  ${isActive == "short" ? "bg-teal-100 text-teal-700 transition-all duration-1000" : ''} ${isActive == "long" ? "bg-indigo-100 text-indigo-700 transition-all duration-1000" : ''} px-8 py-3 rounded  text-bold text-2xl`}>START</button>
       </div>
     </div>
     </div>
</>
)
}

export default App
