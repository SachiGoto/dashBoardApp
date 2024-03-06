import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

let message: string = 2;

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;

  
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
   console.log('customers,' ,customers, 'invoice',invoice)
const customer = customers.find((x)=>{
  if(x.id === invoice.customer_id){
    return x
  }
})

console.log('what is the name of the customer?', customer.name);
  return {
    title: customer.name
  };
}

export default async function Page({ params }: { params: { id: string }} ) {

   const id = params.id;
     const [invoice, customers] = await Promise.all([
       fetchInvoiceById(id),
       fetchCustomers(),
     ]);

     if(!invoice){
        notFound();
     }
    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
