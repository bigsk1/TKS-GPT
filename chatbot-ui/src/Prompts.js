import React from 'react';
import './Prompts.css';

const Prompts = ({ onSelect, showPrompts, togglePrompts }) => {
  const prompts = [
    'What is artificial intelligence?',
    'I want you to act as a Tic-Tac-Toe game. I will make the moves and you will update the game board to reflect my moves and determine if there is a winner or a tie. Use X for my moves and O for the computers moves. Do not provide any additional explanations or instructions beyond updating the game board and determining the outcome of the game. To start I will make the first move by placing an X in the top left corner of the game board.',
    'I want you to act as my personal chef. I will tell you about my dietary preferences and allergies, and you will suggest recipes for me to try. You should only reply with the recipes you recommend, and nothing else. Do not write explanations. My first request is ____',
    'As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. Can you please provide a suggestion?',
    'I want you to act as a historian. You will research and analyze cultural economic political and social events in the past collect data from primary sources and use it to develop theories about what happened during various periods of history. My first suggestion request is ______',
    'I want you to act as an ascii artist. I will write the objects to you and I will ask you to write that object as ascii code in the code block. Write only ascii code. Do not explain about the object you wrote. I will say the objects in double quotes. My first object is "cat"',
    'I want you to translate the sentences I wrote into emojis. I will write the sentence, and you will express it with emojis. I just want you to express it with emojis. I dont want you to reply with anything but emoji. My first sentence is _____',
    'I want you to act as my personal shopper. I will tell you my budget and preferences, and you will suggest items for me to purchase. You should only reply with the items you recommend, and nothing else. Do not write explanations. My first request is "_______"',
    'I want you to act as a doctor and come up with creative treatments for illnesses or diseases. You should be able to recommend conventional medicines, herbal remedies and other natural alternatives. You will also need to consider the patients age, lifestyle and medical history when providing your recommendations. My first suggestion request is _____',
    'I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit creativity and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. My first request is ____',
    'I want you to act as my legal advisor. I will describe a legal situation and you will provide advice on how to handle it. You should only reply with your advice and nothing else. Do not write explanations. My first request is ____',
    'I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. My first request is ____',
    'I want you to act as my first aid traffic or house accident emergency response crisis professional. I will describe a traffic or house accident emergency response crisis situation and you will provide advice on how to handle it. You should only reply with your advice, and nothing else. Do not write explanations. My first request is ______',
    'I want you to act as my time travel guide. I will provide you with the historical period or future time I want to visit and you will suggest the best events, sights, or people to experience. Do not write explanations, simply provide the suggestions and any necessary information. My first request is ____',
    'I want to act as a Statistician. I will provide you with details related with statistics. You should be knowledge of statistics terminology, statistical distributions, confidence interval, probabillity, hypothesis testing and statistical charts. My first request is ____',
    'I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first command is pwd',
    'I want you to act as a teacher that is handing out report cards. Guess what the teacher may say and expand the accordingly to motivate and encourage students based on their performance.',
    'I want you to act as a math teacher. I will provide some mathematical equations or concepts, and it will be your job to explain them in easy-to-understand terms. This could include providing step-by-step instructions for solving a problem, demonstrating various techniques with visuals or suggesting online resources for further study. My first request is ___',
    'I want you to act as a life coach. I will provide some details about my current situation and goals, and it will be your job to come up with strategies that can help me make better decisions and reach those objectives. This could involve offering advice on various topics, such as creating plans for achieving success or dealing with difficult emotions. My first request is ___',
    'I want you to act as a pet behaviorist. I will provide you with a pet and their owner and your goal is to help the owner understand why their pet has been exhibiting certain behavior, and come up with strategies for helping the pet adjust accordingly. You should use your knowledge of animal psychology and behavior modification techniques to create an effective plan that both the owners can follow in order to achieve positive results. My first request is ___',
    'I require someone who can suggest delicious recipes that includes foods which are nutritionally beneficial but also easy & not time consuming enough therefore suitable for busy people like us among other factors such as cost effectiveness so overall dish ends up being healthy yet economical at same time! My first request ___',
    'I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. my first command is wake up',
    'I want you to act as a fancy title generator. I will type keywords via comma and you will reply with fancy titles. my first keywords are car,boat,plane',
    'I want you to act as a prompt generator. Firstly, I will give you a title like this: "Act as an English Pronunciation Helper". Then you give me a prompt like this: "I want you to act as an English pronunciation assistant for Turkish speaking people. I will write your sentences, and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentences but only pronunciations. Pronunciations should use Turkish Latin letters for phonetics. Do not write explanations on replies. My first sentence is "how the weather is in Istanbul?"." (You should adapt the sample prompt according to the title I gave. The prompt should be self-explanatory and appropriate to the title, dont refer to the example I gave you. My first title is "Act as a ________" (Give me prompt only)',
    'You are a teacher who has been assigned the task of giving out report cards to your students. You have a class of 25 students, each with their own strengths and weaknesses. Your task is to provide a fair and objective assessment of each students academic progress and behavior. You must discuss the students performance in different subjects, including their grades and behavior in the classroom. Your objective is to provide feedback that will help each student improve their performance in the next term. You can start preparing the report cards now.',
    'I want you to act as a dream interpreter. I will give you descriptions of my dreams, and you will provide interpretations based on the symbols and themes present in the dream. Do not provide personal opinions or assumptions about the dreamer. Provide only factual interpretations based on the information given. My first dream is about ____',
    'I want you to act as a DIY expert. You will develop the skills necessary to complete simple home improvement projects, create tutorials and guides for beginners, explain complex concepts in laymans terms using visuals and work on developing helpful resources that people can use when taking on their own do-it-yourself project. My first suggestion request is _____',
    // Add more prompts here
  ];

  return (
    <div className="prompts-container">
      <div className="arrow-container" onClick={togglePrompts}>
        {!showPrompts && <span className="arrow-down">⌵</span>}
      </div>
      {showPrompts && (
        <div className="list-wrapper">
          <div className="list-container">
            <ul className="prompts-list">
              {prompts.map((prompt, index) => (
                <li key={index} onClick={() => onSelect(prompt)}>
                  {prompt}
                </li>
              ))}
            </ul>
          </div>
          <div className="close-icon-container" onClick={togglePrompts}>
            <span className="close-icon">×</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prompts;