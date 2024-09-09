import useAllCategories from '../../CustomHooks/useAllCategories'
import { Navigate } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'

export default function Categories() {

    const { data, error, isLoading } = useAllCategories()

    if (error) {
        return <Navigate to="/NotFound" />

    }
    if (isLoading) {
        return <div className='flex items-center justify-center h-screen bg-orange-50 '><BallTriangle
            height={100}
            width={100}
            radius={5}
            color="orange"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        /> </div>
    }

    const res = data?.data.data

    return (
        <div className='container mx-auto py-20'>
            <h2 className='mb-5 mx-2 md:mx-0 text-3xl font-medium text-yellow-950 '>These Are All Categories :</h2>
            <div className='grid mx-5 md:mx-0 md:grid-cols-3 lg:grid-cols-5 gap-5 rounded-xl'>
                {res.map((cat) => (
                    <div key={cat._id} className=' shadow-md text-center group  rounded-xl hover:shadow-2xl  transition-all'>
                        <div className='overflow-hidden '>

                        <img src={cat.image} className='w-full  group-hover:scale-105 rounded-xl  transition-all h-96 object-fill ' alt={cat.name} />
                        </div>
                        <div className='bg-orange-300 py-2 text-yellow-950 rounded-xl font-medium'  >
                            <h3 className=''>{cat.name}</h3>
                          
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
