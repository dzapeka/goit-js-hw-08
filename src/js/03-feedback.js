import throttle from 'lodash.throttle';

const FEEDBACK_FORM_STATE_KEY = 'feedback-form-state';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageTextarea = document.querySelector('textarea[name="message"]');

restoreFeedback();

feedbackForm.addEventListener('input', throttle(backupFeedbackHandler, 500));
feedbackForm.addEventListener('submit', submitFeedbackHandler);

function getCurrentFeedback() {
  return {
    email: feedbackForm.elements.email.value,
    message: feedbackForm.elements.message.value,
  };
}

function backupFeedbackHandler() {
  localStorage.setItem(
    FEEDBACK_FORM_STATE_KEY,
    JSON.stringify(getCurrentFeedback())
  );
}

function submitFeedbackHandler(event) {
  event.preventDefault();
  console.log(getCurrentFeedback());
  localStorage.removeItem(FEEDBACK_FORM_STATE_KEY);
  feedbackForm.reset();
}

function restoreFeedback() {
  const storedFeedback = localStorage.getItem(FEEDBACK_FORM_STATE_KEY);

  if (!storedFeedback) return;

  try {
    console.log('RESTORE');
    const { email, message } = JSON.parse(storedFeedback);
    emailInput.value = email;
    messageTextarea.value = message;
  } catch (error) {
    console.error('Error parsing stored feedback:', error);
  }
}
