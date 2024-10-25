const FuriganaText = () => {
  const textWithFurigana = [
    { kanji: '東京', furigana: 'とうきょう' },
    { kanji: 'は', furigana: '' },
    { kanji: '日本', furigana: 'にほん' },
    { kanji: 'の', furigana: '' },
    { kanji: '首都', furigana: 'しゅと' },
    { kanji: 'です', furigana: '' }
  ]

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
