
export default function FilterButton({status,filterByStatus,activeBtn,setActiveBtn}) {
    function btnClick(){
        filterByStatus(status) 
        setActiveBtn(status) 
    }
    return (
        <>
            <button
                className={`${activeBtn === status ? "bg-[#0D202D]" : ""} p-2`}
                onClick={btnClick}
            >
                {status}
            </button>
        </>
    )
}