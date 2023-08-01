'use client';
import React, { use, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { useClient } from '../../../../lib/useClient';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

type Props = {};

const Page = () => {
  const supabase = useClient();
  const [documents, setDocument] = React.useState<any>([]);
  const params = useSearchParams();

  const urlParameter = params.get('edit') || null;
  console.log('urlParameter', urlParameter);

  const [questionCount, setQuestionCount] = React.useState([
    {
      prompt: '',
      default_answer: '',
      position: '0',
    },
  ]);
  const [submitted, setSubmitted] = React.useState(false);
  const router = useRouter();

  console.log('documents', documents);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questions: [
        {
          prompt: '',
          default_answer: '',
          position: questionCount.length.toString() || '',
        },
      ],
      title: '',
      status: '',
    },
  });

  const fetchDocuments = async () => {
    let { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', Number(urlParameter));
    if (error) {
      console.log(error);
    } else {
      // console.log(data);

      return data;
    }
  };

  useEffect(() => {
    if (urlParameter) {
      fetchDocuments().then((data: any) => {
        setDocument(data[0]);
      });
    }
  }, []);

  useEffect(() => {
    if (urlParameter) {
      setValue('title', documents?.title);
      setValue('status', documents?.status);
      setValue('questions', documents?.questions);
    }
    if (documents?.questions) {
      setQuestionCount(documents?.questions);
    }
  }, [documents]);

  const checkPositionsAreUnique = (data: any) => {
    const sanitizedData = data.questions.filter(
      (question: any) => question !== null
    );

    for (let i = 0; i < sanitizedData.length; i++) {
      const position = sanitizedData[i].position;
      const positionCount = sanitizedData.filter(
        (question: any) => question.position === position
      ).length;
      if (positionCount > 1) {
        return false;
      }
    }

    return true;
  };

  const onSubmit = (data: any) => {
    if (urlParameter) {
      data.urlParameter = urlParameter;
    }
    console.log('data', data);

    const positionsAreUnique = checkPositionsAreUnique(data);

    const sanitizedQuestions = data.questions.filter(
      (question: any) => question !== null
    );

    if (!positionsAreUnique) {
      alert('Please make sure all positions are unique');
      return;
    } else {
      console.log('sanitizedQuestions', sanitizedQuestions);
      fetch('/api/newDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          title: data.title,
          questions: sanitizedQuestions,
          status: data.status,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          reset();
          setSubmitted(true);

          console.log('returned data', data);
        });
    }
  };

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        router.push('/documents');
      }, 2000);
    }
  }, [submitted]);

  const onError = (errors: any, e: any) => {
    console.log('errors', errors);

    if (errors.questions) {
      toast.error('Please make sure all questions have a prompt and position');
    }
    if (errors.title) {
      toast.error('Please make sure you have a title');
    }
    if (errors.status) {
      toast.error('Please make sure you have a status');
    }
  };

  return (
    <main className="edit-documents">
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="font-display pt-4 pb-2 text-3xl font-normal leading-tight tracking-widest text-center uppercase">
            {urlParameter ? documents?.title : 'New Document'}
          </h1>
        </div>
      </header>
      <section className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
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
              <div className="md:mt-0 md:w-2/3 mt-5">
                <div className="overflow-hidden">
                  <div className="md:p-0 p-4">
                    <div className="display flex flex-col gap-4">
                      <div className="flex gap-10 mb-3">
                        <div className="flex flex-col w-1/2">
                          {errors?.title?.message ? (
                            <p className="text-red-500">
                              {errors?.title?.message}
                            </p>
                          ) : (
                            <h4 className="md:w-1/2 block pb-1 font-sans text-xs font-normal tracking-widest uppercase">
                              Document Title:
                            </h4>
                          )}

                          <input
                            {...register('title', {
                              required: 'Please provide a title.',
                            })}
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach block w-full my-1 font-serif text-sm"
                            id="title"></input>
                        </div>
                        <div className="flex flex-col w-1/2">
                          {errors?.status?.message ? (
                            <p className="text-red-500">
                              {errors?.status?.message}
                            </p>
                          ) : (
                            <h4 className=" block pb-1 font-sans text-xs font-normal tracking-widest uppercase">
                              Status
                            </h4>
                          )}

                          <select
                            {...register('status', {
                              required: 'Please provide a document status.',
                            })}
                            className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            id="title">
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                          </select>
                        </div>
                      </div>
                      <div className="w-full border-[1px] border-gray-300" />

                      {questionCount.map((question: any, id: number) => (
                        <section key={id} className="mb-6">
                          <div className="col-span-6 mb-3">
                            {errors.questions?.[id]?.prompt ? (
                              <p className="text-red-500">
                                {errors?.questions[id]?.prompt?.message}
                              </p>
                            ) : (
                              <h4 className="md:w-5/6 block pb-1 font-sans text-xs font-normal tracking-widest uppercase">
                                {`Question ${id + 1} prompt:`}
                              </h4>
                            )}

                            <textarea
                              {...register(`questions.${id}.prompt`, {
                                required: `Provide a prompt for question ${
                                  id + 1
                                }`,
                              })}
                              className=" focus:border-dse-orange border-dse-peach block w-full my-1 mb-2 font-serif text-sm"
                              id="prompt"></textarea>
                            <h4 className="md:w-5/6 block pb-1 font-sans text-xs font-normal tracking-widest uppercase">
                              Default Answer:
                            </h4>
                            <textarea
                              {...register(`questions.${id}.default_answer`)}
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach block w-full my-1 font-serif text-sm"
                              id="default_answer"></textarea>

                            {errors.questions?.[id]?.position?.message ? (
                              <p className="text-red-500">
                                {errors?.questions[id]?.position?.message}
                              </p>
                            ) : (
                              <h4 className="md:w-5/6 block pb-1 font-sans text-xs font-normal tracking-widest uppercase">
                                {`Question ${id + 1} Position:`}
                              </h4>
                            )}

                            <input
                              type="number"
                              {...register(`questions.${id}.position`, {
                                required: `Provide a position for question ${
                                  id + 1
                                }`,
                                validate: (value) => Number(value) > 0,
                              })}
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach block w-full my-1 font-serif text-sm"
                              id="position"></input>
                          </div>
                          <div className="w-full border-[1px] border-gray-300" />
                        </section>
                      ))}

                      <div className="md:mx-0 print:hidden flex justify-center gap-2 py-3 mx-4 mb-6 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setQuestionCount([
                              ...questionCount,
                              // add a new question to the array
                              {
                                prompt: '',
                                default_answer: '',
                                position: (questionCount.length + 1).toString(),
                              },
                            ])
                          }
                          className="md:py-2 bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 text-xs font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer">
                          Add Question
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (questionCount.length === 1) {
                              return toast.error(
                                'You must have at least one question'
                              );
                            } else {
                              //  delete question from form data array
                              setValue(
                                `questions.${questionCount.length - 1}`,
                                // @ts-ignore
                                null
                              );
                              setQuestionCount(
                                questionCount.slice(0, questionCount.length - 1)
                              );
                            }
                          }}
                          className="md:py-2 bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 text-xs font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer">
                          Delete Question
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:mx-0 print:hidden flex justify-between gap-2 py-3 mx-4 text-right">
                  <div className=" flex gap-2">
                    <Link
                      className="md:py-2 bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 text-xs font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer"
                      href="/documents">
                      Back
                    </Link>

                    <Link
                      className="md:py-2 bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 text-xs font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer"
                      href={`/documents/${urlParameter}`}>
                      View
                    </Link>
                  </div>
                  <button
                    type="submit"
                    name="commit"
                    className="md:py-2 bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 text-xs font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer">
                    {urlParameter
                      ? 'Update Questionnaire'
                      : 'Add Questionnaire'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      {submitted && (
        <div
          className="h-1/3 opacity-90 rounded-xl fixed inset-0 z-10 flex flex-col w-1/3 p-4 m-auto bg-white border-4 border-gray-300"
          id="successModal">
          <p className="m-auto text-xl text-center">
            Successful creation. Please wait while we redirect you to the
            documents page.
          </p>
          <svg
            aria-hidden="true"
            className="animate-spin fill-[#e7c8c0] mx-auto w-1/3 h-1/3 text-gray-300"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
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
    </main>
  );
};

export default Page;
