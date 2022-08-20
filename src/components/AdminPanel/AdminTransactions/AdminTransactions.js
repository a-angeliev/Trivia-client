import style from './AdminTransactions.module.css'
import { useContext } from "react"
import { TransactionsContext } from "../../../context/transactionsContext"
import AdminTransactionsItem from './AdminTransactionsItem/AdminTransactionsItem'
import { Link } from 'react-router-dom'

export default function AdminTransaction() {
    const {transactions} = useContext(TransactionsContext)

    return (
        <section className={style.adminRiddleSelectionWapper}>
            <section className={style.adminRiddleSelection}>
                <section className={style.tableWrapper}>
                    <table className={style.flTable}>
                        <thead className={style.tHead}>
                            <tr>
                                <th>Id</th>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Email</th>
                                <th>Update time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((x) => (     
                                <AdminTransactionsItem key={x.id} transactions={x} />
                                )
                            )}
                        </tbody>
                    </table>
                </section>
            </section>
            <section className={style.space}></section>
        </section>
    )
}