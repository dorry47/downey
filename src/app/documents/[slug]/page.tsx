'use client';
import React, { use, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useClient } from '../../../../lib/useClient';
import Link from 'next/link';

type Props = {};

const Page = (props: Props) => {
  const pathName = usePathname();
  const [documentData, setDocumentData] = React.useState<any>([]);

  const supabase = useClient();

  const documentID = pathName.split('/documents/')[1];

  console.log(documentID);

  const fetchDocumentData = async () => {
    let { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentID);

    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };
  useEffect(() => {
    fetchDocumentData().then((data: any) => {
      setDocumentData(data[0]);
    });
  }, []);

  useEffect(() => {
    console.log(documentData);
  }, [documentData]);

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
                    <div className="display flex flex-col gap-4">
                      {documentData?.questions?.map(
                        (question: any, id: number) => {
                          return (
                            <section key={id} className="flex flex-col">
                              <div className="col-span-6 mb-3">
                                <h4 className="md:w-5/6 block pb-1 font-sans text-xs font-normal tracking-widest uppercase">
                                  {question?.prompt}
                                </h4>

                                <textarea
                                  className=" focus:border-dse-orange border-dse-peach block w-full my-1 mb-2 font-serif text-sm"
                                  id="prompt"></textarea>
                              </div>
                            </section>
                          );
                        }
                      )}
                      <div className="md:mx-0 print:hidden py-3 mx-4 text-right">
                        <Link
                          className="md:py-2 text-small md:text-xs bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer"
                          href="">
                          Print Questionnaire
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
