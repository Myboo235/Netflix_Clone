interface InputProps{
    id:string;
    onChange:any;
    value:string;
    label:string;
    type:string;
}


const Input:React.FC<InputProps> = ({
    id,
    onChange,
    value,
    label,
    type
}) =>{
    return (
        <div className="relative">
        <input
        type={type}
        id={id} 
        value={value}
        onChange = {onChange}
        className="
            block
            rounded
            px-6
            pt-6
            pb-1
            w-full
            text-md
            text-white
            bg-neutral-700
            appearance-none
            focus:ring-0
            peer
        "
            placeholder=" "
        />
        <label htmlFor={id} className="
            absolute
            text-md
            text-zinc-400
            transform
            duration-150
            -translate-y-3
            scale-75
            top-4
            z-10
            left-6
            origin-[0]
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-3
        ">
            {label}
        </label>
        </div>
    )
}

export default Input;