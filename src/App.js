import React, {useState} from 'react';
import './App.css';

function App() {
    const [inputs, setInputs] = useState([1]);
    const [messages, setMessages] = useState([]);
    const addIput = () =>{
        if(inputs.length < 4){
            setInputs([...inputs, inputs.length + 1]);
        }
    };

    const handleConfirm = () => {
        const inputValues = Array.from(document.querySelectorAll('input')).map(input => input.value.trim());
        const hasContent = inputValues.some(value => value !== '');
        if(hasContent){
            setMessages([...messages, inputValues.filter(value => value !== '').join(', ')]);
        }
    };

    return (
        <div className="App" style={{ position: 'relative', height: '100vh' }}>

            <div style = {{ padding: '20px', minHeight: '60vh'}}>
                {messages.map((message, index) => (
                    <div key={index} style={{
                        backgroundColor: '#f1f1f1',
                        borderRadius: '15px',
                        padding: '10px',
                        marginBottom: '10px',
                        width: 'fit-content',
                        maxWidth: '70%',
                        wordWrap: 'break-word',
                        marginLeft: 'auto',
                    }}>
                        {message}
                    </div>
                ))}
            </div>

            <div style = {{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#333',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
            }}>
                <h4 style = {{
                    color: 'white'
                }}>Please enter here</h4>

                <div style = {{ display: 'flex', justifyContent: 'center', gap: '10px'}}>
                    {inputs.map((input, i) =>(
                        <div key={i} style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                            <input type="text" placeholder={`Word ${i+1}`}/>
                        </div>
                    ))}
                </div>

            {inputs.length < 4 && (
                <button onClick={addIput} style={{
                    marginleft: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>
                    + Add Input
                </button>
            )}

            <button onClick={handleConfirm} style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
            }}>
                Confirm
            </button>
        </div>
        </div>
    );
}

export default App;