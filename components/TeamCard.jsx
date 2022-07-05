function TeamCard({src, label, quote}) {
  return (
    <div className="grid auto-rows-auto h-[400px]  w-[345px] bg-tert justify-items-center items-center rounded-3xl text-center" style={{gridTemplateRows:'auto auto auto'}}>
    <img src={src} className="img row-start-1 row-span-1  rounded-full h-[99px] w-[99px] bg-black" />
    <div className="row-start-2 row-span-1  text-xl text-center tracking-widest font-outfit text-white uppercase">{label}</div>
    <div className="row-start-3 row-span-1  ml-10 text-center tracking-normal text-white">
        {quote}
    </div>
</div>
  )
}

export default TeamCard