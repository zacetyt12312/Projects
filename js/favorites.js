document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".card").forEach(card => {
        let itemId = card.dataset.id;
        let reaction = localStorage.getItem(itemId + "-reaction");

        if (reaction === "like") {
            let likeBtn = card.querySelector(".like-btn");
            likeBtn.classList.add("btn-primary");
            likeBtn.querySelector(".like-count").textContent = "1";
        } else if (reaction === "heart") {
            let heartBtn = card.querySelector(".heart-btn");
            heartBtn.classList.add("btn-danger");
            heartBtn.querySelector(".heart-count").textContent = "1";
        }
    });

    $(".like-btn").click(function () {
        let card = $(this).closest(".card");
        let itemId = card.data("id");
        let heartBtn = card.find(".heart-btn");
        let likeCount = $(this).find(".like-count");
        let heartCount = heartBtn.find(".heart-count");

        if (localStorage.getItem(itemId + "-reaction") === "like") {
            localStorage.removeItem(itemId + "-reaction");
            $(this).removeClass("btn-primary").addClass("btn-outline-primary");
            likeCount.text("0");
        } else {
            localStorage.setItem(itemId + "-reaction", "like");
            $(this).removeClass("btn-outline-primary").addClass("btn-primary");
            heartBtn.removeClass("btn-danger").addClass("btn-outline-danger");
            likeCount.text("1");
            heartCount.text("0");
        }
    });

    $(".heart-btn").click(function () {
        let card = $(this).closest(".card");
        let itemId = card.data("id");
        let likeBtn = card.find(".like-btn");
        let heartCount = $(this).find(".heart-count");
        let likeCount = likeBtn.find(".like-count");

        if (localStorage.getItem(itemId + "-reaction") === "heart") {
            localStorage.removeItem(itemId + "-reaction");
            $(this).removeClass("btn-danger").addClass("btn-outline-danger");
            heartCount.text("0");
        } else {
            localStorage.setItem(itemId + "-reaction", "heart");
            $(this).removeClass("btn-outline-danger").addClass("btn-danger");
            likeBtn.removeClass("btn-primary").addClass("btn-outline-primary");
            heartCount.text("1");
            likeCount.text("0");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    loadComments();
});

function postComment() {
    let commentInput = document.getElementById("commentInput");
    let commentText = commentInput.value.trim();
    if (commentText === "") return;

    let commentData = {
        text: commentText,
        timestamp: new Date().toLocaleString(),
        id: Date.now()
    };

    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(commentData);
    localStorage.setItem("comments", JSON.stringify(comments));

    addCommentToDOM(commentData);
    commentInput.value = "";

    let commentBox = document.getElementById("commentList");
    commentBox.scrollTop = commentBox.scrollHeight;
}

function addCommentToDOM(comment) {
    let commentList = document.getElementById("commentList");
    let newComment = document.createElement("div");
    newComment.classList.add("comment");
    newComment.setAttribute("data-id", comment.id);
    newComment.innerHTML = `
        <img src="images/anonymouspp.jpg" alt="User Avatar" style="width: 20px; height: 20px;">
        <div class="comment-content">
            <strong>Guest</strong>
            <p>${comment.text}</p>
            <span class="comment-meta">${comment.timestamp}</span>
        </div>
        <div class="btn-group">
            <span class="delete-comment" onclick="deleteComment(${comment.id})"><button class="btn btn-danger">Delete</button</span>
        </div>
            `;
    commentList.appendChild(newComment);
}

function deleteComment(commentId) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments = comments.filter(comment => comment.id !== commentId);
    localStorage.setItem("comments", JSON.stringify(comments));
    document.querySelector(`[data-id='${commentId}']`).remove();
}

function loadComments() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.forEach(comment => addCommentToDOM(comment));
}

document.getElementById("commentInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        postComment();
    }
});