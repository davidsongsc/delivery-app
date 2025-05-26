import TransactionsList from "@/components/TransactionsItem";

export default function TransactionsPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Minhas Transações</h1>
            <TransactionsList />
        </div>
    );
}