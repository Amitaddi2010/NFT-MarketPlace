function TeamCard({src, label, quote}) {
  return (
    <div className="grid auto-rows-auto  h-[333px] w-[345px] bg-[#2B2F4B] justify-items-center items-center rounded-3xl text-center" style={{gridTemplateRows:'auto auto auto'}}>
    <img src={src} className="img row-start-1 row-span-1 rounded-full h-[99px] w-[99px] bg-black" />
    <div className="row-start-2 row-span-1 font-semibold text-xl leading-7 text-left tracking-widest font-outfit text-white uppercase">{label}</div>
    <div className="text row-start-3 row-span-1 text-base leading-5 text-center tracking-normal text-white">
        {quote}
    </div>
</div>
  )
}

export default TeamCard