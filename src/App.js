import './App.css'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'

function App() {
  const [ticker, setTicker] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [data, setData] = useState('')

  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await fetch(
        `https://investor-assistent.herokuapp.com/${ticker}/predict/next-days/${amount}`,
        {
          method: 'GET'
        }
      )
      let resJson = await res.json()
      if (res.status === 200) {
        setTicker('')
        setAmount('')
        // setData({
        //   labels: Object.keys(JSON.parse(resJson)),
        //   datasets: [
        //     {
        //       label: 'Wartości',
        //       backgroundColor: 'rgba(75,192,192,1)',
        //       borderColor: 'rgba(0,0,0,1)',
        //       borderWidth: 2,
        //       data: Object.values(JSON.parse(resJson))
        //     }
        //   ]
        // })
        
        setMessage(resJson)
      } else {
        setMessage(resJson.detail)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // const ChartComponent = () => {
  //   return (
  //     <div>
  //       <Bar
  //         data={data}
  //         options={{
  //           title: {
  //             display: true,
  //             text: 'Wykres wartości',
  //             fontSize: 20
  //           },
  //           legend: {
  //             display: true,
  //             position: 'right'
  //           }
  //         }}
  //       />
  //     </div>
  //   )
  // }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ticker}
          placeholder="Stock ticker"
          onChange={(e) => setTicker(e.target.value)}
        />
        <input
          type="text"
          value={amount}
          placeholder="Amount of days"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Predict</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>

      {/* <ChartComponent /> */}
    </div>
  )
}

export default App
