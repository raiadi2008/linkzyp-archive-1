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
        <h2 className='mb-6 font-bold text-2xl'>Terms of Service</h2>
        <p className='font-semibold text-sm mb-6'>Last Updated: May 15, 2023</p>
        <p className='mb-6'>
          Welcome to Linkzyp, a product created and maintained by Linkzyp. We
          appreciate your trust in us and are committed to providing you with a
          valuable porfolio building experience. To ensure a smooth and secure
          interaction, please read and understand our Terms of Service
          (&quot;Terms&quot;). By using our Services, you agree to comply with
          these Terms. If you do not agree with any part of these Terms, please
          refrain from using our Services.
        </p>

        <h3 className='text-lg font-semibold'> Acceptance of Terms</h3>
        <p className='mb-6'>
          By using Linkzyp, you acknowledge that you have read, understood, and
          agree to abide by these Terms, which include our Privacy Policy and
          Refund Policy. We reserve the right to modify these Terms at any time,
          and any such changes will be posted here. It is your responsibility to
          review these Terms periodically for updates.
        </p>

        <h3 className='text-lg font-semibold'>User Accounts</h3>
        <p className='mb-6'>
          You are responsible for maintaining the security of your Linkzyp
          account and password. You must ensure that your account information
          remains confidential. Linkzyp will not be liable for any loss or
          damage resulting from your failure to protect your account
          information. You can not use Linkzyp for any unlawful or malicious
          purposes. You are also responsible for all content posted on your
          account and any activity that occurs under your account. You must be a
          human to use our Services. Accounts registered by bots or automated
          methods are not permitted.
        </p>

        <h3 className='text-lg font-semibold'>
          Modification of services and prices
        </h3>
        <p className='mb-6'>
          We may modify or discontinue parts of our Services with or without
          notice. While we generally exempt existing customers from price
          changes, we may change prices for existing customers. We will provide
          at least 30 days&apos; notice and notify you via email or on our
          websites for such changes.
        </p>

        <h3 className='text-lg font-semibold'>Uptime, Security, and Privacy</h3>
        <p className='mb-6'>
          We provide our Services on an &quot;as is&quot; and &quot;as
          available&quot; basis. While we do not offer service-level agreements,
          we prioritize the uptime of our applications and take measures to
          protect your data. We may temporarily disable your account if your
          usage significantly exceeds average levels, with prior communication.
          We take security and privacy seriously and have measures in place to
          protect your data. Please report any security incidents to our Support
          team.
        </p>

        <h3 className='text-lg font-semibold'>Features and Bugs</h3>
        <p className='mb-6'>
          We do our best to provide Services that meet your needs but cannot
          guarantee they will meet all expectations. Our Services may contain
          occasional bugs, which we work to address, prioritizing security and
          privacy-related issues.
        </p>

        <h3 className='text-lg font-semibold'>Liablity</h3>
        <p className='mb-6'>
          You understand and agree that Scattered Studios LLC will not be liable
          for any direct, indirect, incidental, special, or consequential
          damages resulting from your use of our Services. This includes but is
          not limited to loss of profits, data, or goodwill.
        </p>

        <h3 className='text-lg font-semibold'>Use Restriction</h3>
        <p className='mb-6'>
          You may not use Linkzyp for purposes that include violence, child
          exploitation, hate speech, harassment, doxing, fraud, cybersquatting,
          or intellectual property infringement. We do not tolerate the use of
          our products for harm or malicious intent.
        </p>
      </section>
    </main>
  )
}
