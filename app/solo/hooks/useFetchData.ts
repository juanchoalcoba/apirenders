import {useEffect, useState} from  'react'
import {UserSolo} from '../types/users';
import { getUsersSolo } from '../services/userService';

export function useFetchData() {
    const [data, setData] = useState<UserSolo[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try{
                const users = await getUsersSolo()
                setData(users)
            }catch{
                setError("Error al obtener los datos")
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[])
    return {data, loading, error}
}