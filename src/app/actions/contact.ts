"use server";

export async function submitContactForm(data: {
  name: string;
  email: string;
  order_number?: string;
  message: string;
  recaptchaToken: string;
}) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY || "6LeJZIItAAAAAGHY-KTn19VCJl13mOaFC_Zj_ap6";

  // 1. Verify reCAPTCHA token
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${data.recaptchaToken}`;
  
  try {
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.error("reCAPTCHA validation failed:", recaptchaData);
      return { success: false, error: "Spam detected by reCAPTCHA. Please try again." };
    }

    // 2. Token is valid (human). Forward data to FormSubmit
    const formSubmitRes = await fetch("https://formsubmit.co/ajax/support@getergowellness.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        order_number: data.order_number,
        message: data.message,
        _subject: "New Contact Form Submission - ErgoWellness",
        _autoresponse: "Thank you for contacting ErgoWellness! We have received your message and will get back to you within 24 hours."
      })
    });

    const contentType = formSubmitRes.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const formSubmitData = await formSubmitRes.json();
      if (formSubmitData.success === "true" || formSubmitData.success) {
        return { success: true };
      } else {
        return { success: false, error: "Failed to send message to FormSubmit." };
      }
    } else {
      // FormSubmit returned HTML. This usually means the email needs to be activated.
      const htmlText = await formSubmitRes.text();
      console.error("FormSubmit returned HTML instead of JSON. Likely needs activation.", htmlText.substring(0, 200));
      return { success: false, error: "System pending activation. Please check the support@getergowellness.com inbox for an activation email from FormSubmit." };
    }

  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Server error occurred. Please try again later." };
  }
}
