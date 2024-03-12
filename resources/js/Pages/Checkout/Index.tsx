import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect, useState } from "react";

export default function Index({ auth }: PageProps) {
    const [basket, setBasket] = useState([]);
    const { flash } = usePage().props;

    useEffect(() => {
        // Load basket from local storage on component mount
        const storedBasket = localStorage.getItem('basket');
        if (storedBasket) {
            setBasket(JSON.parse(storedBasket));
        }
    }, []);

    useEffect(() => {
        // Update local storage when basket changes
        localStorage.setItem('basket', JSON.stringify(basket));
    }, [basket]);

    const removeFromBasket = (product) => {
        const newBasket = basket.filter(item => item.id !== product.id);
        setBasket(newBasket);
    };

    const clearBasket = () => {
        setBasket([]);
        localStorage.removeItem('basket');
    };

    const createOrder = () => {
        const items = basket.map(item => ({
            product_id: item.id,
            price: item.price,
            name: item.name,
            quantity: item.quantity,
            notes: item.notes,
        }));

        Inertia.post(route('orders.store', {items: items}));
        clearBasket(); // TODO need to clear when no any errors
    };

    const handleChangeItem = (e, product, type) => {
        const newBasket = basket.map(item => {
            if (item.id === product.id) {
                if (type === 'notes') {
                    return {
                        ...item,
                        notes: e.target.value
                    };
                } else if(type === 'quantity') {
                    return {
                        ...item,
                        quantity: e.target.value
                    };
                }
            }
            return item;
        });
        setBasket(newBasket);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Checkout</h2>}
        >
            <Head title="Checkout"/>
            <div className="py-12">
                <div>
                    {flash?.message && (
                        <div className="alert">{flash.message}</div>
                    )}
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className={'text-right'}>
                        <button type="button"
                                onClick={clearBasket}
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            Clear Basket
                        </button>
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg flex flex-col gap-3">
                        <table>
                            <thead>
                            <tr>
                                <td className='w-[450px] text-2xl'>Product</td>
                                <td className='w-[450px] text-2xl'>Price</td>
                                <td className='w-[450px] text-2xl'>Quantity</td>
                                <td className='w-[450px] text-2xl'>Notes</td>
                                <td className='w-[450px] text-2xl'>Action</td>
                            </tr>
                            </thead>
                            <tbody>
                            {basket.map((product) => (
                                <tr className='w-full h-16 border shadow-lg' key={product.id}>
                                    <td>{product.name}</td>
                                    <td>€{product.price}</td>
                                    <td><input type="number" defaultValue={product.quantity ?? 1}
                                               onChange={(e) => handleChangeItem(e, product, 'quantity')}/></td>
                                    <td><textarea value={product.notes}
                                                  onChange={(e) => handleChangeItem(e, product, 'notes')}/></td>
                                    <td>
                                        {basket.find(item => item.id === product.id)
                                            ? <button
                                                className='hover:text-white hover:!bg-red-500 text-red-500 flex gap-2 items-center bg-transparent border-2 rounded-lg p-2 border-red-500'
                                                onClick={() => removeFromBasket(product)}>
                                                <svg className='fill-red-500 bi bi-trash-fill'
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                                </svg>
                                                Remove from basket</button>
                                            : null
                                        }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg text-right">
                        <p className="text-2xl font-bold">Total:
                            €{basket.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}</p>
                        <button type="button"
                                onClick={() => createOrder()}
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Create Order
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
