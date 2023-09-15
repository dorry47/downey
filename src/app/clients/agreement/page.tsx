'use client';
import React, { use, useCallback, useEffect, useState } from 'react';
import { useClient } from '../../../../lib/useClient';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropzone from '../../../../components/Dropzone';
import { Cedarville_Cursive } from 'next/font/google';

import { Document, Page } from 'react-pdf';

import { pdfjs } from 'react-pdf';
import { set, useForm } from 'react-hook-form';
import { useStateContext } from '../../../../context/StateContext';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const cursive = Cedarville_Cursive({
  weight: '400',
  display: 'swap',
  subsets: ['latin'],
});

type Props = {};

interface ClientData {
  id: number;
  P_A_FNAME: string;
  P_A_LNAME: string;
  P_B_FNAME: string;
  P_B_LNAME: string;
  AMMEND: string;
  plannerName: string;
  SLUG: string;
  CONTRACT: {
    data: {
      additionalContract: string;
      agreement_checkbox: string;
      agreement_signature: string;
    };
  };
}

const Page1 = (props: Props) => {
  const [clientData, setClientData] = useState<ClientData[]>([]);
  const [file, setFile] = useState('');
  const params = useSearchParams();
  const clientSlug = params.get('edit');
  const partner1Name =
    clientData[0]?.P_A_FNAME + ' ' + clientData[0]?.P_A_LNAME;

  const partner2Name =
    clientData[0]?.P_B_FNAME + ' ' + clientData[0]?.P_B_LNAME;

  const supabase = useClient();

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [fileUrl, setFileUrl] = useState(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const { state, setState } = useStateContext();

  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
    defaultValues: {
      additionalContract: '',
      agreement_signature: '',
      agreement_checkbox: '',
    },
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') as string);
    const savedSession = JSON.parse(localStorage.getItem('session') as string);
    if (savedUser && savedSession) {
      setState({
        ...state,
        user: savedUser,
        session: savedSession,
      });
    }
  }, []);

  useEffect(() => {
    console.log('session', state.session);
    console.log('user', state.user);
    if (state.session && state.user) {
      const loggedInUser = async () =>
        await supabase.from('users').select('*').eq('email', state.user.email);

      loggedInUser().then((data: any) => {
        console.log('logged in data', data.data[0]);
        setLoggedInUser(data.data[0]);
      });
    }
  }, [state]);

  const retrieveFile = async () => {
    const filePath = `${clientSlug}/${clientSlug}-contract.pdf`;

    const { data: returnedFileData, error: returnedFileError } =
      await supabase.storage.from('pdf_contracts').download(filePath);

    if (returnedFileError) {
      console.log('returned file error', returnedFileError);
    } else {
      console.log('returned file data', returnedFileData);
      const reader = new FileReader();
      reader.readAsDataURL(returnedFileData);
      reader.onloadend = () => {
        setFileUrl(reader.result as any);
        const pdfUrl = reader.result;
        console.log('pdf url', pdfUrl);
      };
    }
  };

  useEffect(() => {
    retrieveFile();
  }, []);

  const onSubmit = async (data: any) => {
    data.additionalContract = fileUrl;

    console.log('submitted', data);

    if (file) {
      const fileSlug = clientSlug + '-contract';
      const filePath = `${clientSlug}/${fileSlug}.pdf`;

      // Upload PDF file to folder with slug
      const { data: fileData, error: fileError } = await supabase.storage
        .from('pdf_contracts')
        .upload(filePath, file);

      if (fileError?.message == 'The resource already exists') {
        const { data: fileData, error: fileError } = await supabase.storage
          .from('pdf_contracts')
          .update(filePath, file);
        console.log('file updated', fileData);
      } else {
        console.log('file data', fileData);
      }
    }

    const { data: updatedClientData, error: updatedClientError } =
      await supabase
        .from('new_client')
        .update({
          CONTRACT: {
            data,
          },
        })
        .eq('SLUG', clientSlug);

    if (updatedClientError) {
      console.log('error', updatedClientError);
    } else {
      console.log('updated client data', updatedClientData);
      toast.success('Successfully submitted your contract!');
    }
  };

  const onError = (error: any) => {
    Object.keys(error).forEach((key) => {
      console.log('error', key, error[key]);
      toast.error(error[key].message);
    });
  };

  const fetchEventData = async () => {
    let { data, error } = await supabase
      .from('new_client')
      // take the client slug and look for it in the database
      .select(
        `plannerName, SLUG, PEOPLE->>P_A_FNAME, PEOPLE->>P_A_LNAME, 
        PEOPLE->>P_B_FNAME, PEOPLE->>P_B_LNAME, ADMIN_INFO->>AMMEND, CONTRACT`
      )
      .eq('SLUG', clientSlug);
    if (error) {
      console.log(error);
    } else {
      console.log('client data', data);
      return data;
    }
  };

  useEffect(() => {
    if (clientData[0]?.CONTRACT) {
      setValue(
        'agreement_checkbox',
        clientData[0]?.CONTRACT?.data?.agreement_checkbox
      );
      setValue(
        'agreement_signature',
        clientData[0]?.CONTRACT?.data?.agreement_signature
      );
    }
  }, [clientData]);

  React.useEffect(() => {
    fetchEventData().then((data: any) => {
      setClientData(data);
    });
  }, []);

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
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="sm:mt-0 mt-10">
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
                        <p>{clientData[0]?.AMMEND || 'No ammendments.'}</p>
                      </div>

                      <h2>Additional Contract Details</h2>
                      {/* I want to include a PDF file viewer */}
                      {loggedInUser && loggedInUser.role == 'planner' && (
                        <div>
                          <Dropzone setFileUrl={setFileUrl} setFile={setFile} />
                        </div>
                      )}

                      {fileUrl && (
                        <div>
                          <Document
                            className={`w-full ${
                              isFullscreen &&
                              'h-full overflow-y-auto m-auto bg-[#686868ab] fixed top-0 bottom-0 left-0 right-0'
                            } border-2 p-4 flex flex-col border-[#eed9d4]`}
                            onItemClick={(item) => console.log(item)}
                            file={`${fileUrl}`}
                            onLoadSuccess={onDocumentLoadSuccess}>
                            <Page
                              className="m-auto"
                              height={isFullscreen ? 900 : 500}
                              renderAnnotationLayer={false}
                              renderTextLayer={false}
                              pageNumber={pageNumber}
                            />
                            <div className="flex justify-center gap-4 mt-2">
                              <button
                                type="button"
                                className="bg-dse-gold hover:bg-dse-orange px-4 py-2 text-xs font-bold text-white rounded"
                                onClick={() => {
                                  if (pageNumber == 1) {
                                    toast.error('You are on the first page.');
                                  } else {
                                    setPageNumber(pageNumber - 1);
                                  }
                                }}>
                                Back
                              </button>
                              <button
                                type="button"
                                className="bg-dse-gold hover:bg-dse-orange px-4 py-2 text-xs font-bold text-white rounded"
                                onClick={toggleFullscreen}>
                                {isFullscreen
                                  ? 'Exit Fullscreen'
                                  : 'View Fullscreen'}
                              </button>
                              <button
                                type="button"
                                className="bg-dse-gold hover:bg-dse-orange px-4 py-2 text-xs font-bold text-white rounded"
                                onClick={() => {
                                  if (pageNumber == numPages) {
                                    toast.error('You are on the last page.');
                                  } else {
                                    setPageNumber(pageNumber + 1);
                                  }
                                }}>
                                Next
                              </button>
                            </div>
                          </Document>
                          <p>
                            Page {pageNumber} of {numPages}
                          </p>{' '}
                          <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                          />
                        </div>
                      )}

                      <div className="flex flex-col col-span-1">
                        <div className="text-sm align-middle my-4 flex gap-2">
                          <input
                            {...register('agreement_checkbox')}
                            className=" text-dse-gold my-auto border-dse-gold w-4 h-4 font-serif text-sm rounded"
                            type="checkbox"
                            id="agreement_checkbox"
                          />
                          <label
                            className="pt-0.5 uppercase text-[12px] my-auto tracking-widewide font-normal font-sans"
                            htmlFor="agreement_checkbox">
                            We, {partner1Name} and {partner2Name}, accept the
                            terms &amp; conditions as listed above.
                          </label>
                        </div>
                        <input
                          type="text"
                          {...register('agreement_signature', {
                            required:
                              loggedInUser &&
                              loggedInUser.role !== 'planner' &&
                              'Signature required.',
                          })}
                          // i want a cursive font

                          className={`border-dse-gold   signatureBox focus-visible:outline-none border-b-2 w-full`}
                          placeholder="Signature"
                        />
                      </div>
                    </div>
                    <div className=" py-3 text-right">
                      <button
                        type="submit"
                        name="commit"
                        className="md:py-2 text-small md:text-xs bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer">
                        Submit
                      </button>
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

export default Page1;
