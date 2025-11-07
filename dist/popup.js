const likeInput = document.getElementById("likeCount");
const commentInput = document.getElementById("commentCount");
const startBtn = document.getElementById("startBtn");
const likedCountSpan = document.getElementById("likedCount");
const commentedCountSpan = document.getElementById("commentedCount");

// Enable button only if both fields have values
function checkInputs() {
  startBtn.disabled = !(likeInput.value && commentInput.value);
}
likeInput.addEventListener("input", checkInputs);
commentInput.addEventListener("input", checkInputs);

startBtn.addEventListener("click", async () => {
  const likeCount = parseInt(likeInput.value);
  const commentCount = parseInt(commentInput.value);

  const tabs = await chrome.tabs.query({ url: "*://www.linkedin.com/feed/*" });
  if (!tabs.length) {
    alert("❌ Please open LinkedIn feed first and login manually.");
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: autoReactAndPrepareComment,
    args: [likeCount, commentCount],
  });
});

function autoReactAndPrepareComment(likeCount, commentCount) {
  const genericComment = "CFBR";
  const feedPosts = Array.from(document.querySelectorAll("div.feed-shared-update-v2"));
  const likedPosts = [];
  const commentedReadyPosts = [];

  const maxPosts = Math.max(likeCount, commentCount);
  const postsToProcess = feedPosts.slice(0, maxPosts);

  postsToProcess.forEach((post, idx) => {
    // LIKE
    if (idx < likeCount) {
      const likeBtn = post.querySelector('button[aria-label*="Like"], button[aria-label*="like"]');
      if (likeBtn && !likeBtn.classList.contains("reacted")) {
        likeBtn.click();
        likeBtn.classList.add("reacted");
        post.style.border = "2px solid green";
        likedPosts.push(post);
      }
    }

    // COMMENT (prepare only)
    if (idx < commentCount) {
      const commentBtn = post.querySelector('button[aria-label*="Comment"], button[aria-label*="comment"]');
      if (!commentBtn) return;

      commentBtn.click(); // open comment box

      setTimeout(() => {
        const editor =
          post.querySelector('div[role="textbox"]') ||
          post.querySelector('textarea.comments-comment-box__textarea, textarea.feed-shared-comment-box__textarea');

        if (editor) {
          editor.focus();
          editor.innerText = genericComment; // pre-fill the comment
          editor.dispatchEvent(new Event("input", { bubbles: true }));
          post.style.border = "2px solid orange"; // mark ready for comment
          commentedReadyPosts.push(post);

          // Update popup
          chrome.runtime.sendMessage({
            liked: likedPosts.length,
            commented: commentedReadyPosts.length,
          });
        }
      }, 500 + idx * 200);
    }
  });

  // Initial counts update
  chrome.runtime.sendMessage({
    liked: likedPosts.length,
    commented: commentedReadyPosts.length,
  });
}

// Listen for live updates from content script
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.liked !== undefined) likedCountSpan.textContent = msg.liked;
  if (msg.commented !== undefined) commentedCountSpan.textContent = msg.commented;
});
