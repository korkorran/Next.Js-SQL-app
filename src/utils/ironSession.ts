
export const ironSessionOptions = {
    password: process.env.IRON_PASSWORD,
    cookieName: "next-auth-starter",
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly : false
    }
}
