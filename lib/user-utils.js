import prisma from "@/lib/prisma";

/**
 * Ensures a user exists in the database, creates if not found
 * This is a fallback for cases where OAuth user creation might have failed
 */
export async function ensureUserExists(sessionUser) {
  if (!sessionUser?.email) {
    throw new Error("No email provided in session");
  }

  try {
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: sessionUser.email }
    });

    if (!user) {
      console.log("User not found in database, creating:", sessionUser.email);
      // Create user if not found
      user = await prisma.user.create({
        data: {
          email: sessionUser.email,
          name: sessionUser.name || null,
          image: sessionUser.image || null,
          role: "USER" // Default role
        }
      });
      console.log("User created successfully:", user.id);
    }

    return user;
  } catch (error) {
    console.error("Error ensuring user exists:", error);
    throw error;
  }
}
