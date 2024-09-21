import { useEffect } from 'react'
import { getCategories } from './services/api'
import './App.css'

function App() {

  useEffect(() => {
    const getFetchCategories = async () => {
      const data = await getCategories()
      console.log("🚀 ~ getFetchCategories ~ data:", data)
    }

    getFetchCategories()
  }, [])

  return (
    <>
      <h1>Aqui vai ser a Online Store</h1>
    </>
  )
}

export default App
