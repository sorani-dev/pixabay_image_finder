import axios from 'axios'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import { useEffect,useState } from 'react'
import ImageResults from '../image-results/ImageResults'

const Search = () => {
  const [searchText,setSearchText] = useState('')
  const [amount,setAmount] = useState(15)
  const [images,setImages] = useState([])

  useEffect(() => {
    if (searchText === '') {
      setImages([])
      return
    }

    // API
    const apiUrl = 'https://pixabay.com/api'
    const apiKey = process.env.REACT_APP_PIXABAY_API_KEY
    console.log(process.env)
    const url = `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&pretty=true&per_page=${amount}&safesearch=true`
    console.log(url)
    axios
      .get(url)
      .then(data => {
        setImages(data.data.hits)
      })
      .catch(err => console.log(err))
    return () => { }
  },[amount,searchText])

  return (
    <>
      <TextField
        name='searchText'
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        floatingLabelText='Search For Images'
        fullWidth={true}
      />
      <br />

      <SelectField name='amount' floatingLabelText='Amount' value={amount} onChange={(e,index,payload) => setAmount(payload)}><MenuItem value={5} primaryText='5' /><MenuItem value={10} primaryText='10' /><MenuItem value={15} primaryText='15' /><MenuItem value={20} primaryText='20' /><MenuItem value={30} primaryText='30' /><MenuItem value={50} primaryText='50' /></SelectField>
      <br />
      {images.length > 0 ? <ImageResults images={images} /> : <div style={{ textAlign: 'center' }}>No Images</div>}
    </>
  )
}

export default Search
