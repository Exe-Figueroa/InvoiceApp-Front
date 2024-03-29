import logo from '../../assets/logo.svg'
import moon from '../../assets/icon-moon.svg'
import sun from '../../assets/icon-sun.svg'
import avatar from '../../assets/image-avatar.jpg'

export const Navbar = () => {

  const darkMode = () => {
    const indexHtml = document.querySelector("html");

    if (indexHtml.classList.contains("dark")) {
      indexHtml.classList.remove("dark");
    }else {
      indexHtml.classList.add("dark");
    }
  }

  
  
  return (
    <div
      className="w-full h-[72px] fixed z-40 bg-[#373B53] flex items-center sm:h-[80px]  lg:top-0 lg:left-0 lg:w-[103px] lg:flex-col lg:h-screen lg:rounded-e-[20px]"
    >
      <Icon />
      <div className='relative w-6 h-6 ml-auto mr-8 lg:m-0 sm:size-7 lg:mt-auto lg:mb-8 cursor-pointer' onClick={darkMode}>
        <img src={moon} alt="dark and light icon" className='absolute size-5 transition translate-y-0  dark:-translate-y-16 sm:size-7 lg:m-0 lg:mt-auto lg:mb-8  lg:translate-y-0 lg:translate-x-0 lg:dark:translate-y-0 lg:dark:-translate-x-[100px]'/>
        <img src={sun} alt="dark and light icon" className='absolute size-5  transition -translate-y-16  dark:translate-y-0 sm:size-7 lg:m-0 lg:mt-auto lg:mb-8 lg:translate-y-0 lg:-translate-x-[100px] lg:dark:lg:translate-x-0 '/>
      </div>
      <div className='border-s border-[#979797] size-[72px] flex justify-center items-center lg:border-t lg:border-s-0'>
        <img src={avatar} alt="Avatar image" className='size-8 rounded-full sm:size-9' />
      </div>
    </div>
  )
}

const Icon = () => {
  return (
    <div className="bg-01 size-[72px] sm:size-[80px] lg:size-[103px] rounded-e-[20px] relative overflow-hidden">
      <img
        src={logo}
        alt="Logo del menú"
        className='absolute size-7  top-1/2 left-1/2 z-10 -translate-y-1/2 -translate-x-1/2 sm:size-[30px]'
      />
      <div className='bg-02 size-[72px] translate-y-1/2 rounded-s-[20px] sm:size-[80px] lg:size-[103px]'></div>
    </div>
  )
}