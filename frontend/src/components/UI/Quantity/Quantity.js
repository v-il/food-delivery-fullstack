const Quantity = ({value, increment, decrement}) => {
    return (
        <div className="rounded-xl flex items-center gap-x-5 text-[#717171] py-3 px-2">
            <div className="p-2 rounded-xl cursor-pointer px-2 flex bg-[#D9D9D9] transition-all hover:brightness-90" onClick={decrement}>-</div>
            <div> {value} </div>
            <div className="p-2 rounded-xl cursor-pointer px-2 flex bg-[#D9D9D9] transition-all hover:brightness-90" onClick={increment}>+</div>
        </div>
    )
}

export default Quantity;