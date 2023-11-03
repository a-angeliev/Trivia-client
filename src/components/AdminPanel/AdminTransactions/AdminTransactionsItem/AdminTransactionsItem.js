import style from "./AdminTransactionsItem.module.css";

export default function AdminTransactionsItem(props) {
    return (
        <tr>
            <td>{props.transactions.id}</td>
            <td>{props.transactions.transactionId}</td>
            <td>{props.transactions.amount}</td>
            <td className={style.desktop}>{props.transactions.description}</td>
            <td className={style.desktop}>{props.transactions.email}</td>
            <td className={style.desktop}>{props.transactions.update_time}</td>
        </tr>
    );
}
