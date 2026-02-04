// ================================
// PREMIUM TIDIO-LIKE CHATBOT JS
// ================================

const chatWidget = document.getElementById("chatWidget");
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const chatToggle = document.querySelector(".chat-toggle");
const notificationSound = document.getElementById("notificationSound");

// Soft subtle volume like Tidio
notificationSound.volume = 0.2;

// Open / Close Chat with button visibility
function toggleChat() {
  if (chatWidget.style.display === "flex") {
    chatWidget.style.display = "none";
    chatToggle.style.display = "block"; // show button
  } else {
    chatWidget.style.display = "flex";
    chatToggle.style.display = "none"; // hide button
  }
}

// Send Message
function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  // Bot typing simulation
  setTimeout(() => {
    addTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const reply = getBotReply(message);
      addMessage(reply, "bot");

      // Play subtle notification sound only for important messages
      if (
        reply.toLowerCase().includes("human agent") ||
        reply.toLowerCase().includes("contact") ||
        reply.toLowerCase().includes("urgent")
      ) {
        notificationSound.play();
      }

    }, 1200); // typing delay
  }, 300);
}

// Press Enter
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Add message
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.innerText = text;
  chatBody.appendChild(div);
  div.scrollIntoView({ behavior: "smooth", block: "end" });
}

// Typing indicator
function addTypingIndicator() {
  const div = document.createElement("div");
  div.classList.add("message", "bot");
  div.id = "typing";
  div.innerText = "Typing...";
  chatBody.appendChild(div);
  div.scrollIntoView({ behavior: "smooth", block: "end" });
}

function removeTypingIndicator() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

// ================================
// BOT LOGIC
// ================================
function getBotReply(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("payment") || msg.includes("pay") || msg.includes("fees") || msg.includes("price")) {
    return "Our fees start from ₹25,000. Online payment via UPI/Card/Netbanking. EMI options available. 💳";
  }
  if (msg.includes("course") || msg.includes("classes") || msg.includes("program")) {
    return "We offer NEET, JEE, Foundation & Crash courses. 📚 Book a free trial!";
  }
  if (msg.includes("batch") || msg.includes("timing") || msg.includes("time")) {
    return "Morning: 7am–10am | Evening: 5pm–8pm | Weekend batches available. ⏰";
  }
  if (msg.includes("address") || msg.includes("location") || msg.includes("where")) {
    return "Located in Mysuru city centre, near bus stand. 🗺️";
  }
  if (msg.includes("contact") || msg.includes("call") || msg.includes("phone") || msg.includes("number")) {
    return "Share your phone number, our team will call you within 2 hours. ☎️";
  }
  if (msg.includes("order") || msg.includes("refund") || msg.includes("return") || msg.includes("cancel")) {
    return "Refunds processed in 5–7 working days. Order tracking info available after you share ID. 📦";
  }
  if (msg.includes("delivery") || msg.includes("shipping")) {
    return "Delivery: 3–5 working days. Tracking number provided once shipped. 🚚";
  }
  if (msg.includes("support") || msg.includes("help") || msg.includes("team")) {
    return "Support available 7am–10pm daily. Response within 1–2 hours. 🛎️";
  }

  // fallback for unknown queries
  return "Thanks for your message! Our human agent will reply shortly. 😊";
}

// ================================
// QUICK BUTTONS
// ================================
const quickReplies = ["Fees", "Batch", "Contact", "Address", "Refund"];
quickReplies.forEach(q => {
  const btn = document.createElement("button");
  btn.innerText = q;
  btn.classList.add("quick-btn");
  btn.onclick = () => {
    userInput.value = q.toLowerCase();
    sendMessage();
  };
  document.querySelector(".chat-footer").appendChild(btn);
});
