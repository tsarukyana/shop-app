import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, IProduct } from '@/types';
import { InertiaLink } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

interface Props {
    products: {
        data: IProduct[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}
export default function Index({ auth, products }: PageProps<Props>) {
    const [basket, setBasket] = useState([]);

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

    const addToBasket = (product) => {
        const newBasket = [...basket, {...product, quantity: 1}];
        setBasket(newBasket);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
        >
            <Head title="Products" />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="text-right">
                        <button type="button"
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <InertiaLink href={'/checkout'}>Basket: {basket.length}</InertiaLink>
                        </button>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg flex flex-col gap-3">
                        <table>
                            <thead>
                            <tr>
                                <td className="w-[450px] text-2xl">Name</td>
                                <td className="w-[450px] text-2xl">Price</td>
                                <td className="w-[450px] text-2xl">Action</td>
                            </tr>
                            </thead>
                            <tbody>
                            {products.data.map((product) => (
                                <tr className="w-full h-16 border shadow-lg" key={product.id}>
                                    <td>{product.name}</td>
                                    <td>€{product.price}</td>
                                    <td>
                                        {basket.find(item => item.id === product.id)
                                            ?
                                            <button
                                                className='hover:text-white hover:!bg-red-500 text-red-500 flex gap-2 items-center bg-transparent border-2 rounded-lg p-2 border-red-500'
                                                onClick={() => removeFromBasket(product)}>
                                                <svg className='fill-red-500' xmlns="http://www.w3.org/2000/svg"
                                                     width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                                </svg>
                                                Remove from basket</button>
                                            :
                                            <button
                                                className='hover:text-white hover:!bg-green-500 text-green-500 flex gap-2 items-center bg-transparent border-2 rounded-lg p-2 border-green-500'
                                                onClick={() => addToBasket(product)}>
                                                <svg className='fill-green-500' xmlns="http://www.w3.org/2000/svg"
                                                     width="16" height="16" fill="currentColor"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                                </svg>
                                                Add to basket</button>
                                        }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <nav className="flex gap-3 items-center">
                            {products.links.map((link, index) => {
                                return (
                                    link.url ? <InertiaLink
                                            className={`${index === products.links.length - 1 || index === 0 ? 'p-2 border-black' : 'w-10 h-10'} ${link.active && 'text-white bg-[#193344]'} flex justify-center items-center rounded-lg shadow-sm border border-black`}
                                            key={index} href={link.url}> {index === 0 &&
                                            <span>&laquo;</span>} {index === products.links.length - 1 ? 'Next' : index === 0 ? 'Previous' : link.label} {index === products.links.length - 1 &&
                                            <span>&raquo;</span>} </InertiaLink> :
                                        <span className='border border-black p-2 rounded-lg hover:cursor-not-allowed'
                                              key={index}>{index === 0 &&
                                            <span>&laquo;</span>} {index === products.links.length - 1 ? 'Next' : index === 0 ? ' Previous' : link.label} {index === products.links.length - 1 &&
                                            <span>&raquo;</span>} </span>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
