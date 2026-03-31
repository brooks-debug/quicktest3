import React, { useState, useEffect } from 'react';

// ==========================================
// 🎓 TEACHER SETTINGS
// ==========================================
const TEST_LEVEL = 'Upper-intermediate'; 
const TEST_UNIT = '3'; 
const GOOGLE_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwcWwsVVKGA8m8yRP8HKfVFTjMRwl65Q0864wD0ViGKmxosQUT0iyPHMTnsbQO_hohg/exec';
// ==========================================

const IconBookOpen = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const IconCheckCircle = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const IconXCircle = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>;
const IconRotateCcw = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;

const testData = {
  sections: [
    {
      id: "grammar",
      title: "Grammar",
      instructions: "Tick (✓) A, B, or C to complete the sentences.",
      questions: [
        { id: "g1", text: "1. Jed ________ Lisa for two years when they got engaged.", options: ["had known", "had been knowing", "has known"], correct: 0, explanation: "Past perfect simple is used for a state that was true before another past event." },
        { id: "g2", text: "2. We didn’t want to leave because the party ________.", options: ["hadn’t been finishing", "didn’t finish", "hadn’t finished"], correct: 2, explanation: "Past perfect shows the party was not finished before that past moment." },
        { id: "g3", text: "3. The meal was served while the children ________ the in-flight film.", options: ["’ve been watching", "were watching", "’d been watching"], correct: 1, explanation: "Past continuous describes the action in progress at that moment." },
        { id: "g4", text: "4. When I got to the cottage, I realized I ________ the keys in the car.", options: ["had left", "had been leaving", "left"], correct: 0, explanation: "Past perfect marks the earlier completed action." },
        { id: "g5", text: "5. We ________ for two hours when they finally let us in.", options: ["’ve been queuing", "were queuing", "’d been queuing"], correct: 2, explanation: "Past perfect continuous emphasizes duration before another past event." },
        { id: "g6", text: "6. I ________ to see what had made that terrible noise – I just ran!", options: ["didn’t wait even", "didn’t even wait", "even didn’t wait"], correct: 1, explanation: "‘Even’ goes before the main verb here: ‘didn’t even wait’." },
        { id: "g7", text: "7. The strange things started happening while the old castle ________ in the 1980s.", options: ["was repairing", "was being repaired", "was repaired"], correct: 1, explanation: "This needs the passive past continuous: ‘was being repaired’." },
        { id: "g8", text: "8. We ________ twenty minutes for the airport bus when it finally arrived.", options: ["waited", "were waiting", "’d been waiting"], correct: 2, explanation: "Past perfect continuous fits the duration before arrival." },
        { id: "g9", text: "9. We were at home ________.", options: ["all yesterday day", "yesterday all day", "all day yesterday"], correct: 2, explanation: "‘All day yesterday’ is the natural word order." },
        { id: "g10", text: "10. This is ________ a great book. Would you like to borrow it?", options: ["so", "such", "so much"], correct: 1, explanation: "Use ‘such a’ before adjective + singular countable noun." },
        { id: "g11", text: "11. She looks really nervous. She ________ of flying.", options: ["’s obviously afraid", "obvious afraid", "’s afraid obviously"], correct: 0, explanation: "‘Obviously’ goes before the adjective phrase here." },
        { id: "g12", text: "12. I met my wife when I ________ English in Greece.", options: ["taught", "had taught", "was teaching"], correct: 2, explanation: "Past continuous gives the background action in progress." },
        { id: "g13", text: "13. We boarded the plane and ________ our extra legroom seats near the emergency exit.", options: ["was finding", "had found", "found"], correct: 2, explanation: "Past simple is used for the next action in sequence." },
        { id: "g14", text: "14. She tried ________ to get used to London but she just didn’t enjoy city life.", options: ["such hard", "so hard", "so hardly"], correct: 1, explanation: "‘So hard’ is correct; ‘hardly’ changes the meaning." },
        { id: "g15", text: "15. Shaun ________ because he knew he was being followed.", options: ["walked quickly", "quickly walked", "walked quick"], correct: 0, explanation: "The adverb form is needed: ‘walked quickly’." },
        { id: "g16", text: "16. My husband ________ on planes.", options: ["doesn’t usually sleep", "doesn’t sleep usually", "usually isn’t sleeping"], correct: 0, explanation: "Frequency adverbs usually go between auxiliary and main verb." },
        { id: "g17", text: "17. I ________ time to read these days.", options: ["have never", "never had", "never have"], correct: 0, explanation: "The natural form is ‘I have never time…’ in the exercise’s target pattern." },
        { id: "g18", text: "18. When I eventually visited the town I grew up in, I found it ________ a lot.", options: ["had changed", "was changing", "changed"], correct: 0, explanation: "Past perfect shows the changes happened before the visit." },
        { id: "g19", text: "19. Alan was celebrating because he ________ his first novel published.", options: ["’d been having", "’d had", "was having"], correct: 1, explanation: "‘Had his first novel published’ is the correct causative structure." },
        { id: "g20", text: "20. Some people ________ when we had some strong turbulence, but I didn’t mind it.", options: ["absolutely terrified were", "were terrified absolutely", "were absolutely terrified"], correct: 2, explanation: "The adverb goes before the adjective: ‘were absolutely terrified’." }
      ]
    },

    {
      id: "vocabulary",
      title: "Vocabulary",
      instructions: "Tick (✓) A, B, or C.",
      questions: [
        { id: "v1", text: "1. people who look after you during a flight", options: ["check-in staff", "cabin crew", "customs officials"], correct: 1, explanation: "The people who look after passengers on a flight are the cabin crew." },
        { id: "v2", text: "2. the place where you pick up your suitcase", options: ["baggage reclaim", "VIP lounge", "baggage drop-off"], correct: 0, explanation: "You collect your suitcase at baggage reclaim." },
        { id: "v3", text: "3. the different buildings at an airport", options: ["customs", "security", "terminals"], correct: 2, explanation: "Airport buildings for departures and arrivals are called terminals." },
        { id: "v4", text: "4. the part of a plane you walk along between the seats", options: ["runway", "aisle", "board"], correct: 1, explanation: "The passage between the seats is the aisle." },
        { id: "v5", text: "5. a flight which takes you to where you can catch your next flight", options: ["direct flight", "connecting flight", "long-haul flight"], correct: 1, explanation: "A connecting flight takes you to your next connection." },
        { id: "v6", text: "6. to get on a plane", options: ["board", "take off", "land"], correct: 0, explanation: "To get on a plane is to board it." },

        { id: "v7", text: "7. We all had to ________ the plane and go back to the departure lounge.", options: ["get on", "get off", "drop off"], correct: 1, explanation: "If you leave the plane, you get off it." },
        { id: "v8", text: "8. Could you ________ at the airport tomorrow?", options: ["take me off", "drop me off", "check me in"], correct: 1, explanation: "To leave someone somewhere by car is to drop them off." },
        { id: "v9", text: "9. I’ll ________ my luggage at baggage reclaim and then meet you outside the airport.", options: ["drop off", "check in", "pick up"], correct: 2, explanation: "You pick up your luggage at baggage reclaim." },
        { id: "v10", text: "10. The plane ________ twenty minutes late, but we still arrived on time.", options: ["took off", "picked up", "dropped off"], correct: 0, explanation: "Planes take off; the other phrasal verbs do not fit here." },
        { id: "v11", text: "11. My flight’s due in at 10.00. Could you ________ just outside Arrivals at 10.30?", options: ["drop me off", "pick me up", "get me off"], correct: 1, explanation: "If someone collects you by car, they pick you up." },
        { id: "v12", text: "12. Make sure that you ________ your immigration form carefully.", options: ["fill in", "pick up", "check in"], correct: 0, explanation: "You fill in a form." },

        { id: "v13", text: "13. I thought the workshop was at the weekend but ________ it’s on a Thursday.", options: ["obviously", "in fact", "hardly"], correct: 1, explanation: "‘In fact’ corrects or contrasts with what was said before." },
        { id: "v14", text: "14. Have you heard about Jack and Ling? ________ they’ve split up.", options: ["Apparently", "Obviously", "In fact"], correct: 0, explanation: "‘Apparently’ is used for information you have heard but not directly confirmed." },
        { id: "v15", text: "15. I loved the novel, but I was really upset when my favourite character died suddenly ________.", options: ["in the end", "at the moment", "at the end"], correct: 2, explanation: "‘At the end’ refers to the final part of the story." },
        { id: "v16", text: "16. He’s been training to be a pilot for two months so ________ he hasn’t flown a real plane yet.", options: ["apparently", "obviously", "gradually"], correct: 1, explanation: "‘Obviously’ fits the logical conclusion." },
        { id: "v17", text: "17. People usually think we’re sisters, but ________ we’re just good friends.", options: ["luckily", "actually", "obviously"], correct: 1, explanation: "‘Actually’ corrects what people think." },
        { id: "v18", text: "18. Maria’s been very quiet ________. I think she’s worried about something.", options: ["late", "later", "lately"], correct: 2, explanation: "‘Lately’ means recently." },
        { id: "v19", text: "19. I love swimming in the sea, ________ when it’s a really hot day.", options: ["especially", "actually", "obviously"], correct: 0, explanation: "‘Especially’ means particularly." },
        { id: "v20", text: "20. ________ we’d like a flat in the city centre, but just outside would be OK too.", options: ["Eventually", "Apparently", "Ideally"], correct: 2, explanation: "‘Ideally’ introduces the preferred situation." }
      ]
    },

    {
      id: "pronunciation",
      title: "Pronunciation",
      instructions: "Tick (✓) A, B, or C.",
      questions: [
        { id: "p1", text: "1. Which word has a different sound?", options: ["flEW", "hOOded", "thrOUgh"], correct: 1, explanation: "‘hooded’ has /ʊ/, while ‘flew’ and ‘through’ have /uː/." },
        { id: "p2", text: "2. Which word has a different sound?", options: ["cAUght", "bOArding", "tOUgh"], correct: 2, explanation: "‘tough’ has /ʌ/, while the others have /ɔː/." },
        { id: "p3", text: "3. Which word has a different sound?", options: ["drOve", "tOld", "dOne"], correct: 2, explanation: "‘done’ has /ʌ/, while ‘drove’ and ‘told’ have /əʊ/." },
        { id: "p4", text: "4. Which word has a different sound?", options: ["AIsle", "clAIm", "wEIght"], correct: 0, explanation: "‘aisle’ has /aɪ/, while ‘claim’ and ‘weight’ have /eɪ/." },
        { id: "p5", text: "5. Which word has a different sound?", options: ["baggAge", "teenAge", "pAge"], correct: 0, explanation: "‘baggage’ ends with /ɪdʒ/, while ‘teenage’ and ‘page’ end with /eɪdʒ/." },

        { id: "p6", text: "6. Which is the correctly stressed syllable?", options: ["BASically", "baSICally", "basicALLY"], correct: 0, explanation: "The stress is on the first syllable: BAsically." },
        { id: "p7", text: "7. Which is the correctly stressed syllable?", options: ["GRAdually", "graDUally", "graduALLy"], correct: 0, explanation: "The stress is on the first syllable: GRAdually." },
        { id: "p8", text: "8. Which is the correctly stressed syllable?", options: ["INcredibly", "inCREDibly", "incrediBLY"], correct: 1, explanation: "The stress is on the second syllable: inCREDibly." },
        { id: "p9", text: "9. Which is the correctly stressed syllable?", options: ["ANecdote", "anECdote", "anecDOTE"], correct: 0, explanation: "The stress is on the first syllable: ANecdote." },
        { id: "p10", text: "10. Which is the correctly stressed syllable?", options: ["TURbulence", "turBULence", "turbulENCE"], correct: 0, explanation: "The stress is on the first syllable: TURbulence." }
      ]
    }
  ]
};

export default function App() {
  const [view, setView] = useState('start');
  const [student, setStudent] = useState({ name: '', class: '' });
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleStart = (e) => {
    e.preventDefault();
    if (student.name.trim()) setView('test');
    window.scrollTo(0, 0);
  };

  const handleAnswerSelect = (qId, optIndex) => {
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    testData.sections.forEach(s => s.questions.forEach(q => {
      if (answers[q.id] === q.correct) score++;
    }));
    return score;
  };

  const totalQuestions = testData.sections.reduce((acc, s) => acc + s.questions.length, 0);

  const handleFinishTest = async () => {
    const score = calculateScore();
    const detailsArray = testData.sections.flatMap(section => 
      section.questions.map(q => {
        const studentAns = answers[q.id];
        const isCorrect = studentAns === q.correct;
        const choice = studentAns !== undefined ? ['A','B','C'][studentAns] : 'Blank';
        return isCorrect ? '✓' : `X(${choice})`;
      })
    );

    if (GOOGLE_WEBHOOK_URL) {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('name', student.name);
      formData.append('className', student.class || 'N/A');
      formData.append('level', TEST_LEVEL);
      formData.append('unit', TEST_UNIT);
      
      // Fixed: Using .toString() for TypeScript/Vercel
      formData.append('score', score.toString());
      formData.append('total', totalQuestions.toString());
      formData.append('percentage', ((score / totalQuestions) * 100).toFixed(0) + '%');
      formData.append('details', JSON.stringify(detailsArray)); 
      
      try {
        await fetch(GOOGLE_WEBHOOK_URL, { method: 'POST', mode: 'no-cors', body: formData });
        setSubmitStatus('success');
      } catch (e) {
        setSubmitStatus('error');
      }
      setIsSubmitting(false);
    }
    setView('results');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-20 text-slate-800 selection:bg-indigo-200">
      <header className="bg-indigo-700 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <IconBookOpen className="w-8 h-8 text-indigo-200" />
            <h1 className="text-2xl font-bold tracking-tight">English File <span className="font-light">{TEST_LEVEL}</span></h1>
          </div>
          {view === 'test' && (
            <div className="w-full sm:w-auto flex items-center gap-4 bg-indigo-800/50 py-2 px-4 rounded-full text-white text-sm">
              Progress: {Object.keys(answers).length} / {totalQuestions}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 mt-12">
        {view === 'start' && (
          <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 border border-slate-200 text-center">
            <h2 className="text-2xl font-black mb-8 text-slate-800 uppercase tracking-tight">Quick Test Unit {TEST_UNIT}</h2>
            <form onSubmit={handleStart} className="space-y-6 text-left">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2 px-1 uppercase tracking-wider">Student Name</label>
                <input placeholder="Enter your name" className="w-full p-4 border-2 border-slate-100 rounded-xl focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all shadow-inner" required onChange={e => setStudent({...student, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2 px-1 uppercase tracking-wider">Class / Group</label>
                <input placeholder="e.g. Sonaca 3" className="w-full p-4 border-2 border-slate-100 rounded-xl focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all shadow-inner" onChange={e => setStudent({...student, class: e.target.value})} />
              </div>
              <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all uppercase tracking-widest shadow-lg shadow-indigo-200">Start Test</button>
            </form>
          </div>
        )}

        {view === 'test' && (
          <div className="space-y-6">
            {testData.sections.map((section) => (
              <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-700">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                  <h3 className="text-xl font-bold text-indigo-900 uppercase tracking-wide">{section.title}</h3>
                  <p className="text-sm text-slate-500 italic mt-1">{section.instructions}</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {section.questions.map((q) => (
                    <div key={q.id} className="p-6 transition-all hover:bg-slate-50/50">
                      <p className="font-bold text-slate-800 mb-4 whitespace-pre-wrap">{q.text}</p>
                      <div className="space-y-3">
                        {q.options.map((option, optIndex) => (
                          <label key={optIndex} className={`flex items-center p-4 rounded-xl cursor-pointer border-2 transition-all ${answers[q.id] === optIndex ? 'border-indigo-500 bg-indigo-50 shadow-sm font-bold' : 'border-slate-100 hover:bg-slate-50'}`}>
                            <input type="radio" checked={answers[q.id] === optIndex} onChange={() => handleAnswerSelect(q.id, optIndex)} className="mr-4 w-5 h-5 accent-indigo-600" />
                            <span className="font-semibold text-slate-400 mr-2 uppercase">{['A','B','C'][optIndex]}.</span> 
                            <span className="text-slate-700 font-medium">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleFinishTest} disabled={isSubmitting} className="w-full mt-8 bg-emerald-600 text-white font-black py-5 rounded-2xl shadow-lg hover:bg-emerald-700 hover:scale-[1.01] active:scale-[0.99] transition-all uppercase tracking-widest flex justify-center items-center gap-3">
              {isSubmitting ? 'Saving to Gradebook...' : 'Finish & Submit Test'}
            </button>
          </div>
        )}

        {view === 'results' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in zoom-in-95 duration-500 pb-20">
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border-4 border-indigo-100 relative text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-indigo-600"></div>
              <h2 className="text-slate-400 font-bold uppercase tracking-widest text-xs">Final Result</h2>
              <div className="text-8xl font-black text-indigo-600 my-6 tabular-nums">{calculateScore()} <span className="text-3xl text-slate-300">/ {totalQuestions}</span></div>
              <p className="text-2xl font-bold text-slate-700 tracking-tight uppercase">{student.name}</p>
              {submitStatus === 'success' && <div className="mt-8 flex justify-center"><div className="bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-sm border border-emerald-200"><IconCheckCircle className="w-5 h-5" /> Saved to Gradebook</div></div>}
              {submitStatus === 'error' && <div className="mt-8 flex justify-center"><div className="bg-red-100 text-red-700 px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-sm border border-red-200"><IconXCircle className="w-5 h-5" /> Error Saving Results</div></div>}
              <button onClick={() => window.location.reload()} className="mt-8 flex items-center gap-2 mx-auto text-indigo-600 font-bold hover:underline py-2"><IconRotateCcw className="w-5 h-5" /> Restart Test</button>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-200 overflow-hidden">
              <h3 className="text-2xl font-black text-slate-800 border-b-2 border-slate-100 pb-4 mb-8 italic text-center sm:text-left">Test Review</h3>
              <div className="space-y-12">
                {testData.sections.map((section) => (
                  <div key={section.id} className="space-y-6">
                    <h4 className="text-xl font-bold text-indigo-900 bg-indigo-50 inline-block px-4 py-1 rounded-lg uppercase tracking-wider">{section.title}</h4>
                    <div className="space-y-8">
                      {section.questions.map((q) => {
                        const studentAnswer = answers[q.id];
                        const isCorrect = studentAnswer === q.correct;
                        return (
                          <div key={q.id} className={`p-6 rounded-2xl border-2 ${isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-red-200 bg-red-50/30'}`}>
                            <p className="font-bold text-slate-800 mb-4 whitespace-pre-wrap">{q.text}</p>
                            <div className="space-y-2 mb-4">
                              {q.options.map((opt, i) => {
                                const isThisCorrect = i === q.correct;
                                const isThisSelected = i === studentAnswer;
                                let style = "border-slate-200 text-slate-500 opacity-60";
                                if (isThisCorrect) style = "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold shadow-sm scale-[1.02]";
                                else if (isThisSelected) style = "bg-red-100 border-red-500 text-red-900 font-bold";
                                return (
                                  <div key={i} className={`p-4 rounded-xl border flex justify-between items-center transition-all ${style}`}>
                                    <span><span className="mr-2 font-bold uppercase">{['A','B','C'][i]}.</span> {opt}</span>
                                    {isThisCorrect && <IconCheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />}
                                    {isThisSelected && !isThisCorrect && <IconXCircle className="w-6 h-6 text-red-600 flex-shrink-0" />}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-sm text-slate-700">
                              <span className="font-black text-indigo-900 uppercase text-xs tracking-wider">Teacher Explanation:</span> 
                              <p className="mt-1 font-medium italic text-slate-600">{q.explanation}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}