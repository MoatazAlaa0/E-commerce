import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useAllCategories() {


    function getSubCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

    const res = useQuery({
        queryKey: ["subCategories"],
        queryFn: getSubCategories,
    })




  return res
  
}
