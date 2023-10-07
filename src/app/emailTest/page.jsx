import React from 'react';

const EmailTest = () => {
  return (
    <div
      style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        fontFamily: 'sans-serif',
      }}>
      <img
        className="banner"
        src="https://downey-street-events.vercel.app/images/email/DSE-banner.png"
        alt=""
        style={{ width: '100%', marginBottom: '30px' }}
      />
      {/* <div
        style={{
          background: '#F4F4EE',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '26px',
          marginBottom: '30px',
          color: '#A6A9AC',
          fontSize: '19px',
          letterSpacing: '5px',
          // fontWeight: 'semibold',
          // uppercase letters
          textTransform: 'uppercase',
        }}>
        <h1>Downey Street Events</h1>
      </div> */}
      <img
        className="logo-img"
        src="https://downey-street-events.vercel.app/images/email/DSE-logo.png"
        alt="Downey Street Events logo"
        style={{
          width: '50%',
          display: 'flex',
          margin: '0 auto',
          marginBottom: '30px',
        }}
      />

      <p
        style={{
          marginBottom: '20px',
          textAlign: 'center',
          color: '#A6A9AC',
          fontSize: '18px',
        }}>
        You have been invited to be a planner with Downey Street Events.
      </p>

      <hr
        style={{
          height: '1px',
          width: '25%',
          background: '#A6A9AC',
          margin: '20px auto',
        }}
      />

      <p style={{ textAlign: 'center', color: '#A6A9AC', fontSize: '18px' }}>
        To get started, please use the link below:
      </p>
      <a
        style={{
          textAlign: 'center',
          color: '#BC9C7D',
          fontSize: '18px',
          margin: '0 auto',
          display: 'flex',
          width: 'fit-content',
        }}
        className="link"
        href="{{ .ConfirmationURL }}">
        Confirm your signup
      </a>

      <hr
        style={{
          height: '1px',
          width: '25%',
          background: '#A6A9AC',
          margin: '20px auto',
        }}
      />

      <p style={{ textAlign: 'center', color: '#A6A9AC', fontSize: '18px' }}>
        Along the way, if you have any questions, please don’t hesitate to
        contact us. We’re happy to help!
      </p>
      <p style={{ textAlign: 'center', color: '#A6A9AC', fontSize: '18px' }}>
        Thank you so much, and we look forward to getting started!
      </p>

      <div
        style={{
          background: '#F4F4EE',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px',
          marginTop: '20px',
          color: '#A6A9AC',
          fontSize: '15px',
        }}>
        <p>3366 Sacramento Street • San Francisco • California • 94118</p>
        <p>info@downeystreetevents.com • 724.877.6966</p>
      </div>
    </div>
  );
};

export default EmailTest;
