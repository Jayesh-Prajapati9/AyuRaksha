function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return hours + ':' + minutes + ' ' + ampm;
  }
  
  function getFormattedDate() {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
  }
  
  // Check if a new message group is needed
  function shouldCreateNewGroup() {
    const chatBox = document.getElementById('chat-box');
    const messageGroups = chatBox.querySelectorAll('.message-group');
    
    if (messageGroups.length === 0) return true;
    
    const lastMessageTime = parseInt(messageGroups[messageGroups.length - 1].dataset.timestamp || 0);
    const currentTime = Date.now();
    
    // Create a new group if more than 10 minutes have passed
    return (currentTime - lastMessageTime) > 10 * 60 * 1000;
  }
  
  function createMessageGroup() {
    const chatBox = document.getElementById('chat-box');
    const messageGroup = document.createElement('div');
    messageGroup.classList.add('message-group');
    messageGroup.classList.add('fade-in');
    messageGroup.dataset.timestamp = Date.now();
    
    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.textContent = `Today, ${getCurrentTime()}`;
    
    messageGroup.appendChild(timestamp);
    chatBox.appendChild(messageGroup);
    
    return messageGroup;
  }
  
  function appendMessage(text, className) {
    const chatBox = document.getElementById('chat-box');
    let messageGroup;
    
    if (shouldCreateNewGroup()) {
      messageGroup = createMessageGroup();
    } else {
      messageGroup = chatBox.lastElementChild;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(className, 'fade-in');
    
    // Create avatar
    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar');
    const icon = document.createElement('i');
    
    if (className === 'user-message') {
      icon.classList.add('fas', 'fa-user');
    } else {
      icon.classList.add('fas', 'fa-robot');
    }
    
    avatarDiv.appendChild(icon);
    messageDiv.appendChild(avatarDiv);
    
    // Create message content container
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    
    // Create message bubble
    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('message-bubble');
    
    // Format text with paragraphs
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    paragraphs.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      bubbleDiv.appendChild(p);
    });
    
    contentDiv.appendChild(bubbleDiv);
    messageDiv.appendChild(contentDiv);
    messageGroup.appendChild(messageDiv);
    
    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
  
  function createTypingIndicator() {
    const chatBox = document.getElementById('chat-box');
    let messageGroup;
    
    if (shouldCreateNewGroup()) {
      messageGroup = createMessageGroup();
    } else {
      messageGroup = chatBox.lastElementChild;
    }
    
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('bot-message', 'typing-indicator');
    
    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar');
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-robot');
    avatarDiv.appendChild(icon);
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('message-bubble', 'typing-bubble');
    bubbleDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    
    contentDiv.appendChild(bubbleDiv);
    typingDiv.appendChild(avatarDiv);
    typingDiv.appendChild(contentDiv);
    messageGroup.appendChild(typingDiv);
    
    chatBox.scrollTop = chatBox.scrollHeight;
    
    return typingDiv;
  }
  
  function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value.trim();
    const soundToggle = document.getElementById('sound-toggle');
    const typingToggle = document.getElementById('typing-toggle');
  
    if (userMessage === '') return;
  
    appendMessage(userMessage, 'user-message');
    inputField.value = '';
    
    // Play sound if enabled
    if (soundToggle.checked) {
      new Audio('message-sound.mp3').play(); // Add your sound file
    }
    
    // Show typing indicator if enabled
    let typingIndicator;
    if (typingToggle.checked) {
      typingIndicator = createTypingIndicator();
    }
  
    fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userMessage })
    })
      .then(response => response.json())
      .then(data => {
        if (typingIndicator) typingIndicator.remove();
        
        if (data.answer) {
          setTimeout(() => {
            appendMessage(data.answer, 'bot-message');
            if (soundToggle.checked) {
              new Audio('message-sound.mp3').play();
            }
          }, 500);
        } else {
          setTimeout(() => {
            appendMessage('I apologize, but I couldn\'t process your request at this moment. Please try again.', 'bot-message');
          }, 500);
        }
      })
      .catch(error => {
        if (typingIndicator) typingIndicator.remove();
        setTimeout(() => {
          appendMessage('I\'m having trouble connecting to my knowledge base. Please try again.', 'bot-message');
        }, 500);
        console.error('Error:', error);
      });
  }
  
  // Mobile menu toggle and settings
  document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu button
    if (window.innerWidth <= 768) {
      const topBar = document.querySelector('.top-bar');
      const menuButton = document.createElement('button');
      menuButton.classList.add('menu-toggle');
      menuButton.innerHTML = '<i class="fas fa-bars"></i>';
      topBar.prepend(menuButton);
      
      menuButton.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('open');
      });
    }
    
    // Menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
    
    // Action buttons
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (button.querySelector('i').classList.contains('fa-image')) {
          alert('Image upload functionality would be implemented here.');
        }
      });
    });
    
    // Settings Modal
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeModal = document.querySelector('.close-modal');
    const themeToggle = document.getElementById('theme-toggle');
    
    settingsBtn.addEventListener('click', () => {
      settingsModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', () => {
      settingsModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
      if (e.target === settingsModal) {
        settingsModal.style.display = 'none';
      }
    });
    
    // Theme toggle
    themeToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', themeToggle.checked);
    });
    
    // Load saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
      themeToggle.checked = true;
      document.body.classList.add('dark-mode');
    }
  });