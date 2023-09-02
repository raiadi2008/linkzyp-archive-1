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
      <section className='w-1/2 mx-auto child:mb-4 text-sm py-12 px-8 sm:w-full'>
        <h2 className='mb-6 font-medium text-2xl'>
          Privacy Policy for Linkzyp
        </h2>

        <div className='font-semibold mb-4'>Effective Date: 12 July 2023</div>

        <p className='ml-4'>
          This Privacy Policy outlines the practices of linkzyp (&quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;) regarding the collection, use, and
          disclosure of personal information when you use our application
          (&quot;the App&quot;). We are committed to protecting your privacy and
          ensuring the security of the information you provide to us. Please
          read this Privacy Policy carefully to understand how we handle your
          personal information.
        </p>

        <h3 className='text-xl font-medium mt-4 mb-4'>
          1. Information We Collect
        </h3>

        <h4 className='text-base ml-2 mt-4 mb-2'>1.1 Personal Information:</h4>
        <p className='ml-4'>
          When you use the App, we may collect the following personal
          information from you for authentication purposes:
        </p>
        <div className='ml-4'>
          <li>Full name</li>
          <li>Email address</li>
          <li>Profile photo</li>
        </div>

        <h4 className='text-base ml-2 mb-2 mt-4'>1.2 Usage Information:</h4>
        <p className='ml-4'>
          In addition to personal information, we may collect certain
          non-personal information about your use of the App, such as your
          device type, operating system, and IP address. This information is
          collected to improve the functionality of the App and enhance your
          user experience.
        </p>

        <h3 className='text-xl font-medium mt-4 mb-2'>
          2. Use of Personal Information
        </h3>

        <h4 className='text-base ml-2 mb-2 mt-4'>2.1 Authentication:</h4>
        <p className='ml-4'>
          We use the personal information you provide to authenticate your
          identity and ensure the security of the App. This includes verifying
          your email address, associating your profile photo with your account,
          and enabling you to access the App&apos;s features and services.
        </p>

        <h4 className='text-base ml-2 mb-2 mt-4'>2.2 Communication:</h4>
        <p className='ml-4'>
          We may occasionally use your email address to send you important
          updates and notifications related to the App. These communications are
          aimed at providing you with relevant information about the App&apos;s
          features, improvements, and changes.
        </p>

        <h3 className='text-xl font-medium mt-4 mb-4'>
          3. Information Sharing and Disclosure
        </h3>

        <h4 className='text-base ml-2 mb-2 mt-4'>
          3.1 Third-Party Service Providers:
        </h4>
        <p className='ml-4'>
          We may engage third-party service providers to assist us in providing
          and improving the App. These service providers may have access to your
          personal information solely for the purpose of performing services on
          our behalf and are obligated not to disclose or use it for any other
          purpose.
        </p>

        <h4 className='text-base ml-2 mb-2 mt-4'>3.2 Aggregated Data:</h4>
        <p className='ml-4'>
          We may analyze and aggregate non-personal information collected
          through the App to identify trends, monitor usage patterns, and
          improve our services. This aggregated data does not personally
          identify you and may be shared with third parties for various
          purposes, such as research or marketing.
        </p>

        <h4 className='text-base ml-2 mb-2 mt-4'>3.3 Legal Requirements:</h4>
        <p className='ml-4'>
          We may disclose your personal information if required to do so by law
          or in response to a valid legal request, such as a court order,
          government investigation, or to protect our rights, property, or
          safety.
        </p>

        <h3 className='text-xl font-medium mt-4 mb-4'>4. Data Security</h3>

        <p className='ml-4'>
          We take reasonable measures to protect the personal information we
          collect from unauthorized access, disclosure, alteration, and
          destruction. However, please be aware that no method of transmission
          over the internet or electronic storage is 100% secure, and we cannot
          guarantee absolute security.
        </p>

        <h3 className='text-xl font-medium mt-4 mb-4'>
          5. Your Choices and Rights
        </h3>

        <p className='ml-4'>
          You have the right to access, update, and correct your personal
          information collected through the App. If you would like to review or
          modify any personal information you have provided, please contact us
          using the information provided in the &quot;Contact Us&quot; section
          below.
        </p>

        <h3 className='text-xl font-medium mt-4 mb-4'>
          6. Children&apos;s Privacy
        </h3>

        <p className='ml-4'>
          The App is not intended for use by individuals under the age of 13. We
          do not knowingly collect personal information from children under 13
          years of age. If you believe we have unintentionally collected
          personal information from a child under 13, please contact us
          immediately, and we will take steps to delete it.
        </p>

        <h3 className='text-xl font-medium mt-4 mb-4'>
          7. Changes to this Privacy Policy
        </h3>

        <p className='ml-4'>
          We reserve the right to update or modify this Privacy Policy at any
          time. Any changes we make will be posted on this page, and the
          effective date will be revised accordingly. We encourage you to review
          this Privacy Policy periodically to stay informed about how we are
          protecting your information.
        </p>

        <h3 className='text-xl font-medium mt-4 mb-2'>8. Contact Us</h3>

        <p className='ml-4'>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please contact us at:
        </p>

        <div className='font-semibold ml-4 my-4'>
          linkzyp.official@gmail.com
        </div>

        <p className='ml-4'>
          By using the App, you signify your acceptance of this Privacy Policy.
          If you do not agree with the terms of this Policy, please do not use
          the App.
        </p>

        <div className='font-semibold mb-4 mt-4'>
          Effective Date: 12 July 2023
        </div>
      </section>
    </main>
  )
}
