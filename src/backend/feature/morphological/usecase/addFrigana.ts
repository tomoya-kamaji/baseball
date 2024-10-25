// import * as kuromoji from 'kuromoji'

// const tokenizer = kuromoji.builder({ dicPath: 'node_modules/kuromoji/dict' })

// type TextWithFurigana = {
//   kanji: string
//   furigana: string
// }

// type TextWithFuriganaList = TextWithFurigana[]

// /**
//  * inputからふりがなに変換
//  */
// export const addFurigana = async (text: string): Promise<TextWithFuriganaList> => {
//   const tokenizerInstance = await new Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>>(
//     (resolve, reject) => {
//       tokenizer.build((err, tokenizer) => {
//         if (err) {
//           return reject(err)
//         }
//         resolve(tokenizer)
//       })
//     }
//   )

//   const tokens = tokenizerInstance.tokenize(text)
//   const textWithFuriganaList = tokens.map((token) => {
//     return {
//       kanji: token.surface_form,
//       furigana: token.reading || ''
//     }
//   })
//   return textWithFuriganaList
// }
