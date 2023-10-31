export default function AdminTransactionsItem(props) {
    return (
        <tr>
            <td>{props.transactions.id}</td>
            <td>{props.transactions.transactionId}</td>
            <td>{props.transactions.amount}</td>
            <td>{props.transactions.description}</td>
            <td>{props.transactions.email}</td>
            <td>{props.transactions.update_time}</td>
        </tr>
    );
}
