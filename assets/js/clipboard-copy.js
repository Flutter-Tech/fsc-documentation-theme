const pageHeadings = document.querySelectorAll("h2, h3, h4, h5, h6");

pageHeadings.forEach((heading) => {
  const headingId = heading.getAttribute("id");
  // Add relative class to heading for positioning of child button
  heading.classList.add("relative");

  // Create button
  let clipboardBtn = document.createElement("button");
  clipboardBtn.setAttribute("type", "button");
  clipboardBtn.setAttribute("id", headingId + "-clip-btn");
  clipboardBtn.setAttribute("title", "Copy link to clipboard");
  clipboardBtn.classList.add("hidden", "absolute", "clipboardBtn");
  heading.prepend(clipboardBtn);

  // Create feedback div
  const feedback = document.createElement("div");
  const feedbackId = headingId + "-clip-feedback";
  feedback.setAttribute("id", feedbackId);
  feedback.innerHTML = "URL copied successfully to clipboard!";
  feedback.classList.add("hidden", "absolute", "feedbackContainer");
  clipboardBtn.before(feedback);

  clipboardBtn.addEventListener("click", () => {
    const elementId = heading.getAttribute("id");
    copyTextToClipboard(getAnchorUrl(elementId));

    if (document.getElementById(feedbackId)) {
      const feedback = document.getElementById(feedbackId);
      feedback.classList.remove("hidden");
      setTimeout(() => {
        feedback.classList.add("hidden");
      }, 1500);
    location.hash = "#" + elementId;
    }
  });

  // Show button on mouseover
  heading.addEventListener("mouseover", () => {
    if (document.getElementById(headingId + "-clip-btn")) {
      clipboardBtn = document.getElementById(headingId + "-clip-btn");
      clipboardBtn.classList.remove("hidden");
    }

  }, false);

  // Hide button on mouseout
  heading.addEventListener("mouseout", () => {
    if (document.getElementById(headingId + "-clip-btn")) {
      clipboardBtn = document.getElementById(headingId + "-clip-btn");
      clipboardBtn.classList.add("hidden");
    }
  }, false);
})

const copyTextToClipboard = async (text) => {
  await navigator.clipboard.writeText(text)
}

const getAnchorUrl = (anchorId) => {
  const currentDomain = document.domain;
  const currentPathname = location.pathname;
  const selectedId = anchorId;
  const fullUrl = document.domain + currentPathname + "#" + selectedId;

  return fullUrl;
}
