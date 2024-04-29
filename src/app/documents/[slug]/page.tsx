'use client';
import React, { use, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useClient } from '../../../../lib/useClient';
import Link from 'next/link';
import { set, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

const Page = (props: Props) => {
  const pathName = usePathname();
  const [documentData, setDocumentData] = React.useState<any>([]);
  const [clientData, setClientData] = React.useState<any>([]);
  const [allAnswers, setAllAnswers] = React.useState<any>([]);
  const [printing, setPrinting] = useState(false);

  const router = useRouter();

  const supabase = useClient();

  const documentID = pathName.split('/documents/')[1];

  console.log('document id', documentID);

  const params = useSearchParams();

  const clientSlug = params.get('edit');

  const documentTitle = documentData?.title;

  console.log('document title', documentTitle);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questions: documentData?.questions,
    },
  });

  const getClientUser = async () => {
    const { data: user, error } = await supabase
      .from('new_client')
      .select('Q_ANSWERS')
      .eq('SLUG', clientSlug);
    if (error) {
      console.log(error);
    } else {
      return user;
    }
  };

  const searchJSON = (newValues: any) => {
    const found = allAnswers.some((answer: any) => {
      if (answer.title === documentTitle) {
        console.log('found answer', answer);
        answer.questions = newValues;
        return true;
      }
      return false;
    });
    return found;
  };

  useEffect(() => {}, [allAnswers]);

  const onSubmit = async (data: any) => {
    data.title = documentData?.title;

    if (!clientSlug) {
      console.log(data);
      let { error } = await supabase.from('documents').update([
        {
          questions: data.questions,
        },
      ]);
      if (error) {
        console.log(error);
      } else {
        toast.success('Successfully saved your answers!');

        console.log('success');
      }
    } else {
      if (!searchJSON(data.questions)) {
        console.log('adding answers', allAnswers);
        allAnswers.push(data);
      }

      console.log('updating answers', allAnswers);

      let { error } = await supabase
        .from('new_client')
        .update({
          Q_ANSWERS: allAnswers,
        })
        .eq('SLUG', clientSlug);

      if (error) {
        console.log(error);
      } else {
        toast.success('Successfully saved your answers!');

        // delay by three seconds and then router.back();
        setTimeout(() => {
          router.back();
        }, 2500);

        console.log('success', data);
      }
    }
  };

  const fetchAllAnswers = async () => {
    let { data, error } = await supabase
      .from('new_client')
      .select('Q_ANSWERS')
      .eq('SLUG', clientSlug);
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  const onError = (errors: any, e: any) => console.log(errors, e);

  const fetchDocumentData = async () => {
    const documentData = await fetch('/api/fetchDocuments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: documentID }),
    });

    const dataJson = await documentData.json();

    return dataJson.data;
  };
  useEffect(() => {
    fetchDocumentData().then((data: any) => {
      setDocumentData(data[0]);
    });
    if (clientSlug) {
      fetchAllAnswers().then((data: any) => {
        if (!data[0]?.Q_ANSWERS) {
          data[0].Q_ANSWERS = [];
        } else {
          setAllAnswers(data[0]?.Q_ANSWERS);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (clientSlug) {
      getClientUser().then((data: any) => {
        setClientData(data[0]);
      });
    }
    console.log('document data', documentData);
    console.log('all answers', allAnswers);
  }, [documentData]);

  useEffect(() => {
    console.log('client data', clientData);

    clientData?.Q_ANSWERS?.some((answer: any) => {
      if (answer.title === documentTitle) {
        console.log('found answer', answer);
        setValue('questions', answer.questions);
      }
    });
  }, [clientData]);

  const handlePrint = () => {
    setPrinting(true);
    window.print();
    setTimeout(() => setPrinting(false), 500); // Reset printing state after a brief delay
  };

  return (
    <main className="edit-documents">
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="font-display pt-4 pb-2 text-3xl font-normal leading-tight tracking-widest text-center uppercase">
            {documentData?.title}
          </h1>
        </div>
      </header>
      <section className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <div>
          <div className="mt-10">
            <div className="md:flex-row flex flex-col mb-24">
              <div className="md:w-1/3 w-full px-4">
                <div className="md:p-0 px-4">
                  <h3 className="tracking-extrawide font-serif text-base font-normal leading-relaxed uppercase">
                    Help Us Understand Your Wishes
                  </h3>
                  <p className="mt-1 font-serif text-sm">
                    Please answer every question as best as you can. You can
                    always come back and update your answers.
                  </p>
                </div>
              </div>

              <div className="md:mt-0 md:w-2/3 mt-4">
                <div className="overflow-hidden">
                  <div className="md:p-0 p-4">
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                      <div className="display flex flex-col gap-4">
                        {documentData?.questions?.map(
                          (question: any, id: number) => {
                            return (
                              <section key={id} className="flex flex-col">
                                <div className="col-span-6 mb-3">
                                  <h4 className="md:w-5/6 block pb-1 whitespace-pre-wrap font-sans text-[11px] leading-5 font-normal tracking-widest uppercase">
                                    {question?.prompt}
                                  </h4>

                                  <input
                                    {...register(`questions.${id}.prompt`)}
                                    value={question?.prompt}
                                    className="hidden"
                                    type="text"
                                  />

                                  <textarea
                                    {...register(`questions.${id}.answer`)}
                                    className=" focus:border-dse-orange whitespace-pre-wrap border-dse-peach block w-full my-1 mb-2 font-serif text-sm"
                                    id="answer"></textarea>
                                </div>
                              </section>
                            );
                          }
                        )}
                        <div className="md:mx-0 print:hidden py-3 mx-4 text-right">
                          {clientSlug ? (
                            <div className="gap-6 flex justify-end">
                              <button
                                type="button"
                                onClick={handlePrint}
                                className="md:py-2 text-small md:text-xs bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer">
                                Print Questionnaire
                              </button>
                              <button
                                type="submit"
                                className="md:py-2 text-small md:text-xs bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer">
                                Save
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={handlePrint}
                              className="md:py-2 text-small md:text-xs bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer">
                              Print Questionnaire
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      </section>

      <style>
        {`
        @media print {
          /* Hide unnecessary elements */
          header, nav, footer, .print-hidden {
            display: none;
          }

          /* Add additional print styles here */
        }
        `}
      </style>
    </main>
  );
};

export default Page;
