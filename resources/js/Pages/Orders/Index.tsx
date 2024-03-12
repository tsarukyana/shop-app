import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {PageProps, IProduct, IOrder} from '@/types';
import { InertiaLink } from "@inertiajs/inertia-react";

interface Props {
    orders: {
        data: IOrder[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}
export default function Index({ auth, orders }: PageProps<Props>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders</h2>}
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg flex flex-col gap-3">
                        <table>
                            <thead>
                            <tr>
                                <td className="w-[450px] text-2xl">Customer</td>
                                <td className="w-[450px] text-2xl">Items</td>
                                <td className="w-[450px] text-2xl">Total Price</td>
                                <td className="w-[450px] text-2xl">View</td>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.data.map((order) => (
                                <tr className="w-full h-16 border shadow-lg" key={order.id}>
                                    <td className={'p-5'}>{order.user.name} {order.user.phone_number}</td>
                                    <td className={'p-5'} width={'50%'}>
                                        <ul>
                                            {order.items.map((item) => (
                                                <li key={item.id}>{item.name} - Quantity: {item.quantity}, Price: €{item.price}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>€{order.total}</td>
                                    <td><InertiaLink href={route('orders.show', order.id)}>View</InertiaLink></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <nav className="flex gap-3 items-center">
                            {orders.links.map((link, index) => {
                                return (
                                    link.url ? <InertiaLink
                                            className={`${index === orders.links.length - 1 || index === 0 ? 'p-2 border-black' : 'w-10 h-10'} ${link.active && 'text-white bg-[#193344]'} flex justify-center items-center rounded-lg shadow-sm border border-black`}
                                            key={index} href={link.url}> {index === 0 &&
                                            <span>&laquo;</span>} {index === orders.links.length - 1 ? 'Next' : index === 0 ? 'Previous' : link.label} {index === orders.links.length - 1 &&
                                            <span>&raquo;</span>} </InertiaLink> :
                                        <span className='border border-black p-2 rounded-lg hover:cursor-not-allowed'
                                              key={index}>{index === 0 &&
                                            <span>&laquo;</span>} {index === orders.links.length - 1 ? 'Next' : index === 0 ? ' Previous' : link.label} {index === orders.links.length - 1 &&
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
