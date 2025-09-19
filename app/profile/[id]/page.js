import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import UserProfileUI from "./ui";

export async function generateMetadata({ params }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: { name: true, bio: true }
  });

  if (!user) {
    return {
      title: "User Not Found - Weed Wiki",
      description: "The requested user profile could not be found."
    };
  }

  const title = `${user.name || "User"} - Profile | Weed Wiki`;
  const description = user.bio || `View ${user.name || "this user"}'s public profile on Weed Wiki.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `/profile/${params.id}`
    }
  };
}

export default async function UserProfilePage({ params }) {
  const session = await getServerSession(authOptions);
  
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      grows: {
        where: { isPublic: true },
        include: {
          strain: {
            select: { name: true, type: true }
          },
          _count: {
            select: { entries: true }
          }
        },
        orderBy: { createdAt: "desc" }
      },
      _count: {
        select: {
          grows: { where: { isPublic: true } },
          comments: true,
          favorites: true
        }
      }
    }
  });

  if (!user) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">👤</div>
        <h1 className="text-2xl font-semibold text-green-300 mb-4">
          User Not Found
        </h1>
        <p className="text-green-200">
          The requested user profile could not be found.
        </p>
      </div>
    );
  }

  return <UserProfileUI user={user} currentUser={session?.user} />;
}
