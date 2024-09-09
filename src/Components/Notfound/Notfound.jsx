import errorImg from "../../assets/images/404 Error-pana.png"

export default function Notfound() {
  return (
    <div className=' px-10 flex items-center justify-center' >
        <img src={errorImg} className="w-[610px]" alt="" />
    </div>
  )
}
