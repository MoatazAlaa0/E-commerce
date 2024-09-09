import imgLogo from "../../assets/images/freshcart-logo.svg"
export default function Footer() {
  return (
<section className="py-10 bg-orange-300 sm:pt-16 lg:pt-24">
  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
    <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
      <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
        <img className="w-auto h-9" src={imgLogo}  />
        <p className="text-base font-medium leading-relaxed text-black mt-7 ">Shop the way that suits you now and you can pay online through this payment terminal</p>
        <ul className="flex items-center space-x-3 mt-9">
        <img width="348" height="26" src="https://demo2.pavothemes.com/freshio/wp-content/uploads/2020/08/payment_1.png" className="attachment-full size-full wp-image-515" alt="" srcSet="https://demo2.pavothemes.com/freshio/wp-content/uploads/2020/08/payment_1.png 348w, https://demo2.pavothemes.com/freshio/wp-content/uploads/2020/08/payment_1-300x22.png 300w" sizes="(max-width: 348px) 100vw, 348px"/>
        </ul>
      </div>
      <div>
        <p className="text-sm font-semibold tracking-widest text-black uppercase">Company</p>
        <ul className="mt-6 space-y-4">
          <li>
            <a href="#"  className="flex text-base text-black transition-all duration-200 hover:text-teal-700 focus:text-teal-700"> About </a>
          </li>
          <li>
            <a href="#"  className="flex text-base text-black transition-all duration-200 hover:text-teal-700 focus:text-teal-700"> Features </a>
          </li>
          <li>
            <a href="#"  className="flex text-base text-black transition-all duration-200 hover:text-teal-700 focus:text-teal-700"> Works </a>
          </li>
          <li>
            <a href="#"  className="flex text-base text-black transition-all duration-200 hover:text-teal-700 focus:text-teal-700"> Career </a>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-sm font-semibold tracking-widest text-black uppercase">Help</p>
        <ul className="mt-6 space-y-4">
          <li>
            <a href="#"  className="flex text-base text-black transition-all duration-200 hover:text-teal-700 focus:text-teal-700"> Customer Support </a>
          </li>
          <li>
            <a href="#"  className="flex text-base text-black transition-all duration-200 hover:text-teal-700 focus:text-teal-700"> Delivery Details </a>
          </li>
          <li>
            <a href="#"  className="flex text-base text-black transition-all duration-200 hover:text-teal-700 focus:text-teal-700"> Terms &amp; Conditions </a>
          </li>
          <li>
            <a href="#"  className="flex text-base text-black transition-all duration-200 hover:text-teal-700 focus:text-teal-600"> Privacy Policy </a>
          </li>
        </ul>
      </div>
      <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
        <p className="text-sm font-semibold tracking-widest text-black uppercase"><>do you have any Comment</></p>
        <div  className="mt-6">
          <div>
          <textarea color="red"  placeholder="Message"  rows={3} className="block w-full mb-3 p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" ></textarea> 
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input type="email" name="email" id="email" placeholder="Enter your email" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
          </div>
          <button type="submit" className="inline-flex items-center justify-center px-5 py-2 mt-3 font-semibold text-white transition-all duration-200 bg-blue-950 rounded-md hover:bg-blue-950 focus:bg-blue-950">Submit</button>
        </div>
      </div>
    </div>
    <hr className="mt-16 mb-10 border-gray-200" />
    <p className="text-sm text-center text-black">© Copyright 2024, All Rights Reserved by Postcraft</p>
  </div>
</section>


  )
}
