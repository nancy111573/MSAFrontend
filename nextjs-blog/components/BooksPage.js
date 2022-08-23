import {
  useState
} from 'react'

function BooksPage() {
  const [name, setName] = useState([])
  const [unicode, setUnicode] = useState([])
  const [character, setCharacter] = useState([])
  const [emojis, setEmojis] = useState([])

  const deleteBook = async emojiName => {
    const response = await fetch(`/api/favouriteAPI/{emojiName}`, {
      method: 'DELETE'
    })
    const data = await response.json()
    console.log(data)
    fetchBooks()
  }
  const fetchBooks = async () => {
    const response = await fetch('/api/favouriteAPI')
    const data = await response.json()
    console.log(data)
    setEmojis(data)
  }

  const submitBook = async () => {
    const response = await fetch('/api/favouriteAPI', {
      method: 'POST',
      body: JSON.stringify({
        name,
        unicode,
        character
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }
  return (
    <div>
    <div align="center">
        {"Title: "}<input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br/>
        {"Pages: "}<input
          type='text'
          value={unicode}
          onChange={e => setUnicode(e.target.value)}
        />
        <br/>
        {"Language: "}<input
          type='text'
          value={character}
          onChange={e => setCharacter(e.target.value)}
        />
        <br/>
        <button onClick={submitBook}>Submit book</button>
    </div> <
    br / >
    <br/> <
    br / >

    <div align="center">
      <button  onClick={fetchBooks}>Get the latest books</button>
     </div> {
      emojis.map(book => {
        return (
          <div align="center" key={book.name}>
            {book.name}.<br/>
            {"Title: "}{book.name}.<br/>
            {"Pages: "} {book.unicode}.<br/>
            {"Language: "}{book.character} <br/>
            <button onClick={() => deleteBook(book.name)}>Delete</button>
            <hr/>
          </div>
        )
      })
    } 
    </div>
  )
}

export default BooksPage