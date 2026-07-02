/* ==========================================
   SMARTLEARN FEEDBACK V2
========================================== */

let feedbacks = [];

document.addEventListener("DOMContentLoaded", () => {

    loadFeedbacks();

});

/* ==========================================
   LOAD
========================================== */

function loadFeedbacks(){

    feedbacks = JSON.parse(localStorage.getItem("feedback")) || [];

    renderFeedbacks();

}

/* ==========================================
   SAVE
========================================== */

function saveFeedbacks(){

    localStorage.setItem("feedback", JSON.stringify(feedbacks));

}

/* ==========================================
   ADD
========================================== */

function addFeedback(){

    const type = document.getElementById("feedbackType").value;

    const content = document
        .getElementById("feedbackContent")
        .value
        .trim();

    if(content===""){

        alert("Vui lòng nhập nội dung!");

        return;

    }

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    const fullname =
        currentUser
        ? currentUser.fullname
        : "Ẩn danh";

    const feedback = {

        id: Date.now(),

        fullname,

        type,

        content,

        likes:0,

        createdAt:new Date().toLocaleString("vi-VN")

    };

    feedbacks.unshift(feedback);

    saveFeedbacks();

    document.getElementById("feedbackContent").value="";

    renderFeedbacks();

}

/* ==========================================
   RENDER
========================================== */

function renderFeedbacks(){

    const container =
        document.getElementById("feedbackList");

    container.innerHTML="";

    if(feedbacks.length===0){

        container.innerHTML=`

        <div class="feedback-card">

            <p style="text-align:center">

                Chưa có Feedback nào.

            </p>

        </div>

        `;

    }

    feedbacks.forEach(item=>{

        const card=document.createElement("div");

        card.className="feedback-card";

        card.innerHTML=`

<div class="feedback-header">

<div class="user">

<div class="avatar">

${getInitial(item.fullname)}

</div>

<div class="user-info">

<h3>${item.fullname}</h3>

<span>${item.createdAt}</span>

</div>

</div>

<div class="badge ${item.type}">

${badgeText(item.type)}

</div>

</div>

<div class="feedback-content">

${item.content}

</div>

<div class="feedback-actions">

<button
class="like-btn"
onclick="likeFeedback(${item.id})">

❤️ ${item.likes}

</button>

<button
class="delete-btn"
onclick="deleteFeedback(${item.id})">

🗑 Xóa

</button>

</div>

`;

        container.appendChild(card);

    });

    updateStats();

}

/* ==========================================
   LIKE
========================================== */

function likeFeedback(id){

    const feedback =
        feedbacks.find(item=>item.id===id);

    if(!feedback) return;

    feedback.likes++;

    saveFeedbacks();

    renderFeedbacks();

}

/* ==========================================
   DELETE
========================================== */

function deleteFeedback(id){

    if(!confirm("Bạn muốn xóa Feedback?"))

        return;

    feedbacks =
        feedbacks.filter(item=>item.id!==id);

    saveFeedbacks();

    renderFeedbacks();

}

/* ==========================================
   STATS
========================================== */

function updateStats(){

    document.getElementById("totalFeedback").textContent=
        feedbacks.length;

    document.getElementById("ideaCount").textContent=
        feedbacks.filter(f=>f.type==="idea").length;

    document.getElementById("questionCount").textContent=
        feedbacks.filter(f=>f.type==="question").length;

    document.getElementById("bugCount").textContent=
        feedbacks.filter(f=>f.type==="bug").length;

}

/* ==========================================
   BADGE
========================================== */

function badgeText(type){

    switch(type){

        case "idea":
            return "💡 Góp ý";

        case "question":
            return "❓ Câu hỏi";

        case "praise":
            return "👍 Khen ngợi";

        case "bug":
            return "⚠️ Báo lỗi";

        default:
            return "";

    }

}

/* ==========================================
   AVATAR
========================================== */

function getInitial(name){

    return name
        .split(" ")
        .map(word=>word.charAt(0))
        .join("")
        .toUpperCase();

}