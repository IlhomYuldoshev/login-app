export function getAuthForm() {
  return `
    <form class="mui-form" id="auth-form">

      <div class="mui-textfield mui-textfield--float-label">
        <input
          type="text"
          id="email"
          required
        />
        <label for="email">Email</label>
      </div>

      <div class="mui-textfield mui-textfield--float-label">
      <input
        type="password"
        id="password"
        required
      />
      <label for="email">Password</label>
    </div>

      <button
        type="submit"
        class="mui-btn mui-btn--raised mui-btn--primary"
      >Sign in</button>
    </form>
  `;
}

export function authWithEmailAndPassword(email, password) {
  const apiKey = "AIzaSyAQgdsRSOfBT_e5BqI9vYWNm_wMrcw5q0M";
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}
  `,
    {
      method: "POST",
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data.idToken;
    });
}
