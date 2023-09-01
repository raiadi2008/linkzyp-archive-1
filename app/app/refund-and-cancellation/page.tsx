import Link from "next/link"
import Image from "next/image"
import logo from "@/public/logo.png"

export default function Page() {
  return (
    <main className=''>
      <section className='mx-auto max-w-website px-6'>
        <div className='relative flex justify-between items-center py-6'>
          <Link href='/'>
            <div className='relative flex gap-x-2 items-center'>
              <Image
                src={logo}
                alt='logo'
                className='w-10 h-10 md:w-8 md:h-10'
              />
              <h2 className='text-xl text-neutral-dark font-medium md:text-lg'>
                Linkzyp
              </h2>
            </div>
          </Link>
        </div>
      </section>
      <section className='w-1/2 mx-auto text-sm py-12 px-8 md:w-full'>
        <h2 className='mb-6 font-bold text-2xl'>Payment and Refunds</h2>
        <h3 className='text-lg font-semibold mt-6 mb-2'>Free Services</h3>{" "}
        Linkzyp offers certain free Services. We do not require your credit card
        information for these free services, and we do not sell your data.
        <h3 className='text-lg font-semibold mt-6 mb-2'> Paid Services</h3>
        If you subscribe to a paid service, you must make a payment to continue
        using the service. Failure to pay will result in a freeze of your
        account, which may lead to auto-cancellation. Please refer to our
        Cancellation policy for more details.{" "}
        <h3 className='text-lg font-semibold mt-6 mb-2'> Fees and Taxes</h3> All
        fees are exclusive of any applicable taxes, levies, or duties. We may
        collect and remit taxes on behalf of taxing authorities where required
        by law. You are responsible for all taxes, levies, or duties not
        collected by us.
        <h3 className='text-lg font-semibold mt-6 mb-2'>Refunds</h3> We do not
        process refunds. If you cancel your service you will continue to use it
        to the end of current billing cycle. There after your service will be
        canceled and you will be downgraded to basic plan with no more charges
        on your credit card
      </section>
    </main>
  )
}
