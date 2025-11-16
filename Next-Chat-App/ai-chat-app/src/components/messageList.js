import React, {useState}  from 'react';
import styles from '../components/css/messageList.module.css';
const MessageList = () => {

    const [userMessage, setUserMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const sendMessage = async() => {
        if (userMessage.trim() === "") return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('prompt', userMessage);
            if (imageFile){
                formData.append('file', imageFile);
            }
            const response = await fetch('http://127.0.0.1:8000/uploadfile', {
                method: 'POST',
                body: formData,
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify({ 
                //     prompt: userMessage 
                // }),
            });

            if(!response.ok) {
                throw new Error('Failed to fetch response from server');
            }
            const data = await response.json();
            if (imageFile){
                const imageDataURL = await fileToDataURL(imageFile);
                setChatHistory((prev) => [
                ...prev, 
                {sender: 'user', message: userMessage, isImage : false},
                {sender: 'user', message: imageDataURL, isImage : true},
                {sender: 'bot', message: data.response, isImage : false},
                ]);
            }
            else {
                setChatHistory((prev) => [...prev, newMessage, botMessage]);
            }
        }
        catch (error) {
            console.error("Error sending message:", error);
        }finally {
            setLoading(false);
        }

        setUserMessage("");
        setImageFile(null);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file){
            setImageFile(file);
        }
    }

    const fileToDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    return (
       <div className={styles.container}>
              <h1 className={styles.header}>Ask Curo</h1>
                <div className={styles.chatBox}>
                   {
                    chatHistory.map((chat, index) => (
                        <div
                            key={index}
                            className={`${styles.message} 
                                ${chat.sender === 'user' ? 
                                    styles.userMessage : 
                                    styles.botMessage}`}
                        >
                            {chat.isImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                                src={chat.message}
                                alt="Uploaded"
                                className={styles.uploadedImage}
                            /> 
                             ) : (  
                            chat.message
                         )}
                        </div>
                    ))}
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        className={styles.inputField}
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <label htmlFor="image-upload" className={styles.paperclipButton}>
                        📎
                    </label>
                    <input
                        type="file"
                        className={styles.inputImage}
                        accept="image/*" 
                        id="image-upload"
                        onChange={handleImageUpload}
                    ></input>
                    <button className={styles.sendButton} 
                    onClick={sendMessage}
                    disabled={loading}
                    >{loading ? "Sending..." : "Send"}</button>
                </div>
        </div>
    );
};

export default MessageList;