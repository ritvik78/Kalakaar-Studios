/**
 * CHAT.JS – Live chat widget behavior
 *
 * Note: This is a front-end controller. For true “live AI”, set:
 *   window.KALAKAAR_CHAT_ENDPOINT = "https://your-server.example/api/chat";
 *
 * Expected response shape from endpoint:
 *   { reply: string }
 */

document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chatWindow');
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');

    if (!chatWindow || !chatToggleBtn || !closeChatBtn || !chatMessages || !chatInput || !sendChatBtn) {
        return;
    }

    let isOpen = false;
    let isSending = false;

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function openChat() {
        if (isOpen) return;
        isOpen = true;
        chatWindow.style.display = 'flex';
        // Let the browser apply display first
        requestAnimationFrame(() => {
            chatWindow.style.opacity = '1';
            chatWindow.style.transform = 'translateY(0)';
        });
        setTimeout(() => {
            chatInput.focus();
            scrollToBottom();
        }, 50);
    }

    function closeChat() {
        if (!isOpen) return;
        isOpen = false;
        chatWindow.style.opacity = '0';
        chatWindow.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (!isOpen) chatWindow.style.display = 'none';
        }, 300);
    }

    function makeBubble(text, who) {
        const wrapper = document.createElement('div');
        wrapper.style.padding = '0.8rem';
        wrapper.style.borderRadius = '8px';
        wrapper.style.maxWidth = '80%';
        wrapper.style.wordBreak = 'break-word';

        if (who === 'user') {
            wrapper.style.alignSelf = 'flex-end';
            wrapper.style.background = 'rgba(0,229,204,0.12)';
            wrapper.style.border = '1px solid rgba(0,229,204,0.25)';
        } else {
            wrapper.style.alignSelf = 'flex-start';
            wrapper.style.background = 'rgba(255,255,255,0.1)';
        }

        const p = document.createElement('p');
        p.style.margin = '0';
        p.style.fontSize = '0.9rem';
        p.textContent = text;
        wrapper.appendChild(p);

        return wrapper;
    }

    function makeTypingBubble() {
        const wrapper = makeBubble('Typing…', 'bot');
        wrapper.dataset.typing = 'true';
        wrapper.style.opacity = '0.85';
        return wrapper;
    }

    function getConfiguredEndpoint() {
        const endpoint = window.KALAKAAR_CHAT_ENDPOINT;
        if (typeof endpoint === 'string' && endpoint.trim().length > 0) return endpoint.trim();
        return null;
    }

    async function fetchBotReply(userMessage) {
        const endpoint = getConfiguredEndpoint();
        if (!endpoint) {
            // Offline fallback (not “live AI”): keep it helpful and deterministic.
            const msg = userMessage.toLowerCase();
            if (msg.includes('price') || msg.includes('cost') || msg.includes('budget')) {
                return 'Share your budget range and event city/date — we’ll recommend the best options.';
            }
            if (msg.includes('book') || msg.includes('booking')) {
                return 'You can start with the Booking Wizard on this page. Tell me: category + date + city + audience size.';
            }
            if (msg.includes('singer') || msg.includes('band')) {
                return 'Great choice. Are you looking for Bollywood, indie, or a regional act? Also share city + date.';
            }
            return 'Live AI chat isn’t connected yet. If you set `window.KALAKAAR_CHAT_ENDPOINT`, I can respond live. For now, tell me your event city, date, and the talent type you want.';
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            throw new Error(`Chat endpoint error: ${response.status}`);
        }

        const data = await response.json();
        if (!data || typeof data.reply !== 'string') {
            throw new Error('Chat endpoint returned an invalid response');
        }
        return data.reply;
    }

    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text || isSending) return;

        isSending = true;
        chatInput.value = '';

        chatMessages.appendChild(makeBubble(text, 'user'));
        const typing = makeTypingBubble();
        chatMessages.appendChild(typing);
        scrollToBottom();

        try {
            const reply = await fetchBotReply(text);
            typing.remove();
            chatMessages.appendChild(makeBubble(reply, 'bot'));
            scrollToBottom();
        } catch (err) {
            typing.remove();
            chatMessages.appendChild(makeBubble('Sorry — chat is temporarily unavailable. Please try again in a moment.', 'bot'));
            scrollToBottom();
        } finally {
            isSending = false;
        }
    }

    chatToggleBtn.addEventListener('click', () => {
        if (isOpen) closeChat();
        else openChat();
    });

    closeChatBtn.addEventListener('click', closeChat);

    sendChatBtn.addEventListener('click', sendMessage);

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // Optional: close on ESC when chat is open
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) closeChat();
    });
});
