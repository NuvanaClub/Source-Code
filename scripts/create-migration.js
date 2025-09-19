const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔄 Creating initial migration for production...');

try {
  // Create the migration directory if it doesn't exist
  const migrationsDir = 'prisma/migrations';
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }

  // Create a timestamp for the migration
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
  const migrationName = `${timestamp}_init`;
  const migrationPath = `${migrationsDir}/${migrationName}`;

  // Create migration directory
  fs.mkdirSync(migrationPath, { recursive: true });

  // Create migration.sql file with the schema
  const migrationSQL = `-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'CONTRIBUTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "StrainType" AS ENUM ('Indica', 'Sativa', 'Hybrid');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "StrainType" NOT NULL DEFAULT 'Hybrid',
    "summary" TEXT,
    "lineage" TEXT,
    "thcMin" DECIMAL(5,2),
    "thcMax" DECIMAL(5,2),
    "cbdMin" DECIMAL(5,2),
    "cbdMax" DECIMAL(5,2),
    "terpenes" TEXT,
    "tags" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Strain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrainImage" (
    "id" TEXT NOT NULL,
    "strainId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StrainImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grow" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowEntry" (
    "id" TEXT NOT NULL,
    "growId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "photoPath" TEXT,
    "stage" TEXT,
    "plantHeight" DECIMAL(5,2),
    "leafCount" INTEGER,
    "temperature" DECIMAL(5,2),
    "humidity" DECIMAL(5,2),
    "ph" DECIMAL(3,2),
    "nutrients" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GrowEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "strainId" TEXT,
    "growId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "strainId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReply" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorite_userId_strainId_key" ON "UserFavorite"("userId", "strainId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorite_userId_growId_key" ON "UserFavorite"("userId", "growId");

-- AddForeignKey
ALTER TABLE "StrainImage" ADD CONSTRAINT "StrainImage_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grow" ADD CONSTRAINT "Grow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowEntry" ADD CONSTRAINT "GrowEntry_growId_fkey" FOREIGN KEY ("growId") REFERENCES "Grow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_growId_fkey" FOREIGN KEY ("growId") REFERENCES "Grow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReply" ADD CONSTRAINT "CommentReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReply" ADD CONSTRAINT "CommentReply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;`;

  fs.writeFileSync(`${migrationPath}/migration.sql`, migrationSQL);

  console.log(`✅ Migration created: ${migrationPath}`);
  console.log('🚀 Ready for Vercel deployment!');
} catch (error) {
  console.error('❌ Error creating migration:', error.message);
  process.exit(1);
}
