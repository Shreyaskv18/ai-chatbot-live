// ================================
// PREMIUM CHATBOT FINAL JS
// ================================

const chatWidget = document.getElementById("chatWidget");
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");

// Open / Close Chat
function toggleChat() {
  chatWidget.style.display =
    chatWidget.style.display === "flex" ? "none" : "flex";
}

// Send Message
function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  userInput.value = "";

  setTimeout(() => {
    const reply = getBotReply(message);
    addMessage(reply, "bot");
  }, 500);
}

// Press Enter
function handleEnter(event) {
  if (event.key === "Enter") sendMessage();
}

// Add message to UI
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.innerText = text;
  chatBody.appendChild(div);

  // Scroll smoothly on mobile + desktop
  div.scrollIntoView({ behavior: "smooth", block: "end" });
}

// ================================
// BOT LOGIC
// ================================
function getBotReply(userMessage) {
  const msg = userMessage.toLowerCase();

  if (
    msg.includes("payment") ||
    msg.includes("pay") ||
    msg.includes("price") ||
    msg.includes("fees") ||
    msg.includes("money") ||
    msg.includes("cost") ||
    msg.includes("amount") ||
    msg.includes("charges")
  ) return "Our fees start from ₹25,000. We accept online payments via UPI, Card & Netbanking. EMI options available.";

  if (
    msg.includes("course") ||
    msg.includes("classes") ||
    msg.includes("program")
  ) return "We offer NEET, JEE, Foundation, Crash courses & online classes. Book a free trial session.";

  if (
    msg.includes("batch") ||
    msg.includes("timing") ||
    msg.includes("time")
  ) return "Morning: 7am–10am | Evening: 5pm–8pm | Weekend batches available.";

  if (
    msg.includes("address") ||
    msg.includes("location") ||
    msg.includes("where")
  ) return "We are located in Mysuru city centre, near the bus stand. Google Maps link: [InsertLinkHere]";

  if (
    msg.includes("contact") ||
    msg.includes("call") ||
    msg.includes("phone") ||
    msg.includes("number")
  ) return "Please share your phone number. Our team will call you within 2 hours.";

  if (
    msg.includes("order") ||
    msg.includes("refund") ||
    msg.includes("return") ||
    msg.includes("cancel")
  ) return "Refunds processed within 5–7 working days. Order tracking info available once you share the order ID.";

  if (
    msg.includes("delivery") ||
    msg.includes("shipping")
  ) return "Delivery time is 3–5 working days. Tracking number will be provided once shipped.";

  if (
    msg.includes("support") ||
    msg.includes("help") ||
    msg.includes("team")
  ) return "Support team available 7am–10pm daily. Response within 1–2 hours.";

  return "Thanks for your message! Our human agent will reply shortly.";
}

// ================================
// QUICK REPLY BUTTONS
// ================================
const quickReplies = ["Fees", "Batch", "Contact", "Address", "Refund"];

quickReplies.forEach((q) => {
  const btn = document.createElement("button");
  btn.innerText = q;
  btn.classList.add("quick-btn");
  btn.onclick = () => {
    userInput.value = q.toLowerCase();
    sendMessage();
  };
  document.querySelector(".chat-footer").appendChild(btn);
});

userInput.addEventListener("keypress", handleEnter);
