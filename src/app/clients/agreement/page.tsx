import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <main>
      <header
        className="mb-10 bg-center bg-cover"
        style={{ backgroundImage: 'url(/images/agreement-bg.jpg)' }}>
        <div className="max-w-7xl sm:px-6 lg:px-8 p-4 mx-auto text-black">
          <div className="md:items-center md:pb-16 md:pt-20 md:border-none border-dse-peach grid grid-cols-12 gap-6 py-8 text-center border">
            <div className="md:col-span-1 col-span-6"></div>
            <div className="md:col-span-10 md:py-16 md:border border-dse-peach col-span-12 mx-8 border-solid">
              <h1 className="font-display text-small md:text-3xl font-normal leading-tight tracking-widest uppercase">
                For Your Records
              </h1>
              <h2 className="font-display text-xxs md:text-base tracking-extrawide lining-nums pt-4 pb-4 font-normal leading-tight uppercase">
                You can review the details of the contract below.
              </h2>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl sm:px-6 lg:px-8 pb-40 mx-auto">
        <form
          action="/233/update?ref=agreement"
          accept-charset="UTF-8"
          method="post">
          <div
            className="sm:mt-0 mt-10"
            data-controller="project"
            data-project-image-selected-className="border-dse-peach">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="md:px-0 px-4">
                  <h3 className="font-display tracking-extrawide lining-nums text-base font-normal leading-tight uppercase">
                    Our Agreement
                  </h3>
                  <p className="mt-1 font-serif text-sm"></p>
                </div>
              </div>
              <div className="md:mt-0 md:col-span-2 mt-5">
                <div className=" overflow-hidden">
                  <div className="md:p-0 p-4 mb-10">
                    <div className="agreement-holder grid grid-cols-1 gap-6">
                      <h2>PAYMENT POLICY</h2>
                      <p>
                        Downey Street Events accepts cash, money order, or
                        personal check. There is a down payment of 50% of the
                        planning minimum due at contract signing. This payment
                        will be considered a deposit to hold your date on the
                        calendar. Payment of the remaining contract amount is
                        due one month prior to your wedding date. Please make
                        checks payable to Downey Street Events Inc. and send to
                        3366 Sacramento Street, San Francisco, California 94118.
                        Please note that no date will be held and services will
                        not begin until a signed contract and deposit are
                        received.
                      </p>
                      <h2>PRICING DETAILS</h2>
                      <p>
                        The following contract amount includes all professional
                        services as described in this proposal. If chosen venue
                        is within 100 miles of San Francisco, a flat travel fee
                        of $1,500 / day will apply when (1) the venue is 25
                        miles or more from San Francisco (pre and post wedding);
                        (2) the wedding ends at midnight or later; or (3) when
                        Downey Street Events is planning multiple events across
                        more than one day (including supervising load in and
                        load out of rentals). If chosen location is more than
                        100 miles from San Francisco, travel fees will be billed
                        separately and include reimbursement for flights or
                        mileage, hotel stays, and a $100/day per diem per person
                        from Downey Street Events for each trip to chosen
                        location. Downey Street Events will use local staff
                        whenever possible. Travel fees will be billed separately
                        and are not included in the total below.
                      </p>
                      <h2>REFUND POLICY</h2>
                      <p>
                        Your deposit is non-refundable. Should the event be
                        canceled or postponed between 260 and 180 days of the
                        event date, 50% of the final payment will be billed /
                        owed. Should the event be canceled or postponed at any
                        other time, 100% of any money owed to Downey Street
                        Events will be billed / owed. Should there come a time
                        when Downey Street Events is unable to continue
                        performing the specified tasks outlined in this
                        contract, Downey Street Events will find a replacement
                        planner. If a replacement planner cannot be provided,
                        Downey Street Events will refund any money paid to
                        Downey Street Events less fees for work already
                        performed. Fees for work already performed will be
                        calculated as 10% of the total contract price per month
                        of work performed (For example, if Downey Street Events
                        has performed 2 months of work it will retain 20% of the
                        total contracted amount).
                      </p>
                      <h2>COVID-19</h2>
                      <p>
                        Downey Street Events may, in its sole discretion, choose
                        to not work an event due to risks associated with
                        COVID-19. The foregoing shall apply even if the event
                        complies with government allowances if Downey Street
                        Events feels that its staff is not appropriately
                        safeguarded.
                      </p>
                      <h2>INDEPENDENT VENDORS &amp; OVERALL BUDGET</h2>
                      <p>
                        {' '}
                        While Downey Street Events will recommend vendors,
                        clients understand that they contract directly with
                        vendors. Vendors are not in any way affiliated with
                        Downey Street Events. We operate as independent entities
                        in every way and Downey Street Events is not responsible
                        for any vendor wrongdoing or breach of contract. Downey
                        Street Events does everything in their power to help the
                        client save money and reduce cost, but they do not
                        guarantee a specific overall event cost in advance.
                      </p>
                      <h2>DISPLAY RIGHTS</h2>
                      <p>
                        Downey Street Events reserves the right to use
                        photographs, vendor credits, and names from your event
                        for promotion, display, advertisement, Internet, or
                        other publications. Downey Street Events will give
                        written credit when pictures from professional
                        photographers are used.
                      </p>
                      <h2>CONFIDENTIALITY</h2>
                      <p>
                        Downey Street Events will not share personal
                        information, other than that described in the preceding
                        section, with anyone except wedding professionals
                        employed by clients without prior written permission of
                        client. Downey Street Events will take reasonable
                        precautions to protect any confidential information.
                      </p>
                      <h2>LIABILITY POLICIES</h2>
                      <p>
                        {' '}
                        Downey Street Events will not be held responsible for
                        damages or losses of any kind, mental anguish, or
                        failure to deliver a promised item or service due to
                        problems caused by the weather, acts of terrorism,
                        disasters (manmade, or natural), death, illness and
                        unforeseen or random acts of nature. Clients hereby
                        agree that, to the fullest extent permitted by law,
                        Downey Street Events, and its consultants, partners,
                        agents and employees, shall not be liable to Clients,
                        whether jointly, severally or individually, in excess of
                        the compensation paid to Downey Street Events under this
                        Agreement as a result of any act or omission not
                        amounting to a willful or intentional wrong, or, for any
                        and all injuries, claims, losses, expenses or damages
                        whatsoever arising out of or in any way related to the
                        wedding or this Agreement from any cause or causes
                        including but not limited to Downey Street Events’
                        negligence, errors, omissions, strict liability, breach
                        of contract or breach of warranty.
                      </p>
                      <h2>ASSISTANTS</h2>
                      <p>
                        Downey Street Events has the sole discretion to select
                        its assistants. Should the wedding require it, we will
                        provide extra assistants to fulfill this contract.
                        Assistants will abide by all terms of this contract. The
                        decision to use assistants is at the sole discretion of
                        Downey Street Events, and the cost is included in the
                        contract amount.
                      </p>

                      <h2>Amendments</h2>
                      <div className="group unit1of1 agreement-holder">
                        <p>No contract amendments</p>
                      </div>
                      <div className="bg-dse-peach py-16 mt-4 mb-10 text-center text-black">
                        <h3 className="text-10px tracking-widewide block mb-2 font-sans font-normal uppercase">
                          Agreement Accepted
                        </h3>
                        <h4 className="mt-1 font-serif text-base tracking-wider">
                          by John Meany and Lauren Marshall on April 06, 2023
                        </h4>
                      </div>
                    </div>
                    <div className=" py-3 text-right">
                      <button
                        type="submit"
                        name="commit"
                        value="Continue"
                        className="md:py-2 text-small md:text-xs bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer"
                        data-disable-with="Continue"></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Page;
