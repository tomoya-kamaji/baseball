'use client'

import { useState } from 'react'
import { honoClient } from '../config'

type FuriganaText = {
  kanji: string
  furigana: string
}

const FuriganaText = () => {
  const [text, setText] = useState('')
  const [textWithFurigana, setTextWithFurigana] = useState<FuriganaText[]>([])
  const handleSubmit = async (text: string) => {
    const data = await honoClient.api.morphological['add-furigana'].$post({
      json: {
        text
      }
    })
    return data
  }

  const handleChangeText = (newText: string) => {
    setText(newText)
  }

  const renderFuriganaText = () => {
    return textWithFurigana.map((item, index) =>
      item.furigana ? (
        <ruby key={index}>
          {item.kanji}
          <rt>{item.furigana}</rt>
        </ruby>
      ) : (
        <span key={index}>{item.kanji}</span>
      )
    )
  }

  return (
    <div style={containerStyle}>
      <h1>ふりがな付きテキスト</h1>
      <p style={textStyle}>{renderFuriganaText()}</p>
      <input
        type="text"
        onChange={(e) => handleChangeText(e.target.value)}
        style={{
          fontSize: '1.2em',
          color: 'black', // 文字色を黒に設定
          padding: '10px',
          marginBottom: '10px',
          width: '100%'
        }}
      />
      <button
        onClick={() => handleSubmit(text)}
        style={{
          fontSize: '1.2em',
          color: 'white', // 文字色を白に設定
          backgroundColor: '#007BFF', // ボタンの背景色
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        送信
      </button>{' '}
    </div>
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
