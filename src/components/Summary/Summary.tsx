import { useEffect, useState } from "react"
import { ITransaction } from "../../interface/interfaces"
import { queryClient } from "../../services/queryClient"
import styles from "./styles.module.scss"

export const Summary = () => {
  const prev = queryClient.getQueryData<ITransaction[]>("list")
  const [entrada, setEntrada] = useState(0)
  const [saida, setSaida] = useState(0)
  const [total, setTotal] = useState(0)
 
  useEffect(() => {
    if (prev?.length > 0) {
      let inValue = 0, outValue = 0
      prev.forEach(item => {
        if (item.type) {
          return inValue = inValue + item.price
        }
        return outValue = outValue + item.price
      })
      setEntrada(inValue / 100)
      setSaida(outValue / 100)
      setTotal((inValue - outValue) / 100)
    }
  }, [prev])
  return (
    <div className={styles.container}>
      <div>
        <header>
          <p>Entradas</p>
          <img src="/images/income.svg" alt="Entradas" />
        </header>
        <strong className={styles.deposit}>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(entrada)}</strong>
        <label>Ultima entrada dia 13</label>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src="/images/outcome.svg" alt="Saidas" />
        </header>
        <strong className={styles.withraw}>- {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(saida)}</strong>
        <label>Ultima saida dia 13</label>
      </div>
      <div className={styles.total}>
        <header>
          <p>Total</p>
          <img src="/images/total.svg" alt="Total" />
        </header>
        <strong>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}</strong>
        <label>01 à 15 de abril</label>
      </div>
    </div>
  )
}