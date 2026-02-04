// ================================
// PREMIUM CHATBOT JS
// ================================

const chatWidget = document.getElementById("chatWidget");
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatToggle = document.querySelector(".chat-toggle");
const closeBtn = document.querySelector(".close-btn");
const quickButtons = document.querySelectorAll(".quick-btn");

// Open / Close Chat
function toggleChat() {
  if(chatWidget.classList.contains("show")) {
    chatWidget.style.display = "none";
    chatWidget.classList.remove("show");
  } else {
    chatWidget.style.display = "flex";
    chatWidget.classList.add("show");
  }
}

chatToggle.addEventListener("click", toggleChat);
closeBtn.addEventListener("click", toggleChat);

// Send Message
function sendMessage() {
  const message = userInput.value.trim();
  if(message === "") return;

  addMessage(message, "user");
  userInput.value = "";

  setTimeout(() => {
    const reply = getBotReply(message);
    addMessage(reply, "bot");
  }, 600);
}

sendBtn.addEventListener("click", sendMessage);

// Quick Buttons
quickButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const msg = btn.getAttribute("data-msg");
    userInput.value = msg;
    sendMessage();
  });
});

// Press Enter
userInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") sendMessage();
});

// Add message to UI
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.innerText = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Bot Reply Logic
function getBotReply(userMessage) {
  const msg = userMessage.toLowerCase();

  if(msg.includes("fee") || msg.includes("price") || msg.includes("money") || msg.includes("cost"))
    return "Our fees start from ₹25,000. EMI options available.";
  
  if(msg.includes("course") || msg.includes("classes") || msg.includes("program"))
    return "We offer NEET, JEE, Foundation and Crash courses.";

  if(msg.includes("batch") || msg.includes("timing") || msg.includes("time"))
    return "Morning: 7am–10am | Evening: 5pm–8pm.";

  if(msg.includes("address") || msg.includes("location") || msg.includes("where"))
    return "We are located in Mysuru city centre, near the bus stand.";

  if(msg.includes("contact") || msg.includes("call") || msg.includes("phone"))
    return "Please share your phone number. Our team will call you.";

  if(msg.includes("order"))
    return "Please share your order ID to track your order.";

  if(msg.includes("refund") || msg.includes("return") || msg.includes("cancel"))
    return "Refunds are processed within 5–7 working days.";

  if(msg.includes("delivery") || msg.includes("shipping"))
    return "Delivery time is 3–5 working days.";

  if(msg.includes("payment") || msg.includes("pay"))
    return "You can pay online using UPI, Credit/Debit card, or Net Banking.";

  return "Thanks for your message! Our human agent will reply shortly.";
}
