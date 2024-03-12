import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps,  IOrder } from '@/types';
import { InertiaLink } from "@inertiajs/inertia-react";

interface Props {
    order: IOrder;
}
export default function Index({ auth, order }: PageProps<Props>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders</h2>}
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div>
                        <h1>Order Details</h1>
                        <p>Order ID: {order.id}</p>
                        <p>Customer: {order.user.name}</p>
                        <p>Order Total: €{order.total}</p>
                        <p>Order Created: {new Date(order.created_at).toLocaleDateString()}</p>

                        <h2>Items</h2>
                        <ul>
                            {order.items.map((item: any) => (
                                <li key={item.id}>{item.name} - Quantity: {item.quantity}</li>
                            ))}
                        </ul>

                        <InertiaLink href={route('orders.index')}>Back to Orders</InertiaLink>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
