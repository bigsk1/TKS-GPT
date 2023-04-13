import React, { useRef, useEffect } from 'react';
import './MessageContent.css';

const MessageContent = ({ message, from }) => {
  const contentRef = useRef();

  const copyToClipboard = (item) => {
    const textToCopy = item.replace(/<br \/>/g, '\n').replace(/^\n/, '');
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        console.log('Item copied to clipboard!');
      },
      (err) => {
        console.error('Failed to copy item: ', err);
      },
    );
  };  

  useEffect(() => {
    if (contentRef.current) {
      const copyButtons = contentRef.current.querySelectorAll('.message-copy-button');
      copyButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const textToCopy = e.target.getAttribute('data-text-to-copy');
            copyToClipboard(textToCopy);
          });
      });
      return () => {
        copyButtons.forEach((button) => {
          button.removeEventListener('click', copyToClipboard);
        });
      };
    }
  }, [message]);  

  const renderMessageContent = () => {
    // Bullet points
    if (message.match(/\n\* .+/)) {
      const items = message.split('\n').filter((item) => item.trim() !== '');
      return (
        <ul className="message-bullet-list">
          {items.map((item, index) => (
            <li key={index}>{item.startsWith('* ') ? item.slice(2) : item}</li>
          ))}
          <li><button className="message-copy-button" data-text-to-copy={message}>Copy</button></li>
        </ul>
      );
    }
  
    // Numbered lists
if (message.match(/\n\d+\./)) {
    const items = message.split('\n').filter((item) => item.trim() !== '');
    const responseText = items.shift(); // Get and remove the response text from items array
  
    return (
      <>
        <p>{responseText}</p>
        <ol className="message-numbered-list">
          {items.map((item, index) => (
            <li key={index}>{item.replace(/^\d+\.\s*/, '')}</li>
          ))}
        </ol>
      </>
    );
  }    

    // Email format
if (message.match(/From: .+\nTo: .+\nSubject: .+/)) {
    const lines = message.split('\n');
    const email = {
      from: lines.find((line) => line.startsWith('From: ')),
      to: lines.find((line) => line.startsWith('To: ')),
      subject: lines.find((line) => line.startsWith('Subject: ')),
      body: lines.slice(3).join('\n'),
    };
    return (
      <div className="message-email">
        <p>{email.from}</p>
        <p>{email.to}</p>
        <p>{email.subject}</p>
        <p dangerouslySetInnerHTML={{ __html: email.body.replace(/\n/g, '<br />')}}></p>
        <button className="message-copy-button" data-text-to-copy={message.replace(/\n/g, '<br />')}>Copy</button>
      </div>
    );
  }  

    const markdownContent = message
      .replace(/```([^]+?)```/g, (_, code) => `<pre class="message-code"><code>${code}</code><button class="message-copy-button" data-text-to-copy="${code}">Copy</button></pre>`)
      .replace(/\n/g, '<br />');

    return <p dangerouslySetInnerHTML={{ __html: markdownContent }}></p>;
  };

  return (
    <div ref={contentRef} className={`message-content ${from}`}>
      {renderMessageContent()}
    </div>
  );
};

export default MessageContent;
