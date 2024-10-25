'use client'

import { useState } from 'react'

type FuriganaText = {
  original: string
  furigana: string
}

const FuriganaText = () => {
  const [text, setText] = useState('')
  const [textWithFurigana, setTextWithFurigana] = useState<FuriganaText[]>([])
  const handleSubmit = async (text: string) => {
    // curl -H "Accept-Charset: utf-8" "http://localhost:5000/api/furigana?text=すもももももももものうち"
    const response = await fetch(`http://localhost:5000/api/furigana?text=${text}`, {
      headers: {
        'Accept-Charset': 'utf-8'
      }
    })
    const data = await response.json()
    console.log(data)
    setTextWithFurigana(data.furiganaText || [])
  }

  const handleChangeText = (newText: string) => {
    setText(newText)
  }

  return (
    <div className="p-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-xl">
      <h1 className="text-3xl font-extrabold text-white mb-6">ふりがな付きテキスト</h1>
      <TextWithFurigana textWithFurigana={textWithFurigana} />
      <input
        type="text"
        onChange={(e) => handleChangeText(e.target.value)}
        className="w-full p-4 mb-6 text-lg text-gray-900 bg-white rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="テキストを入力"
      />
      <button
        onClick={() => handleSubmit(text)}
        className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        送信
      </button>
    </div>
  )
}

const TextWithFurigana: React.FC<{ textWithFurigana: FuriganaText[] }> = ({ textWithFurigana }) => {
  return (
    <p className="text-xl mb-6">
      {textWithFurigana.map((item, index) =>
        item.furigana ? (
          <ruby key={index} className="mr-2">
            {item.original}
            <rt className="text-sm">{item.furigana}</rt>
          </ruby>
        ) : (
          <span key={index} className="mr-2">
            {item.original}
          </span>
        )
      )}
    </p>
  )
}
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  margin: '20px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#111111'
}

const textStyle = {
  fontSize: '1.2em',
  lineHeight: '1.5'
}

const rubyStyle = {
  fontSize: '1em'
}

const rtStyle = {
  fontSize: '0.6em',
  color: 'gray'
}

export default FuriganaText
