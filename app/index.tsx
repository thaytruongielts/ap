import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// --- Types & Data ---

type WordFormType = 'verb' | 'nounPerson' | 'nounConcept' | 'adjective' | 'adverb';

interface WordFamily {
  id: number;
  verb: string;
  nounPerson: string;
  nounConcept: string;
  adjective: string;
  adverb: string;
}

// Full dataset from user request
const wordData: WordFamily[] = [
  { id: 1, adjective: 'Able', nounPerson: '', nounConcept: 'Ability', verb: 'Enable', adverb: 'Ably' },
  { id: 2, adjective: 'Academic', nounPerson: 'Academician', nounConcept: 'Academy', verb: '', adverb: '' },
  { id: 3, adjective: 'Accessible', nounPerson: '', nounConcept: 'Access', verb: 'Access', adverb: '' },
  { id: 4, adjective: 'Active', nounPerson: 'Actor / Actress', nounConcept: 'Activity / Action', verb: 'Act', adverb: 'Actively' },
  { id: 5, adjective: 'Admirable', nounPerson: 'Admirer', nounConcept: 'Admiration', verb: 'Admire', adverb: '' },
  { id: 6, adjective: '', nounPerson: 'Advertiser', nounConcept: 'Advertisement', verb: 'Advertise', adverb: '' },
  { id: 7, adjective: 'Advisable', nounPerson: 'Adviser', nounConcept: 'Advice', verb: 'Advise', adverb: 'Advisedly' },
  { id: 8, adjective: 'Agreeable', nounPerson: '', nounConcept: 'Agreement', verb: 'Agree', adverb: 'Agreeably' },
  { id: 9, adjective: 'Agricultural', nounPerson: 'Agriculturist', nounConcept: 'Agriculture', verb: '', adverb: '' },
  { id: 10, adjective: 'Amazing', nounPerson: '', nounConcept: 'Amazement', verb: 'Amaze', adverb: 'Amazingly' },
  { id: 11, adjective: 'Ambitious', nounPerson: '', nounConcept: 'Ambition', verb: '', adverb: 'Ambitiously' },
  { id: 12, adjective: 'Amusing', nounPerson: '', nounConcept: 'Amusement', verb: 'Amuse', adverb: 'Amusingly' },
  { id: 13, adjective: 'Applicable', nounPerson: 'Applicant', nounConcept: 'Application', verb: 'Apply', adverb: 'Applicably' },
  { id: 14, adjective: 'Artistic', nounPerson: 'Artist', nounConcept: 'Art', verb: '', adverb: 'Artistically' },
  { id: 15, adjective: 'Attentive', nounPerson: 'Attendant', nounConcept: 'Attention', verb: 'Attend', adverb: 'Attentively' },
  { id: 16, adjective: 'Attractive', nounPerson: '', nounConcept: 'Attraction', verb: 'Attract', adverb: 'Attractively' },
  { id: 17, adjective: 'Beautiful', nounPerson: 'Beautician', nounConcept: 'Beauty', verb: 'Beautify', adverb: 'Beautifully' },
  { id: 18, adjective: '', nounPerson: 'Beginner', nounConcept: 'Beginning', verb: 'Begin', adverb: '' },
  { id: 19, adjective: 'Biological', nounPerson: 'Biologist', nounConcept: 'Biology', verb: '', adverb: 'Biologically' },
  { id: 20, adjective: '', nounPerson: 'Builder', nounConcept: 'Building', verb: 'Build', adverb: '' },
  { id: 21, adjective: 'Businesslike', nounPerson: 'Businessman', nounConcept: 'Business', verb: '', adverb: '' },
  { id: 22, adjective: 'Careful / Careless', nounPerson: '', nounConcept: 'Care / Carefulness', verb: 'Care', adverb: 'Carefully' },
  { id: 23, adjective: '', nounPerson: 'Celebrant', nounConcept: 'Celebration', verb: 'Celebrate', adverb: '' },
  { id: 24, adjective: 'Chemical', nounPerson: 'Chemist', nounConcept: 'Chemistry', verb: '', adverb: 'Chemically' },
  { id: 25, adjective: 'Childish', nounPerson: 'Child / Children', nounConcept: 'Childhood', verb: '', adverb: '' },
  { id: 26, adjective: 'Collective', nounPerson: 'Collector', nounConcept: 'Collection', verb: 'Collect', adverb: '' },
  { id: 27, adjective: 'Colorful', nounPerson: 'Colorist', nounConcept: 'Color', verb: 'Color', adverb: '' },
  { id: 28, adjective: 'Comfortable', nounPerson: '', nounConcept: 'Comfort', verb: 'Comfort', adverb: 'Comfortably' },
  { id: 29, adjective: 'Communicative', nounPerson: 'Communicator', nounConcept: 'Communication', verb: 'Communicate', adverb: 'Communicatively' },
  { id: 30, adjective: 'Competitive', nounPerson: 'Competitor', nounConcept: 'Competition', verb: 'Compete', adverb: 'Competitively' },
  { id: 31, adjective: '', nounPerson: 'Composer', nounConcept: 'Composition', verb: 'Compose', adverb: '' },
  { id: 32, adjective: 'Computational', nounPerson: '', nounConcept: 'Computer / Computation', verb: 'Compute', adverb: '' },
  { id: 33, adjective: 'Confident', nounPerson: '', nounConcept: 'Confidence', verb: '', adverb: 'Confidently' },
  { id: 34, adjective: 'Conservative', nounPerson: 'Conservationist', nounConcept: 'Conservation', verb: 'Conserve', adverb: '' },
  { id: 35, adjective: 'Constructive', nounPerson: 'Constructor', nounConcept: 'Construction', verb: 'Construct', adverb: 'Constructively' },
  { id: 36, adjective: 'Consumable', nounPerson: 'Consumer', nounConcept: 'Consumption', verb: 'Consume', adverb: '' },
  { id: 37, adjective: 'Creative', nounPerson: 'Creator', nounConcept: 'Creation / Creativeness', verb: 'Create', adverb: 'Creatively' },
  { id: 38, adjective: 'Dangerous', nounPerson: '', nounConcept: 'Danger', verb: '', adverb: 'Dangerously' },
  { id: 39, adjective: 'Decorative', nounPerson: 'Decorator', nounConcept: 'Decoration', verb: 'Decorate', adverb: '' },
  { id: 40, adjective: 'Defeated', nounPerson: 'Defeatist', nounConcept: 'Defeat', verb: 'Defeat', adverb: '' },
  { id: 41, adjective: '', nounPerson: 'Designer', nounConcept: 'Design', verb: 'Design', adverb: '' },
  { id: 42, adjective: 'Destructive', nounPerson: 'Destroyer', nounConcept: 'Destruction', verb: 'Destroy', adverb: 'Destructively' },
  { id: 43, adjective: 'Direct', nounPerson: 'Director', nounConcept: 'Direction', verb: 'Direct', adverb: 'Directly' },
  { id: 44, adjective: 'Discoverable', nounPerson: 'Discoverer', nounConcept: 'Discovery', verb: 'Discover', adverb: '' },
  { id: 45, adjective: 'Dramatic', nounPerson: 'Dramatist', nounConcept: 'Drama', verb: 'Dramatize', adverb: '' },
  { id: 46, adjective: '', nounPerson: 'Editor', nounConcept: 'Edition / Editing', verb: 'Edit', adverb: '' },
  { id: 47, adjective: 'Educational', nounPerson: 'Educator', nounConcept: 'Education', verb: 'Educate', adverb: '' },
  { id: 48, adjective: 'Electrical / Electric', nounPerson: 'Electrician', nounConcept: 'Electricity', verb: 'Electrify', adverb: '' },
  { id: 49, adjective: 'Employable', nounPerson: 'Employee / Employer', nounConcept: 'Employment', verb: 'Employ', adverb: '' },
  { id: 50, adjective: 'Encouraging', nounPerson: '', nounConcept: 'Encouragement', verb: 'Encourage', adverb: 'Encouragingly' },
  { id: 51, adjective: 'Entertaining', nounPerson: 'Entertainer', nounConcept: 'Entertainment', verb: 'Entertain', adverb: 'Entertainingly' },
  { id: 52, adjective: 'Environmental', nounPerson: 'Environmentalist', nounConcept: 'Environment', verb: '', adverb: '' },
  { id: 53, adjective: 'Examinational', nounPerson: 'Examiner / Examinee', nounConcept: 'Examination', verb: 'Examine', adverb: '' },
  { id: 54, adjective: 'Exciting / Excited', nounPerson: '', nounConcept: 'Excitement', verb: 'Excite', adverb: 'Excitingly' },
  { id: 55, adjective: 'Exploratory', nounPerson: 'Explorer', nounConcept: 'Exploration', verb: 'Explore', adverb: '' },
  { id: 56, adjective: '', nounPerson: 'Farmer', nounConcept: 'Farm / Farming', verb: 'Farm', adverb: '' },
  { id: 57, adjective: 'Fashionable', nounPerson: '', nounConcept: 'Fashion', verb: 'Fashion', adverb: 'Fashionably' },
  { id: 58, adjective: '', nounPerson: 'Fisherman', nounConcept: 'Fishery / Fishing', verb: 'Fish', adverb: '' },
  { id: 59, adjective: 'Foolish', nounPerson: 'Fool', nounConcept: 'Foolishness / Foolery', verb: 'Fool', adverb: '' },
  { id: 60, adjective: 'Friendly / Friendless', nounPerson: 'Friend', nounConcept: 'Friendship', verb: '', adverb: 'Friendly' },
  { id: 61, adjective: '', nounPerson: 'Gardener', nounConcept: 'Garden / Gardening', verb: 'Garden', adverb: '' },
  { id: 62, adjective: 'Geographical', nounPerson: 'Geographer', nounConcept: 'Geography', verb: '', adverb: 'Geographically' },
  { id: 63, adjective: 'Governmental', nounPerson: 'Governor', nounConcept: 'Government', verb: 'Govern', adverb: '' },
  { id: 64, adjective: 'Happy', nounPerson: '', nounConcept: 'Happiness', verb: '', adverb: 'Happily' },
  { id: 65, adjective: 'Historic / Historical', nounPerson: 'Historian', nounConcept: 'History', verb: '', adverb: 'Historically' },
  { id: 66, adjective: 'Hopeful / Hopeless', nounPerson: '', nounConcept: 'Hope', verb: 'Hope', adverb: 'Hopefully' },
  { id: 67, adjective: 'Industrial', nounPerson: '', nounConcept: 'Industry', verb: 'Industrialize', adverb: 'Industrially' },
  { id: 68, adjective: 'Informative', nounPerson: 'Informer / Informant', nounConcept: 'Information', verb: 'Inform', adverb: '' },
  { id: 69, adjective: 'Instructive', nounPerson: 'Instructor', nounConcept: 'Instruction', verb: 'Instruct', adverb: '' },
  { id: 70, adjective: '', nounPerson: 'Inventor', nounConcept: 'Invention', verb: 'Invent', adverb: '' },
  { id: 71, adjective: 'Journalistic', nounPerson: 'Journalist', nounConcept: 'Journalism', verb: 'Journalize', adverb: '' },
  { id: 72, adjective: 'Knowing / Known', nounPerson: '', nounConcept: 'Knowledge', verb: 'Know', adverb: 'Knowingly' },
  { id: 73, adjective: 'Lawful', nounPerson: 'Lawyer', nounConcept: 'Law', verb: '', adverb: 'Lawfully' },
  { id: 74, adjective: 'Leading', nounPerson: 'Leader', nounConcept: 'Leadership', verb: 'Lead', adverb: '' },
  { id: 75, adjective: '', nounPerson: 'Librarian', nounConcept: 'Library', verb: '', adverb: '' },
  { id: 76, adjective: '', nounPerson: 'Manager', nounConcept: 'Management', verb: 'Manage', adverb: '' },
  { id: 77, adjective: 'Mathematical', nounPerson: 'Mathematician', nounConcept: 'Mathematics', verb: 'Mathematize', adverb: '' },
  { id: 78, adjective: 'Musical', nounPerson: 'Musician', nounConcept: 'Music', verb: '', adverb: '' },
  { id: 79, adjective: 'National', nounPerson: 'Nationalist', nounConcept: 'Nation / Nationality', verb: 'Nationalize', adverb: 'Nationally' },
  { id: 80, adjective: '', nounPerson: 'Observer', nounConcept: 'Observation', verb: 'Observe', adverb: '' },
  { id: 81, adjective: 'Painty', nounPerson: 'Painter', nounConcept: 'Painting / Paint', verb: 'Paint', adverb: '' },
  { id: 82, adjective: '', nounPerson: 'Participant', nounConcept: 'Participation', verb: 'Participate', adverb: '' },
  { id: 83, adjective: 'Performing', nounPerson: 'Performer', nounConcept: 'Performance', verb: 'Perform', adverb: '' },
  { id: 84, adjective: 'Photographic', nounPerson: 'Photographer', nounConcept: 'Photography', verb: 'Photograph', adverb: '' },
  { id: 85, adjective: 'Physical', nounPerson: 'Physicist', nounConcept: 'Physics', verb: '', adverb: 'Physically' },
  { id: 86, adjective: 'Poetic', nounPerson: 'Poet / Poetess', nounConcept: 'Poem / Poetry', verb: 'Poetize', adverb: 'Poetically' },
  { id: 87, adjective: 'Polluted', nounPerson: '', nounConcept: 'Pollution / Pollutant', verb: 'Pollute', adverb: '' },
  { id: 88, adjective: 'Predictive / Predictable', nounPerson: 'Predictor', nounConcept: 'Prediction', verb: 'Predict', adverb: '' },
  { id: 89, adjective: 'Printable', nounPerson: 'Printer', nounConcept: 'Printing', verb: 'Print', adverb: '' },
  { id: 90, adjective: 'Productive', nounPerson: 'Producer', nounConcept: 'Production / Product', verb: 'Produce', adverb: 'Productively' },
  { id: 91, adjective: 'Protective', nounPerson: 'Protector', nounConcept: 'Protection', verb: 'Protect', adverb: '' },
  { id: 92, adjective: 'Published', nounPerson: 'Publisher', nounConcept: 'Publication / Publishing', verb: 'Publish', adverb: '' },
  { id: 93, adjective: '', nounPerson: 'Reader', nounConcept: 'Reading', verb: 'Read', adverb: '' },
  { id: 94, adjective: 'Scientific', nounPerson: 'Scientist', nounConcept: 'Science', verb: '', adverb: 'Scientifically' },
  { id: 95, adjective: '', nounPerson: 'Singer', nounConcept: 'Song', verb: 'Sing', adverb: '' },
  { id: 96, adjective: 'Speakable', nounPerson: 'Speaker', nounConcept: 'Speech / Speaking', verb: 'Speak', adverb: '' },
  { id: 97, adjective: 'Successful', nounPerson: '', nounConcept: 'Success', verb: 'Succeed', adverb: 'Successfully' },
  { id: 98, adjective: '', nounPerson: 'Teacher', nounConcept: 'Teaching', verb: 'Teach', adverb: '' },
  { id: 99, adjective: 'Technical', nounPerson: 'Technician', nounConcept: 'Technology / Technique', verb: '', adverb: 'Technically' },
  { id: 100, adjective: '', nounPerson: 'Translator', nounConcept: 'Translation', verb: 'Translate', adverb: '' }
];

// Helper to normalize strings for comparison
const normalize = (str: string) => str.trim().toLowerCase();

const LABELS: Record<WordFormType, string> = {
  verb: 'Verb (Động từ)',
  nounPerson: 'Noun - Person (Người)',
  nounConcept: 'Noun - Concept (Vật/Khái niệm)',
  adjective: 'Adjective (Tính từ)',
  adverb: 'Adverb (Trạng từ)',
};

const FORMS: WordFormType[] = ['verb', 'nounPerson', 'nounConcept', 'adjective', 'adverb'];

// --- Components ---

const App: React.FC = () => {
  // Game State
  const [currentWord, setCurrentWord] = useState<WordFamily | null>(null);
  const [givenType, setGivenType] = useState<WordFormType>('verb');
  const [inputs, setInputs] = useState<Record<WordFormType, string>>({
    verb: '', nounPerson: '', nounConcept: '', adjective: '', adverb: ''
  });
  
  // Progress State
  const [usedIds, setUsedIds] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Validation State
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Record<WordFormType, boolean>>({
    verb: false, nounPerson: false, nounConcept: false, adjective: false, adverb: false
  });

  // Score State
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  // Initialize first word
  useEffect(() => {
    // Only pick if we haven't started yet
    if (usedIds.length === 0 && !isFinished && !currentWord) {
        pickNewWord();
    }
  }, []);

  const pickNewWord = () => {
    // Filter words that haven't been used yet
    const availableWords = wordData.filter(w => !usedIds.includes(w.id));
    
    if (availableWords.length === 0) {
      setIsFinished(true);
      setCurrentWord(null);
      return;
    }

    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    
    // Find a valid type (one that isn't empty) to present to the user
    let randomType: WordFormType;
    let attempts = 0;
    do {
       randomType = FORMS[Math.floor(Math.random() * FORMS.length)];
       attempts++;
    } while (!randomWord[randomType] && attempts < 20); // Fallback to avoid infinite loop if all empty (unlikely)

    // If we somehow failed to find a non-empty field, just pick the first non-empty one
    if (!randomWord[randomType]) {
        const validForm = FORMS.find(f => !!randomWord[f]);
        if (validForm) randomType = validForm;
    }

    setCurrentWord(randomWord);
    setGivenType(randomType);
    
    // Add current word ID to used list
    setUsedIds(prev => [...prev, randomWord.id]);
    
    // Reset inputs
    const newInputs = {
      verb: '', nounPerson: '', nounConcept: '', adjective: '', adverb: ''
    };
    newInputs[randomType] = randomWord[randomType];
    setInputs(newInputs);
    
    // Reset state
    setChecked(false);
    setResults({
      verb: false, nounPerson: false, nounConcept: false, adjective: false, adverb: false
    });
  };

  const handleRestart = () => {
    // Reset all game state
    setUsedIds([]);
    setTotalQuestions(0);
    setTotalCorrect(0);
    setIsFinished(false);
    
    // We need to pick a word immediately
    const randomWord = wordData[Math.floor(Math.random() * wordData.length)];
    
    let randomType: WordFormType;
    let attempts = 0;
    do {
       randomType = FORMS[Math.floor(Math.random() * FORMS.length)];
       attempts++;
    } while (!randomWord[randomType] && attempts < 20);

     if (!randomWord[randomType]) {
        const validForm = FORMS.find(f => !!randomWord[f]);
        if (validForm) randomType = validForm;
    }

    setCurrentWord(randomWord);
    setGivenType(randomType);
    setUsedIds([randomWord.id]);
    
    const newInputs = { verb: '', nounPerson: '', nounConcept: '', adjective: '', adverb: '' };
    newInputs[randomType] = randomWord[randomType];
    setInputs(newInputs);
    setChecked(false);
    setResults({ verb: false, nounPerson: false, nounConcept: false, adjective: false, adverb: false });
  };

  const handleInputChange = (type: WordFormType, value: string) => {
    if (checked) {
        // If they try to edit after checking, reset checked state
        setChecked(false);
    }
    setInputs(prev => ({ ...prev, [type]: value }));
  };

  const handleCheck = () => {
    if (!currentWord) return;

    let correctCount = 0;
    const newResults: Record<WordFormType, boolean> = { ...results };

    FORMS.forEach(type => {
      // Don't score the given type
      if (type === givenType) {
        newResults[type] = true;
        return;
      }

      const userVal = normalize(inputs[type]);
      const correctValRaw = currentWord[type];
      
      // Handle multiple correct answers separated by "/"
      // Example: "Child / Children" -> accepts "child", "children"
      const correctOptions = correctValRaw.split('/').map(s => normalize(s));
      
      // Also allow exact full match if user types "Child / Children"
      if (userVal !== '') {
          correctOptions.push(normalize(correctValRaw));
      }

      const isCorrect = correctOptions.includes(userVal);
      newResults[type] = isCorrect;

      if (isCorrect) {
        correctCount++;
      }
    });

    setResults(newResults);
    setChecked(true);

    // Update global score
    setTotalQuestions(prev => prev + 4);
    setTotalCorrect(prev => prev + correctCount);
  };

  const score = totalQuestions > 0 ? (10 * (totalCorrect / totalQuestions)).toFixed(2) : '10.00';

  if (isFinished) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.finishScreen}>
            <h1 style={{color: 'var(--primary)', marginBottom: '16px'}}>Congratulations!</h1>
            <p style={{fontSize: '1.2rem', marginBottom: '24px'}}>You have practiced all {wordData.length} word families.</p>
            
            <div style={styles.finalScore}>
              <div>Final Score</div>
              <div style={styles.finalScoreValue}>{score}</div>
              <div style={styles.stats}>{totalCorrect} / {totalQuestions} correct answers</div>
            </div>

            <button style={styles.buttonPrimary} onClick={handleRestart}>
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
            <h1 style={styles.title}>Word Form Practice</h1>
            <span style={styles.progressBadge}>Word {usedIds.length} of {wordData.length}</span>
        </div>
        <div style={styles.scoreBoard}>
          <div style={styles.scoreItem}>
            <span style={styles.scoreLabel}>Score</span>
            <span style={styles.scoreValue}>{score}</span>
          </div>
          <div style={styles.stats}>
            {totalCorrect} / {totalQuestions} correct
          </div>
        </div>
      </header>

      <main style={styles.card}>
        {currentWord ? (
          <>
            <div style={styles.grid}>
              {FORMS.map((type) => {
                const isGiven = type === givenType;
                const isCorrect = results[type];
                const value = inputs[type];
                const isEmptyField = currentWord[type] === '';
                
                // Determine styling based on state
                let inputStyle = styles.input;
                if (isGiven) inputStyle = { ...inputStyle, ...styles.inputGiven };
                else if (checked) {
                  inputStyle = { 
                    ...inputStyle, 
                    ...(isCorrect ? styles.inputCorrect : styles.inputError) 
                  };
                }

                return (
                  <div key={type} style={styles.fieldContainer}>
                    <label style={styles.label}>{LABELS[type]}</label>
                    <div style={styles.inputWrapper}>
                        <input
                        style={inputStyle}
                        value={value}
                        onChange={(e) => handleInputChange(type, e.target.value)}
                        disabled={isGiven}
                        placeholder={isGiven ? '' : '?'}
                        autoComplete="off"
                        />
                        {checked && !isGiven && (
                            <span style={styles.feedbackIcon}>
                                {isCorrect ? '✅' : '❌'}
                            </span>
                        )}
                         {checked && !isCorrect && isEmptyField && (
                             <div style={styles.helperText}>(Leave blank)</div>
                         )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={styles.actions}>
              <button 
                style={styles.buttonSecondary} 
                onClick={pickNewWord}
              >
                Skip / Next Word
              </button>
              <button 
                style={styles.buttonPrimary} 
                onClick={handleCheck}
              >
                Check Answers
              </button>
            </div>
            
            {checked && (
               <div style={styles.message}>
                 {Object.values(results).filter((r, i) => FORMS[i] !== givenType && !r).length === 0 
                   ? <span style={{color: 'var(--success)'}}>Excellent! All correct.</span>
                   : <span style={{color: 'var(--error)'}}>Some answers are incorrect. Try again!</span>
                 }
               </div>
            )}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </main>
      
      <footer style={styles.footer}>
        <p>Database loaded with {wordData.length} word families.</p>
      </footer>
    </div>
  );
};

// --- Styles ---

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid var(--border)',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    color: 'var(--primary)',
  },
  progressBadge: {
      fontSize: '0.85rem',
      backgroundColor: '#e0e7ff',
      color: '#4338ca',
      padding: '4px 8px',
      borderRadius: '4px',
      fontWeight: 600,
      width: 'fit-content',
  },
  scoreBoard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  scoreItem: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
  },
  scoreLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: 600,
  },
  scoreValue: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--text)',
  },
  stats: {
    fontSize: '0.875rem',
    color: '#9ca3af',
  },
  card: {
    backgroundColor: 'var(--card-bg)',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    height: '32px', // fixed height for alignment
    display: 'flex',
    alignItems: 'end',
  },
  inputWrapper: {
      position: 'relative',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '2px solid var(--border)',
    outline: 'none',
    transition: 'all 0.2s',
    backgroundColor: '#fff',
    color: 'var(--text)',
  },
  inputGiven: {
    backgroundColor: 'var(--disabled)',
    color: '#4b5563',
    fontWeight: 600,
    borderColor: 'transparent',
  },
  inputCorrect: {
    borderColor: 'var(--success)',
    backgroundColor: '#ecfdf5',
    color: 'var(--success)',
  },
  inputError: {
    borderColor: 'var(--error)',
    backgroundColor: '#fef2f2',
    color: 'var(--error)',
  },
  feedbackIcon: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '12px',
  },
  helperText: {
      fontSize: '0.75rem',
      color: '#9ca3af',
      marginTop: '4px',
      textAlign: 'right',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    borderTop: '1px solid var(--border)',
    paddingTop: '24px',
  },
  buttonPrimary: {
    padding: '12px 24px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '1rem',
  },
  buttonSecondary: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '1rem',
  },
  message: {
      marginTop: '16px',
      textAlign: 'right',
      fontWeight: 500,
  },
  footer: {
      marginTop: '32px',
      textAlign: 'center',
      fontSize: '0.8rem',
      color: '#9ca3af',
  },
  finishScreen: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0',
      textAlign: 'center',
  },
  finalScore: {
      backgroundColor: '#f3f4f6',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '32px',
      width: '100%',
      maxWidth: '300px',
  },
  finalScoreValue: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: 'var(--primary)',
      margin: '8px 0',
  }
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);