'use client'
import { hc } from 'hono/client'
import { useEffect, useState } from 'react'
import type { AppType } from './api/[...route]/route'

const client = hc<AppType>('/')

// データの型を定義
interface Data {
  id: number
  name: string
  age: number
}

function App() {
  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    // 仮のデータを設定
    const mockData: Data[] = [
      { id: 1, name: '太郎', age: 25 },
      { id: 2, name: '花子', age: 30 },
      { id: 3, name: '次郎', age: 28 }
    ]
    setData(mockData)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>データを持たせたReactページ</h1>
      </header>
      <main>
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>名前</th>
                <th>年齢</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>データを読み込み中...</p>
        )}
      </main>
      <footer>
        <p>&copy; 2023 Reactページ</p>
      </footer>
    </div>
  )
}

export default App
